export function initPendingDownloadNote() {
  document.querySelectorAll<HTMLButtonElement>('[data-pending-download]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('[data-pending-note]')?.removeAttribute('hidden');
    });
  });
}

export function initCopyHash() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy-hash]').forEach((btn) => {
    const idleLabel = btn.textContent ?? 'Copiar';
    btn.addEventListener('click', async () => {
      const hash = btn.dataset.copyHash ?? '';
      try {
        await navigator.clipboard.writeText(hash);
        btn.textContent = '¡Copiado!';
      } catch {
        btn.textContent = 'No se pudo copiar';
      }
      setTimeout(() => {
        btn.textContent = idleLabel;
      }, 1500);
    });
  });
}
