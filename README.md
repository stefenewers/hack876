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

Applications (`/apply`) and partner enquiries (`/partner`) are validated in the browser and again on the server (`src/lib/application.ts`), then saved by `src/lib/submissions.ts`:

- **`SUBMISSIONS_WEBHOOK_URL` set** → each submission is POSTed as JSON (optional `SUBMISSIONS_WEBHOOK_SECRET` sent as a Bearer token). Use this in production.
- **Not set** → appended to `.data/applications.jsonl` / `.data/partners.jsonl` (git-ignored). Good for local review and self-hosting; won't persist on serverless hosts.
