# Consumer booking email: current prototype setup

This document records the **implemented and locally tested** consumer enquiry flow, the owner’s later changes to the original fixed-inbox test brief, and what is still needed before hosted use. It is not a production runbook. The existing live site at `phuketshooters.com` and its booking and email systems have not been changed. The prototype domain is `phuket-shooters.com` (with a hyphen).

## Current scope and hosting

- Consumer enquiries only. The separate English, Thai and Chinese tour-operator/group-request form still produces an in-page preview; it sends no email or network request, stores no data and confirms no booking. Arabic and Russian have no group-request pages.
- The Resend endpoint is in `scripts/dev.js` and runs only with the local preview bound to `127.0.0.1`. It is enabled only when both an API key and `RESEND_TEST_INBOX` are configured. Open the site using `http://127.0.0.1:8080/`, not `localhost`, for the sending test.
- GitHub Pages deploys the generated static `dist/` site. It cannot run this Node endpoint or read the local API key file. The published consumer form therefore remains **non-sending**, even after the code is committed and pushed. No Resend secret has been added to GitHub Pages.
- Do not put the API key in this repository, an `.env` file that could be committed, generated HTML/JavaScript, a screenshot, a browser request, or a log. The local key file is outside the repository. `.env.example` contains configuration examples, not credentials.

## Verified sending domain

- Resend shows `mail.phuket-shooters.com` as verified. This is a sending subdomain of the prototype domain, **not** the production domain `phuketshooters.com`.
- Porkbun is the registrar for the prototype domain; its authoritative nameservers are on Cloudflare. The owner completed Resend’s automatic DNS setup using a phone because Cloudflare dashboard sign-in from the computer returned HTTP 403. Do not change Porkbun nameservers or the production domain to work around that local sign-in issue.
- The default sender in `scripts/booking-email.js` is `Phuket Shooters <bookings@mail.phuket-shooters.com>`. It may be overridden server-side with `RESEND_FROM_EMAIL`. A verified sending domain authorises outbound mail; it does not by itself create a mailbox. Customer replies are directed to the configured staff/test inbox through `Reply-To`.

## What happens when a consumer sends an enquiry locally

1. The browser validates the required fields and sends them to the local `/api/booking-enquiry` endpoint. The API key stays on the server.
2. The server validates the name, phone, email, party size, date, start/end time, terms acknowledgement and field lengths. It escapes submitted text in the email HTML. The request is limited in size and must come from the local preview origin.
3. Resend receives **two separate messages**: a business notification to the server-configured `RESEND_TEST_INBOX`, with `Reply-To` set to the customer’s entered address; and an acknowledgement to the email entered on the form, with `Reply-To` set to the staff/test inbox. The browser cannot override the staff inbox or sender.
4. The email subjects are `Consumer booking enquiry` and `Your booking enquiry was received`. The acknowledgement says that receipt **does not confirm a booking** and that staff will confirm availability and arrangements separately.
5. Only after Resend accepts both messages does the page show **“Enquiry received”** and the server-validated details: name, phone, email, number of people, date, start time, end time and additional information. The detail values are inserted as text, not HTML. A partial or failed send leaves the form available to retry; matching retries use separate idempotency keys for the two emails to avoid duplicating an accepted message.

Acceptance by Resend is not proof that an email arrived in an inbox. This process does not reserve a place, confirm availability, take payment or create a booking in the existing system. For now, test only with customer email addresses you control.

## Local configuration and verification

Set `RESEND_API_KEY_FILE` to the absolute path of the key file **outside this repository**, set `RESEND_TEST_INBOX` to the intended staff/test recipient, and run `npm run dev`. Alternatively, provide `RESEND_API_KEY` as a server-process environment variable. `RESEND_FROM_EMAIL` is optional; the verified prototype sender above is the default. The project does not automatically load `.env` files. See `README.md` for a PowerShell example.

The owner confirmed a successful browser test after restarting the local server: the consumer notification arrived at the configured staff/test inbox, the acknowledgement arrived at the different email entered in the form, and the confirmation screen appeared. Automated tests cover separate recipients, escaped HTML, server response details, validation, retries and idempotency. The existing build and check commands passed.

**Restart `npm run dev` after editing `scripts/dev.js` or `scripts/booking-email.js`.** Node keeps the old server-side code in memory even if `dist/` is rebuilt. A stale server previously sent both messages to the old fixed inbox while the newly built page expected a newer response format. The page now identifies that mismatch instead of claiming the emails were not sent. Do not retry a submission simply because the page reports an out-of-date server; first check the inboxes and restart the process.

## Before a hosted sending test or production transition

- Choose a server-side host for the enquiry endpoint, such as a Cloudflare Pages Function, and set the Resend API key in that host’s secret settings. GitHub Pages alone cannot host the endpoint. Do not copy the local key file into the deployment artifact.
- Decide the permanent staff recipient and reply address, then configure them as deployment settings. Inform staff before enabling live enquiries. The current `RESEND_TEST_INBOX` name reflects local testing, not a final production inbox.
- Keep the wording as an **enquiry acknowledgement**, not a booking confirmation. Check the existing system’s operational handoff, monitoring and failure handling before accepting public submissions.
- Add suitable public-endpoint protections and policies: abuse/rate limiting, privacy/retention notice, delivery or bounce monitoring, and a review of partial-send and retry behaviour in a multi-instance serverless environment. The current in-memory idempotency map is local-process-only and is not sufficient for distributed production deployment.
- Test real inbox receipt using controlled addresses after hosting is configured. Review all five consumer-page translations before production release.

## Group enquiries: separate decision

Do not silently connect the current group preview to this consumer endpoint. A group request has different fields and a staff-led discussion/confirmation process. It can reuse the same **server-side email pattern** once the owner approves its recipient, acknowledgement wording, submitted-detail summary, validation rules and whether it should remain a request rather than a booking confirmation. The outstanding group capacity, arrival and payment details are tracked in `docs/launch-checks.md`. Until that separate work is agreed and implemented, the group form remains non-sending.
