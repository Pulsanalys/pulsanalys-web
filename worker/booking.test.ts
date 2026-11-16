import assert from "node:assert/strict";
import { test } from "node:test";
import { bookingEmail, isUpcoming, validateBooking, type BookableEvent } from "./booking.ts";

const event: BookableEvent = {
  slug: "grundutbildning-disc-2026-11-26",
  legacyId: 531,
  title: "Grundutbildning DISC",
  dateLabel: "26–27 november 2026",
  start: "2026-11-26",
  time: "09:00–16:00",
  place: "Online",
  price: "19 900 SEK exkl. moms",
  booking: "bindande",
};

const valid = {
  firstname: "Anna",
  lastname: "Svensson",
  email: "anna@example.se",
  emailConfirm: "Anna@Example.se",
  phone: "070-123 45 67",
  company: "Exempel AB",
  orgnumber: "556600-3868",
  reference: "LinkedIn",
  billingAddress: "Storgatan 1",
  zipcode: "118 50",
  city: "Stockholm",
  discountCode: "",
};

const before = new Date("2026-11-20T10:00:00Z");

test("accepts a complete booking", () => {
  const r = validateBooking(valid, event, before);
  assert.equal(r.ok, true);
});

test("requires the mandatory fields", () => {
  const r = validateBooking({}, event, before);
  assert.equal(r.ok, false);
  if (!r.ok) {
    for (const f of ["firstname", "lastname", "email", "emailConfirm", "phone", "reference", "billingAddress", "zipcode", "city"]) {
      assert.ok(r.errors[f as keyof typeof r.errors], `missing error for ${f}`);
    }
    assert.equal(r.errors.company, undefined);
    assert.equal(r.errors.discountCode, undefined);
  }
});

test("rejects mismatched e-mail addresses", () => {
  const r = validateBooking({ ...valid, emailConfirm: "other@example.se" }, event, before);
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.errors.emailConfirm ?? "", /inte likadana/);
});

test("rejects malformed values", () => {
  const r = validateBooking({ ...valid, email: "anna@", emailConfirm: "anna@", phone: "abc", orgnumber: "12", zipcode: "!" }, event, before);
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.email);
    assert.ok(r.errors.phone);
    assert.ok(r.errors.orgnumber);
    assert.ok(r.errors.zipcode);
  }
});

test("rejects a reference that is not in the list", () => {
  const r = validateBooking({ ...valid, reference: "Hacker" }, event, before);
  assert.equal(r.ok, false);
});

test("rejects over-long input", () => {
  const r = validateBooking({ ...valid, firstname: "a".repeat(81) }, event, before);
  assert.equal(r.ok, false);
});

test("rejects unknown and past events", () => {
  assert.equal(validateBooking(valid, undefined, before).ok, false);
  const after = new Date("2026-11-27T10:00:00Z");
  const r = validateBooking(valid, event, after);
  assert.equal(r.ok, false);
  if (!r.ok) assert.match(r.errors.event ?? "", /redan varit/);
});

test("an event is bookable on its start day in Swedish time", () => {
  assert.equal(isUpcoming("2026-11-26", new Date("2026-11-25T23:30:00Z")), true); // 00:30 in Stockholm on the 26th
  assert.equal(isUpcoming("2026-11-26", new Date("2026-11-26T23:30:00Z")), false); // 00:30 on the 27th
});

test("e-mail escapes HTML and keeps headers on one line", () => {
  const r = validateBooking({ ...valid, firstname: "<b>Anna</b>", company: "A & B <script>" }, event, before);
  assert.equal(r.ok, true);
  if (r.ok) {
    const mail = bookingEmail(r.data, event);
    assert.ok(!mail.html.includes("<script>"));
    assert.ok(mail.html.includes("A &amp; B &lt;script&gt;"));
    assert.ok(!/[\r\n]/.test(mail.subject));
    assert.equal(mail.replyTo.email, "anna@example.se");
    assert.match(mail.subject, /^Anmälan: Grundutbildning DISC, 26–27 november 2026/);
    assert.ok(!mail.text.includes("Bekräfta e-postadress"));
  }
});

test("collapses newlines that could inject headers", () => {
  const r = validateBooking({ ...valid, lastname: "Svensson\r\nBcc: x@evil.test" }, event, before);
  assert.equal(r.ok, true);
  if (r.ok) assert.ok(!/[\r\n]/.test(bookingEmail(r.data, event).subject));
});
