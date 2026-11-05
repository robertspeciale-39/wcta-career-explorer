/* Splash: scattered 1s and 0s fly in and lock together to build the West CTA logo.
   Runs once per browser session (add ?splash=1 to the URL to replay). Skippable. Honors reduced motion. */
(function () {
  const grid = window.WCTA_LOGO_GRID;
  const overlay = document.getElementById("splash");
  if (!overlay || !grid) return;

  const params = new URLSearchParams(location.search);
  const seen = (function () { try { return sessionStorage.getItem("wcta.splash") === "1"; } catch (e) { return false; } })();
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ((seen && !params.has("splash")) || reduce) { overlay.remove(); document.documentElement.classList.add("splash-done"); return; }

  document.documentElement.classList.add("splash-running");
  const canvas = overlay.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const skip = overlay.querySelector("[data-skip]");
  const title = overlay.querySelector(".splash-title");

  const ROWS = grid.length, COLS = grid[0].length;
  const COLORS = { "1": [159, 19, 46], "2": [184, 146, 31] };
  const GRAY = [214, 206, 195];
  const FLY = 1700, TOTAL = 4300;
  let size, cell, dpr, parts = [], start = 0, raf = 0, done = false;

  const rand = (a, b) => a + Math.random() * (b - a);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = Math.floor(Math.min(window.innerWidth * 0.84, window.innerHeight * 0.58, 560));
    cell = size / COLS;
    canvas.style.width = size + "px"; canvas.style.height = size + "px";
    canvas.width = Math.floor(size * dpr); canvas.height = Math.floor(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function build() {
    parts = [];
    const rect = canvas.getBoundingClientRect();
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const t = grid[y][x];
      if (t === "0") continue;
      // start somewhere around the whole screen, relative to the canvas origin
      const sx = rand(-rect.left, window.innerWidth - rect.left);
      const sy = rand(-rect.top, window.innerHeight - rect.top);
      parts.push({
        tx: x * cell + cell / 2, ty: y * cell + cell / 2, sx, sy,
        delay: (x / COLS) * 900 + rand(0, 380),
        char: Math.random() < 0.5 ? "0" : "1", flick: rand(0, 90), type: t
      });
    }
    // ambient digits that fade away so the screen is never empty at the start
    for (let i = 0; i < 70; i++) parts.push({ amb: true, sx: rand(-rect.left, window.innerWidth - rect.left), sy: rand(-rect.top, window.innerHeight - rect.top), char: Math.random() < 0.5 ? "0" : "1", r: rand(0.8, 1.4) });
  }

  function frame(now) {
    if (!start) start = now;
    const t = now - start;
    ctx.clearRect(0, 0, size, size);
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = "700 " + Math.max(8, cell * 1.18) + 'px "Plus Jakarta Sans", "Barlow", system-ui, sans-serif';

    for (const p of parts) {
      if (p.amb) {
        const a = Math.max(0, 0.35 * (1 - t / 1500));
        if (a <= 0) continue;
        ctx.fillStyle = "rgba(" + GRAY.join(",") + "," + a + ")";
        ctx.font = "700 " + cell * 1.4 * p.r + 'px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillText(p.char, p.sx, p.sy);
        continue;
      }
      const k = Math.min(1, Math.max(0, (t - p.delay) / FLY));
      const e = ease(k);
      const x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
      // digits flicker between 0 and 1 while traveling, then lock
      const ch = k < 1 ? (Math.floor((t + p.flick) / 90) % 2 ? "1" : "0") : p.char;
      const col = mix(GRAY, COLORS[p.type], Math.min(1, k * 1.15));
      ctx.fillStyle = "rgb(" + col.map(Math.round).join(",") + ")";
      ctx.font = "700 " + Math.max(8, cell * 1.18) + 'px "Plus Jakarta Sans", "Barlow", system-ui, sans-serif';
      ctx.fillText(ch, x, y);
    }

    if (t > 2500 && !title.classList.contains("on")) title.classList.add("on");
    if (t >= TOTAL) return finish();
    raf = requestAnimationFrame(frame);
  }

  function finish() {
    if (done) return; done = true;
    cancelAnimationFrame(raf);
    try { sessionStorage.setItem("wcta.splash", "1"); } catch (e) {}
    overlay.classList.add("out");
    document.documentElement.classList.remove("splash-running");
    document.documentElement.classList.add("splash-done");
    setTimeout(() => overlay.remove(), 650);
    const main = document.getElementById("main");
    if (main) { main.setAttribute("tabindex", "-1"); }
  }

  skip.addEventListener("click", finish);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !done) finish(); });
  window.addEventListener("resize", () => { if (!done) { layout(); build(); } });

  layout(); build();
  raf = requestAnimationFrame(frame);
  skip.focus({ preventScroll: true });
})();
