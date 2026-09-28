# Personal Website Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved academic-editorial refresh across the Home, Publications, Vitae, and Smart Grid TF pages without changing the primary page names or introducing a new front-end framework.

**Architecture:** Keep the existing static HTML + shared `index.css` + Bootstrap 4 structure. Move common visual rules into `index.css`, use small semantic class additions in each page, and preserve existing content and verified links. Validate the result through static checks and Playwright-rendered desktop/mobile pages.

**Tech Stack:** HTML5, CSS3, Bootstrap 4.3.1, existing inline Google Analytics/JSON-LD, local static server, Playwright/Chromium for visual verification.

---

## File map and responsibilities

- `index.css`: shared design tokens, typography, navigation, layout, buttons, cards, timelines, publication styles, Smart Grid TF styles, responsive rules, focus states, and reduced-motion behavior.
- `index.html`: Home page structure and section order; preserve the existing profile, research, project, news, publication, and contact content while changing wrappers/classes where required.
- `index_publication.html`: complete bibliography layout; add summary/navigation wrappers and semantic publication/year grouping without changing bibliographic facts or verified URLs.
- `index_vitae.html`: academic profile layout; organize existing grants, awards, experience, service, and education into the approved profile/timeline/sidebar structure.
- `smartgrid.html`: Task Force hero, navigation cards, activity grouping, and page-specific semantic markup; retain existing external destinations.
- `index.js`: inspect only; no change is expected because the approved design does not require new client-side state or filtering.

## Implementation constraints

- Do not rename `Home`, `Publications`, `Vitae`, or `Smart Grid TF`.
- Do not use `Evidence`, `Academic Signals`, `Researcher Brand`, or `Dashboard` as visible Home section names.
- Do not add unverified counts, awards, rankings, citations, or impact claims.
- Do not add a CMS, backend, build pipeline, front-end framework, or complex publication filter.
- Preserve all current publication text and verified links unless a markup-only move is required.
- Use `index.css` as the primary style source; remove duplicated inline page styles only after equivalent shared selectors exist.

---

### Task 1: Establish the shared design system

**Files:**
- Modify: `index.css`
- Test: existing four HTML pages through the static browser check in Task 6

- [ ] **Step 1: Record the current baseline before changing CSS**

Run:

```powershell
git status --short
Select-String -Path index.html,index_publication.html,index_vitae.html,smartgrid.html -Pattern '<title>|<h1|<h2|class="site-header"|class="site-footer"' | Select-Object Path,LineNumber,Line
```

Expected: only the design-document commit is present in Git history; the command lists the current page titles and shared header/footer markers.

- [ ] **Step 2: Replace the shared token block with the approved roles**

In `index.css`, keep the existing `:root` approach and define the shared roles below without changing the existing external dependencies:

```css
:root {
  --ink: #102a43;
  --navy: #12355b;
  --teal: #008c95;
  --gold: #b88700;
  --blue: #1772d0;
  --muted: #52616b;
  --line: #d9e2ec;
  --surface: #ffffff;
  --surface-soft: #f7f9fb;
  --shadow-sm: 0 8px 24px rgba(16, 42, 67, 0.08);
  --shadow-md: 0 18px 42px rgba(16, 42, 67, 0.12);
  --content-width: 1120px;
  --page-gutter: 20px;
  --radius-sm: 6px;
  --radius-md: 10px;
}
```

Keep the current navy/teal/gold palette; the new variables only make the roles and reusable layout values explicit.

- [ ] **Step 3: Implement the shared frame, typography, focus, and motion rules**

Ensure `body`, `main`, `.site-nav`, and `.site-footer` use the shared frame. Add or update these rules:

```css
main,
.site-nav,
.site-footer {
  width: min(var(--content-width), calc(100% - (var(--page-gutter) * 2)));
  margin-inline: auto;
}

:where(a, button, .button):focus-visible {
  outline: 3px solid rgba(0, 140, 149, 0.35);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Keep body text at 15–16px, make metadata smaller but readable, and remove any rule that forces all heading levels to the same visual size.

- [ ] **Step 4: Normalize navigation, buttons, cards, links, and section headings**

Update the existing selectors rather than adding competing variants:

- `.site-header`, `.site-nav`, `.site-brand`, and `.nav-link` share one sticky, translucent header treatment;
- `.button.primary` is navy and changes to teal on hover/focus;
- `.button` is the secondary white/bordered variant;
- `.content-section` uses 48–72px vertical rhythm;
- `.section-heading` uses a modest `h2`, not a repeated oversized display heading;
- cards use a thin border, `var(--radius-md)`, and `var(--shadow-sm)`;
- links use teal/blue consistently and have visible hover/focus states.

Do not remove the Bootstrap collapse classes used by the existing mobile navbar.

- [ ] **Step 5: Add the shared responsive rules**

At the existing mobile breakpoint or a new `@media (max-width: 767.98px)` block, make all two-column layouts one column, reduce hero and section padding, allow publication metadata to wrap, and set:

```css
html,
body {
  overflow-x: hidden;
}
```

Do not hide content or truncate publication titles to solve mobile width problems.

- [ ] **Step 6: Commit the shared stylesheet foundation**

```powershell
git add index.css
git commit -m "refactor: establish shared academic site design system"
```

---

### Task 2: Rebuild the Home information hierarchy

**Files:**
- Modify: `index.html`
- Modify: `index.css` for Home-only semantic classes that are not covered in Task 1

- [ ] **Step 1: Preserve the existing Home facts and link targets**

Before moving markup, collect the current URLs and text for the profile links, Publications, Google Scholar, AI-Ops Dashboard, Power Agent Demo, project papers, news items, and contact link. Do not rewrite names, affiliations, publication titles, or URLs unless the existing target is demonstrably broken.

- [ ] **Step 2: Keep the existing navigation but remove overly broad Home-only labels**

Keep the primary page links (`Home`, `Publications`, `Vitae`, `Smart Grid TF`). Keep the existing project links if they are part of the current navigation, but make sure the active state remains on `Home`. Do not add a new page name.

- [ ] **Step 3: Convert the hero to the approved Introduction structure**

Keep `.hero-section` and the profile panel, but make the left side contain, in order:

1. research descriptor;
2. `Cheng He` and `何成`;
3. current role;
4. affiliation;
5. one concise research statement;
6. one short summary;
7. primary links to Publications, research content, and Google Scholar.

Keep the right side for the photograph, academic/professional links, and compact factual publication counts. If counts are displayed, use the current maintained values `58` journals, `32` conferences, and `2` preprints and label them explicitly.

- [ ] **Step 4: Reorder and rename Home sections without changing primary page names**

Use these section IDs and visible headings:

```html
<section id="research" ...>
  <p class="eyebrow">Research areas</p>
  <h2>Research Areas</h2>
</section>

<section id="selected-research" ...>
  <p class="eyebrow">Selected work</p>
  <h2>Selected Research</h2>
</section>

<section id="news" ...>
  <p class="eyebrow">Recent news</p>
  <h2>Recent News</h2>
</section>

<section id="collaboration" ...>
  <p class="eyebrow">Open to collaboration</p>
  <h2>Collaboration</h2>
</section>
```

Move the current prototype cards into `Selected Research` before the representative paper cards. Remove the separate `impact-section` from the Home page; do not recreate it under a different marketing name. Preserve useful factual items by keeping them in the hero or Vitae.

- [ ] **Step 5: Simplify research cards and selected research cards**

Each research-area card must contain a title, one concise problem–method–application description, and no more than two tags. Each selected-research card must contain the current title, venue/project label, short description, and only links that exist (`Paper`, `Code`, `Poster`, `Demo`, or equivalent).

- [ ] **Step 6: Convert Recent News to a compact timeline**

Keep the five or six most recent existing items in the visible Home list. Use a date column and a content column. Preserve the existing dates and links; do not invent activity dates. If older content is retained, move it below the visible list without making it compete with the first screen.

- [ ] **Step 7: Commit the Home hierarchy**

```powershell
git add index.html index.css
git commit -m "refactor: clarify home research narrative"
```

---

### Task 3: Make Publications a scannable bibliography

**Files:**
- Modify: `index_publication.html`
- Modify: `index.css`

- [ ] **Step 1: Add the summary and in-page navigation wrappers**

Immediately below the page heading, add a compact summary with the maintained counts and anchors:

```html
<nav class="publication-summary" aria-label="Publication summary">
  <a href="#journals"><strong>58</strong><span>Journals</span></a>
  <a href="#preprints"><strong>2</strong><span>Preprints</span></a>
  <a href="#conferences"><strong>32</strong><span>Conferences</span></a>
  <a href="#journals"><strong>92</strong><span>Total works</span></a>
</nav>
<nav class="publication-jump" aria-label="Jump to publication type">
  <a href="#journals">Journals</a>
  <a href="#preprints">Preprints</a>
  <a href="#conferences">Conferences</a>
</nav>
```

Use the existing counts only if the actual section totals still match. Keep Google Scholar as a secondary link in the introductory paragraph or action row.

- [ ] **Step 2: Add semantic IDs and year grouping without changing bibliography facts**

Set the three section IDs to `journals`, `preprints`, and `conferences`. Within each existing ordered list, insert a small year marker before the first entry of each descending year represented in that list, using the exact year already present in the entry. Do not alter titles, authors, venue names, DOI strings, or verified URLs.

- [ ] **Step 3: Normalize publication item markup**

Use the existing `pub-list`, `pub-title`, `pub-venue`, and `pub-links` patterns consistently. Ensure every item has:

1. title;
2. author line with Cheng He distinguishable;
3. venue/year metadata;
4. DOI or source links in a separate link row.

Replace long inline style fragments with shared classes. Do not force titles to ellipsis or fixed-height containers.

- [ ] **Step 4: Add bibliography CSS**

Add rules in `index.css` for the summary grid, jump navigation, year markers, publication item spacing, title/metadata hierarchy, and wrapped link rows. At mobile width, make the summary two columns and keep link targets at least 40px tall without making the bibliography cards excessively tall.

- [ ] **Step 5: Commit the Publications layout**

```powershell
git add index_publication.html index.css
git commit -m "refactor: improve publication bibliography scanning"
```

---

### Task 4: Convert Vitae to a timeline with supporting information

**Files:**
- Modify: `index_vitae.html`
- Modify: `index.css`

- [ ] **Step 1: Preserve every existing Vitae fact and external link**

Keep the current name, role, affiliation, dates, institutions, grant entries, awards, editorial service entries, education, and linked supervisors. Only change wrappers, ordering, and presentation.

- [ ] **Step 2: Create the profile overview and two-column content shell**

Keep the current `Academic profile` heading, then use a profile overview containing name, role, affiliation, research summary, direction tags, and the existing contact/CV action if present. Wrap the remaining content in a main timeline column and a supporting information column.

- [ ] **Step 3: Mark Professional Experience and Education as timeline sections**

Use a shared timeline structure with one item per current experience/degree. Each item must expose date, institution, role/degree, and description. Use the existing dates exactly; do not convert them into unsupported relative claims.

- [ ] **Step 4: Move grants, awards, and service into compact supporting lists**

Keep `Research Grants`, `Honors and Awards`, and `Editorial Service` as visible headings. Use compact lists or small grouped panels instead of large repeated cards. Preserve the existing role tags and links.

- [ ] **Step 5: Add responsive timeline rules and commit**

At mobile width, collapse the two-column shell into one column and keep the date readable above each timeline item.

```powershell
git add index_vitae.html index.css
git commit -m "refactor: organize vitae as academic timeline"
```

---

### Task 5: Refine Smart Grid TF as a consistent topic page

**Files:**
- Modify: `smartgrid.html`
- Modify: `index.css`

- [ ] **Step 1: Preserve all existing Task Force destinations**

Keep the current Task Force Home, Mission & Scope, Research Interests, Events & Competitions, Leadership, Members, and PIS Dashboard URLs. Do not redesign the external Smart Grid Task Force site.

- [ ] **Step 2: Move page-specific presentation into shared CSS**

Keep the existing `.tf-*` semantic class names where useful, but move duplicated or page-local visual rules into `index.css`. Retain only structural HTML in `smartgrid.html` unless a local rule is required for a unique component.

- [ ] **Step 3: Implement the topic hero**

Use the current title and committee information in a dark navy hero treatment with teal/gold details, a concise mission description, the Task Force website action, and the existing visual mark. Make the hierarchy clear without introducing a second navigation system.

- [ ] **Step 4: Normalize Task Force navigation cards**

Use one shared card pattern for all existing destinations. Each card must have a title, one-sentence description, and explicit open action. Keep PIS Dashboard as a highlighted research prototype, not as a replacement for the Task Force identity.

- [ ] **Step 5: Group ongoing activities naturally and commit**

Keep the current verified activity items, but group them under readable labels such as Activities, Resources, and Research Prototypes where the content supports that grouping. Do not invent new events or dates.

```powershell
git add smartgrid.html index.css
git commit -m "refactor: clarify smart grid task force page"
```

---

### Task 6: Run cross-page accessibility and visual verification

**Files:**
- Modify: `index.html`, `index_publication.html`, `index_vitae.html`, `smartgrid.html` only for issues found during verification
- Modify: `index.css` only for verified cross-page issues

- [ ] **Step 1: Run static HTML and link checks**

Use PowerShell to confirm all four files have a title, one `h1`, shared navigation/footer, and no obvious empty local links:

```powershell
$pages = 'index.html','index_publication.html','index_vitae.html','smartgrid.html'
foreach ($page in $pages) {
  $html = Get-Content -Raw $page
  if ($html -notmatch '<title>[^<]+</title>') { throw "$page has no title" }
  if (([regex]::Matches($html, '<h1\b')).Count -ne 1) { throw "$page must have exactly one h1" }
  if ($html -notmatch 'class="site-header"') { throw "$page has no shared header" }
  if ($html -notmatch 'class="site-footer"') { throw "$page has no shared footer" }
  if ($html -match 'href="#"') { throw "$page contains an empty anchor" }
}
'HTML shell checks passed.'
```

- [ ] **Step 2: Start a local static server**

Run in a separate terminal:

```powershell
python -m http.server 4173
```

Expected: the repository is served at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Run the Playwright desktop/mobile smoke check**

Run this from the repository root while the server is active:

```powershell
node -e "const { chromium } = require('playwright'); (async()=>{ const b=await chromium.launch({headless:true}); const p=await b.newPage({viewport:{width:1440,height:1000}}); const pages=['index.html','index_publication.html','index_vitae.html','smartgrid.html']; for(const file of pages){ await p.goto('http://127.0.0.1:4173/'+file,{waitUntil:'networkidle'}); const result=await p.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,nav:!!document.querySelector('.site-header .site-nav'),footer:!!document.querySelector('.site-footer')})); if(!result.title||result.h1!==1||result.overflow||!result.nav||!result.footer) throw new Error(file+': '+JSON.stringify(result)); await p.screenshot({path:'site-'+file.replace('.html','')+'-desktop.png',fullPage:true}); } await p.setViewportSize({width:390,height:844}); for(const file of pages){ await p.goto('http://127.0.0.1:4173/'+file,{waitUntil:'networkidle'}); const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth); if(overflow) throw new Error(file+': horizontal overflow at mobile width'); await p.screenshot({path:'site-'+file.replace('.html','')+'-mobile.png',fullPage:true}); } await b.close(); console.log('Playwright desktop/mobile checks passed.'); })().catch(e=>{ console.error(e); process.exit(1); });"
```

Expected: four desktop and four mobile screenshots are produced, each page has one `h1`, shared navigation/footer, and no horizontal overflow.

- [ ] **Step 4: Inspect screenshots for visual regressions**

Open the eight screenshots and check:

- Home first screen presents name, role, research statement, and primary links without crowding;
- Home section order is Introduction → Research Areas → Selected Research → Recent News → Collaboration;
- Publications title/author/metadata/link hierarchy is readable at desktop and mobile widths;
- Vitae timeline does not overlap dates or descriptions;
- Smart Grid TF hero and navigation cards remain within the shared frame;
- no text is clipped, no image is stretched, and no card creates horizontal overflow.

- [ ] **Step 5: Run final repository checks**

```powershell
git diff --check
git status --short
git log --oneline -6
```

Expected: `git diff --check` produces no output; only intended website files and any explicitly retained verification artifacts are present; the task commits are visible in the log.

- [ ] **Step 6: Commit verified fixes**

If Step 4 or Step 5 finds a concrete issue, fix only that issue, rerun the relevant check, and commit:

```powershell
git add index.html index.css index_publication.html index_vitae.html smartgrid.html
git commit -m "fix: address website refresh verification findings"
```

If no issue is found, do not create an empty commit.

---

## Plan self-review

- **Spec coverage:** The plan covers the shared design system, Home section order and naming, Publications summary and grouping, Vitae timeline/sidebar, Smart Grid TF topic treatment, responsive behavior, accessibility, maintenance boundaries, and all acceptance checks.
- **Scope:** The four page areas are coupled by one shared stylesheet and one navigation system, so they remain in one implementation plan rather than being split into unrelated projects.
- **Placeholder scan:** No `TODO`, `TBD`, `FIXME`, or unspecified implementation steps are used. Every task names exact files, commands, expected checks, or concrete markup/selector behavior.
- **Content safety:** Existing factual content and URLs are explicitly preserved; no new claims are required.
- **Verification:** Static shell checks, `git diff --check`, local serving, Playwright desktop/mobile checks, and screenshot inspection are required before completion.
