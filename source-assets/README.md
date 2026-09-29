# Source assets

Original photos and logos, kept out of `public/` so they are never served by the site.

- `campus-photos/` — Hillel Academy reference photos (inspiration for the illustrated campus; not used directly).
- `school-logos/` — original crests. Trimmed web copies live in `public/schools/`.
- `sponsor-logos/` — original logos from potential sponsors. Web copies live in `public/sponsors/` and only render when `confirmed: true` in `src/data/event.ts`.

To add a new logo: drop the original here, then export a trimmed copy (≤360px) into `public/schools/` or `public/sponsors/`.
