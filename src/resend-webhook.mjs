const response = status => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
const encoder = new TextEncoder();
const safeId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(value) ? value : undefined;
const safeEmailId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(value) ? value : undefined;

async function verified(request, body, secret, now) {
  const id = request.headers.get('svix-id');
  const timestamp = request.headers.get('svix-timestamp');
  const signatures = request.headers.get('svix-signature');
  if (!id || !timestamp || !signatures || id.includes('.') || !/^\d{10}$/.test(timestamp) || Math.abs(now() / 1000 - Number(timestamp)) > 300 || !secret?.startsWith('whsec_')) return false;
  let keyBytes;
  try { keyBytes = Uint8Array.from(atob(secret.slice(6)), char => char.charCodeAt(0)); }
  catch { return false; }
  if (keyBytes.length < 24) return false;
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const payload = encoder.encode(`${id}.${timestamp}.${body}`);
  for (const entry of signatures.split(' ').slice(0, 16)) {
    if (!entry.startsWith('v1,')) continue;
    try {
      const signature = Uint8Array.from(atob(entry.slice(3)), char => char.charCodeAt(0));
      if (await crypto.subtle.verify('HMAC', key, signature, payload)) return true;
    } catch { /* Invalid signature. */ }
  }
  return false;
}

export async function handleResendWebhook(request, env, { now = () => Date.now(), logger = console } = {}) {
  if (!env.RESEND_WEBHOOK_SECRET) return response(503);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return response(415);
  if (Number(request.headers.get('content-length') || 0) > 32768) return response(413);
  const body = await request.text();
  if (encoder.encode(body).byteLength > 32768) return response(413);
  if (!await verified(request, body, env.RESEND_WEBHOOK_SECRET, now)) return response(401);
  let event;
  try { event = JSON.parse(body); } catch { return response(400); }
  const tags = event?.data?.tags || {};
  const submissionId = safeId(tags.submission_id);
  const journey = ['booking', 'group'].includes(tags.journey) ? tags.journey : undefined;
  const role = ['staff', 'customer'].includes(tags.recipient_role) ? tags.recipient_role : undefined;
  const emailId = safeEmailId(event?.data?.email_id);
  const type = typeof event?.type === 'string' && /^email\.[a-z_]+$/.test(event.type) ? event.type : undefined;
  // Ignore unrelated account email events; never log addresses, subjects or webhook bodies.
  if (submissionId && journey && role && emailId && type) {
    const line = JSON.stringify({ service: 'booking_delivery', event: 'resend_delivery_event', type, submissionId, journey, role, emailId });
    if (['email.bounced', 'email.failed', 'email.suppressed', 'email.complained'].includes(type)) logger.error(line);
    else if (type === 'email.delivery_delayed') logger.warn(line);
    else if (type === 'email.delivered') logger.info(line);
  }
  return response(204);
}
