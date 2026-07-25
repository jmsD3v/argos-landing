let activeTimers: ReturnType<typeof setInterval>[] = [];

export function initStatsCounters() {
  // Runs again on every astro:page-load; clear any counters still ticking
  // from a previous visit before starting fresh ones (self-clearing once
  // they reach target, but a mid-count page-away would otherwise leave one
  // running against detached nodes until it finishes on its own).
  activeTimers.forEach(clearInterval);
  activeTimers = [];

  document.querySelectorAll<HTMLElement>('[data-target]').forEach((el) => {
    const target = Number(el.dataset.target);
    const step = Number(el.dataset.step) || 1;
    let value = 0;
    const timer = setInterval(() => {
      value = Math.min(target, value + step);
      el.textContent = String(value);
      if (value >= target) clearInterval(timer);
    }, 60);
    activeTimers.push(timer);
  });
}
