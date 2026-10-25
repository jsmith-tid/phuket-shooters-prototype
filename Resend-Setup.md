# Booking enquiry email: current prototype setup

This document records the **implemented and tested** individual enquiry and group-request flows, and what is still needed before unrestricted public use. It is not a production runbook. The existing live site at `phuketshooters.com` and its booking and email systems have not been changed. The prototype domain is `phuket-shooters.com` (with a hyphen).

## Current scope and hosting

- Individual enquiries in English, Thai, Chinese, Arabic and Russian; group requests in English, Thai and Chinese. Group pages remain absent in Arabic and Russian. Both forms use the same staff inbox, sending domain and hosted allowlist. Neither receipt confirms a booking.
- The local Resend endpoint is in `scripts/dev.js` and runs only with the local preview bound to `127.0.0.1`. It is enabled only when both an API key and `RESEND_TEST_INBOX` are configured. Open the site using `http://127.0.0.1:8080/`, not `localhost`, for the local sending test.
- A Cloudflare Worker script now exists in `worker/index.mjs`, with shared validation and email templates in `scripts/booking-email.mjs`. The existing Cloudflare project began as a static-assets-only Worker; the script was deployed before adding runtime variables and secrets. The endpoint is off unless its server-side configuration is complete. A controlled hosted test has succeeded.
- GitHub Pages deploys the generated static `dist/` site. It cannot run either endpoint or read the local API key file. Its forms remain **non-sending**, even after the code is committed and pushed. No Resend secret has been added to GitHub Pages.
- Do not put the API key in this repository, an `.env` file that could be committed, generated HTML/JavaScript, a screenshot, a browser request, or a log. The local key file is outside the repository. `.env.example` contains configuration examples, not credentials.

## Verified sending domain

- Resend shows `mail.phuket-shooters.com` as verified. This is a sending subdomain of the prototype domain, **not** the production domain `phuketshooters.com`.
- Porkbun is the registrar for the prototype domain; its authoritative nameservers are on Cloudflare. The owner completed Resend’s automatic DNS setup using a phone because Cloudflare dashboard sign-in from the computer returned HTTP 403. Do not change Porkbun nameservers or the production domain to work around that local sign-in issue.
- The default sender in `scripts/booking-email.mjs` is `Phuket Shooters <bookings@mail.phuket-shooters.com>`. It may be overridden server-side with `RESEND_FROM_EMAIL`. A verified sending domain authorises outbound mail; it does not by itself create a mailbox. Customer replies are directed to the configured staff/test inbox through `Reply-To`.

## What happens when a consumer sends an enquiry locally

1. The browser validates the required fields and sends them to the local `/api/booking-enquiry` endpoint. The API key stays on the server.
2. The server validates the name, phone, email, party size, date, start/end time, terms acknowledgement and field lengths. It escapes submitted text in the email HTML. The request is limited in size and must come from the local preview origin.
3. Resend receives **two separate messages**: a business notification to the server-configured `RESEND_TEST_INBOX`, with `Reply-To` set to the customer’s entered address; and an acknowledgement to the email entered on the form, with `Reply-To` set to the staff/test inbox. The browser cannot override the staff inbox or sender.
4. The staff subject is `Consumer booking enquiry`; the customer subject and receipt are translated into the selected page language. The acknowledgement says that receipt **does not confirm a booking** and that staff will confirm availability and arrangements separately.
5. Only after Resend accepts both messages does the page show **“Enquiry received”** and the server-validated details: name, phone, email, number of people, date, start time, end time and additional information. The detail values are inserted as text, not HTML. A partial or failed send leaves the form available to retry; matching retries use separate idempotency keys for the two emails to avoid duplicating an accepted message.

Acceptance by Resend is not proof that an email arrived in an inbox. This process does not reserve a place, confirm availability, take payment or create a booking in the existing system. For now, test only with customer email addresses you control.

## Local configuration and verification

Set `RESEND_API_KEY_FILE` to the absolute path of the key file **outside this repository**, set `RESEND_TEST_INBOX` to the intended staff/test recipient, and run `npm run dev`. Alternatively, provide `RESEND_API_KEY` as a server-process environment variable. `RESEND_FROM_EMAIL` is optional; the verified prototype sender above is the default. The project does not automatically load `.env` files. See `README.md` for a PowerShell example.

The owner confirmed a successful browser test after restarting the local server: the consumer notification arrived at the configured staff/test inbox, the acknowledgement arrived at the different email entered in the form, and the confirmation screen appeared. Automated tests cover separate recipients, escaped HTML, server response details, validation, retries and idempotency. The existing build and check commands passed.

**Restart `npm run dev` after editing `scripts/dev.js` or `scripts/booking-email.mjs`.** Node keeps the old server-side code in memory even if `dist/` is rebuilt. A stale server previously sent both messages to the old fixed inbox while the newly built page expected a newer response format. The page now identifies that mismatch instead of claiming the emails were not sent. Do not retry a submission simply because the page reports an out-of-date server; first check the inboxes and restart the process.

## Controlled Cloudflare Worker test

The existing Cloudflare project is a static-assets-only Worker, not Cloudflare Pages. The added `wrangler.jsonc` declares the Worker entrypoint and `dist/` asset directory. Only the three booking API paths (`/api/booking-mode`, `/api/booking-enquiry` and `/api/group-enquiry`) invoke the Worker script first; ordinary pages continue to be served as static assets. The browser checks `/api/booking-mode` on the same origin; on GitHub Pages or an unconfigured Cloudflare deployment the forms remain non-sending.

After the Worker script is deployed, configure `RESEND_API_KEY` as an encrypted Worker secret and set `RESEND_TEST_INBOX`, `BOOKING_ALLOWED_EMAILS` (comma-separated email addresses controlled by the tester), and `BOOKING_EMAIL_ENABLED=true` in the Worker's runtime Variables and Secrets. `RESEND_FROM_EMAIL` is optional. The endpoint accepts only a listed customer email; it will not use a recipient or sender supplied by the browser for the business notification. It also checks same-origin requests, JSON content type, an 8 KiB body limit and the shared field validation. Those checks and the test allowlist do not constitute full public anti-abuse protection.

The dashboard may suggest updating `wrangler.jsonc` after variables are added. Do not copy a secret value into the repository. The config uses `keep_vars: true` so dashboard-managed plain-text test variables survive later `wrangler deploy` runs. Encrypted secrets are retained separately by Cloudflare.

When enabled, submit one consumer enquiry with an allowed address, check the staff/test inbox and customer inbox, and verify the confirmation shows the entered details. Do not test with a real customer's email until the public-release safeguards are agreed. Resend idempotency keys are stable per submission and per email; they protect retries across Worker instances for Resend's 24-hour idempotency window. The local in-memory duplicate map is not durable in Cloudflare and is not relied on as a production store.

On 25 October 2026, the owner submitted a controlled enquiry on the hosted prototype using an allowlisted test customer address. The page showed “Enquiry received” and the entered details. The consumer enquiry email arrived at `salmoni@gmail.com`, and the acknowledgement arrived at the test customer address. This verifies the basic hosted flow and inbox delivery for that test, not unrestricted public readiness or a confirmed booking.

## Before unrestricted public use or production transition

- Keep the Resend key in the encrypted Cloudflare secret and the allowlist enabled during controlled testing. Do not copy the local key file into the deployment artifact.
- Decide the permanent staff recipient and reply address, then configure them as deployment settings. Inform staff before enabling live enquiries. The current `RESEND_TEST_INBOX` name reflects local testing, not a final production inbox.
- Keep the wording as an **enquiry acknowledgement**, not a booking confirmation. Check the existing system’s operational handoff, monitoring and failure handling before accepting public submissions.
- Add suitable public-endpoint protections and policies: abuse/rate limiting, privacy/retention notice, delivery or bounce monitoring, and a review of partial-send and retry behaviour in a multi-instance serverless environment. The current in-memory idempotency map is local-process-only and is not sufficient for distributed production deployment.
- Test real inbox receipt using controlled addresses after hosting is configured. Review all five consumer-page translations before production release.

## Group enquiries: separate decision

The separate `/api/group-enquiry` endpoint validates the group fields and sends two messages: an English staff notification and a customer receipt in English, Thai or Chinese. The receipt and on-page result show submitted details and explicitly say that neither the visit nor coach parking has been reserved. The group request follows the same controlled hosted allowlist and Resend settings as the individual form. Before unrestricted public release, add abuse protection and monitoring, confirm staff handling, and resolve the business questions in `docs/launch-checks.md`.

On 25 October 2026, the owner reported a successful controlled group request on the hosted prototype: the staff and customer messages arrived at their respective addresses, and the confirmation page appeared. The language used for this test was not specified. This confirms the tested submission path, not unrestricted public readiness or a confirmed booking.

## Before opening either form to all visitors

Keep `BOOKING_ALLOWED_EMAILS` in place during prototype testing. Same-origin checks and an email allowlist are controls for the current test, not a public spam defence. An optional Cloudflare Turnstile trial is implemented for both forms: when `TURNSTILE_ENABLED=true` and both widget keys are configured, the Worker checks the token, hostname and form action before calling Resend. A rate-limit binding has an approximate threshold of 10 attempts per submitted email and form type per minute in each Cloudflare location. The feature is off until the owner adds the widget keys and enables it in the Worker settings. See `README.md` for the activation steps. Keep the body and field-length limits, and decide how to handle repeat requests and addresses generating bounces. Test that an invalid/expired challenge and an exceeded rate limit send no email. The email-keyed limit is suitable for the current allowlisted trial, but needs further review before unrestricted public use.

For operations, choose the permanent staff inbox and a named person plus backup to monitor it. Agree a response target, how group requests enter the existing booking record, and how staff explicitly confirm or decline dates and parking. Set alerts for Worker failures, Resend rejections and delivery problems; check both staff and customer inboxes during a controlled launch. Document retry and partial-delivery handling so staff can trace a request without treating an automatic receipt as a confirmed booking. Agree privacy wording, access and retention for contact details, and review the Thai, Chinese, Arabic and Russian receipt copy with stakeholders.
