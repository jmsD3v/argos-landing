import type { APIRoute } from 'astro';
import { SubmitValidationError } from './submit';

/** Re-checks the MathCaptcha challenge server-side (the client-side disable
 * on the submit button only stops honest browsers, not a direct POST to this
 * endpoint). Still trivially bypassable by anyone reading the hidden fields -
 * it's a spam-friction gate, not real bot protection. Swap for a Turnstile
 * server-side verify call here if that's added later. */
function verifyCaptcha(form: FormData): void {
  const a = Number(form.get('captcha_a'));
  const b = Number(form.get('captcha_b'));
  const answer = Number(form.get('captcha_answer'));
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(answer) || answer !== a + b) {
    throw new SubmitValidationError('La verificación no es correcta. Probá de nuevo.');
  }
}

/** Wraps a form-inserting function into a POST handler with consistent JSON responses. */
export function formEndpoint<T>(insert: (form: FormData) => Promise<T>): APIRoute {
  return async ({ request }) => {
    try {
      const form = await request.formData();
      verifyCaptcha(form);
      await insert(form);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      if (err instanceof SubmitValidationError) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.error(err);
      return new Response(JSON.stringify({ ok: false, error: 'Ocurrió un error inesperado. Probá de nuevo.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}
