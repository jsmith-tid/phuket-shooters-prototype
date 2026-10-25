export async function verifyTurnstile({ token, secret, hostname, action, remoteIp, fetcher = fetch }) {
  if (typeof token !== 'string' || !token || token.length > 2048) return { ok: false, reason: 'invalid' };
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp) body.set('remoteip', remoteIp);
  try {
    const response = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body, signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) return { ok: false, reason: 'unavailable' };
    const result = await response.json();
    return result.success === true && result.hostname === hostname && result.action === action
      ? { ok: true } : { ok: false, reason: 'invalid' };
  } catch { return { ok: false, reason: 'unavailable' }; }
}
