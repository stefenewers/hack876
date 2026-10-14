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

Applications (`/apply`) and partner enquiries (`/partner`) are validated in the browser and again on the server (`src/lib/application.ts`), then delivered by `src/lib/submissions.ts`:

- **Email (production).** Set `SMTP_USER` (the Google Workspace address, `info@hack876.com`) and `SMTP_PASS` (a Google app password for that account). Each submission is emailed to `info@hack876.com`, with Reply-To set to the person who wrote in. Optional: `SUBMISSIONS_EMAIL_TO`, `SMTP_HOST`, `SMTP_PORT`.
- **Webhook (optional, in addition).** `SUBMISSIONS_WEBHOOK_URL`, with an optional `SUBMISSIONS_WEBHOOK_SECRET` sent as a Bearer token.
- **Local file.** With neither set and outside Vercel, submissions are appended to `.data/applications.jsonl` / `.data/partners.jsonl` (git-ignored).

If nothing can be delivered, the form tells the person to email `info@hack876.com`, and the submission is written to the server log so it can be recovered from Vercel's logs.
