# Booking enquiry abuse controls

This is the current pre-public policy for the Cloudflare-hosted individual and group enquiry endpoints. The test-email allowlist remains enabled. Removing it is a separate release decision.

## Controls in the Worker

1. Require the configured sending key, staff inbox and non-empty test-email allowlist. When Turnstile is enabled, require its site key, secret and both rate-limit bindings; an incomplete setup disables sending.
2. Check same-origin requests, JSON type, the 8 KiB body limit, server-side field validation and the test-email allowlist.
3. Use Cloudflare's `CF-Connecting-IP` for a shared **12 attempts per client IP per 60 seconds** ceiling. The same counter covers both forms and all entered email addresses. A missing client-IP header or limiter error fails closed.
4. Use a shared **4 attempts per entered email per 60 seconds** ceiling across both forms, then verify the Turnstile token, hostname and form action on the server before contacting Resend.
5. Return HTTP 429 with `Retry-After: 60` when either ceiling is exceeded. The form keeps entered details, shows a wait-and-retry message and offers phone or WhatsApp as an alternative.

The limits apply to attempts that reach the limiter, including invalid Turnstile tokens. The test allowlist is checked first, so a non-allowlisted address cannot use the sending endpoint or consume these counters. The Worker does not use a visitor-supplied `X-Forwarded-For` value. It does not log submitted email addresses or client IPs in application code.

## Limits and release checks

Cloudflare [Worker rate-limit counters](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) are approximate and separate by Cloudflare location. They are not a strict worldwide email quota. A hotel, coach Wi-Fi or mobile network may put unrelated visitors behind one IP; the IP ceiling is therefore a backstop, not a measure of one person's activity. Turnstile, input validation and the fixed staff inbox remain additional controls.

Before removing the allowlist:

- Deploy the new binding and confirm `/api/booking-mode` remains enabled on Cloudflare. If it becomes disabled, check the binding configuration before testing submissions.
- Test both forms with controlled addresses and check staff and customer inboxes. Test missing/invalid Turnstile tokens and rate-limit responses without sending real customer mail. The automated tests use fake Resend responses; the live thresholds have not yet been exercised.
- Review 429 frequency in Workers Logs/Observability and shared-IP false positives on mobile, plus Resend rejections, bounces and delivery costs. Adjust the two thresholds from evidence, while preserving direct phone and WhatsApp contact.
- Agree monitoring, privacy/retention wording and the permanent staff inbox. Keep Turnstile required when a future code change permits unrestricted customer email addresses.

See [Resend-Setup.md](../Resend-Setup.md) for the sending flow and [launch-checks.md](launch-checks.md) for remaining group-booking decisions.
