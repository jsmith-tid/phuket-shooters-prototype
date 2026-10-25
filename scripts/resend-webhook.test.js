const test = require('node:test');
const assert = require('node:assert/strict');
const { createHmac, randomBytes, randomUUID } = require('node:crypto');
const webhookModule = import('../src/resend-webhook.mjs');

const secret = `whsec_${randomBytes(32).toString('base64')}`;
const endpoint = 'https://prototype.example/api/resend-webhook';
function signed(event, { timestamp = Math.floor(Date.now() / 1000), key = secret, signature } = {}) {
  const body = JSON.stringify(event);
  const id = `msg_${randomUUID()}`;
  const digest = createHmac('sha256', Buffer.from(key.slice(6), 'base64')).update(`${id}.${timestamp}.${body}`).digest('base64');
  return new Request(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'svix-id': id, 'svix-timestamp': String(timestamp), 'svix-signature': signature ?? `v1,${digest}` }, body });
}
function event(type = 'email.bounced') {
  return { type, data: { email_id: 'email-123', to: ['private@example.org'], subject: 'Private subject', tags: { submission_id: randomUUID(), journey: 'booking', recipient_role: 'customer' } } };
}

test('verified delivery and bounce events log only trace metadata', async () => {
  const { handleResendWebhook } = await webhookModule;
  const logs = [];
  const logger = { info: line => logs.push(['info', line]), warn: line => logs.push(['warn', line]), error: line => logs.push(['error', line]) };
  const bounced = event();
  assert.equal((await handleResendWebhook(signed(bounced), { RESEND_WEBHOOK_SECRET: secret }, { logger })).status, 204);
  assert.equal((await handleResendWebhook(signed(event('email.delivered')), { RESEND_WEBHOOK_SECRET: secret }, { logger })).status, 204);
  assert.deepEqual(logs.map(([level]) => level), ['error', 'info']);
  assert.equal(JSON.parse(logs[0][1]).submissionId, bounced.data.tags.submission_id);
  assert.equal(JSON.parse(logs[0][1]).emailId, 'email-123');
  assert.ok(!JSON.stringify(logs).includes('private@example.org'));
  assert.ok(!JSON.stringify(logs).includes('Private subject'));
});

test('webhook rejects absent configuration, tampering and stale signatures', async () => {
  const { handleResendWebhook } = await webhookModule;
  const original = event();
  assert.equal((await handleResendWebhook(signed(original), {})).status, 503);
  assert.equal((await handleResendWebhook(signed(original, { signature: 'v1,invalid' }), { RESEND_WEBHOOK_SECRET: secret })).status, 401);
  assert.equal((await handleResendWebhook(signed(original, { timestamp: Math.floor(Date.now() / 1000) - 301 }), { RESEND_WEBHOOK_SECRET: secret })).status, 401);
  const request = signed(original);
  const changed = new Request(endpoint, { method: 'POST', headers: request.headers, body: JSON.stringify({ ...original, type: 'email.delivered' }) });
  assert.equal((await handleResendWebhook(changed, { RESEND_WEBHOOK_SECRET: secret })).status, 401);
});

test('unrelated signed events are acknowledged without creating booking alerts', async () => {
  const { handleResendWebhook } = await webhookModule;
  const logs = [];
  const logger = { info: value => logs.push(value), warn: value => logs.push(value), error: value => logs.push(value) };
  assert.equal((await handleResendWebhook(signed({ type: 'email.bounced', data: { email_id: 'other-email' } }), { RESEND_WEBHOOK_SECRET: secret }, { logger })).status, 204);
  assert.deepEqual(logs, []);
});
