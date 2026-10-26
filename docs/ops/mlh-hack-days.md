# Hack 876 as an MLH Hack Day: organizer runbook

Hack 876 is an official MLH Hack Day: Saturday 20 February 2027, Spanish Court Hotel, 1 St Lucia Avenue, Kingston 5, Jamaica, all times Jamaica time (UTC-5). This runbook covers what the organizers do before, on and after the day. Site copy lives in `src/data/event.ts` (`registration`, `mlh`, `cloudflareChallenge`, `venue`, `incidentLead`, `venueSafety`).

> **Participant data.** All registration, check-in, attendance and submission data stays in MLH OrganizerHQ. Never export it into this repo, its tests, its docs or any generated PDF. Most participants are minors.

## Links

| What | Link |
| --- | --- |
| MLH event page | https://events.mlh.com/events/15649-hack-876 |
| Registration (students) | https://mlh.link/hack-876 |
| OrganizerHQ | Link from the MLH organizer invite. <!-- TODO(owner): add the OrganizerHQ dashboard URL from the invite. --> |
| Project submissions (Challenges page) | https://www.mlh.com/events/hack-876/challenges |
| MLH Code of Conduct | https://mlh.io/code-of-conduct (also at https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md) |
| MLH incident email | incidents@mlh.io |
| MLH Standard Hackathon Rules | https://github.com/MLH/mlh-policies/blob/main/standard-hackathon-rules.md |
| Cloudflare partner page | https://www.mlh.com/partners/cloudflare |
| MLH Hack Day guide | https://hackdays-guide.mlh.com |
| Hack 876 questions | info@hack876.com |

## Decisions in force

- **Registration:** students register themselves on MLH with a free MyMLH account. There is no school nomination; schools can recommend Hack 876 and support their students. `/apply` on the site redirects to the registration link.
- **Date:** Saturday 20 February 2027 is final. Nothing on the site says "tentative" about the date or venue.
- **Format:** entirely in person, free for students. Check-in is at the doors only: no remote or advance check-in.
- **Devices:** students bring their own laptop and charger. Hack 876 provides no laptops and has no borrowing scheme.
- **Branding:** "An official MLH Hack Day", with the official, unaltered MLH logo. No MLH Trust Badge (that is for MLH Member Events).
- **Cloudflare:** event partner for the "Best Use of Cloudflare" challenge, not a paying sponsor. Its official press-kit logo is used, unaltered, with Cloudflare's written permission.
- **Prizes:** only prizes provided by the organizers and local sponsors, labelled tentative. Nothing from MLH or Cloudflare is promised until confirmed in writing.
- **Submissions:** only on the MLH Challenges page. One submission per presenting team, selecting every challenge it is eligible for, made by one team member signed in with MyMLH after check-in.
- **Contact:** info@hack876.com.

## Before the event

- [ ] Add dietary and accessibility questions to the OrganizerHQ registration form.
- [ ] Add the parent or guardian consent step: who sends the form, when, and that it is collected at the door at check-in. The form covers guardian permission for the student's MyMLH account and data sharing, and photo consent.
- [ ] Confirm the room and arrival instructions, then set `venue.room` and `venue.arrival` in `src/data/event.ts`.
- [ ] Name the on-site incident lead (name and phone/WhatsApp) and set `incidentLead` in `src/data/event.ts`. MLH requires a named lead.
- [ ] Venue safety: exits, assembly point, first-aid location and first aider, accessibility arrangements (step-free entry, accessible toilets) and the nearest hospital. Set `venueSafety` in `src/data/event.ts`.
- [ ] Confirm the schedule in OrganizerHQ matches the site's `schedule` in `src/data/event.ts`.
- [ ] Set the Submissions window in OrganizerHQ to open and close at the schedule's times (open 3:00 PM, close 4:00 PM, before demos at 4:15 PM), with late submissions off and reminders 60 and 30 minutes before close.
- [ ] Confirm in writing with MLH: Cloudflare credits, prize format and receipt deadlines (not received yet).
- [ ] Confirm in writing with MLH that minors are eligible for the Best Use of Cloudflare challenge.
- [x] Get permission to use the Cloudflare logo. Written permission received; the press-kit PNG is `public/sponsors/cloudflare-logo.png`.
- [ ] Decide what happens past 80 registrations (waitlist or close registration), whether registration is open beyond the participating schools, and any registration close date (`registration.closes`).
- [ ] Approve the tie rule on the Event Rules page (a proposal: Execution scores, then a majority vote).
- [ ] Owner task, separate from the site: an Instagram welcome post for MLH and Cloudflare as event partners.
- [ ] Prepare the photo-consent list for the photographer (students who must not be photographed).
- [ ] Brief the judges: the six criteria, conflict-of-interest recusal and the tie rule.

## On the day

- [ ] Check-in at the doors, in person only: OrganizerHQ check-in, school ID, signed consent form.
- [ ] Opening: welcome, the Code of Conduct and both incident contacts (organizers and incidents@mlh.io), MLH, the Best Use of Cloudflare challenge, and how to submit.
- [ ] Lunch at 12:00 PM, with snacks and water through the day. No alcohol.
- [ ] Submission reminders 60 and 30 minutes before close. Submissions close at the end of hacking, before demos.
- [ ] Demos and judging, with conflict-of-interest recusals.
- [ ] Closing and awards.
- [ ] Photos only of students on the consent list. Never a student's name with their photo without permission.

## After the event

- [ ] Confirm submissions and challenge selections in OrganizerHQ.
- [ ] Send the winners to MLH by their process.
- [ ] Complete the MLH event summary and feedback form by the deadline. <!-- TODO(owner): add the deadline. -->
- [ ] File the reimbursement in Ramp with itemized receipts. Reimbursable: food, snacks and non-alcoholic drinks only, US$4.20 per hacker for Jamaica, capped at 50 hackers. Reimbursement is not a promise of prizes, swag or other support.
- [ ] Do not promise prizes or swag from MLH.
- [ ] Archive the event.
- [ ] Remind teams that their code must stay public for their project to remain prize-eligible.

## MLH requirements covered on the site

| Requirement | Where |
| --- | --- |
| Date, start and end time, time zone | `src/components/sections/Attend.tsx` (Event details), `src/components/sections/Schedule.tsx` |
| Venue name and address | Event details; venue card in `Attend.tsx` |
| Room and arrival instructions | Event details and Parents (shown as to be shared until `venue.room` / `venue.arrival` are set) |
| Format: in person only | Event details; FAQ "Is it online?" |
| Cost: free for students | Event details; FAQ "Is Hack 876 free?" |
| Contact | Event details; footer; FAQ |
| Audience, age and parental consent | Event details; Parents section |
| Food and drink | Event details; FAQ; Parents (`foodNote`) |
| What to bring (own laptop) | Event details; FAQ "Do I need a laptop?" and "What should I bring?" |
| Code of Conduct | `/code-of-conduct` (adopts the MLH Code of Conduct, both report contacts); Event details |
| Accessibility | Event details; school hub FAQ |
| MyMLH account | Every register button; Event details; FAQ "How do I register?" |
| Submissions only on the Challenges page | `/rules#submitting`; FAQ; school hub FAQ |
| Standard Hackathon Rules | `/rules` intro |
| "An official MLH Hack Day", official logo, no Trust Badge | Hero, footer, link-preview image; Sponsors section |
