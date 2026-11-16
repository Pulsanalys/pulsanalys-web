import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import worker, { type Env } from "./index.ts";

const events = [{
  slug: "grundutbildning-disc-2099-11-26",
  legacyId: 531,
  title: "Grundutbildning DISC",
  dateLabel: "26–27 november 2099",
  start: "2099-11-26",
  time: "09:00–16:00",
  place: "Online",
  price: "19 900 SEK exkl. moms",
  booking: "bindande",
}];

const fields = {
  event: events[0].slug,
  firstname: "Anna", lastname: "Svensson",
  email: "anna@example.se", emailConfirm: "anna@example.se",
  phone: "0701234567", reference: "Annat",
  billingAddress: "Storgatan 1", zipcode: "11850", city: "Stockholm",
  "cf-turnstile-response": "XXXX.DUMMY.TOKEN.XXXX",
};

let sent: unknown[] = [];
let turnstileOk = true;
const realFetch = globalThis.fetch;

function env(overrides: Partial<Env> = {}): Env {
  return {
    ASSETS: {
      fetch: async (req: Request | string) => {
        const path = new URL(typeof req === "string" ? req : req.url).pathname;
        return path === "/data/events.json" ? Response.json(events) : new Response("asset " + path);
      },
    } as unknown as Fetcher,
    EMAIL: { send: async (m: unknown) => { sent.push(m); return { messageId: "1" }; } } as unknown as SendEmail,
    MAIL_FROM: "bokning@pulsanalys.se",
    MAIL_TO: "info@pulsanalys.se",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    STAGING: "true",
    ...overrides,
  };
}

function post(body: Record<string, string>, headers: Record<string, string> = { Accept: "application/json" }) {
  const form = new FormData();
  for (const [k, v] of Object.entries(body)) form.append(k, v);
  return new Request("https://example.workers.dev/api/bokning", { method: "POST", body: form, headers });
}

beforeEach(() => {
  sent = [];
  turnstileOk = true;
  globalThis.fetch = (async () => Response.json({ success: turnstileOk })) as typeof fetch;
});
afterEach(() => { globalThis.fetch = realFetch; });

const call = (req: Request, e = env()) => worker.fetch!(req as never, e, {} as never) as Promise<Response>;

test("valid booking is e-mailed to the inbox", async () => {
  const res = await call(post(fields));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(sent.length, 1);
  const mail = sent[0] as { to: string; subject: string; replyTo: { email: string } };
  assert.equal(mail.to, "info@pulsanalys.se");
  assert.equal(mail.replyTo.email, "anna@example.se");
  assert.equal(res.headers.get("X-Robots-Tag"), "noindex, nofollow");
});

test("failed Turnstile check sends nothing", async () => {
  turnstileOk = false;
  const res = await call(post(fields));
  assert.equal(res.status, 200);
  assert.equal((await res.json() as { ok: boolean }).ok, false);
  assert.equal(sent.length, 0);
});

test("missing fields return field errors and send nothing", async () => {
  const res = await call(post({ event: fields.event, "cf-turnstile-response": "x" }));
  assert.equal(res.status, 200);
  const body = await res.json() as { ok: boolean; errors: Record<string, string> };
  assert.equal(body.ok, false);
  assert.ok(body.errors.firstname);
  assert.equal(sent.length, 0);
});

test("unknown event is rejected", async () => {
  const res = await call(post({ ...fields, event: "finns-inte" }));
  assert.equal((await res.json() as { ok: boolean }).ok, false);
  assert.equal(sent.length, 0);
});

test("honeypot submissions look successful but send nothing", async () => {
  const res = await call(post({ ...fields, website: "spam" }));
  assert.equal(res.status, 200);
  assert.equal(sent.length, 0);
});

test("cross-site posts are refused", async () => {
  const res = await call(post(fields, { Accept: "application/json", Origin: "https://evil.test" }));
  assert.equal(res.status, 403);
  assert.equal(sent.length, 0);
});

test("mail failure gives a clear error", async () => {
  const failing = env({ EMAIL: { send: async () => { throw new Error("down"); } } as unknown as SendEmail });
  const original = console.error;
  console.error = () => {};
  const res = await call(post(fields), failing);
  console.error = original;
  assert.equal(res.status, 502);
});

test("without JavaScript a rejected form also goes back, marked as failed", async () => {
  turnstileOk = false;
  const res = await call(post(fields, {}));
  assert.equal(res.status, 303);
  assert.match(res.headers.get("Location") ?? "", /\?bokning=fel#bokning$/);
});

test("without JavaScript the browser is sent back to the event page", async () => {
  const res = await call(post(fields, {}));
  assert.equal(res.status, 303);
  assert.equal(res.headers.get("Location"),
    "https://example.workers.dev/utbildningar-och-forelasningar/grundutbildning-disc-2099-11-26/?bokning=skickad#bokning");
});

test("GET on the API is not allowed", async () => {
  const res = await call(new Request("https://example.workers.dev/api/bokning"));
  assert.equal(res.status, 405);
});

test("old booking links redirect to the new event page", async () => {
  for (const path of ["/anmalan/?eventid=531", "/bokning/?eventid=531"]) {
    const res = await call(new Request("https://example.workers.dev" + path));
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("Location"),
      "https://example.workers.dev/utbildningar-och-forelasningar/grundutbildning-disc-2099-11-26/");
  }
  const old = await call(new Request("https://example.workers.dev/anmalan/?eventid=377"));
  assert.equal(old.headers.get("Location"), "https://example.workers.dev/utbildningar-och-forelasningar/");
});
