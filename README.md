# Hack 876

Website for Hack 876, a one-day secondary-school hackathon in Kingston, Jamaica.

Next.js (App Router) · TypeScript · Tailwind CSS v4. No animation library. Motion is CSS + a few small `requestAnimationFrame` loops, all respecting `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test           # validation unit tests (node --test)
npm run build
```

## Updating content

Almost everything lives in **`src/data/event.ts`**:

| What | Where | Notes |
| --- | --- | --- |
| Date | `event.date` / `event.dateLabel` | `null` shows “Date TBA” |
| Contact email, socials | `event.contactEmail`, `event.socials` | hidden until set |
| Venue | `venue` | set `confirmed: true` to drop the “Proposed” label |
| Schools + crests | `schools`, `schoolLogos` | crests live in `public/schools/` (St. Andrew is missing one) |
| Application status | `applications.status` | `"open" \| "coming-soon" \| "closed"` |
| Schedule | `schedule` | `highlight: true` makes a row pop |
| Tracks, principles, judging | `tracks`, `principles`, `judging` | |
| Judges / speakers / mentors | `people` | **only `confirmed: true` renders** |
| Prizes | `prizes` | `reward: null` shows “Prize announced soon” |
| Sponsors | `sponsors` | **only `confirmed: true` renders** |
| FAQ, parents info | `faqs`, `parents` | `pending: true` adds a “details coming” tag |

## Form submissions

Applications (`/apply`), partner enquiries (`/partner`) and crew sign-ups (`/crew`) are validated in the browser and again on the server (`src/lib/application.ts`, `src/lib/crew.ts`), then delivered by `src/lib/submissions.ts`:

- **Email (production).** Set `SMTP_USER` (the Google Workspace address, `info@hack876.com`) and `SMTP_PASS` (a Google app password for that account). Each submission is emailed to `info@hack876.com`, with Reply-To set to the person who wrote in. Optional: `SUBMISSIONS_EMAIL_TO`, `SMTP_HOST`, `SMTP_PORT`. Partner enquiries and crew sign-ups also send the person a short confirmation from the same account (`src/lib/confirmations.ts`), with Reply-To `info@hack876.com`. A partner gets the next step (a reply within 2 business days) and the booking link from `event.bookingUrl`. Confirmations never repeat what the person wrote, and if one fails to send, the form still shows success because the submission is already saved. In the notification to `info@`, a partner's email, phone and organisation come first.
- **Webhook (optional, in addition).** `SUBMISSIONS_WEBHOOK_URL`, with an optional `SUBMISSIONS_WEBHOOK_SECRET` sent as a Bearer token and as `secret` in the JSON body. [`docs/ops/sheets-webhook.md`](docs/ops/sheets-webhook.md) sets this up as a private Google Sheet roster, one tab per form. It copies `/apply` submissions (students' details) too, so keep the Sheet private.
- **Local file.** With neither set and outside Vercel, submissions are appended to `.data/applications.jsonl`, `.data/partners.jsonl` or `.data/crew.jsonl` (git-ignored).
- **Crew invite code.** `CREW_INVITE_CODE` gates `/crew` (see below). While it is unset, the crew form is closed.

If nothing can be delivered, the form tells the person to email `info@hack876.com`, and the submission is written to the server log. Treat that as best-effort only: Vercel Hobby keeps runtime logs for about an hour.

## Crew sign-up (`/crew`)

An unlisted, invite-only form for the volunteers in the Hack 876 Crew WhatsApp community. It is not in the nav, footer or sitemap, and it is noindex.

- **Share the link** in the WhatsApp group as `https://www.hack876.com/crew?k=<code>`, where `<code>` is the value of `CREW_INVITE_CODE`. Without the code (or with a wrong one), the page asks for it.
- **Rotate the code** by changing `CREW_INVITE_CODE` in Vercel and redeploying. Old links stop working; post the new one.
- **Submissions** go to `info@hack876.com` (subject `Crew: Name (Company) · Capacity`), and to the Google Sheet's `crew` tab if the webhook is set up. Each person gets a confirmation email asking them to reply with any changes.
