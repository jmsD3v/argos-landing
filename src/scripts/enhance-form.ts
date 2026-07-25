/** Progressive-enhancement submit handler shared by the 4 lead-gen forms:
 * POSTs as FormData to `form.action`, swaps to the sibling success panel
 * (`data-success-target` id) on {ok:true}, shows the error inline otherwise. */
export function enhanceForm(form: HTMLFormElement) {
  const successId = form.dataset.successTarget;
  const successEl = successId ? document.getElementById(successId) : null;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const idleLabel = submitBtn?.textContent ?? 'Enviar';
  const loadingLabel = form.dataset.loadingLabel ?? 'Enviando...';
  const errorEl = form.querySelector<HTMLElement>('[data-form-error]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.textContent = '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = loadingLabel;
    }
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Ocurrió un error inesperado.');
      form.hidden = true;
      successEl?.removeAttribute('hidden');
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = idleLabel;
      }
      if (errorEl) errorEl.textContent = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
    }
  });
}

/** Generates a fresh a+b challenge per page load and gates the submit button
 * on a correct answer. Must run client-side (not at build time) since these
 * pages are static-prerendered - a server-picked number would be baked into
 * the HTML and identical for every visitor. */
export function initCaptcha(wrapper: HTMLElement) {
  const form = wrapper.closest('form');
  const questionEl = wrapper.querySelector<HTMLElement>('.captcha-question');
  const answerEl = wrapper.querySelector<HTMLInputElement>('.captcha-answer');
  const aEl = wrapper.querySelector<HTMLInputElement>('.captcha-a');
  const bEl = wrapper.querySelector<HTMLInputElement>('.captcha-b');
  const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !questionEl || !answerEl || !aEl || !bEl || !submitBtn) return;

  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  questionEl.textContent = `${a} + ${b} =`;
  aEl.value = String(a);
  bEl.value = String(b);
  submitBtn.disabled = true;

  answerEl.addEventListener('input', () => {
    submitBtn.disabled = Number(answerEl.value) !== a + b;
  });
}

export function enhanceAllForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-enhance]').forEach(enhanceForm);
  document.querySelectorAll<HTMLElement>('[data-captcha]').forEach(initCaptcha);
}
