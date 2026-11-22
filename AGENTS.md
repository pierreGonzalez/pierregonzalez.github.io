# AGENTS.md

Guidance for AI coding agents (Claude Code, Copilot, Cursor, Codex…) working in this repo.
Humans: this is also the contributor guide.

## What this is
Pierre Gonzalez's online CV, published at https://pierregonzalez.github.io via GitHub Pages.
Static site: **one page (`index.html`)**, Bootstrap 5 + AOS + Font Awesome, no build step, no framework.
It was started from a purchased "OnlineResume" template; `README.txt` is leftover template text.

## Layout
| Path | Purpose |
|---|---|
| `index.html` | The whole CV (header, about, side project, experience, skills, education, references) |
| `css/main.css`, `css/site.css`, `css/print.css` | Site styles. `bootstrap*.css`, `aos.css`, `font-awesome/` are vendored — **do not edit** |
| `scripts/i18n.js`, `scripts/i18n-fr.js` | EN/FR toggle. English text lives in `index.html`; French in `i18n-fr.js`, keyed by the exact English text. **Any English text change needs a matching FR entry** (`npm run i18n` enforces it) |
| `scripts/main.js` | Site JS (age calc, hover/collapse tweaks). `bootstrap.bundle.min.js`, `aos.js` are vendored — **do not edit** |
| `images/`, `images/icon/` | Avatar, reference photos, tech logos |
| `diplomas/`, `documents/`, `syllabus/` | PDFs linked from the Education/Skills sections |
| `docs/cv-facts.md` | **Source of truth** for every claim and metric on the CV (see below) |
| `docs/CONTENT-SUGGESTIONS.md` | Backlog of proposed content improvements |
| `.github/workflows/` | `jekyll-gh-pages.yml` deploys `main`; `ci.yml` validates PRs |

## Commands
```powershell
npm install          # once (dev tools only; nothing ships from node_modules)
npm run lint         # html-validate on index.html
npm run links        # check internal links/assets resolve
npm run i18n         # every English text node has a French entry
npm run check        # lint + links + i18n  (run before every commit)
npm run serve        # local preview at http://localhost:8080
```

## Workflow (how we work with agents)
1. Branch from `main` (`feat/…`, `fix/…`, `content/…`). Never push to `main` directly — it auto-deploys.
2. Make the smallest change that does the job. One concern per PR.
3. Run `npm run check`. For visual changes also check mobile width (375px) **and** print preview (`css/print.css`) — the CV is printed to PDF.
4. Open a PR using the template. CI must be green. A human reviews and merges.

## Rules for content edits (important)
- **Never invent facts.** Employers, dates, titles, metrics, certificates come only from `docs/cv-facts.md` or from the user in this session. If a number isn't there, ask or leave it out.
- When you change a claim in `index.html`, update `docs/cv-facts.md` in the same PR.
- Keep each experience card's structure (header → logos → summary + badges → collapsible details). IDs `detail_WE*` must stay unique and match `href`/`aria-controls`.
- Spelling of proper nouns: **Mirabaud**, **Appway**, **GoAnywhere**, **Bitbucket**, **IELTS**, **Postgraduate**.
- Tone: concise, first-person, outcome-oriented, verbs first. No buzzword stacking.

## Privacy / safety rules
- This is a public repo. Do **not** add home address, date of birth, ID numbers, or extra personal contact details. (Existing ones are flagged in `docs/CONTENT-SUGGESTIONS.md` for removal.)
- Do not commit secrets, `.env`, analytics keys with write access, or private client/bank information. Anonymise employer-internal details (system names, volumes) unless cleared in `docs/cv-facts.md`.
- Don't add third-party trackers or CDNs without asking.

## Code conventions
- HTML: valid, semantic, 2-space indent, every `<img>` has meaningful `alt` (empty `alt=""` only if decorative). Prefer Bootstrap utility classes over inline `style=`.
- CSS: add new rules to `css/main.css`; keep print rules in `css/print.css`.
- JS: vanilla ES2015+, no new dependencies. Keep it in `scripts/main.js`.
- Accessibility target: WCAG 2.1 AA (contrast, keyboard-operable collapses, `aria-valuenow` on progress bars if kept).
- Performance: images ≤ 200 KB, `width`/`height` set, `loading="lazy"` below the fold.

## Definition of done
- [ ] `npm run check` passes
- [ ] Checked at 375px, 1280px and print preview
- [ ] `docs/cv-facts.md` updated if any claim changed
- [ ] No personal data added; no vendored files edited
- [ ] PR description says what changed and why
