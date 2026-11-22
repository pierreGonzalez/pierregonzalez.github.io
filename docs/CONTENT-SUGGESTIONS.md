# Content & site suggestions

Prioritised. P0 = fix now, P1 = high value, P2 = nice to have. Nothing here has been applied to `index.html` yet — pick items and open PRs.

## Positioning: what the page says vs. what you want to be hired for
Your header says "CLM Expert & Product Innovator" and the About line mentions "AI-native SDLC" only in a small caption. The body is almost entirely banking BPMN/ETL, and "CLM" (client lifecycle management) never appears again. A reader can't tell what you want next.

**Suggested headline:** "Banking workflow engineer & AI-native builder" (or your real target title), then a 2-line summary:
> 10+ years building software for Swiss banks and insurers — from Appway BPMN client-onboarding workflows to Talend/Azure data migrations. I now ship end-to-end with AI-assisted development (Claude Code, OpenAI API) and run my own product, Seize Your Time.

## P0 — Bugs & hygiene
1. **Privacy:** the page publishes your phone, home address and (via `scripts/main.js`) your birth date, in a public repo. Remove address and DOB-derived age; keep one contact (email or LinkedIn). Use a contact form or `mailto:` only. Also remove the DOB from the JS.
2. **Missing file:** modal references `images/DASHBOARD_CV.png` (doesn't exist, modal never opened). Delete the modal or add the screenshot — a Power BI monitoring dashboard screenshot (anonymised) would actually be a strong visual.
3. **Typos:** "Ai&ML Prost graduate" → "AI & ML Postgraduate Diploma"; "EILTS" → "IELTS"; "Mirbaud" → "Mirabaud" (title, raw_text); "bitbucker" alt; "dahsboard"; "Ai for trading" → "AI for Trading"; "I Worked for…" → "I worked…"; "Avenue d'epenex".
4. **Title tag** is `CH RESUME PGZ`. Make it `Pierre Gonzalez — Banking Workflow & AI Engineer | CV`. Add `<meta name="description">`, Open Graph/Twitter tags (LinkedIn previews!), favicon, `<link rel="canonical">`, and JSON-LD `Person`.
5. **Accessibility:** avatar `<img>` has no `alt`; progress bars lack `aria-valuenow`/labels; small grey `text-muted` text is below AA contrast; hover effects set inline styles from JS (use CSS `:hover`).
6. **Repo hygiene:** `.DS_Store` files were tracked (now ignored), `README.txt`/`raw_text.txt` are template leftovers, unminified `bootstrap.css` is shipped but unused, `diplomas/grade Columbia.pdf` (a transcript) and ID-style documents are publicly downloadable — consider whether you want grades public.
7. **Consistency:** the Education section omits the Venture Lab course your SYT blurb cites; add it or drop the mention. IELTS results are 2-year valid — show the test date.

## P1 — Present your experience better
### a) Lead with outcomes, not duties
Each card's collapsed state should answer "so what?". Example for BCGE:
- Before: "Drove digital transformation in retail banking using Agile methodologies…"
- After: "Cut front-office onboarding from 45 → 18 min by digitising it on Appway (BCGE, 2020–22)."
Keep only metrics you can defend (see `docs/cv-facts.md`). Replace unverifiable precision (98%, 90%, 85%) with ranges or concrete facts (number of workflows shipped, systems integrated).

### b) Show the through-line
A 4-line "Career in one glance" strip above the timeline:
`Full-stack dev (2015–18) → Integration/infra (2018) → BPMN/workflow dev in banks (2019–now) → Data migration lead (2022–23) → AI-assisted product builder (2025–)`
That story (developer → process automation → data → AI) is your differentiator.

### c) Fix the skills section
- Percentage bars are meaningless to recruiters and hurt credibility (Python 90% with no Python role on the CV; Java 85% but last used in 2018).
- Replace with grouped tags: **Workflow & Integration** (Appway BPMN, REST, Axway, GoAnywhere) · **Data** (SQL, Talend, Power BI/DAX, Azure Synapse/Blob, Python/pandas/scikit-learn) · **Software** (Java/Spring Boot, React, Docker, Git) · **AI** (OpenAI API, prompt/agent design, Claude Code) · **Practices** (Agile, Jira, Confluence, CI).
- Add a "currently using / familiar / dated" tier honestly (Java, React, MongoDB are 2015–18).
- Keep language levels but as text (`English — IELTS 7.5 (C1)`, `French — native`), not 4 bars each.

### d) Make the AI-native SDLC claim provable
You list "AI-native SDLC" but show no evidence. Add a **"How I build with AI"** section or SYT sub-block:
- Workflow: spec → agent plan → small PRs → CI → human review.
- Concrete artefacts: link this repo's `AGENTS.md` and CI, SYT's repo (if public), a before/after of cycle time (e.g., "MVP in 4 months solo").
- Tools: Claude Code, OpenAI API, Copilot — and what you do *not* delegate (reviews, data-model decisions, security).
- Guardrails you apply in regulated contexts (no client data in prompts, anonymisation, review gates). For a banking audience this is a selling point.
- If you use AI at UBP today, say how (e.g., test-case generation, BPMN documentation, incident triage) — only if permitted by your employer.

### e) Side project → case study
SYT deserves a mini case study (problem, users, stack, what you'd do differently) plus screenshot/GIF and live link above the fold. Also show real traction (users, retention), not just "35 beta users", and note it's solo-built.

### f) Experience details worth adding (confirm facts first)
- **UBP 2023–present:** scale (number of workflows/users supported), what you shipped in the last 12 months, any AI/automation initiative, regulatory context (e.g., KYC/FATCA/MiFID), on-call/SLA.
- **Mirabaud:** name the target core-banking system if shareable (or "a leading Swiss core-banking platform"), migration waves, defects found in reconciliation, how Power BI monitoring was used at go-live.
- **BCGE/UBP:** which processes (Client Onboarding, Credit Request, Rental Guarantee) were end-to-end owned by you vs. team; team size.
- **SmartWave:** currently two bullets and no impact — add scale (number of services migrated) or merge into a "Earlier roles" group.
- **IBM CIC:** Edward's reference says you worked under IBM CIC 2019–2021, but no IBM role appears. Make the employment chain explicit (e.g., "UBP via IBM CIC").
- Seniority: "Led", "Architected", "Owned" — only where true.

### g) Certifications & learning
Group Education into **Degree** and **Continuing education**; move the Appway trainings to a "Certifications" line with the product versions. Add 2024–26 AI learning (courses, model/agent-building) so the CV doesn't stop at 2022.

## P2 — Design & tech
- Add a **Download PDF** button (you already have `css/print.css`; generate with Playwright in CI so the PDF never goes stale) and a one-page "recruiter view".
- Light/dark mode, a sticky section nav (Experience · Projects · Skills · Education), and replace icon-only LinkedIn with a visible Contact CTA.
- Add GitHub and email links; consider a 3-item "Selected work" row above the timeline.
- Performance: lazy-load logos, convert JPEGs to WebP, self-host fonts, drop unused Bootstrap/Font Awesome weights (Lighthouse CI in `ci.yml`).
- Track content in data (`data/cv.json`) and render with a tiny script so the web page, PDF and LinkedIn text come from one source — the natural next step for an agent-friendly repo.
- Add `robots.txt`/`sitemap.xml`; consider a `llms.txt` summarising your profile for AI search crawlers.

## Suggested order of work (each = one small PR)
1. Privacy + typos + title/meta/favicon (P0 1–4)
2. Skills section rewrite (P1c)
3. Headline/summary + career strip (Positioning, P1b)
4. "How I build with AI" section + SYT case study (P1d–e)
5. Outcome-first rewrite of each role after you confirm metrics (P1a, P1f)
6. PDF export + Lighthouse CI (P2)

## Implementation status
**Done:** privacy (address, phone, age/DOB script removed), typos, title/meta/OG/JSON-LD/favicon, headline + summary, career strip, "How I build with AI" section, skills as grouped tags, languages as text, IBM CIC / Serial context, text-muted contrast, robots.txt, sitemap.xml, llms.txt, template leftovers removed.

**Still needs Pierre (facts or assets):**
- Confirm or soften the metrics listed in `docs/cv-facts.md` before rewriting roles outcome-first (P1a, P1f).
- Real SYT traction, screenshot/GIF and case-study details (P1e).
- Venture Lab course date for the Education section; IELTS test date.
- Whether the Columbia transcript (`diplomas/grade Columbia.pdf`) should stay public; the old DOB remains in git history.
- Contracting entity for UBP 2023–present.
- PDF export, Lighthouse CI and `data/cv.json` (P2) are not started.
