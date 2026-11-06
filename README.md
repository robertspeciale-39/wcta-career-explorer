# WCTA Career Explorer (Phase 1 mock-up)

A career-interest quiz for high school students at West Career & Technical Academy. Static site: plain HTML, CSS, and JavaScript. No build step, no backend, no tracking.

## Run it
Open `index.html` through any static server, for example `python3 -m http.server` and visit http://localhost:8000. Scoring tests: `node tests/scoring.test.js`.

## What it does
1. Animated splash: 1s and 0s assemble the West CTA logo (once per session, skippable, respects reduced motion).
2. Landing page: quiz description, methodology summary, APA references.
3. Quiz (about 12 to 15 minutes, 90 items): 60 interest items, 12 skill self-ratings, 12 original skill-check items, 6 work values.
4. Results: interest radar, strengths and growth areas, work values, top 5 careers with fit scores, and college programs in Nevada, Utah, and Arizona (one tab per state). Nevada always comes first, with UNLV, UNR, and CSN at the top. Career cards show Nevada programs and name the Utah and Arizona schools that also fit.
5. Email results: mock-up only. Validates the address, blocks school domains, shows a confirmation. Nothing is sent or stored.

## Methodology
- Interests follow Holland's RIASEC model and the O*NET Interest Profiler Short Form structure (10 items per type, rated 0 to 4, scores 0 to 40).
- Skills and values follow the ASVAB Career Exploration Program idea of combining interests, abilities, and work values. All items are original; none are copied from the ASVAB.
- Matching: interest scores are centered on the student's own mean, then compared with each career's RIASEC profile (cosine similarity plus Holland code agreement). Overall fit = 60% interests, 25% skills, 15% values. No more than 3 careers from one cluster appear in the top 5.
- Results are a starting point for exploring, not a prediction. The skill check is a short screener, not a validated test.

## Sources (APA 7)
- Ertl, B., Hartmann, F. G., & Wunderlich, A. (2022). Interest congruence and outcomes in educational and vocational contexts. *Frontiers in Psychology, 13*, Article 816620. https://doi.org/10.3389/fpsyg.2022.816620
- Holland, J. L. (1997). *Making vocational choices: A theory of vocational personalities and work environments* (3rd ed.). Psychological Assessment Resources.
- Nye, C. D., Su, R., Rounds, J., & Drasgow, F. (2012). Vocational interests and performance: A quantitative summary of over 60 years of research. *Perspectives on Psychological Science, 7*(4), 384-403. https://doi.org/10.1177/1745691612449021
- O*NET Resource Center. Interest Profiler. https://www.onetcenter.org/IP.html
- U.S. Department of Defense. ASVAB Career Exploration Program. https://www.asvabprogram.com

## Known gaps to review before wider use
- Career RIASEC codes are approximations. Cross-check them against O*NET OnLine.
- College links: UNLV and CSN pages were checked. UNR links point to the colleges-and-schools hub because individual UNR pages could not be checked. NSU and TMCC pages block automated checks, so verify them by hand.
- Utah and Arizona schools (added Nov 2026): University of Utah, Utah State, BYU, Utah Valley, Weber State, Southern Utah, Utah Tech, Salt Lake CC, Arizona State, University of Arizona, Northern Arizona, Grand Canyon, Maricopa Community Colleges, and Pima CC. Every link was checked on Nov 5, 2026 (status and page title) except Maricopa, which blocks automated checks. Links go to the college or school that houses each program, not to individual majors. Utah Tech, NAU, Maricopa, and Pima use a catalog or program search page for some fields, and those links say so. To add a school, add an entry to `OUT_OF_STATE` in `assets/js/colleges.js`; `FIELD_AREAS` maps its program areas to careers.
- The school email block covers `*.ccsd.net` and addresses containing "k12". Confirm the student email domain with CCSD.

## Phase 2 ideas (not built)
Real email delivery through a serverless function, teacher dashboard and class reports, local labor-market data. Anything that stores or sends student data needs a FERPA and COPPA review and a verified sending domain first.
