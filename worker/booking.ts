/**
 * Booking form: field definitions, validation and the notification e-mail.
 * Shared by the Astro page (labels, attributes) and the Worker (validation),
 * so the two can never disagree. No Workers APIs in this file.
 */

export type FieldName =
  | "firstname"
  | "lastname"
  | "email"
  | "emailConfirm"
  | "phone"
  | "company"
  | "orgnumber"
  | "reference"
  | "billingAddress"
  | "zipcode"
  | "city"
  | "discountCode";

export interface Field {
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel" | "select";
  required: boolean;
  autocomplete?: string;
  maxLength: number;
  inputMode?: "numeric" | "tel" | "email" | "text";
  options?: readonly string[];
}

export const REFERENCE_OPTIONS = [
  "Mia Wernersson",
  "Kim Adeholm",
  "Per Kristensen",
  "Dan Morast",
  "LinkedIn",
  "Facebook",
  "Annat",
] as const;

export const FIELDS: readonly Field[] = [
  { name: "firstname", label: "Förnamn", type: "text", required: true, autocomplete: "given-name", maxLength: 80 },
  { name: "lastname", label: "Efternamn", type: "text", required: true, autocomplete: "family-name", maxLength: 80 },
  { name: "email", label: "E-postadress", type: "email", required: true, autocomplete: "email", maxLength: 254, inputMode: "email" },
  { name: "emailConfirm", label: "Bekräfta e-postadress", type: "email", required: true, autocomplete: "email", maxLength: 254, inputMode: "email" },
  { name: "phone", label: "Telefonnummer", type: "tel", required: true, autocomplete: "tel", maxLength: 30, inputMode: "tel" },
  { name: "company", label: "Företagsnamn", type: "text", required: false, autocomplete: "organization", maxLength: 120 },
  { name: "orgnumber", label: "Organisationsnummer", type: "text", required: false, maxLength: 20 },
  { name: "reference", label: "Referens", type: "select", required: true, maxLength: 40, options: REFERENCE_OPTIONS },
  { name: "billingAddress", label: "Faktureringsadress", type: "text", required: true, autocomplete: "street-address", maxLength: 160 },
  { name: "zipcode", label: "Postnummer", type: "text", required: true, autocomplete: "postal-code", maxLength: 12, inputMode: "numeric" },
  { name: "city", label: "Postort", type: "text", required: true, autocomplete: "address-level2", maxLength: 80 },
  { name: "discountCode", label: "Rabattkod", type: "text", required: false, maxLength: 40 },
];

/** Hidden field that people never fill in. Anything in it marks the submission as spam. */
export const HONEYPOT = "website";

export interface BookableEvent {
  slug: string;
  legacyId?: number;
  title: string;
  dateLabel: string;
  start: string; // YYYY-MM-DD
  time: string;
  place: string;
  price: string;
  booking: "bindande" | "intresseanmalan";
}

export type BookingData = Record<FieldName, string>;

export type ValidationResult =
  | { ok: true; data: BookingData }
  | { ok: false; errors: Partial<Record<FieldName | "event", string>> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9 ()-]{5,}$/;
const ZIP = /^[0-9A-Za-z][0-9A-Za-z -]{1,10}$/;
const ORGNR = /^[0-9]{6}-?[0-9]{4}$/;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value: unknown): string {
  return typeof value === "string" ? value.replace(CONTROL, "").replace(/\s+/g, " ").trim() : "";
}

/** True when the event starts today or later, in Swedish time. */
export function isUpcoming(start: string, now: Date = new Date()): boolean {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm" }).format(now);
  return start >= today;
}

export function validateBooking(
  input: Record<string, unknown>,
  event: BookableEvent | undefined,
  now: Date = new Date(),
): ValidationResult {
  const errors: Partial<Record<FieldName | "event", string>> = {};

  if (!event) {
    errors.event = "Vi hittar inte kurstillfället. Gå tillbaka och välj ett datum i kalendern.";
  } else if (!isUpcoming(event.start, now)) {
    errors.event = "Det här kurstillfället har redan varit. Välj ett annat datum i kalendern.";
  }

  const data = {} as BookingData;
  for (const field of FIELDS) {
    const value = clean(input[field.name]);
    data[field.name] = value;

    if (!value) {
      if (field.required) errors[field.name] = `Fyll i ${field.label.toLowerCase()}.`;
      continue;
    }
    if (value.length > field.maxLength) {
      errors[field.name] = `${field.label} får vara högst ${field.maxLength} tecken.`;
      continue;
    }
    if (field.type === "email" && !EMAIL.test(value)) {
      errors[field.name] = "Skriv e-postadressen som namn@foretag.se.";
    }
    if (field.name === "phone" && !PHONE.test(value)) {
      errors.phone = "Skriv telefonnumret med siffror, till exempel 070-123 45 67.";
    }
    if (field.name === "zipcode" && !ZIP.test(value)) {
      errors.zipcode = "Skriv postnumret, till exempel 118 50.";
    }
    if (field.name === "orgnumber" && !ORGNR.test(value)) {
      errors.orgnumber = "Skriv organisationsnumret som 556600-3868.";
    }
    if (field.options && !field.options.includes(value)) {
      errors[field.name] = `Välj ${field.label.toLowerCase()} i listan.`;
    }
  }

  if (data.email && data.emailConfirm && !errors.email && !errors.emailConfirm
      && data.email.toLowerCase() !== data.emailConfirm.toLowerCase()) {
    errors.emailConfirm = "E-postadresserna är inte likadana.";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips characters that could break out of an e-mail header line. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200);
}

export function bookingEmail(data: BookingData, event: BookableEvent) {
  const kind = event.booking === "intresseanmalan" ? "Intresseanmälan" : "Anmälan";
  const name = `${data.firstname} ${data.lastname}`;
  const subject = headerSafe(`${kind}: ${event.title}, ${event.dateLabel} – ${name}`);

  const rows: [string, string][] = [
    ["Tillfälle", `${event.title}, ${event.dateLabel}, ${event.time}, ${event.place}`],
    ...(event.price ? [["Pris", event.price] as [string, string]] : []),
    ...FIELDS.filter((f) => f.name !== "emailConfirm").map((f) => [f.label, data[f.name] || "–"] as [string, string]),
  ];

  const text = [`${kind} via pulsanalys.se`, "", ...rows.map(([k, v]) => `${k}: ${v}`), "",
    "Svara på det här mejlet för att svara deltagaren."].join("\n");

  const html = `<!doctype html><html lang="sv"><body style="font-family:Arial,sans-serif;color:#222">
<p>${kind} via pulsanalys.se</p>
<table cellpadding="6" style="border-collapse:collapse">
${rows.map(([k, v]) => `<tr><th align="left" style="border-bottom:1px solid #ddd">${escapeHtml(k)}</th><td style="border-bottom:1px solid #ddd">${escapeHtml(v)}</td></tr>`).join("\n")}
</table>
<p>Svara på det här mejlet för att svara deltagaren.</p>
</body></html>`;

  return { subject, text, html, replyTo: { name: headerSafe(name), email: data.email } };
}
