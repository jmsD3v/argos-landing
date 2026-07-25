import { initTerminalDemo } from './terminal-demo';
import { initStatsCounters } from './stats-counter';
import { enhanceAllForms } from './enhance-form';
import { initPendingDownloadNote, initCopyHash } from './documentacion';
import { initScrollReveal, initHeroEntrance } from './animations';

/**
 * Re-binds everything that depends on the *current* page's DOM content.
 * Must run on every `astro:page-load` (fires after the initial load AND
 * after every ClientRouter transition) rather than as a top-level statement
 * in each component's own <script> - confirmed empirically that a second
 * visit to a route already seen this session leaves inline module scripts
 * un-re-executed (terminal/stats/captcha all stayed frozen in their initial
 * state on a repeat Home visit until this dispatcher was introduced).
 *
 * Every function called here already no-ops safely when its target
 * elements aren't on the current page, so it's fine to call all of them
 * unconditionally on every page. This is registered exactly once, from
 * NavBar's `transition:persist`-ed script, so the registration itself never
 * duplicates across visits.
 */
export function initPageContent() {
  initTerminalDemo();
  initStatsCounters();
  enhanceAllForms();
  initPendingDownloadNote();
  initCopyHash();
  initScrollReveal();
  initHeroEntrance();
}
