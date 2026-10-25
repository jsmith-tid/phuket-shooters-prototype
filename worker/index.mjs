import { bookingMode, handleBooking, handleGroup, methodNotAllowed } from '../src/booking-hosted.mjs';
import { handleResendWebhook } from '../src/resend-webhook.mjs';

export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/api/resend-webhook') {
      return request.method === 'POST' ? handleResendWebhook(request, env) : methodNotAllowed();
    }
    if (pathname === '/api/booking-mode') {
      return request.method === 'GET' ? bookingMode({ request, env }) : methodNotAllowed();
    }
    if (pathname === '/api/booking-enquiry') {
      if (request.method !== 'POST') return methodNotAllowed();
      try { return await handleBooking({ request, env }); }
      catch { console.error(JSON.stringify({ service: 'booking_delivery', event: 'worker_error', journey: 'booking' })); return Response.json({ result: 'unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
    }
    if (pathname === '/api/group-enquiry') {
      if (request.method !== 'POST') return methodNotAllowed();
      try { return await handleGroup({ request, env }); }
      catch { console.error(JSON.stringify({ service: 'booking_delivery', event: 'worker_error', journey: 'group' })); return Response.json({ result: 'unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
    }
    return env.ASSETS.fetch(request);
  }
};
