import assert from "node:assert/strict";
import { test } from "node:test";
import "../../scripts/ts-resolve.mjs";

/* Confirmation emails: event facts from event.ts, never the person's free text, HTML escaped. */

const { crewConfirmation, partnerConfirmation } = await import("./confirmations.ts");
const { eligibility, event, eventWhen } = await import("../data/event.ts");

const partner = {
  name: "Marcia  Brown-Lewis",
  organization: "Island Ventures Ltd",
  email: "marcia@example.com",
  phone: "",
  message: "We would love to sponsor the prizes. PRIVATE-NOTE-123",
};

test("partner confirmation: subject and greeting", () => {
  const c = partnerConfirmation(partner);
  assert.equal(c.subject, "Thanks for reaching out to Hack 876");
  assert.match(c.text, /^Hi Marcia,/);
  assert.match(c.html, /Hi Marcia,/);
});

test("partner confirmation: event details come from event.ts", () => {
  const c = partnerConfirmation(partner);
  for (const body of [c.text, c.html]) {
    assert.ok(body.includes(`for ${eligibility.maxHackers} secondary-school students`), "student count");
    assert.ok(body.includes(`${eventWhen.long}${eventWhen.note}`), "event date");
    assert.ok(body.includes("Island Ventures Ltd"), "organisation");
  }
  assert.ok(c.text.includes(`The Hack 876 team · ${event.siteUrl}`));
  assert.ok(c.text.includes(`reply from ${event.contactEmail} within 2 business days`));
});

test("partner confirmation: the booking link", () => {
  const c = partnerConfirmation(partner);
  assert.ok(event.bookingUrl, "event.bookingUrl is set");
  assert.ok(c.text.includes(`grab a time here: ${event.bookingUrl}`));
  assert.ok(c.html.includes(`href="${event.bookingUrl}"`));
});

test("partner confirmation never repeats the message", () => {
  const c = partnerConfirmation(partner);
  for (const body of [c.subject, c.text, c.html]) {
    assert.doesNotMatch(body, /PRIVATE-NOTE-123|sponsor the prizes/);
  }
});

test("partner confirmation escapes HTML", () => {
  const c = partnerConfirmation({ name: "<script>alert(1)</script> Smith", organization: `Smith & Sons <b>"Ltd"</b>` });
  assert.doesNotMatch(c.html, /<script>|<b>/);
  assert.ok(c.html.includes("&#60;script&#62;"));
  assert.ok(c.html.includes("Smith &#38; Sons &#60;b&#62;&#34;Ltd&#34;&#60;/b&#62;"));
});

test("crew confirmation still carries the event facts", () => {
  const c = crewConfirmation("Andre", "Freelance", "Steady", "~3–5 hrs/month");
  assert.equal(c.subject, "You’re on the Hack 876 crew list");
  assert.ok(c.text.startsWith("Hi Andre,\n\nThanks for raising your hand for Hack 876,"));
  assert.ok(c.text.includes(`${eventWhen.long}${eventWhen.note}`));
});
