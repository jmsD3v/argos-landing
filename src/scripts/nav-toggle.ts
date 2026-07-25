export function initMobileNavToggle() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('flex');
    menu?.classList.toggle('hidden', !isOpen);
    toggle.setAttribute('aria-expanded', String(!!isOpen));
  });
}
