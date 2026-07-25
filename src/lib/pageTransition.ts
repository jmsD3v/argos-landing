/**
 * Custom Astro View Transitions animation (fade + slight vertical drift)
 * used on the main content between page navigations. Keyframe names are
 * defined in src/styles/tokens.css. `easing` (not anime.js's `ease`) is the
 * correct property name here - this is Astro's own transition system, which
 * generates plain CSS `animation: ...` declarations, not an anime.js call.
 */
const pageTransition = {
  forwards: {
    old: { name: 'argos-fade-out', duration: '180ms', easing: 'ease-in', fillMode: 'both' },
    new: { name: 'argos-fade-in', duration: '320ms', easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fillMode: 'both' },
  },
  backwards: {
    old: { name: 'argos-fade-out', duration: '180ms', easing: 'ease-in', fillMode: 'both' },
    new: { name: 'argos-fade-in', duration: '320ms', easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fillMode: 'both' },
  },
};

export default pageTransition;
