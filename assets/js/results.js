/* Results page. Reads answers from sessionStorage, scores them, and renders everything. Nothing leaves the browser. */
(function () {
  const Q = window.WCTA_QUIZ, C = window.WCTA_CAREERS, COL = window.WCTA_COLLEGES, S = window.WCTA_SCORING, CH = window.WCTA_CHARTS, UI = window.WCTA_UI;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Demo mode (results.html?demo=1): a made-up sample student, never read from or written to storage.
  const isDemo = new URLSearchParams(location.search).get("demo") === "1";
  function sampleAnswers() {
    const lik = { I: 4, R: 3, A: 3, S: 2, E: 1, C: 1 };
    const interest = {};
    Q.interestItems.forEach((it, i) => { const t = it.id.split("-")[1][0]; interest[it.id] = Math.max(0, Math.min(4, lik[t] + (i % 3 === 0 ? -1 : i % 3 === 1 ? 0 : 1) * (lik[t] > 1 ? 1 : 0) + (lik[t] <= 1 && i % 4 === 0 ? 1 : 0))); });
    const high = { scientific: 5, technical: 5, verbal: 4, numeric: 4, persistence: 4, creative: 4, mechanical: 3, spatial: 4, handson: 3, organizing: 3, people: 2, leadership: 2 };
    const skillSelf = {}; Q.skills.forEach((k) => { skillSelf[k.key] = high[k.key] || 3; });
    const apt = {}; Q.aptitude.forEach((it) => { const ans = it.shape ? it.shape.answer : it.answer; const miss = it.id === "apt-m2" || it.id === "apt-n3"; apt[it.id] = miss ? (ans + 1) % (it.shape ? it.shape.options.length : it.options.length) : ans; });
    const vals = { achievement: 5, independence: 4, working: 3, support: 3, relationships: 2, recognition: 2 };
    const values = {}; Q.values.forEach((v, i) => { values[v.key] = vals[v.key] || 3; });
    return { interest, skillSelf, apt, values };
  }
  let answers = null;
  if (isDemo) answers = sampleAnswers();
  else try { answers = JSON.parse(sessionStorage.getItem("wcta.answers") || "null"); } catch (e) {}
  const complete = answers && answers.interest && Object.keys(answers.interest).length >= 60;
  if (!complete) { $("empty").hidden = false; UI.hydrate($("empty")); return; }

  const res = S.score(answers, Q, C);
  $("results").hidden = false;
  if (isDemo) $("demo-banner").hidden = false;

  // ---- hero
  const names = res.hollandCode.map((t) => Q.TYPES[t].name);
  $("r-headline").textContent = "You lean " + names[0] + ", with a streak of " + names[1] + ".";
  $("r-sub").textContent = "Your top three interest types are " + names.join(", ") + ". Here is how that connects to your strengths, your values, and careers worth a closer look.";
  $("r-code").innerHTML = res.hollandCode.map((t, i) =>
    '<li class="chip"><b>' + t + "</b><span>" + esc(Q.TYPES[t].name) + "</span><em>" + esc(Q.TYPES[t].blurb) + "</em></li>").join("");

  // ---- interests
  CH.radar($("radar"), res.interestRaw, Q.TYPES, res.hollandCode);
  const ordered = S.TYPE_ORDER.slice().sort((a, b) => res.interestRaw[b] - res.interestRaw[a]);
  $("type-list").innerHTML = ordered.map((t) => {
    const top = res.hollandCode.includes(t);
    return '<li class="type-row' + (top ? " top" : "") + '"><div class="type-head"><b>' + t + "</b><span>" + esc(Q.TYPES[t].name) + "</span>" + (top ? '<i class="pill">Top ' + (res.hollandCode.indexOf(t) + 1) + "</i>" : "") +
      '</div><p>' + esc(Q.TYPES[t].blurb) + '</p><div class="track" aria-hidden="true"><span class="fill ' + (top ? "self" : "muted") + '" style="--w:' + Math.round(res.interestRaw[t] / 40 * 100) + '%"></span></div></li>';
  }).join("");
  $("type-table").innerHTML = ordered.map((t) => "<tr><th scope=\"row\">" + esc(Q.TYPES[t].name) + "</th><td>" + res.interestRaw[t] + "</td></tr>").join("");

  // ---- strengths + values
  CH.strengths($("skills-chart"), res.skills);
  const ins = res.insights;
  $("insights").innerHTML = (ins.length ? ins : [{ kind: "ok", text: "Your self-ratings and skill-check results lined up well. That is a good sign your self-picture is realistic." }])
    .map((n) => '<li class="' + n.kind + '">' + UI.icon(n.kind === "practice" ? "sparkle" : "star") + "<p>" + esc(n.text) + "</p></li>").join("");
  const strong = res.skills.filter((s) => s.level >= 0.7).sort((a, b) => b.level - a.level).slice(0, 3).map((s) => (CH.SHORT[s.key] || s.key).toLowerCase());
  if (strong.length) $("insights").insertAdjacentHTML("afterbegin", '<li class="strong">' + UI.icon("star") + "<p>Your strongest areas right now: " + esc(strong.join(", ")) + ".</p></li>");
  CH.values($("values-chart"), res.values);

  // ---- careers
  const instBadge = (id) => '<span class="inst inst-' + id + '">' + esc(COL.INST[id].name) + "</span>";
  $("career-list").innerHTML = res.matches.map((m, i) => {
    const links = S.collegesForCareer(m.career, COL).slice(0, 5);
    const parts = [["Interests", m.parts.interest], ["Skills", m.parts.skills], ["Values", m.parts.values]];
    return '<li class="career-card card">' +
      '<div class="career-top"><span class="rank" aria-hidden="true">' + (i + 1) + '</span><div class="career-title"><h3>' + esc(m.career.title) + '</h3><p class="cluster">' + esc(m.career.cluster) + "</p></div>" +
      '<div class="fit" role="img" aria-label="' + m.percent + ' percent fit"><strong>' + m.percent + '<small>%</small></strong><span>fit</span></div></div>' +
      '<p class="career-sum">' + esc(m.career.summary) + "</p>" +
      '<p class="why">' + UI.icon("check") + esc(m.why) + "</p>" +
      '<ul class="parts" role="list">' + parts.map((p) => '<li><span>' + p[0] + '</span><div class="track thin" aria-hidden="true"><span class="fill self" style="--w:' + Math.round(p[1] * 100) + '%"></span></div><b>' + Math.round(p[1] * 100) + "%</b></li>").join("") + "</ul>" +
      '<dl class="facts"><div><dt>Typical education</dt><dd>' + esc(m.career.edu) + "</dd></div>" +
      '<div><dt>Related West CTA program</dt><dd>' + esc(m.career.west) + "</dd></div></dl>" +
      '<h4 class="links-h">Programs to explore</h4><ul class="links" role="list">' +
      links.map((l) => '<li><a class="link-pill" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + instBadge(l.inst) + '<span>' + esc(l.label) + "</span>" + UI.icon("external") + '<span class="sr-only">(opens in a new tab)</span></a></li>').join("") + "</ul></li>";
  }).join("");

  // ---- consolidated colleges (UNLV, UNR, CSN first)
  const groups = S.collegesFor(res.matches, COL);
  $("college-grid").innerHTML = groups.map((g) => {
    const pri = ["unlv", "unr", "csn"].includes(g.inst.id);
    return '<article class="card college' + (pri ? " priority" : "") + '"><div class="college-head">' + instBadge(g.inst.id) + "<h3>" + esc(g.inst.full) + '</h3><p class="muted">' + esc(g.inst.city) + "</p></div><ul role=\"list\">" +
      g.links.map((l) => '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + '<span class="sr-only"> (opens in a new tab)</span></a><span class="for">For: ' + esc(l.careers.join(", ")) + "</span></li>").join("") + "</ul></article>";
  }).join("");
  $("explore-more").innerHTML = COL.EXPLORE_MORE.map((l) => '<li><a class="btn btn-secondary btn-sm" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + UI.icon("external") + "</a></li>").join("");

  // ---- print + retake
  $("btn-print").addEventListener("click", () => window.print());
  ["retake-top", "retake-bottom"].forEach((id) => $(id).addEventListener("click", () => { if (isDemo) return; try { sessionStorage.removeItem("wcta.answers"); sessionStorage.removeItem("wcta.quiz.v1"); } catch (e) {} }));

  // ---- email (mock-up: validates and confirms, never sends or stores)
  const form = $("email-form"), input = $("email-input"), msg = $("email-msg");
  const looksLikeSchool = (addr) => { const d = addr.split("@")[1] || ""; return /(^|\.)ccsd\.net$/i.test(d) || /k12/i.test(d); };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    msg.className = "email-msg";
    if (!v) { msg.textContent = "Please enter an email address."; msg.classList.add("bad"); input.setAttribute("aria-invalid", "true"); input.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { msg.textContent = "That does not look like a full email address. Check for typos, like a missing @ or dot."; msg.classList.add("bad"); input.setAttribute("aria-invalid", "true"); input.focus(); return; }
    if (looksLikeSchool(v)) { msg.textContent = "That looks like a school email. School accounts cannot receive messages from outside senders. Please use a personal or parent or guardian email instead."; msg.classList.add("bad"); input.setAttribute("aria-invalid", "true"); input.focus(); return; }
    input.removeAttribute("aria-invalid");
    input.value = "";
    msg.textContent = "Mock-up only: nothing was sent, and your address was not saved. In the full version, your results would arrive in your inbox.";
    msg.classList.add("ok");
  });
  input.addEventListener("input", () => { input.removeAttribute("aria-invalid"); });

  UI.hydrate(document);
})();
