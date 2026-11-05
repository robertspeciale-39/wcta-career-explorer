/* Quiz controller: 17 short pages in 4 parts. State lives in sessionStorage only (cleared when the tab closes). */
(function () {
  const Q = window.WCTA_QUIZ;
  const KEY = "wcta.quiz.v1";

  // ---- build pages
  const chunk = (arr, n) => { const out = []; for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; };
  const PARTS = [
    { id: "interests", name: "Interests", help: "How much would you enjoy each activity? Do not worry about whether you have done it or how good you would be. Just think about whether you would like it." },
    { id: "skills", name: "Skills", help: "How confident are you in each area right now? Be honest. This is just for you." },
    { id: "check", name: "Skill check", help: "A few quick questions, no timer. It is okay to guess, and this is not a grade." },
    { id: "values", name: "Work values", help: "Imagine your future job. How important is each of these to you?" }
  ];
  const pages = [];
  chunk(Q.interestItems, 6).forEach((items, i, all) => pages.push({ part: 0, kind: "scale", items, title: "What would you enjoy?", offset: i * 6, total: 60 }));
  chunk(Q.skills, 6).forEach((items, i) => pages.push({ part: 1, kind: "skill", items, title: "How confident are you at...", offset: i * 6, total: 12 }));
  chunk(Q.aptitude, 3).forEach((items, i) => pages.push({ part: 2, kind: "apt", items, title: "Quick skill check", offset: i * 3, total: 12 }));
  pages.push({ part: 3, kind: "value", items: Q.values, title: "What matters in a job?", offset: 0, total: 6 });

  // ---- state
  let state = { page: 0, answers: { interest: {}, skillSelf: {}, apt: {}, values: {} } };
  try { const s = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (s && s.answers) state = s; } catch (e) {}
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  const $ = (id) => document.getElementById(id);
  const form = $("q-form"), title = $("q-title"), help = $("q-help"), part = $("quiz-part"), bar = $("quiz-bar"), prog = $("quiz-progress");
  const back = $("btn-back"), next = $("btn-next"), status = $("q-status");

  const bucket = (p) => p.kind === "scale" ? state.answers.interest : p.kind === "skill" ? state.answers.skillSelf : p.kind === "apt" ? state.answers.apt : state.answers.values;
  const idOf = (p, it) => p.kind === "skill" || p.kind === "value" ? it.key : it.id;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function shapeSVG(cells, px) {
    const w = Math.max(...cells.map(c => c[0])) + 1, h = Math.max(...cells.map(c => c[1])) + 1;
    const u = 10, pad = 3, W = w * u + pad * 2, H = h * u + pad * 2;
    const rects = cells.map(([x, y]) => '<rect x="' + (pad + x * u) + '" y="' + (pad + y * u) + '" width="' + u + '" height="' + u + '" rx="1.5" fill="#9f132e" stroke="#fff" stroke-width="1"/>').join("");
    return '<svg viewBox="0 0 ' + Math.max(W, H) + " " + Math.max(W, H) + '" width="' + px + '" height="' + px + '" aria-hidden="true" focusable="false">' + rects + "</svg>";
  }

  function scaleHTML(p, it, n, labels, values) {
    const id = idOf(p, it);
    const cur = bucket(p)[id];
    let h = '<fieldset class="q-item" data-id="' + id + '"><legend><span class="q-num">' + n + ".</span>" + esc(p.kind === "value" ? it.label + ": " + it.text : p.kind === "skill" ? it.label : it.text) + '</legend><div class="seg">';
    labels.forEach((lab, i) => {
      const v = values[i];
      h += '<label class="seg-opt"><input type="radio" name="' + id + '" value="' + v + '"' + (String(cur) === String(v) ? " checked" : "") + '><span class="seg-face">' + esc(lab) + "</span></label>";
    });
    return h + "</div></fieldset>";
  }

  function aptHTML(p, it, n) {
    const cur = bucket(p)[it.id];
    let h = '<fieldset class="q-item" data-id="' + it.id + '"><legend><span class="q-num">' + n + ".</span>" + esc(it.prompt) + "</legend>";
    if (it.shape) {
      h += '<div class="shape-ref"><span>Start shape</span>' + shapeSVG(it.shape.ref, 64) + '</div><div class="shape-grid">';
      it.shape.options.forEach((o, i) => {
        h += '<label class="shape-opt"><input type="radio" name="' + it.id + '" value="' + i + '" aria-label="Option ' + "ABCD"[i] + '"' + (String(cur) === String(i) ? " checked" : "") + ">" + shapeSVG(o, 64) + "<b>" + "ABCD"[i] + "</b></label>";
      });
      h += "</div>";
    } else {
      h += '<div class="opt-list">';
      it.options.forEach((o, i) => {
        h += '<label class="opt"><input type="radio" name="' + it.id + '" value="' + i + '"' + (String(cur) === String(i) ? " checked" : "") + '><span class="dot"></span><span>' + esc(o) + "</span></label>";
      });
      h += "</div>";
    }
    return h + "</fieldset>";
  }

  function render() {
    const p = pages[state.page], pt = PARTS[p.part];
    part.textContent = "Part " + (p.part + 1) + " of 4: " + pt.name + "  |  Page " + (state.page + 1) + " of " + pages.length;
    const pct = Math.round((state.page / pages.length) * 100);
    bar.style.width = pct + "%"; prog.setAttribute("aria-valuenow", pct); prog.setAttribute("aria-valuetext", pct + " percent complete");
    title.textContent = p.title;
    help.textContent = pt.help;
    let html = "";
    p.items.forEach((it, i) => {
      const n = p.offset + i + 1;
      if (p.kind === "scale") html += scaleHTML(p, it, n, Q.LIKERT_INTEREST, [0, 1, 2, 3, 4]);
      else if (p.kind === "skill") html += scaleHTML(p, it, n, Q.LIKERT_CONFIDENCE, [1, 2, 3, 4, 5]);
      else if (p.kind === "value") html += scaleHTML(p, it, n, Q.LIKERT_IMPORTANCE, [1, 2, 3, 4, 5]);
      else html += aptHTML(p, it, n);
    });
    form.innerHTML = html;
    form.querySelectorAll(".q-item").forEach((f) => { if (f.querySelector("input:checked")) f.classList.add("answered"); });
    back.disabled = state.page === 0;
    back.setAttribute("aria-disabled", state.page === 0);
    next.firstChild.nodeValue = state.page === pages.length - 1 ? "See my results " : "Next ";
    updateStatus(false);
  }

  function remaining() {
    const p = pages[state.page], b = bucket(p);
    return p.items.filter((it) => b[idOf(p, it)] === undefined).length;
  }
  function updateStatus(showMissing) {
    const left = remaining();
    status.classList.toggle("warn", showMissing && left > 0);
    status.textContent = left === 0 ? "All answered" : (showMissing ? "Please answer " : "") + left + " left on this page";
    if (showMissing) {
      const p = pages[state.page], b = bucket(p);
      form.querySelectorAll(".q-item").forEach((f) => f.classList.toggle("missing", b[f.dataset.id] === undefined));
    }
  }

  form.addEventListener("change", (e) => {
    const t = e.target;
    if (t.type !== "radio") return;
    const p = pages[state.page];
    bucket(p)[t.name] = Number(t.value);
    const f = t.closest(".q-item"); f.classList.add("answered"); f.classList.remove("missing");
    save(); updateStatus(false);
  });

  function go(delta) {
    state.page = Math.max(0, Math.min(pages.length - 1, state.page + delta));
    save(); render();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    title.focus({ preventScroll: true });
  }

  back.addEventListener("click", () => { if (state.page > 0) go(-1); });
  next.addEventListener("click", () => {
    if (remaining() > 0) {
      updateStatus(true);
      const first = form.querySelector(".q-item.missing");
      if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    if (state.page === pages.length - 1) {
      try { sessionStorage.setItem("wcta.answers", JSON.stringify(state.answers)); sessionStorage.removeItem(KEY); } catch (e) {}
      location.href = "results.html";
    } else go(1);
  });

  // Make sure a resumed session never lands past the end.
  if (state.page >= pages.length) state.page = pages.length - 1;
  render();
})();
