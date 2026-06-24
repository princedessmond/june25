// ============================================
// CLIENT-SIDE FORM PROTECTION
// Lightweight anti-spam that needs NO accounts and NO keys:
//   1. Honeypot field   - bots fill hidden inputs that humans never see
//   2. Timing trap      - bots submit forms instantly; humans take a few seconds
//   3. Submit cooldown  - per-device rate limiting to stop rapid repeat spam
// Plus an OPTIONAL Google reCAPTCHA v3 hook that stays OFF until you add keys.
// ============================================

// ---- Google reCAPTCHA v3 (OPT-IN, OFF BY DEFAULT) --------------------------
// reCAPTCHA v3 is ENABLED. The browser loads Google's script and attaches a
// token (per action) to every form submission as `recaptchaToken`.
//
// IMPORTANT: a site key alone does NOT block spam. The token MUST be verified
// SERVER-SIDE with your SECRET key before a submission is trusted. For this
// project that means adding verifyRecaptcha() to the Google Apps Script that
// receives the forms — see docs/RECAPTCHA_SETUP.md. Until that server check is
// in place, reCAPTCHA runs but enforces nothing; the honeypot + timing trap +
// per-device cooldown below are what actively stop bots in the meantime.
//
// The SITE KEY is public and safe to commit. NEVER put the SECRET key here —
// it belongs only in the Apps Script Script Properties.
const RECAPTCHA_ENABLED = true;
const RECAPTCHA_SITE_KEY = '6LfChi8tAAAAAP_NXHlaYxdLzlgXSFoi9j5ymtgy';

if (RECAPTCHA_ENABLED &&
    RECAPTCHA_SITE_KEY &&
    RECAPTCHA_SITE_KEY !== 'YOUR_RECAPTCHA_V3_SITE_KEY') {
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_SITE_KEY;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
}

// Returns a reCAPTCHA token when enabled, otherwise an empty string.
async function getRecaptchaToken(action) {
    if (!RECAPTCHA_ENABLED || typeof grecaptcha === 'undefined') return '';
    try {
        await new Promise(resolve => grecaptcha.ready(resolve));
        return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: action });
    } catch (e) {
        console.warn('reCAPTCHA token error:', e);
        return '';
    }
}

// ---- Honeypot --------------------------------------------------------------
// A hidden input (.hp-field) that real users never see or fill. If it has a
// value, a bot filled it — drop the submission silently.
function isHoneypotFilled(form) {
    const hp = form.querySelector('.hp-field input');
    return !!(hp && hp.value.trim() !== '');
}

// ---- Timing trap -----------------------------------------------------------
// Record when each form became visible; reject submissions that arrive faster
// than a human could realistically fill the form.
const formRenderTimes = {};
function markFormRendered(formId) {
    formRenderTimes[formId] = Date.now();
}
function submittedTooFast(formId, minMs) {
    minMs = minMs || 2500;
    const t = formRenderTimes[formId];
    return t ? (Date.now() - t) < minMs : false;
}

// ---- Per-device submit cooldown (rate limiting) ----------------------------
function checkSubmitCooldown(key, cooldownMs) {
    const last = parseInt(localStorage.getItem('cooldown_' + key) || '0', 10);
    const now = Date.now();
    if (now - last < cooldownMs) {
        return { allowed: false, wait: Math.ceil((cooldownMs - (now - last)) / 1000) };
    }
    return { allowed: true, wait: 0 };
}
function recordSubmit(key) {
    localStorage.setItem('cooldown_' + key, Date.now().toString());
}

// ---- Combined guard --------------------------------------------------------
// Call at the top of each submit handler. Returns true if the submission
// should proceed, false if it was blocked (and notifies the user when useful).
function passesAntiSpam(form, key, cooldownMs) {
    if (isHoneypotFilled(form)) {
        console.warn('Honeypot triggered — submission blocked.');
        return false; // silently drop suspected bot
    }
    if (submittedTooFast(form.id)) {
        alert('Please take a moment to fill in the form before submitting.');
        return false;
    }
    const cd = checkSubmitCooldown(key, cooldownMs);
    if (!cd.allowed) {
        alert('Please wait ' + cd.wait + ' second(s) before submitting again.');
        return false;
    }
    return true;
}

// Mark forms as rendered once the DOM is ready (starts the timing trap clock).
document.addEventListener('DOMContentLoaded', function () {
    ['registrationForm', 'transportForm', 'legalForm', 'policeReportForm'].forEach(function (id) {
        if (document.getElementById(id)) markFormRendered(id);
    });
});
