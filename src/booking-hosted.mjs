import { createBookingService, createGroupService, validate, validateGroup } from '../scripts/booking-email.mjs';
import { verifyTurnstile } from './turnstile.mjs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});

function bookingChecks(env = {}) {
  const inbox = env.RESEND_TEST_INBOX?.trim();
  const allowedEmails = (env.BOOKING_ALLOWED_EMAILS || '').split(',').map(email => email.trim().toLowerCase()).filter(Boolean);
  return {
    enabledFlag: env.BOOKING_EMAIL_ENABLED === 'true',
    keyPresent: Boolean(env.RESEND_API_KEY?.trim()),
    inboxValid: emailPattern.test(inbox || ''),
    allowedEmailsValid: allowedEmails.length > 0 && allowedEmails.every(email => emailPattern.test(email))
  };
}

export function bookingConfig(env = {}) {
  const checks = bookingChecks(env);
  if (!Object.values(checks).every(Boolean)) return null;
  const turnstileEnabled = env.TURNSTILE_ENABLED === 'true';
  const siteKey = env.TURNSTILE_SITE_KEY?.trim();
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileEnabled && (!siteKey || !secret || !env.BOOKING_RATE_LIMITER?.limit)) return null;
  const inbox = env.RESEND_TEST_INBOX.trim();
  const allowedEmails = env.BOOKING_ALLOWED_EMAILS.split(',').map(email => email.trim().toLowerCase()).filter(Boolean);
  return { apiKey: env.RESEND_API_KEY.trim(), inbox, allowedEmails, sender: env.RESEND_FROM_EMAIL?.trim() || undefined,
    turnstile: turnstileEnabled ? { siteKey, secret } : null };
}

export const bookingMode = ({ env }) => {
  const config = bookingConfig(env);
  return json(200, { enabled: Boolean(config), ...(config?.turnstile ? { turnstileSiteKey: config.turnstile.siteKey } : {}) });
};
export const methodNotAllowed = () => json(405, { result: 'method_not_allowed' });

async function readJson(request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return { status: 415, body: { result: 'invalid_type' } };
  if (Number(request.headers.get('content-length') || 0) > 8192) return { status: 413, body: { result: 'too_large' } };
  const reader = request.body?.getReader();
  if (!reader) return { status: 400, body: { result: 'invalid' } };
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 8192) {
        await reader.cancel();
        return { status: 413, body: { result: 'too_large' } };
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return { input: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch { return { status: 400, body: { result: 'invalid' } }; }
}

async function handleEnquiry(context, fetcher, validateInput, createService, action) {
  const { request } = context;
  const config = bookingConfig(context.env);
  if (!config) return json(503, { result: 'unavailable' });
  if (request.headers.get('origin') !== new URL(request.url).origin) return json(403, { result: 'forbidden' });
  const parsed = await readJson(request);
  if ('status' in parsed) return json(parsed.status, parsed.body);
  const details = validateInput(parsed.input);
  if (!details) return json(400, { result: 'invalid' });
  if (!config.allowedEmails.includes(details.email.toLowerCase())) return json(403, { result: 'forbidden' });
  if (config.turnstile) {
    let limited;
    try { limited = await context.env.BOOKING_RATE_LIMITER.limit({ key: `${action}:${details.email.toLowerCase()}` }); }
    catch { return json(503, { result: 'unavailable' }); }
    if (!limited.success) return json(429, { result: 'rate_limited' });
    const challenge = await verifyTurnstile({ token: parsed.input.turnstileToken, secret: config.turnstile.secret,
      hostname: new URL(request.url).hostname, action, remoteIp: request.headers.get('cf-connecting-ip'), fetcher });
    if (!challenge.ok) return json(challenge.reason === 'unavailable' ? 503 : 403, { result: `challenge_${challenge.reason}` });
  }
  const send = async (email, idempotencyKey) => {
    const response = await fetcher('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) throw new Error(`Resend rejected email: HTTP ${response.status}`);
    return response.json();
  };
  // Resend's per-email idempotency keys protect retries across Worker instances.
  const submit = createService({ send, inbox: config.inbox, sender: config.sender });
  const result = await submit(parsed.input);
  return json(result.status, result.body);
}

export const handleBooking = (context, fetcher = fetch) => handleEnquiry(context, fetcher, validate, createBookingService, 'consumer_enquiry');
export const handleGroup = (context, fetcher = fetch) => handleEnquiry(context, fetcher, validateGroup, createGroupService, 'group_enquiry');
