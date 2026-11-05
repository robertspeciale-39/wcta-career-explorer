/* Scoring and career matching. Works in the browser (window) and in Node (tests).
   Weights follow the research emphasis on interests: 60% interests, 25% skills, 15% work values. */
(function (root) {
  const TYPE_ORDER = ["R", "I", "A", "S", "E", "C"];
  const W = { interest: 0.6, skills: 0.25, values: 0.15 };
  const CODE_WEIGHTS = [1, 0.65, 0.4];
  const APT_TO_SKILL = { verbal: "verbal", numeric: "numeric", spatial: "spatial", mechanical: "mechanical" };

  const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
  const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

  function interestScores(answers, quiz) {
    const raw = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    quiz.interestItems.forEach((it) => { raw[it.type] += Number(answers.interest[it.id] ?? 2); });
    return raw; // each 0-40
  }

  function hollandCode(raw) {
    const m = mean(TYPE_ORDER.map((t) => raw[t]));
    return TYPE_ORDER.map((t, i) => ({ t, z: raw[t] - m, i }))
      .sort((a, b) => b.z - a.z || a.i - b.i)
      .slice(0, 3).map((x) => x.t);
  }

  function careerVector(code) {
    const v = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    code.split("").forEach((ch, i) => { v[ch] = CODE_WEIGHTS[i]; });
    return v;
  }

  function centered(vec) {
    const m = mean(TYPE_ORDER.map((t) => vec[t]));
    return TYPE_ORDER.map((t) => vec[t] - m);
  }

  function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    if (na === 0 || nb === 0) return 0; // flat profile: no signal
    return dot / Math.sqrt(na * nb);
  }

  function codeAgreement(userTop3, careerCode) {
    const w = [3, 2, 1];
    let s = 0;
    careerCode.split("").forEach((ch, i) => {
      if (userTop3[i] === ch) s += w[i];
      else if (userTop3.includes(ch)) s += w[i] * 0.5;
    });
    return s / 6;
  }

  function skillLevels(answers, quiz) {
    const out = {};
    const aptByDomain = {};
    quiz.aptitude.forEach((q) => {
      const d = q.domain;
      aptByDomain[d] = aptByDomain[d] || { right: 0, total: 0 };
      aptByDomain[d].total += 1;
      const correct = q.shape ? q.shape.answer : q.answer;
      if (answers.apt && Number(answers.apt[q.id]) === correct) aptByDomain[d].right += 1;
    });
    quiz.skills.forEach((s) => {
      const self = clamp((Number(answers.skillSelf[s.key] ?? 3) - 1) / 4);
      const domain = Object.keys(APT_TO_SKILL).find((d) => APT_TO_SKILL[d] === s.key);
      const apt = domain && aptByDomain[domain] ? aptByDomain[domain].right / aptByDomain[domain].total : null;
      const blended = apt === null ? self : 0.5 * self + 0.5 * apt;
      out[s.key] = { key: s.key, label: s.label, self, apt, level: blended };
    });
    return out;
  }

  function valueLevels(answers, quiz) {
    const out = {};
    quiz.values.forEach((v) => { out[v.key] = { key: v.key, label: v.label, text: v.text, level: clamp((Number(answers.values[v.key] ?? 3) - 1) / 4) }; });
    return out;
  }

  // Blend absolute level with level relative to the person's own average, so that
  // "rates everything high" and "rates everything low" do not swamp the match.
  function fitFrom(levels, overallMean) {
    const abs = mean(levels);
    const rel = clamp(0.5 + (abs - overallMean) * 1.5);
    return 0.5 * abs + 0.5 * rel;
  }

  function insights(skills) {
    const notes = [];
    ["verbal", "numeric", "spatial", "mechanical"].forEach((k) => {
      const s = skills[k];
      if (s.apt === null) return;
      if (s.self - s.apt >= 0.4) notes.push({ kind: "practice", key: k, text: "You feel confident with " + s.label.toLowerCase() + ", but the skill check was tougher. A little practice here could pay off." });
      else if (s.apt - s.self >= 0.4) notes.push({ kind: "hidden", key: k, text: "You did better on the skill check than you expected for " + s.label.toLowerCase() + ". This may be a hidden strength." });
    });
    return notes;
  }

  function score(answers, quiz, careers) {
    const raw = interestScores(answers, quiz);
    const top3 = hollandCode(raw);
    const userCentered = centered(raw);
    const skills = skillLevels(answers, quiz);
    const values = valueLevels(answers, quiz);
    const skillMean = mean(Object.values(skills).map((s) => s.level));
    const valueMean = mean(Object.values(values).map((v) => v.level));

    const scored = careers.map((c, idx) => {
      const cos = cosine(userCentered, centered(careerVector(c.code)));
      const interestFit = 0.75 * ((cos + 1) / 2) + 0.25 * codeAgreement(top3, c.code);
      const skillsFit = fitFrom(c.skills.map((k) => skills[k].level), skillMean);
      const valuesFit = fitFrom(c.values.map((k) => values[k].level), valueMean);
      const total = W.interest * interestFit + W.skills * skillsFit + W.values * valuesFit;
      return { career: c, idx, total, parts: { interest: interestFit, skills: skillsFit, values: valuesFit } };
    }).sort((a, b) => b.total - a.total || a.idx - b.idx);

    // Variety: at most 3 careers from one cluster in the top 5.
    const top = [], clusterCount = {};
    for (const m of scored) {
      const n = clusterCount[m.career.cluster] || 0;
      if (n >= 3) continue;
      clusterCount[m.career.cluster] = n + 1;
      top.push(m);
      if (top.length === 5) break;
    }

    const typeName = (t) => quiz.TYPES[t].name;
    const matches = top.map((m) => {
      const userTopSet = new Set(top3);
      const shared = m.career.code.split("").filter((ch) => userTopSet.has(ch)).map(typeName);
      const strongSkills = m.career.skills
        .map((k) => skills[k]).filter((s) => s.level >= 0.6)
        .map((s) => s.key === "handson" ? "hands-on work" : s.key).slice(0, 2);
      let why = shared.length
        ? "Fits your " + shared.join(" and ").toLowerCase() + " interests"
        : "Related to your wider interest pattern";
      if (strongSkills.length) why += ", and uses skills you rated well (" + strongSkills.join(", ") + ").";
      else why += ".";
      return { career: m.career, percent: Math.round(m.total * 100), parts: m.parts, why };
    });

    return {
      interestRaw: raw,
      hollandCode: top3,
      skills: Object.values(skills),
      values: Object.values(values).sort((a, b) => b.level - a.level),
      insights: insights(skills),
      matches
    };
  }

  // Merge college links across the top careers. UNLV, UNR, CSN always come first.
  function collegesFor(matches, colleges) {
    const byInst = {};
    matches.forEach((m) => {
      (colleges.FIELDS[m.career.field] || []).forEach((l) => {
        const g = (byInst[l.inst] = byInst[l.inst] || { inst: colleges.INST[l.inst], links: {} });
        const key = l.url + "|" + l.label;
        const e = (g.links[key] = g.links[key] || { label: l.label, url: l.url, careers: [] });
        if (!e.careers.includes(m.career.title)) e.careers.push(m.career.title);
      });
    });
    return Object.values(byInst)
      .sort((a, b) => a.inst.rank - b.inst.rank)
      .map((g) => ({ inst: g.inst, links: Object.values(g.links) }));
  }

  // Per-career links, same ordering rule.
  function collegesForCareer(career, colleges) {
    return (colleges.FIELDS[career.field] || []).slice().sort((a, b) => colleges.INST[a.inst].rank - colleges.INST[b.inst].rank);
  }

  const api = { score, collegesFor, collegesForCareer, interestScores, hollandCode, TYPE_ORDER, W };
  root.WCTA_SCORING = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
