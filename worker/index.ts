import { HONEYPOT, bookingEmail, validateBooking, type BookableEvent } from "./booking.ts";

export interface Env {
  ASSETS: Fetcher;
  EMAIL: SendEmail;
  /** Sender address on a domain onboarded to Cloudflare Email Service. */
  MAIL_FROM: string;
  /** Inbox that receives bookings. */
  MAIL_TO: string;
  TURNSTILE_SECRET_KEY: string;
  /** "true" on the review address: adds noindex to every response. */
  STAGING?: string;
}

const EVENTS_PATH = "/data/events.json";
const CALENDAR_PATH = "/utbildningar-och-forelasningar/";
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_BODY_BYTES = 16 * 1024;

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    let response: Response;

    if (url.pathname === "/api/bokning") {
      response = request.method === "POST"
        ? await handleBooking(request, env, url)
        : new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
    } else if (/^\/(anmalan|bokning)\/?$/.test(url.pathname)) {
      response = await legacyEventRedirect(url, env);
    } else {
      response = await env.ASSETS.fetch(request);
    }

    if (env.STAGING === "true") {
      response = new Response(response.body, response);
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return response;
  },
} satisfies ExportedHandler<Env>;

async function loadEvents(env: Env, origin: string): Promise<BookableEvent[]> {
  const res = await env.ASSETS.fetch(new Request(origin + EVENTS_PATH));
  if (!res.ok) throw new Error(`events.json: ${res.status}`);
  return (await res.json()) as BookableEvent[];
}

/** /anmalan/?eventid=N and /bokning/?eventid=N from the old site. */
async function legacyEventRedirect(url: URL, env: Env): Promise<Response> {
  const id = Number(url.searchParams.get("eventid"));
  let target = CALENDAR_PATH;
  if (Number.isInteger(id) && id > 0) {
    const events = await loadEvents(env, url.origin);
    const match = events.find((e) => e.legacyId === id);
    if (match) target = `${CALENDAR_PATH}${match.slug}/`;
  }
  return Response.redirect(new URL(target, url.origin).toString(), 301);
}

function wantsJson(request: Request): boolean {
  return (request.headers.get("Accept") ?? "").includes("application/json");
}

function reply(request: Request, url: URL, slug: string, status: number, body: Record<string, unknown>): Response {
  if (wantsJson(request)) {
    // A rejected form is an answer, not a failure: 200 keeps the browser console clean.
    const httpStatus = status === 400 || status === 422 ? 200 : status;
    return Response.json(body, { status: httpStatus, headers: { "Cache-Control": "no-store" } });
  }
  // Without JavaScript the browser posted the form directly: send it back to the event page.
  const back = new URL(slug ? `${CALENDAR_PATH}${slug}/` : CALENDAR_PATH, url.origin);
  back.searchParams.set("bokning", status === 200 ? "skickad" : "fel");
  back.hash = "bokning";
  return Response.redirect(back.toString(), 303);
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!token || token.length > 2048) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch(SITEVERIFY, { method: "POST", body, signal: AbortSignal.timeout(8000) });
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch {
    return false;
  }
}

async function handleBooking(request: Request, env: Env, url: URL): Promise<Response> {
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) {
    return Response.json({ ok: false, message: "Ogiltig förfrågan." }, { status: 403 });
  }
  const length = Number(request.headers.get("Content-Length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, message: "Förfrågan är för stor." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(request, url, "", 400, { ok: false, message: "Formuläret kunde inte läsas." });
  }
  const input = Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
  const slug = typeof input.event === "string" ? input.event : "";

  // Spam: answer as if it worked, send nothing.
  if (input[HONEYPOT]) return reply(request, url, slug, 200, { ok: true });

  const human = await verifyTurnstile(input["cf-turnstile-response"] ?? "", env.TURNSTILE_SECRET_KEY,
    request.headers.get("CF-Connecting-IP"));
  if (!human) {
    return reply(request, url, slug, 400, {
      ok: false,
      message: "Vi kunde inte bekräfta att du är en människa. Ladda om sidan och försök igen.",
    });
  }

  let events: BookableEvent[];
  try {
    events = await loadEvents(env, url.origin);
  } catch {
    return reply(request, url, slug, 503, { ok: false, message: "Tekniskt fel. Försök igen om en stund." });
  }
  const event = events.find((e) => e.slug === slug);
  const result = validateBooking(input, event);
  if (!result.ok || !event) {
    return reply(request, url, slug, 422, {
      ok: false,
      message: "Kontrollera de markerade fälten.",
      errors: result.ok ? {} : result.errors,
    });
  }

  const mail = bookingEmail(result.data, event);
  try {
    await env.EMAIL.send({
      from: { name: "PulsAnalys webbplats", email: env.MAIL_FROM },
      to: env.MAIL_TO,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  } catch (error) {
    // Log the failure, never the form data.
    console.error("booking mail failed", { event: event.slug, error: String(error) });
    return reply(request, url, slug, 502, {
      ok: false,
      message: "Anmälan kunde inte skickas just nu. Försök igen om en stund eller mejla info@pulsanalys.se.",
    });
  }

  return reply(request, url, slug, 200, { ok: true });
}
