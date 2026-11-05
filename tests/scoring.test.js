// Run: node tests/scoring.test.js
const path = require("path");
global.window = global;
const js = (f) => require(path.join(__dirname, "..", "assets", "js", f));
js("questions.js"); js("careers.js"); js("colleges.js");
const S = js("scoring.js");
const Q = window.WCTA_QUIZ, C = window.WCTA_CAREERS, COL = window.WCTA_COLLEGES;

let fails = 0;
const ok = (cond, msg) => { console.log((cond ? "PASS " : "FAIL ") + msg); if (!cond) fails++; };

// ---- data integrity
ok(Q.interestItems.length === 60, "60 interest items");
["R","I","A","S","E","C"].forEach(t => ok(Q.interestItems.filter(i => i.type === t).length === 10, "10 items for " + t));
ok(Q.skills.length === 12, "12 skill self-ratings");
ok(Q.aptitude.length === 12, "12 skill-check items");
ok(Q.values.length === 6, "6 work values");
const skillKeys = new Set(Q.skills.map(s => s.key)), valueKeys = new Set(Q.values.map(v => v.key));
ok(C.every(c => c.skills.every(k => skillKeys.has(k))), "career skill keys all valid");
ok(C.every(c => c.values.every(k => valueKeys.has(k))), "career value keys all valid");
ok(C.every(c => /^[RIASEC]{3}$/.test(c.code)), "career codes are 3 RIASEC letters");
ok(C.every(c => COL.FIELDS[c.field] && COL.FIELDS[c.field].length), "every career has college links");
ok(new Set(C.map(c => c.id)).size === C.length, "career ids unique");

// shape question sanity: exactly one option equals a rotation of ref
const key = (cells) => cells.map(c => c.join(",")).sort().join("|");
const norm = (cells) => { const mx = Math.min(...cells.map(c=>c[0])), my = Math.min(...cells.map(c=>c[1])); return cells.map(([x,y])=>[x-mx,y-my]); };
const rot = (cells) => norm(cells.map(([x,y]) => [-y,x]));
Q.aptitude.filter(q => q.shape).forEach(q => {
  const rots = [q.shape.ref, rot(q.shape.ref), rot(rot(q.shape.ref)), rot(rot(rot(q.shape.ref)))].map(key);
  const matches = q.shape.options.map((o, i) => rots.includes(key(norm(o))) ? i : -1).filter(i => i >= 0);
  ok(matches.length === 1 && matches[0] === q.shape.answer, q.id + " has exactly one rotation match at the keyed answer");
});

// ---- helpers to build answer sets
function answers({ likeTypes = [], dislikeTypes = [], flat = null, selfHigh = [], apt = "all", valuesHigh = [] }) {
  const a = { interest: {}, skillSelf: {}, apt: {}, values: {} };
  Q.interestItems.forEach(it => { a.interest[it.id] = flat !== null ? flat : likeTypes.includes(it.type) ? 4 : dislikeTypes.includes(it.type) ? 0 : 2; });
  Q.skills.forEach(s => { a.skillSelf[s.key] = selfHigh.includes(s.key) ? 5 : 3; });
  Q.aptitude.forEach(q => { a.apt[q.id] = apt === "all" ? (q.shape ? q.shape.answer : q.answer) : 0; });
  Q.values.forEach(v => { a.values[v.key] = valuesHigh.includes(v.key) ? 5 : 3; });
  return a;
}

// ---- behavior
let r = S.score(answers({ likeTypes: ["R"], dislikeTypes: ["S","A"], selfHigh: ["mechanical","handson"] }), Q, C);
ok(r.hollandCode[0] === "R", "all-Realistic answers give Holland code starting with R (" + r.hollandCode.join("") + ")");
ok(r.matches.length === 5, "five matches returned");
ok(r.matches.filter(m => m.career.code[0] === "R").length >= 3, "Realistic answers yield mostly R-led careers: " + r.matches.map(m => m.career.title).join(", "));

r = S.score(answers({ likeTypes: ["S"], dislikeTypes: ["R","C"], selfHigh: ["people"], valuesHigh: ["relationships"] }), Q, C);
ok(r.hollandCode[0] === "S", "Social answers give code starting with S");
ok(r.matches.filter(m => m.career.code.includes("S")).length >= 3, "Social answers yield S-heavy careers: " + r.matches.map(m => m.career.title).join(", "));

r = S.score(answers({ likeTypes: ["I","R"], dislikeTypes: ["S","E"], selfHigh: ["technical","numeric","persistence"] }), Q, C);
ok(r.matches.some(m => m.career.cluster === "Information Technology" || m.career.cluster === "Engineering"), "Investigative + technical answers surface IT or engineering: " + r.matches.map(m => m.career.title).join(", "));

r = S.score(answers({ flat: 2 }), Q, C);
ok(r.matches.length === 5 && r.matches.every(m => Number.isFinite(m.percent)), "flat 'unsure' answers still produce finite results");

r = S.score(answers({ flat: 4 }), Q, C);
ok(r.matches.length === 5 && r.matches.every(m => m.percent >= 0 && m.percent <= 100), "'likes everything' answers stay within 0-100%");

// variety rule
r = S.score(answers({ likeTypes: ["S","I"], selfHigh: ["people","scientific"] }), Q, C);
const clusterCounts = {}; r.matches.forEach(m => clusterCounts[m.career.cluster] = (clusterCounts[m.career.cluster]||0)+1);
ok(Math.max(...Object.values(clusterCounts)) <= 3, "no cluster appears more than 3 times in top 5");

// ---- college ordering rule: UNLV, UNR, CSN first
r = S.score(answers({ likeTypes: ["S","I"], selfHigh: ["people","scientific"] }), Q, C);
const groups = S.collegesFor(r.matches, COL);
const ids = groups.map(g => g.inst.id);
const firstThree = ids.filter(id => ["unlv","unr","csn"].includes(id));
ok(ids.slice(0, firstThree.length).every(id => ["unlv","unr","csn"].includes(id)), "UNLV/UNR/CSN come before all other schools: " + ids.join(", "));
ok(ids.indexOf("unlv") < ids.indexOf("unr") || ids.indexOf("unr") < 0 || ids.indexOf("unlv") < 0, "UNLV precedes UNR");
C.forEach(c => {
  const links = S.collegesForCareer(c, COL);
  const rank = links.map(l => COL.INST[l.inst].rank);
  if (!rank.every((x, i) => i === 0 || rank[i-1] <= x)) { ok(false, "per-career ordering for " + c.id); }
});
ok(true, "per-career link ordering checked for all " + C.length + " careers");

console.log(fails ? "\n" + fails + " FAILED" : "\nAll tests passed");
process.exit(fails ? 1 : 0);
