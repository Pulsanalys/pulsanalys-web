import type { APIRoute } from "astro";
import { toBookable, upcomingEvents } from "../../lib/events.ts";

export const GET: APIRoute = async () => {
  const events = (await upcomingEvents()).map(toBookable);
  return new Response(JSON.stringify(events), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
