# Personal Website Visual Refresh Design

**Date:** 2026-09-28  
**Scope:** `index.html`, `index_publication.html`, `index_vitae.html`, `smartgrid.html`, and shared styling in `index.css`

## 1. Design objective

Refresh the personal website from a global perspective while preserving its existing academic identity and content. The result should combine:

- the credibility and information clarity of a rigorous academic homepage;
- the recognizability and narrative quality of a researcher profile;
- low maintenance cost through the existing HTML, CSS, and Bootstrap structure.

The redesign should help a visitor understand, within the first screen:

1. who Cheng He is;
2. what research areas he works on;
3. where to find publications, academic experience, and related projects;
4. how to make contact or continue exploring.

## 2. Design principles

### 2.1 Academic first, personal second

The site is an academic homepage, not a product landing page or dashboard. Personal branding should come from typography, hierarchy, research framing, and restrained visual motifs rather than exaggerated effects.

### 2.2 Preserve familiar page names

Keep the existing primary navigation and page names:

- Home
- Publications
- Vitae
- Smart Grid TF

Do not add new first-level pages solely for the redesign.

### 2.3 Improve hierarchy before adding features

The primary intervention is to simplify and reorder existing material. Do not add complex filters, a CMS, a backend, a new front-end framework, or a heavy animation system unless later evidence shows that the current structure cannot support the required content.

### 2.4 Facts over promotional claims

Only display verified publication counts, roles, awards, grants, links, and research claims. Do not add citation counts, rankings, impact metrics, or other claims without a reliable source in the repository or an explicitly verified source.

### 2.5 Shared system, distinct page purposes

All pages should share navigation, typography, spacing, colors, buttons, links, cards, and responsive behavior. Their content organization should remain purpose-specific:

- Home: orientation and research narrative;
- Publications: complete and searchable bibliography;
- Vitae: structured academic history;
- Smart Grid TF: professional service and topic-specific hub.

## 3. Global visual system

### 3.1 Color roles

Keep the current navy / teal / gold direction, but assign each color a narrower role:

- **Navy:** page titles, headings, primary buttons, major anchors;
- **Teal:** links, active navigation, research emphasis, focus states;
- **Gold:** limited academic markers, selected status, and important labels;
- **Neutral gray / warm white:** page background, borders, secondary surfaces;
- **Red:** only for an explicitly exceptional status such as accepted/latest when factually appropriate.

Avoid using multiple bright accent colors within the same component group.

### 3.2 Layout

Use one shared content frame:

```css
max-width: 1120px;
width: calc(100% - 40px);
margin-inline: auto;
```

Desktop layout guidance:

- Home hero: approximately `1.3fr / 0.7fr`;
- Research areas: three columns;
- Selected research: one or two columns depending on content length;
- Vitae: main content plus a supporting sidebar;
- Smart Grid TF: topic introduction plus navigation cards;
- Publications: one readable bibliography column.

### 3.3 Spacing scale

Use a limited spacing scale to create consistency:

```text
8px   detail spacing
12px  tag and link spacing
16px  component internal spacing
24px  ordinary component spacing
32px  subsection spacing
48px  section spacing
72px  major section spacing
```

Home uses approximately `64–88px` between major sections. Publications and Vitae use approximately `40–56px` to support denser content.

### 3.4 Typography

Use the existing sans-serif system for body text and publication metadata. Use a restrained serif treatment only for a research statement or selected introductory sentence if it improves the academic editorial tone.

Suggested hierarchy:

```text
h1: clamp(2.8rem, 7vw, 5.2rem)
h2: clamp(2rem, 4vw, 3.2rem)
h3: 1.15–1.4rem
body: 15–16px
metadata: 0.82–0.92rem
```

Not every section should use an oversized heading. The page title, section title, card title, body, and metadata must be visually distinguishable.

### 3.5 Components

Prefer a small set of reusable components:

- `section-heading`: eyebrow, title, optional description;
- `button`: primary and secondary variants;
- `tag` / `badge`: research area, publication type, verified role, or resource link;
- `research-card`: research area or project summary;
- `publication-item`: title, authors, venue, year, and links;
- `timeline-item`: date, institution, role/degree, and short description;
- `metric-inline`: compact factual counts used only where useful.

Cards are for grouping information, not decoration. Use a thin border, light radius, restrained shadow, and subtle hover feedback. Do not introduce glassmorphism or large decorative gradients.

## 4. Home design

### 4.1 Section order

Use the following readable academic sequence:

```text
Introduction
    ↓
Research Areas
    ↓
Selected Research
    ↓
Recent News
    ↓
Collaboration
```

Do not use section names such as `Evidence`, `Academic Signals`, `Researcher Brand`, or `Dashboard` in the interface.

### 4.2 Introduction

Retain the two-column hero but strengthen the first-screen hierarchy.

Left side:

- compact research descriptor such as `Computational Intelligence · Smart Grid · Optimization`;
- `Cheng He / 何成`;
- current role and affiliation;
- one concise research statement;
- short supporting summary;
- primary links to Publications, research content, and Google Scholar.

Right side:

- profile photograph;
- academic and professional links;
- compact factual publication counts when they are current and consistent with Publications.

Counts are supporting facts, not a separate marketing block. Current counts should be derived from the maintained publication list rather than copied independently.

### 4.3 Research Areas

Show three areas using a consistent problem–method–application pattern:

1. **Evolutionary Optimization** — multiobjective optimization, automated algorithm generation, large-scale optimization, and evolutionary computation.
2. **Intelligent Power Measurement** — instrument transformers, sensor networks, measurement error, and uncertainty evaluation.
3. **Smart Grid Intelligence** — data-driven sensing, predictive maintenance, and intelligent metering.

Each card should contain a title, one concise explanation, and one or two relevant tags. Avoid long paragraphs.

### 4.4 Selected Research

Show four or five representative papers, projects, or prototypes. Each item should communicate:

- what problem it addresses;
- what method or system is used;
- the contribution or result in one sentence;
- links that actually exist, such as Paper, Code, Poster, or Demo.

The Home page should not duplicate the full bibliography. The complete list belongs to Publications.

### 4.5 Recent News

Show the latest five or six verified items in a compact timeline or list:

- month/year;
- activity title;
- one-sentence context;
- optional link.

Examples include accepted papers, conference activity, invited talks, academic service, and project updates. Provide a path to the full source when one exists.

### 4.6 Collaboration

End with a professional, specific collaboration invitation. Mention suitable areas such as evolutionary computation, smart-grid measurement, AI for power systems, research software, or datasets only when supported by the existing content. Use one clear contact action and avoid promotional language.

## 5. Publications design

### 5.1 Page purpose

Publications is the authoritative, complete bibliography. It should optimize for scanning, locating, and opening source links.

### 5.2 Header and navigation

Keep the page name `Publications`. Add a compact summary using the maintained counts:

```text
92 total works · 58 journals · 32 conferences · 2 preprints
```

The counts must remain synchronized with the actual sections. Add lightweight in-page navigation:

```text
Journals · Preprints · Conferences
```

Keep Google Scholar as a secondary external reference, not as a substitute for the site bibliography.

### 5.3 Publication item

Use this order for every entry:

1. index and title;
2. authors, with Cheng He clearly distinguishable;
3. venue, year, volume/issue/pages when available;
4. DOI, paper, code, or related links.

Titles are the primary visual element. Metadata should be quieter but easy to scan. Do not compress DOI links into an unreadable paragraph tail.

### 5.4 Ordering and mobile behavior

Within Journals, Preprints, and Conferences, sort by descending year and provide year anchors or year subheadings when useful. On narrow screens, allow titles and metadata to wrap; never truncate bibliographic information.

## 6. Vitae design

### 6.1 Page purpose

Vitae should communicate a complete and credible academic history without becoming a collection of disconnected cards.

### 6.2 Structure

Top profile area:

- name, current role, institution;
- concise research summary;
- direction tags;
- contact or CV link.

Main timeline:

- Professional Experience;
- Education;
- visiting and postdoctoral experience.

Supporting sidebar or secondary column:

- Research Grants;
- Honors and Awards;
- Editorial Service;
- Professional Memberships.

Each timeline entry shows date, institution, role or degree, and a concise description. Use a thin line and restrained teal nodes. Use gold only for verified special markers.

## 7. Smart Grid TF design

### 7.1 Page purpose

Smart Grid TF is a topic-specific professional service page. It may have stronger topic identity than the other pages, but it must remain visibly part of the same website.

### 7.2 Hero

The hero should include:

- IEEE CIS Smart Grid Task Force title;
- parent technical committee information;
- short mission statement;
- Task Force website link;
- stable topic visual treatment.

A dark navy background with teal/gold details is acceptable, but do not introduce an unrelated visual system.

### 7.3 Task Force pages

Keep the existing destinations and present them as consistent navigation cards:

- Task Force Home;
- Mission & Scope;
- Research Interests;
- Events & Competitions;
- Leadership;
- Members;
- PIS Dashboard.

Each card has a clear title, one-sentence description, and explicit open action.

### 7.4 Ongoing Activities

Group current material into natural categories such as Activities, Resources, and Research Prototypes. Highlight PIS Dashboard as a project entry without allowing it to overshadow the Task Force purpose.

## 8. Responsive and accessibility requirements

### 8.1 Responsive behavior

At approximately `768px` and below:

- all two-column structures become one column;
- research cards become one column;
- the profile image and introduction stack vertically;
- counts become two-column or inline compact items;
- the existing collapsible navigation remains usable;
- no horizontal scrolling is permitted;
- buttons and external links retain comfortable touch targets.

### 8.2 Accessibility

- Every meaningful image has accurate `alt` text;
- heading levels reflect document structure;
- link text describes the destination;
- keyboard focus is visible;
- color is not the only way to communicate status;
- text contrast remains sufficient;
- motion respects `prefers-reduced-motion`.

## 9. Technical boundaries

- Continue using the existing HTML, CSS, and Bootstrap structure;
- make `index.css` the primary style source;
- modify individual HTML files only when content structure requires it;
- do not introduce a new front-end framework or build pipeline;
- avoid complex filtering or stateful interactions at the current publication scale;
- preserve verified internal and external links;
- keep content maintenance straightforward for future publication updates.

## 10. Acceptance criteria

### Visual

- all four pages share navigation, width, typography, colors, and component behavior;
- the Home first screen clearly identifies the person, affiliation, and research areas;
- Home uses the agreed section names and does not contain `Evidence` or `Academic Signals` terminology;
- Publications is easy to scan by type and year;
- Vitae has a clear timeline and compact supporting information;
- Smart Grid TF has topic identity while remaining consistent with the personal site.

### Responsive

- layout is stable at 1440px;
- no obvious crowding around 768px;
- no horizontal scrolling at 390px;
- long publication titles and external links remain readable and usable;
- mobile navigation and controls work.

### Engineering and verification

- HTML static inspection passes;
- `git diff --check` passes;
- desktop and mobile rendering is checked with Playwright;
- internal links, external links, image paths, and navigation states are checked;
- no unverified facts or unsupported metrics are introduced.

## 11. Out of scope

- changing the primary page names;
- migrating content to a CMS or backend;
- redesigning the separate Smart Grid Task Force website;
- adding analytics, authentication, or a publication database;
- introducing a complex client-side search/filter experience;
- adding decorative motion that does not improve comprehension.
