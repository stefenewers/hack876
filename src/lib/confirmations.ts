import { eligibility, event, eventWhen } from "../data/event";

/*
 * Confirmation emails sent to the person who filled in a form, by
 * sendConfirmation() in submissions.ts. Plain text plus simple inline-styled
 * HTML. Event facts come from event.ts. They never repeat a person's
 * free-text answers back to them.
 */

export type Confirmation = { subject: string; text: string; html: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const P = "margin:0 0 14px;font-size:16px;line-height:1.5;color:#141716";
const LINK = "color:#0a7a3e";
const siteLink = () => `<a href="${event.siteUrl}" style="${LINK}">${event.siteUrl.replace(/^https?:\/\//, "")}</a>`;
const when = () => eventWhen.long;
const theEvent = () => `Hack 876, the free one-day hackathon for ${eligibility.maxHackers} secondary-school students in Kingston on ${when()}`;
const firstWord = (name: string) => name.trim().split(/\s+/)[0] ?? "";

/** /crew: the volunteer sign-up. */
export function crewConfirmation(first: string, organization: string, capacityLabel: string, hours: string): Confirmation {
  const next = "Stefen or Nadani will message you on WhatsApp within a week to find the right fit.";
  const change = "Want to change anything? Just reply to this email.";
  const text = [
    `Hi ${first},`,
    "",
    `Thanks for raising your hand for ${theEvent()}.`,
    "",
    "Here’s what we have:",
    `Company: ${organization}`,
    `Capacity: ${capacityLabel} (${hours})`,
    "",
    `What happens next: ${next}`,
    "",
    change,
    "",
    "Thank you,",
    `The Hack 876 team · ${event.siteUrl}`,
  ].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
<p style="${P}">Hi ${esc(first)},</p>
<p style="${P}">Thanks for raising your hand for ${esc(theEvent())}.</p>
<p style="${P}"><strong>Here’s what we have</strong><br>Company: ${esc(organization)}<br>Capacity: ${esc(capacityLabel)} (${esc(hours)})</p>
<p style="${P}"><strong>What happens next:</strong> ${next}</p>
<p style="${P}">${change}</p>
<p style="${P}">Thank you,<br>The Hack 876 team · ${siteLink()}</p>
</div>`;
  return { subject: "You’re on the Hack 876 crew list", text, html };
}

/**
 * /partner: an enquiry from a company or organisation. The form has no
 * "type of support" field, so the summary confirms the organisation and that
 * the message arrived, without quoting it.
 */
export function partnerConfirmation(partner: { name: string; organization: string }): Confirmation {
  const first = firstWord(partner.name);
  const inbox = event.contactEmail ?? "info@hack876.com";
  const booking = event.bookingUrl;
  const next = `Stefen or Nadani will reply from ${inbox} within 2 business days.`;
  const sooner = booking ? `If you’d like to talk sooner, grab a time here: ${booking}` : "";
  const add = "Want to add anything? Just reply to this email.";
  const received = "received, and the team will read it in full.";
  const text = [
    `Hi ${first},`,
    "",
    `Thank you for your interest in supporting ${theEvent()}.`,
    "",
    "Here’s what we have:",
    `Organisation: ${partner.organization}`,
    `Your message: ${received}`,
    "",
    `What happens next: ${next}${sooner ? ` ${sooner}` : ""}`,
    "",
    add,
    "",
    "Warm regards,",
    `The Hack 876 team · ${event.siteUrl}`,
  ].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
<p style="${P}">Hi ${esc(first)},</p>
<p style="${P}">Thank you for your interest in supporting ${esc(theEvent())}.</p>
<p style="${P}"><strong>Here’s what we have</strong><br>Organisation: ${esc(partner.organization)}<br>Your message: ${received}</p>
<p style="${P}"><strong>What happens next:</strong> ${esc(next)}${
    booking ? ` If you’d like to talk sooner, grab a time here: <a href="${esc(booking)}" style="${LINK}">${esc(booking.replace(/^https?:\/\//, ""))}</a>` : ""
  }</p>
<p style="${P}">${add}</p>
<p style="${P}">Warm regards,<br>The Hack 876 team · ${siteLink()}</p>
</div>`;
  return { subject: "Thanks for reaching out to Hack 876", text, html };
}
