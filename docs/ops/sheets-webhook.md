# Submissions roster in Google Sheets

The partner and crew forms (`/partner`, `/crew`) can copy its submissions into a private Google Sheet, one tab per form, through the existing webhook in `src/lib/submissions.ts`. Email to info@hack876.com keeps working alongside it.

> **Keep the Sheet private.** It holds partners' and crew members' names and contact details. Share it only with Stefen and Nadani.
>
> Student registration is on MLH (OrganizerHQ), not this site, so no student data reaches the Sheet. Never export registration data into it.

## Setup

1. **Create the Sheet.** In Google Drive, create a new Google Sheet (for example "Hack 876 submissions"). Share it only with Stefen and Nadani.
2. **Add the script.** In the Sheet, open **Extensions → Apps Script**. Delete the starter code and paste in [`sheets-webhook.gs`](./sheets-webhook.gs). Save.
3. **Set the secret.** In Apps Script, open **Project Settings → Script properties → Add script property**. Name: `SECRET`. Value: a long random string (for example the output of `openssl rand -hex 32`). Don't commit it anywhere.
4. **Deploy as a web app.** Click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (the site has no Google account; the secret is what keeps others out)

   Authorize when asked, then copy the web app URL (it ends in `/exec`).
5. **Point the site at it.** In Vercel → Project → Settings → Environment Variables, add for **Production**:
   - `SUBMISSIONS_WEBHOOK_URL` = the `/exec` URL
   - `SUBMISSIONS_WEBHOOK_SECRET` = the same value as the script's `SECRET`

   Redeploy so the new variables take effect.
6. **Test it.** Submit the `/crew` form (or `/partner`) on the live site. A `crew` (or `partners`) tab should appear with a header row and your row. If nothing arrives:
   - In Apps Script, check **Executions** for errors.
   - `{"ok":false,"error":"Unauthorized"}` means the two secrets don't match.
   - After editing the script, deploy a **new version** (Deploy → Manage deployments → Edit → New version); the URL stays the same.

## How it behaves

- Tabs are named after the form: `crew` and `partners`. A tab is created the first time its form is used.
- The header row comes from the submission's fields. New fields add new columns on the right; old rows simply leave them blank.
- The secret is removed before the row is written.
- The site treats the Sheet as an extra copy. If the webhook fails but the email goes out, the person still sees success.
