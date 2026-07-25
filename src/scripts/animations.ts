import { animate, stagger, onScroll, spring } from 'animejs';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Staggered fade/rise for each `[data-reveal-group]`'s `[data-reveal-item]`
 * children, played once as the group scrolls into view. Runs fresh on every
 * `astro:page-load` (initial load + every soft navigation) since the page
 * content isn't a `transition:persist` island - it's replaced each time. */
export function initScrollReveal() {
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  if (!groups.length) return;

  if (prefersReducedMotion()) {
    groups.forEach((group) => {
      group.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    });
    return;
  }

  groups.forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal-item]'));
    if (!items.length) return;
    animate(items, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 650,
      delay: stagger(70),
      ease: 'outExpo',
      autoplay: onScroll({ target: group, repeat: false }),
    });
  });
}

/** One-shot staggered entrance for the hero/intro block at the top of each
 * page - kicker, heading, subhead, CTA row - played immediately on load,
 * not scroll-gated (it's already in the viewport). */
export function initHeroEntrance() {
  const heroes = document.querySelectorAll<HTMLElement>('[data-hero-entrance]');
  if (!heroes.length) return;

  if (prefersReducedMotion()) {
    heroes.forEach((hero) => {
      hero.querySelectorAll<HTMLElement>('[data-hero-item]').forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    });
    return;
  }

  heroes.forEach((hero) => {
    const items = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-item]'));
    if (!items.length) return;
    animate(items, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 700,
      delay: stagger(100),
      ease: 'outQuart',
    });
  });
}

/** Tactile press feedback for every `.btn` (links and real buttons alike):
 * quick shrink on press, spring back on release. Bound once, document-wide,
 * via event delegation - safe to call again on later page loads (guarded),
 * and doesn't need re-binding per page since it doesn't depend on which
 * buttons currently exist in the DOM. */
let buttonPressBound = false;
export function initButtonPress() {
  if (buttonPressBound || prefersReducedMotion()) return;
  buttonPressBound = true;

  const releaseEase = spring({ stiffness: 300, damping: 12, mass: 0.6 });
  let pressed: Element | null = null;

  const findBtn = (target: EventTarget | null): Element | null => {
    const el = target instanceof Element ? target.closest('.btn') : null;
    return el && !el.hasAttribute('disabled') ? el : null;
  };

  document.addEventListener('pointerdown', (e) => {
    const btn = findBtn(e.target);
    if (!btn) return;
    pressed = btn;
    animate(btn, { scale: 0.94, duration: 120, ease: 'outQuad' });
  });

  const release = () => {
    if (!pressed) return;
    animate(pressed, { scale: 1, duration: 500, ease: releaseEase });
    pressed = null;
  };

  document.addEventListener('pointerup', release);
  document.addEventListener('pointercancel', release);
}
