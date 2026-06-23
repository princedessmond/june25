# reCAPTCHA v3 Setup

The front end is **already wired and enabled**:

- `security.js` has `RECAPTCHA_ENABLED = true` and the **Site Key** set.
- A reCAPTCHA token is fetched per action and attached to every form
  submission as `recaptchaToken` (actions: `register`, `transport`, `legal`,
  `police_alert`).

> ⚠️ **A Site Key alone does not stop spam.** reCAPTCHA only blocks bots once
> the token is **verified server-side with your Secret Key**. Until you complete
> Step 2 below, the token is collected but not enforced — the honeypot, timing
> trap, and per-device cooldown are what actively protect the forms in the
> meantime.

---

## Step 1 — Keys (done for the Site Key)

- Site Key (public, in `security.js`): `6LfChi8tAAAAAP_NXHlaYxdLzlgXSFoi9j5ymtgy`
- **Secret Key**: keep this private. It goes **only** into the Apps Script
  Script Properties (Step 2) — never in this repo.

Manage keys at: https://www.google.com/recaptcha/admin
Make sure your live domain **and** `localhost` are listed under the key's
allowed domains, or tokens will fail.

---

## Step 2 — Verify the token in Google Apps Script

1. Open your Apps Script project (the one whose Web App URL is used in
   `google-sheets-config.js`).
2. **Project Settings → Script Properties → Add property**
   - Name: `RECAPTCHA_SECRET`
   - Value: *your Secret Key*
3. Add this helper and call it at the top of `doPost`, **before** writing rows:

```javascript
function verifyRecaptcha(token) {
  if (!token) return false;
  const secret = PropertiesService.getScriptProperties().getProperty('RECAPTCHA_SECRET');
  const res = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token },
    muteHttpExceptions: true
  });
  const result = JSON.parse(res.getContentText());
  // v3 returns a score 0.0 (bot) – 1.0 (human). 0.5 is a reasonable threshold.
  return result.success === true && result.score >= 0.5;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  if (!verifyRecaptcha(data.recaptchaToken)) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, reason: 'failed-captcha' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ... existing code that appends the row to the sheet ...
}
```

4. **Deploy → Manage deployments → Edit → New version** so the change goes live.

---

## How it behaves

- The site posts with `mode: 'no-cors'`, so the browser can't read the response.
  That's fine: enforcement is server-side. A low-score/bot submission simply
  **never gets written to the sheet**.
- The user does **not** see a rejection message (by design, given `no-cors`).
  If you ever want users to see a "blocked" message, you'd need to drop
  `no-cors` and return proper CORS headers from Apps Script — a larger change.

## Tuning

- Too many real people blocked → lower the threshold (e.g. `0.3`).
- Too much spam getting through → raise it (e.g. `0.7`).
