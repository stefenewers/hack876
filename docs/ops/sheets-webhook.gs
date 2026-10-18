/**
 * Hack 876 submissions → Google Sheet.
 *
 * A Google Apps Script web app that receives the JSON the site POSTs to
 * SUBMISSIONS_WEBHOOK_URL (see src/lib/submissions.ts) and appends one row per
 * submission. Each kind of form gets its own tab: "crew", "applications",
 * "partners". Setup: docs/ops/sheets-webhook.md.
 *
 * Apps Script cannot read request headers, so the site also sends the shared
 * secret as `secret` in the body. Set the same value as the script property
 * SECRET (Project Settings → Script properties).
 */

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "Bad JSON" });
  }

  var expected = PropertiesService.getScriptProperties().getProperty("SECRET");
  if (!expected || body.secret !== expected) {
    return json_({ ok: false, error: "Unauthorized" });
  }
  // Never store the secret in the Sheet.
  delete body.secret;

  var kind = String(body.kind || "other").replace(/[^a-z0-9_-]/gi, "") || "other";

  // One writer at a time, so two submissions never race for the same row or column.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(kind) || ss.insertSheet(kind);

    // Header row: created from the first record's keys, extended when new keys appear.
    var lastCol = sheet.getLastColumn();
    var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String) : [];
    var added = Object.keys(body).filter(function (k) {
      return headers.indexOf(k) === -1;
    });
    if (added.length) {
      sheet.getRange(1, headers.length + 1, 1, added.length).setValues([added]);
      headers = headers.concat(added);
      sheet.setFrozenRows(1);
    }

    var row = headers.map(function (h) {
      var v = body[h];
      if (v === undefined || v === null) return "";
      return Array.isArray(v) ? v.join(", ") : typeof v === "object" ? JSON.stringify(v) : v;
    });
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
