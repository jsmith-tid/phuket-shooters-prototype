# Booking delivery checks

This covers both individual and group enquiries. **Resend API acceptance is not inbox delivery.** The form shows success after both API sends are accepted; a later bounce can still occur.

## What the Worker records

- Each of the two Resend messages has tags `submission_id`, `journey` (`booking` or `group`) and `recipient_role` (`staff` or `customer`). Resend's email ID and those tags appear in structured Worker logs after API acceptance.
- A provider rejection logs `email_rejected` with the role and HTTP status (or `provider_unavailable`). A one-sided API send logs `email_partial` and which role was accepted. A two-sided failure logs `email_failed`. Unexpected route errors log `worker_error`.
- The signed webhook at `/api/resend-webhook` logs `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.failed`, `email.suppressed` and `email.complained` with the matching tags and email ID. Bounce, failure, suppression and complaint are error level; delay is warning level.
- Application logs intentionally omit names, email addresses, phone numbers, enquiry text and webhook bodies. Cloudflare invocation logs and the Resend dashboard may have their own request metadata; restrict account access accordingly.

## Activate after deploying this code

1. In Resend, create a webhook whose URL is `https://phuket-shooters.com/api/resend-webhook`. Select `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.failed`, `email.suppressed` and `email.complained`. Copy its **signing secret** (begins `whsec_`); keep it out of Git.
2. In Cloudflare **Workers & Pages → phuket-shooters-prototype → Settings → Variables and Secrets**, add `RESEND_WEBHOOK_SECRET` as an encrypted secret and deploy the new version if prompted. It is distinct from `RESEND_API_KEY`. The endpoint returns 503 until this is set.
3. Check **Worker → Observability → Logs** for `service=booking_delivery` and **Observability → Issues** for error occurrences. The checked-in Wrangler config enables full Worker logs and Issues. If a dashboard setting or deployment overrides the config, verify both are enabled there. If Wrangler reports an unsupported `observability.issues` property, upgrade to Wrangler 4.134.0 or newer before deploying.
4. In Cloudflare **Observability → Alerts**, create an email destination and a monitor or Issues automation for new Worker Issues. Test the notification. Route it to a named technical owner and backup; logs without a viewed dashboard or delivered alert do not notify anyone. Set a check cadence for Resend's Emails and Webhooks dashboards, especially while the prototype is allowlisted.

Do a controlled test with an allowlisted address: send one individual and one group enquiry; confirm two `email_accepted` entries per submission, then two `email.delivered` entries carrying the same `submissionId` and different roles. Use a Resend test bounce address or dashboard webhook test event only if it is compatible with the current allowlist and does not reach a real customer. Confirm a delivery failure appears as an Issue/alert, not just a log. A synthetic signed webhook test in the automated suite verifies signature rejection and safe event logging; it does not prove the live webhook or alert destination is configured.

## Handling a partial send or bounce

1. Search Cloudflare Worker logs for the `submissionId` from `email_partial` or the `emailId` from a delivery event. The `staffAccepted` and `customerAccepted` flags say which API call succeeded. Use the corresponding email ID in Resend to inspect delivery status; do not infer delivery from API acceptance.
2. If the staff email was accepted and the customer copy failed, check the staff inbox and contact the visitor manually if needed. If only the customer copy was accepted, find the customer's email in Resend using its ID and recover the request through authorized support channels; the customer receipt explicitly does not confirm a booking. Do not treat either partial state as a confirmed booking.
3. A retry from the unchanged form reuses the submission ID and separate per-role Resend idempotency keys for 24 hours. Compare IDs and provider status before any manual resend; beyond that window, do not assume automatic deduplication. Worker memory is not a durable delivery ledger.
4. For a bounce/suppression, investigate the Resend reason in its dashboard, correct the contact route where possible, and use the already available direct contact options. Do not email repeatedly to a bounced address.

**Operational limit:** This is a searchable log and alert path, not a durable per-request database or guaranteed delivery reconciliation. The live Resend webhook, Cloudflare secret and notification destination require account setup after the code deploy. Before public use, assign monitoring ownership and retention, then test a real alert end to end.
