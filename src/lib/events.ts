import { getCollection, type CollectionEntry } from "astro:content";
import { isUpcoming, type BookableEvent } from "../../worker/booking.ts";

export type EventEntry = CollectionEntry<"events">;

const MONTHS = ["januari", "februari", "mars", "april", "maj", "juni", "juli",
  "augusti", "september", "oktober", "november", "december"];

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** "25 november 2026", "26–27 november 2026" or "30 juni – 1 juli 2026". */
export function dateLabel(start: Date, end: Date): string {
  const [d1, m1, y1] = [start.getUTCDate(), start.getUTCMonth(), start.getUTCFullYear()];
  const [d2, m2, y2] = [end.getUTCDate(), end.getUTCMonth(), end.getUTCFullYear()];
  if (isoDate(start) === isoDate(end)) return `${d1} ${MONTHS[m1]} ${y1}`;
  if (m1 === m2 && y1 === y2) return `${d1}–${d2} ${MONTHS[m1]} ${y1}`;
  if (y1 === y2) return `${d1} ${MONTHS[m1]} – ${d2} ${MONTHS[m2]} ${y1}`;
  return `${d1} ${MONTHS[m1]} ${y1} – ${d2} ${MONTHS[m2]} ${y2}`;
}

export function toBookable(entry: EventEntry): BookableEvent {
  const e = entry.data;
  return {
    slug: entry.id,
    legacyId: e.legacyId,
    title: e.title,
    dateLabel: dateLabel(e.start, e.end),
    start: isoDate(e.start),
    time: e.time,
    place: e.place,
    price: e.price,
    booking: e.booking,
  };
}

/** Upcoming events, soonest first. Past events drop out at the next build. */
export async function upcomingEvents(): Promise<EventEntry[]> {
  const all = await getCollection("events", (entry) => isUpcoming(isoDate(entry.data.start)));
  return all.sort((a, b) => a.data.start.getTime() - b.data.start.getTime());
}
