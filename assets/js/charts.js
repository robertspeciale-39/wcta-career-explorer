/* Hand-built SVG charts: interest radar (RIASEC hexagon), strengths bars, work-value bars.
   Each chart has a text alternative; meaning never depends on color alone. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const SHORT = {
    verbal: "Verbal", numeric: "Numbers", scientific: "Science", technical: "Technology",
    mechanical: "Mechanical", spatial: "Spatial", creative: "Creativity", people: "People skills",
    leadership: "Leadership", organizing: "Organizing", persistence: "Persistence", handson: "Hands-on"
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function radar(el, raw, types, topCode) {
    const order = ["R", "I", "A", "S", "E", "C"];
    const W = 560, H = 450, cx = W / 2, cy = 225, R = 150;
    const pt = (i, r) => { const a = -Math.PI / 2 + (i * Math.PI * 2) / 6; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
    const rings = [0.25, 0.5, 0.75, 1];
    let svg = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-labelledby="radar-t radar-d" class="chart radar">';
    svg += '<title id="radar-t">Your six interest areas</title><desc id="radar-d">' +
      esc(order.map((t) => types[t].name + " " + raw[t] + " out of 40").join("; ")) + "</desc>";
    rings.forEach((f) => {
      svg += '<polygon points="' + order.map((_, i) => pt(i, R * f).join(",")).join(" ") + '" class="ring"/>';
    });
    order.forEach((_, i) => { const p = pt(i, R); svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" class="axis"/>'; });
    const poly = order.map((t, i) => pt(i, R * Math.max(0.04, raw[t] / 40)).join(",")).join(" ");
    svg += '<polygon points="' + poly + '" class="shape"/>';
    order.forEach((t, i) => {
      const p = pt(i, R * Math.max(0.04, raw[t] / 40));
      const isTop = topCode.includes(t);
      svg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (isTop ? 7 : 5) + '" class="dot' + (isTop ? " top" : "") + '"><title>' + esc(types[t].name + ": " + raw[t] + " of 40") + "</title></circle>";
      const l = pt(i, R + 38);
      const anchor = Math.abs(l[0] - cx) < 8 ? "middle" : l[0] > cx ? "start" : "end";
      const dx = anchor === "start" ? -8 : anchor === "end" ? 8 : 0;
      svg += '<text x="' + (l[0] + dx * 0) + '" y="' + l[1] + '" text-anchor="' + anchor + '" class="lbl' + (isTop ? " top" : "") + '">' +
        '<tspan x="' + l[0] + '" dy="-2">' + esc(types[t].name) + '</tspan><tspan x="' + l[0] + '" dy="17" class="num">' + raw[t] + "/40</tspan></text>";
    });
    svg += "</svg>";
    el.innerHTML = svg;
  }

  function strengths(el, skills) {
    const rows = skills.slice().sort((a, b) => b.level - a.level);
    let html = '<ul class="bars" role="list">';
    rows.forEach((s) => {
      const tag = s.level >= 0.7 ? '<span class="tag strong">' + window.WCTA_UI.icon("star") + "Strength</span>"
        : s.level <= 0.4 ? '<span class="tag grow">' + window.WCTA_UI.icon("sparkle") + "Growth area</span>" : "";
      const selfPct = Math.round(s.self * 100);
      html += '<li class="bar-row"><div class="bar-head"><span class="bar-name">' + esc(SHORT[s.key] || s.key) + "</span>" + tag + "</div>" +
        '<div class="track" aria-hidden="true"><span class="fill self" style="--w:' + selfPct + '%"></span></div>' +
        (s.apt !== null ? '<div class="track thin" aria-hidden="true"><span class="fill apt" style="--w:' + Math.round(s.apt * 100) + '%"></span></div>' : "") +
        '<span class="sr-only">' + esc((SHORT[s.key] || s.key) + ": self-rating " + selfPct + " percent" + (s.apt !== null ? ", skill check " + Math.round(s.apt * 100) + " percent" : "")) + "</span></li>";
    });
    html += "</ul>";
    html += '<div class="legend"><span><i class="sw self"></i>Your self-rating</span><span><i class="sw apt"></i>Skill check result</span></div>';
    el.innerHTML = html;
  }

  function values(el, vals) {
    let html = '<ol class="bars values" role="list">';
    vals.forEach((v, i) => {
      html += '<li class="bar-row"><div class="bar-head"><span class="bar-name"><b class="rank">' + (i + 1) + "</b>" + esc(v.label) + "</span></div>" +
        '<div class="track" aria-hidden="true"><span class="fill val" style="--w:' + Math.round(v.level * 100) + '%"></span></div>' +
        '<p class="bar-note">' + esc(v.text) + "</p></li>";
    });
    html += "</ol>";
    el.innerHTML = html;
  }

  window.WCTA_CHARTS = { radar, strengths, values, SHORT };
})();
