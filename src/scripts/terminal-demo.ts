const COMMANDS = [
  'dataing --cuil 20-30xxxxxx-1',
  'imargos --geolocate evidencia.jpg',
  'shodargos --query "port:22 country:AR"',
  'wallargos --track 0x9f2...4b1',
];

let typingInterval: ReturnType<typeof setInterval> | undefined;

export function initTerminalDemo() {
  // initTerminalDemo() runs again on every astro:page-load (see
  // src/scripts/page-init.ts) - without this, revisiting Home a second time
  // in the same session would start a *second* forever-running interval on
  // top of the first (now-orphaned) one, since nothing else ever stops it.
  clearInterval(typingInterval);

  const pastEl = document.getElementById('terminal-past');
  const typedEl = document.getElementById('terminal-typed');
  if (!pastEl || !typedEl) return;

  let cmdIndex = 0;
  let charIndex = 0;
  let pastLines: string[] = [];
  let waiting = false;

  const render = () => {
    pastEl.replaceChildren(
      ...pastLines.map((line) => {
        const p = document.createElement('p');
        p.className = 'm-0';
        const prompt = document.createElement('span');
        prompt.className = 'text-[#5cc8ff]';
        prompt.textContent = 'root@argOS';
        p.append(prompt, `:~# ${line}`);
        return p;
      }),
    );
    typedEl.textContent = COMMANDS[cmdIndex % COMMANDS.length].slice(0, charIndex);
  };

  typingInterval = setInterval(() => {
    if (waiting) return;
    const cmd = COMMANDS[cmdIndex % COMMANDS.length];
    if (charIndex < cmd.length) {
      charIndex += 1;
      render();
    } else {
      waiting = true;
      setTimeout(() => {
        waiting = false;
        pastLines = [...pastLines, cmd].slice(-4);
        charIndex = 0;
        cmdIndex += 1;
        render();
      }, 900);
    }
  }, 45);

  render();
}
