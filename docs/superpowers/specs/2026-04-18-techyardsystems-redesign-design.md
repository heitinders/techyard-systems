<!-- markdownlint-disable MD034 MD040 MD060 MD032 -->
# Techyard Systems — Website Redesign Design Spec

**Date:** 2026-04-18
**Status:** Approved v2.2 — implementation in progress on `impl/v1` branch
**Project directory:** `/Users/heitindersingh/techyardsystems-redesign/`
**Current site under replacement:** <https://techyardsystems.com>
**Author:** Heitinder Singh (client-engaged redesign)

**Revision log:**

- **v1 (2026-04-18 13:45)** — initial spec after brainstorming. Reviewed by spec-document-reviewer subagent: Approved with 8 advisories.
- **v1.1 (2026-04-18 14:10)** — applied reviewer advisories: corrected radius count, documented ghost button + chip states, resolved server-action vs route-handler ambiguity, corrected JSON-LD types (no `CaseStudy` type), explicit outcomes-tuple rule, drop-cap a11y note, V1 build vs V1 launch sequencing.
- **v2 (2026-04-18 15:00)** — applied stakeholder review: dropped ISR (vestigial with MDX-in-repo); fixed DNS TTL timing (48h pre-cut, not same-day); completed env var list; removed orphan `api/contact/route.ts`; added font loading strategy; added security headers + `SECURITY.md` + `/.well-known/security.txt`; Calendly lazy-load-on-click (fixes cookie-banner contradiction); image strategy and `<Figure>` component; contact form delivery-failure UX branch; preview-deploy noindex + password protection; CI-enforced brand-name lint; OG-route Playwright test; outcomes rule relaxed to `3 or 1` discriminated union; journal cadence gate in pre-launch checklist; webhook/server-action limitation flagged in §12; 404 + error page designs; sitemap `priority`/`changefreq` for Bing; chip ARIA pattern; cross-browser drop-cap visual regression.
- **v2.1 (2026-04-18 15:30)** — fixed three stray ISR/route references that survived v2 revision per spec-reviewer: §1.5 success criterion (removed "beyond ISR"), §2 scope API-routes block (rewritten to name server action), §7.3 data-flow step 5 (ISR reference replaced with explicit "no ISR in V1" guidance). Added OG-route `/journal/*` prefix test per reviewer advisory.
- **v2.2 (2026-04-18 implementation start)** — accepted Next.js 16.2.4 (current stable) in place of "Next.js 15" wording throughout the spec. All documented patterns (App Router, `generateStaticParams`, async `params: Promise<...>`, server actions, `next/og` `ImageResponse`, fully-static SSG) are compatible with Next.js 16. Cache Components are an opt-in feature in Next.js 16 and we do NOT opt in — the SSG-only rendering strategy in §3 holds unchanged. Turbopack is Next.js 16's default bundler (performance win, no code impact). Where the spec says "Next.js 15", read it as "Next.js 15 or later" — the App Router patterns are the load-bearing commitment, not the specific major version. The repo contains Next.js's scaffolder-generated `AGENTS.md` + `CLAUDE.md` with breaking-change warnings from the upgrade; these are retained so subagents working on later tasks have current API context.

---

## 1. Overview

### What we're building

A full-parity redesign of techyardsystems.com as a production-ready Next.js 15 (App Router) application. The client, Techyard Systems, builds custom AI agents for mid-to-large enterprise workflow automation — customer support, sales lead generation, IT/HR request management, data analysis, and operations/logistics monitoring.

The new site replaces the current one across nine top-level pages plus two dynamic route templates (case study detail, journal post). It is a marketing site — no authenticated product surface, no user accounts, no database.

### Why

The current site is generic B2B SaaS in appearance: blue gradients, icon grids, template-like hero sections. It does not differentiate Techyard Systems from the saturated field of AI-agent vendors who all look visually identical. The redesign commits to an **Editorial Minimal** aesthetic — serif headlines, warm off-white stone palette, italic accent phrasing — that positions Techyard Systems as a thoughtful practice rather than a vendor, and makes the site visually distinctive in the category.

### Success criteria

1. **Visual distinctiveness** — the site should not pass the "AI made this" test. A visitor should not be able to identify the site as templated or AI-generated within three seconds.
2. **Credibility signal surface** — case studies and the practice-based services layout should be the strongest signals on the site, not logos or metric-banner-cards.
3. **Lighthouse baselines in production:** Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO = 100. CLS < 0.05, LCP < 2.0s on 3G-like conditions.
4. **WCAG 2.2 AA conformance** — verified via axe + manual VoiceOver walkthrough before launch.
5. **Zero-friction content updates** — adding a case study or journal post requires only committing one MDX file; no schema migration, no manual rebuild. A content commit triggers a Vercel deploy with a full rebuild (~90 seconds cold). See §3 rendering strategy for why ISR is explicitly not used in V1.

### Brand naming (hard rule, CI-enforced)

The brand is **Techyard Systems**, never "Techyard" alone. Every production surface — navigation, footer, page titles, OpenGraph tags, schema.org markup, wordmark, meta descriptions — must use the full name. "Techyard" is acceptable only in internal notes and is explicitly disallowed in shipped code and copy.

**Enforcement:** a CI step runs `rg '\bTechyard\b(?!\s+Systems)' --glob '!docs/**' --glob '!*.md' --glob '!**/node_modules/**' app/ components/ content/ public/ lib/` and fails the build on any match. Adding a genuine exception (a class name, for example) requires an inline `# allow-techyard-short` comment that the matcher ignores. The check runs on every PR — no human has to remember.

---

## 2. Scope and non-goals

### In scope (V1)

**Static pages:**
- `/` — Home
- `/services` — Services (5 practices, deep)
- `/about` — About (team, philosophy, values)
- `/contact` — Contact (form + Calendly + direct email)
- `/security` — Security & Compliance (FAQ + badges)
- `/privacy` — Privacy Policy (MDX)
- `/terms` — Terms of Service (MDX)

**Dynamic content:**
- `/work` — Case studies index (filterable by industry)
- `/work/[slug]` — Case study detail (MDX-driven)
- `/journal` — Journal index
- `/journal/[slug]` — Journal post (MDX-driven)

**Server actions + API routes:**
- `app/contact/actions.ts` — `submitContactForm` server action (zod-validates, sends via Resend). See §7.3 for why V1 uses a server action instead of a route handler.
- `GET /api/og/[...slug]` — dynamic OpenGraph image generation (edge runtime)

**SEO/GEO assets:**
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- JSON-LD structured data on every page

**Placeholder content (written by implementer in brand voice):**
- All page copy
- Wordmark treatment in Newsreader (client can supply refined logo later)
- Three realistic case studies with fabricated metrics, clearly flagged as placeholder
- Five journal posts (initial content)
- Team member placeholders (client provides real bios + photos)

**Sequencing note — "V1 build" vs "V1 launch":**
- **V1 build** (shipped to staging / Vercel preview for client review) = structure and placeholder content in place, fully functional. Acceptable to ship placeholders into preview deploys.
- **V1 launch** (DNS cut to production) = placeholders **must** be replaced with client-approved copy. The §11.1 pre-launch checklist gates on this. The current site stays live until the replacement copy lands.
- This sequencing means the implementer ships fast into preview (placeholder-OK), and the copy pass happens in parallel with client review — not blocking engineering.

### Non-goals (explicit V1 exclusions)

- **No CMS integration.** Content lives as MDX files in the repo. Migration to Sanity/Contentful/Payload is a V2 decision.
- **No search.** Small site; filters on `/work` and CMD+F are sufficient.
- **No dark mode.** Tokens are structured to support it, but V1 ships light-only.
- **No internationalization.** English only.
- **No authentication, user accounts, or database.**
- **No cookie banner** (Plausible is privacy-first and cookie-less; no banner legally required).
- **No blog commenting system.**
- **No newsletter signup in V1** (can add post-launch if client requests).
- **No live chat widget.**

---

## 3. Information architecture

### Site map

```
techyardsystems.com/
├── / ........................... Home ...................... SSG
├── /services ................... Services ................... SSG
├── /about ...................... About ...................... SSG
├── /contact .................... Contact .................... SSG + client island for form
├── /work ....................... Case Studies index ......... SSG
│   └── /work/[slug] ............ Case Study detail .......... SSG
├── /journal .................... Journal index .............. SSG
│   └── /journal/[slug] ......... Journal post ............... SSG
├── /security ................... Security & Compliance ...... SSG
├── /privacy .................... Privacy Policy ............. SSG (MDX)
└── /terms ...................... Terms of Service ........... SSG (MDX)

Server actions + API:
├── app/contact/actions.ts ...... Contact form server action
└── /api/og/[...slug] ........... OG image generation ........ Dynamic (edge)

SEO assets:
├── /sitemap.xml ................ Built-in Next.js generator
├── /robots.txt ................. Built-in Next.js generator
└── /llms.txt ................... Static file at public/
```

### URL naming decisions

- `/work` (not `/case-studies`) — shorter, consultancy voice, better share-ability.
- `/journal` (not `/blog`) — editorial tone, fits publication aesthetic.
- `/security` (not `/trust-center`) — plain language, anti-marketing-speak.

### Primary navigation

Five elements: `Work · Services · Journal · About · [Book a call]` CTA. One CTA in nav — no duplicate buttons. Nav is sticky, translucent stone (`rgba(241,237,228,0.88)` with backdrop blur), border-bottom hairline on scroll.

### Rendering strategy

- **Fully static (SSG)** for every page including `/work/[slug]` and `/journal/[slug]`. Since MDX lives in the repo, every content commit triggers a Vercel deploy with a full rebuild — there's no second path by which content could change, so ISR has no work to do and we don't use it. Adding `revalidate: 3600` without a mechanism to change content out-of-band would be theatre; we cut the theatre.
- **Dynamic** only for `/api/og/[...slug]` (edge image generation) and the contact form server action.
- **Future migration to ISR** is trivial if V2 introduces an out-of-band editor (CMS, admin UI). Until then, `pnpm build` is the revalidation mechanism.

---

## 4. Visual system

### 4.1 Color tokens

All colors defined as CSS custom properties in `styles/tokens.css`; Tailwind v4 reads them via `@theme`.

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#F1EDE4` | Primary page background (Stone) |
| `--color-paper-raised` | `#FFFAF0` | Cards, raised surfaces |
| `--color-ink` | `#2A2F26` | Primary text, dark sections, primary button (Charcoal) |
| `--color-ink-muted` | `#6B7165` | Secondary text, captions (Moss) |
| `--color-ink-subtle` | `#8A7F6B` | Meta text, dates, tertiary labels (Walnut) |
| `--color-accent` | `#4A6152` | Italic accent, links, eyebrow labels, focus ring (Sage) |
| `--color-rule` | `#E3DCCD` | Dividers, subtle borders (Flax) |
| `--color-ink-deep` | `#1A1D18` | Footer background, optional dark-mode base (Obsidian) |

**Contrast verification:**
- Charcoal on Stone: 11.8:1 (AAA)
- Moss on Stone: 5.1:1 (AA)
- Sage on Stone: 5.3:1 (AA)
- Sage on Charcoal: 2.2:1 — **decorative use only, never body text**

**Usage rules:**
- Sage appears only as italic accent in headlines, links, eyebrow labels, and the focus ring. It never appears as a button fill, card background, or body text color. Enforcing this rule preserves the editorial character of the system.
- No "success green," "danger red," or "warning yellow" colors. Form states derive from ink weight + sage accent. Destructive confirmations use a bolder ink + explicit text, not a color.

### 4.2 Typography

Two families, both free Google Fonts, loaded via `next/font/google`:

- **Newsreader** (serif, variable `opsz 6..72`) — all headlines, ledes, pull quotes, and journal body text.
- **Space Grotesk** (sans, `400/500/600`) — UI, buttons, body on all non-journal pages, eyebrow labels, meta text.
- **JetBrains Mono** (optional, used only for code blocks in journal posts).

**Fluid type scale** (all use `clamp()` for breakpoint-free responsiveness):

| Role | Family | Size | LH | Tracking |
|---|---|---|---|---|
| Display | Newsreader 500 | `clamp(56px, 10vw, 96px)` | 0.98 | -2.4px |
| H1 | Newsreader 500 | `clamp(42px, 6vw, 64px)` | 1.05 | -1.6px |
| H2 | Newsreader 500 | `clamp(32px, 4.5vw, 44px)` | 1.1 | -1px |
| H3 | Newsreader 500 | 28px | 1.2 | -0.5px |
| Lede | Newsreader 400 italic | 22px | 1.4 | — |
| Body (site) | Space Grotesk 400 | 17px | 1.6 | — |
| Body (journal) | Newsreader 400 | 19px | 1.7 | — |
| UI / button | Space Grotesk 500 | 14px | 1.5 | — |
| Eyebrow | Space Grotesk 500 | 11px | 1.4 | 2px uppercase |

**Reading measure:** 66ch max for sans body, 680px column for journal posts.

### 4.2.1 Font loading strategy (load-bearing for LCP budget)

The hero headline is the LCP element on the home page, rendered in Newsreader at 56–96px. Naïve `next/font/google` usage will blow the < 2.0s LCP budget on mobile 4G. All of the following are required:

- **Subset to Latin only** (`subsets: ['latin']`). Newsreader's full character set is large; Latin alone drops the file by roughly 70%.
- **Variable font, axis-restricted.** Import the variable `opsz` variant, `weight: '400 600'` range only (we use 400 italic, 500, and 600 — no need for 300 or 700). `next/font/google` supports axis restriction via `weight` ranges and `axes` options.
- **`display: 'swap'`** so text never goes invisible during the font fetch (FOIT). Accept brief FOUT; mitigate with fallback metric override below.
- **Fallback metric adjustment** via `adjustFontFallback: true` (the default for Google fonts in next/font) — Next.js generates a size-adjusted system-font fallback so FOUT doesn't shift layout. Verify the computed `size-adjust` in DevTools before launch.
- **Preload the Newsreader display weight** — `next/font/google` preloads by default when the font is used in the root layout; confirm the `<link rel="preload" as="font" crossorigin>` appears in page HTML.
- **Space Grotesk and JetBrains Mono** use `display: 'swap'` but are NOT preloaded (not on the LCP path).
- **Self-hosted via next/font** — no runtime fetch from `fonts.googleapis.com`. Next.js downloads the file at build, stores in `.next/static/media/`, serves same-origin.

Baseline to verify post-implementation: **home page LCP < 1.8s on Moto G Power / Slow 4G** in Lighthouse. If it regresses above 2.0s, the first suspect is this subsection not being followed.

### 4.3 Spacing scale

8-point base scale plus fluid section padding:

```
--space-xs:      4px
--space-sm:      8px
--space-md:     16px
--space-lg:     24px
--space-xl:     40px
--space-2xl:    64px
--space-3xl:   104px
--space-section: clamp(80px, 12vw, 160px)   // vertical section rhythm
--container:    1180px max-width
```

### 4.4 Radius

Five values, nothing else:
- `--r-none: 0` — rules, hairlines, full-bleed dividers
- `--r-sm: 4px` — inputs, form fields
- `--r-md: 12px` — cards, figures
- `--r-lg: 18px` — large feature panels, heroes
- `--r-pill: 999px` — CTAs, chips

### 4.5 Motion

```
--dur-instant:  80ms   // focus, press
--dur-fast:    180ms   // hover, reveal
--dur-base:    320ms   // page transition
--dur-slow:    520ms   // stagger entrance
--ease-out-quart: cubic-bezier(.22, 1, .36, 1)   // entrance default
--ease-out-expo:  cubic-bezier(.16, 1, .3, 1)    // dramatic reveal
```

`prefers-reduced-motion: reduce` collapses all `--dur-*` to 0ms. No elastic/bounce easing. Motion conveys meaning (entrances, state changes) — decorative-only motion is disallowed.

### 4.6 Interactive states

Five patterns, derived from the palette:

1. **Primary button** — charcoal fill (`--color-ink`), stone text (`--color-paper`), pill radius. Hover: `translateY(-2px)` over 180ms. Active: translate reset + brief scale(0.98).
2. **Secondary button** — transparent fill, 1px charcoal border, charcoal text, pill radius. Hover: fill → charcoal, text → stone.
3. **Ghost button** — transparent fill, no border, charcoal text with 4px underline offset. Used for the "See recent work" pattern next to primary CTAs where a second bordered button would crowd the hero. Hover: underline thickens to 2px.
4. **Text link** — sage color (`--color-accent`), 4px underline offset. Hover: underline thickens to 2px.
5. **Chip (multi-select, used on Contact form)** — idle: stone (`--color-paper`) fill, flax border (`--color-rule`), charcoal text, pill radius. Selected: sage fill (`--color-accent`), stone text, sage border. Focused (keyboard): 2px sage outline with 2px offset, regardless of selected state.

**Focus ring (universal):** `2px solid var(--color-accent)` + 2px offset. Never removed. Never replaced with a box-shadow-only alternative. Applies to buttons, links, chips, form fields, and any custom interactive element.

---

## 5. Page designs

### 5.1 Home (`/`)

Section order (top to bottom):

1. **Nav** — sticky, translucent stone with backdrop blur
2. **Hero** — eyebrow ("Autonomous systems · est. practice"), display headline ("Agents that actually *work.*"), italic lede, primary + ghost CTAs
3. **Proof strip** — 4-column metrics (68% reduction · 4× faster · 5× ROI · 7+ industries) under a hairline rule, NOT as stat cards
4. **Practices** — numbered list (№ 01–05), H3 headline + description per practice, right-arrow accent, dividing rules
5. **Featured case study** — dark band (charcoal background), split layout: pull quote on left, 3-stat panel on right, "Read the full study →" link
6. **Industries grid** — 4×2 grid of industries with case-study counts, full-bleed with hairline dividers (stones-grid appearance)
7. **How we work** — 3-column phases (Discovery · Build · Handover) with italic step labels
8. **CTA band** — Flax background (`#E3DCCD`), centered headline + italic sub + primary CTA
9. **Footer** — Obsidian background, 4-column grid (brand + sub / practice / company / contact), hairline rule, bottom row

### 5.2 Case study detail (`/work/[slug]`)

Layout:

1. Nav + breadcrumb (Work / Industry / Title)
2. **Hero** — asymmetric: left = eyebrow + display title + italic lede; right = sidebar meta panel (client, industry, engagement weeks, practice, published date)
3. **Stat band** — dark charcoal, renders in one of two layouts based on `outcomes` length (see §6.1):
   - **3-outcome layout** — three equal columns, each with eyebrow + value (italic unit accent) + note.
   - **1-outcome layout ("hero stat")** — single centered column; value renders at `clamp(88px, 14vw, 160px)`, note expands to 44ch for a substantive context paragraph.
4. **Body** — 2-column: left = sticky table of contents (66ch article measure); right = MDX prose with H2 anchors, pull quotes, figures with captions (see §5.2.1)
5. **Next case study** — Flax band with auto-linked "№ N next" or manual `nextSlug` override

Placeholder-friendly: if `clientDisclosed: false`, render "Tier-1 [industry] (disclosed on request)".

### 5.2.1 Image strategy for case studies and journal posts

Authors place assets at `content/case-studies/<slug>/` or `content/journal/<slug>/` (co-located with the MDX). Velite copies them into the public assets pipeline at build. The schema's `Image` type is:

```typescript
type Image = {
  src: string       // path relative to the MDX file, e.g. "./diagram-01.png"
  alt: string       // required — no empty alt allowed for content images
  width: number     // intrinsic pixel width, measured at build
  height: number    // intrinsic pixel height, measured at build
  caption?: string  // optional figure caption
}
```

Velite runs an `asset()` loader that reads the image, measures dimensions, emits an optimized copy to `.velite/static/`, and rewrites `src` to the public URL. The MDX `<Figure>` component accepts an `Image` object and renders `next/image` with `sizes` appropriate to the 66ch content column (case studies) or 680px column (journal), producing AVIF + WebP variants automatically.

Rules:
- All content images pass through `<Figure>` — raw `<img>` in MDX is disallowed (lint rule).
- Alt text is required at schema level (zod refine). Decorative-only images don't belong in content MDX; they live in `public/` and get `alt=""` inline.
- Feature image on journal posts uses the same `Image` type as inline figures.

### 5.3 Journal post (`/journal/[slug]`)

Layout:

1. Nav + thin obsidian top band ("Techyard Systems · Journal № N")
2. **Centered header** — category chip, display title, italic subtitle, author + reading time + date
3. **Feature image** — 16:9 full-width (minus container margins), 18px radius, `next/image` AVIF+WebP; optional (null in frontmatter = no image)
4. **Body** — 680px column, serif body at 19px, drop cap on first paragraph (CSS `::first-letter`), pull quotes, code blocks (JetBrains Mono on Obsidian)
   - **Drop cap accessibility:** `::first-letter` is styled via CSS only, which means screen readers read the paragraph normally (they do not re-announce the first letter separately). This is acceptable behavior per WCAG 2.2. We do not wrap the first letter in a `<span aria-hidden>` — that would require parsing the MDX-rendered paragraph at runtime and is unnecessary. We do ensure the first paragraph does not begin with an emoji or multi-byte character (authorial rule), as `::first-letter` behavior with those is undefined across browsers.
5. **Author signature** — avatar + name + role, hairline-separated
6. **Related posts** — Flax band, 3-column grid, auto-selected by category or manually via `relatedSlugs`

### 5.4 Services (`/services`)

Hero + deep-dive practice list (reuses homepage practice pattern but with right-column meta: typical timeline, best-fit criteria, measurable-by outcome). Each practice gets tags for integrations (Zendesk, HubSpot, Okta, etc.). CTA band at bottom.

### 5.5 About (`/about`)

Editorial split: left = narrative paragraph and lede; right = values grid (4 cards: "Own the outcome," "No lock-in," "Ship in weeks," "Tell the truth"). Below: team grid (2×N, avatar + name + role). CTA band at bottom.

### 5.6 Contact (`/contact`)

Two-column:

- **Left (primary):** form — name, email, company, practice-interest chips (multi-select), message textarea, submit button. Form submits via the `submitContactForm` server action (see §7.3). Honeypot field hidden. Success state replaces form with thank-you message. Error state (delivery failure) falls back to "Something went wrong — write to contactus@techyardsystems.com instead" with the address clickable.
- **Right (sidebar):** Calendly card (Flax bg) using the **lazy-load-on-click** pattern — see "Calendly & cookies" below. Direct contact info (email, response time, based-in).

**Chips ARIA pattern (custom, Radix has no primitive for this):**

The practice-interest chips are a multi-select input. Implemented as:

```jsx
<fieldset>
  <legend>Which practice are you curious about?</legend>
  <div role="group" aria-labelledby="practice-legend">
    {options.map(opt => (
      <button
        type="button"
        role="checkbox"
        aria-checked={selected.includes(opt.id)}
        onClick={() => toggle(opt.id)}
      >
        {opt.label}
      </button>
    ))}
  </div>
</fieldset>
```

Each chip is a `role="checkbox"` button with `aria-checked` state, inside a `role="group"` with a `<legend>`-associated label. Screen readers announce "checkbox, checked" / "checkbox, not checked" per chip, matching user mental model. Space/Enter toggles. Tab moves through chips (one stop each — they're independent checkboxes, not a radiogroup).

**Calendly &amp; cookies.**

Calendly's embed iframe sets third-party cookies on page load, which would invalidate the "no cookie banner required" claim in §2. V1 handles this with lazy-load-on-click:

1. Sidebar renders a static Flax card with a headline ("Or book directly") and a "Book a 15-min call →" button. No iframe, no script, no cookies.
2. Click → replace card contents with the Calendly iframe (set via `src` on click, not pre-set). Clicking is explicit consent to load a third-party tool.
3. Alternative: link out to `calendly.com/...` in a new tab — simpler, zero cookie concern, slightly worse UX. Keep this as a fallback if lazy-load reveals UX friction.

Document the click-to-load behavior on the page itself so users understand why they're clicking twice.

### 5.7 Security (`/security`)

Hero + 4 category chips (Data handling · Compliance · Model ownership · Access & auth) + FAQ accordion (Radix `Accordion`) + compliance badges grid at bottom (SOC 2, GDPR, HIPAA-ready, ISO 27001). FAQ content is MDX-backed so updates don't require code changes.

### 5.8 404 and error pages (`not-found.tsx`, `error.tsx`)

Editorial sites lose credibility with default frameworks' "404 Page not found" — the voice break is jarring. Both error surfaces stay in-voice:

**404** — same nav + footer shell, centered content:

- Eyebrow: `Error 404 · Page not found`
- Display headline (Newsreader): `This page isn't one of <em>ours.</em>`
- Italic lede: "It might have moved, or you might have a bad link. Here's what we do have:"
- Three primary links below: `→ Services` · `→ Recent work` · `→ Journal`
- Small text at bottom: "If you got here from one of our emails or documents, please let us know: contactus@techyardsystems.com"

**500 / unexpected error** — same shell:

- Eyebrow: `Error · Something broke`
- Display headline: `We're on it.`
- Italic lede: "Please try again in a minute. If it keeps happening, a two-line email to contactus@techyardsystems.com helps us find the cause."
- Single primary CTA: `Reload this page` (calls Next.js `reset()`)

Both error pages are statically rendered — no dynamic data, no external requests, must work when most of the app is broken.

---

## 6. Content model

### 6.1 Case study schema

File: `content/case-studies/*.mdx`

```typescript
{
  slug: string                  // from filename
  number: string                // "№ 03"
  clientName: string            // "Tier-1 3PL (disclosed on request)"
  clientDisclosed: boolean      // true = real name; false = anonymized rendering
  industry: IndustryEnum        // logistics | financial | healthcare | saas | ecommerce | pro-services | government | manufacturing
  practice: PracticeEnum        // support | sales | it-hr | data | ops
  engagementWeeks: number
  engagementType: "fixed fee" | "pilot" | "retainer"
  publishedAt: Date
  title: string                 // full display headline
  titleAccent: string           // italic substring of title
  lede: string                  // 1-2 sentence italic summary
  pullQuote: string | null      // optional — for homepage featured
  pullAttribution: string | null
  outcomes: [Outcome, Outcome, Outcome] | [Outcome]  // see "outcome shape" below
  featured: boolean             // appears on homepage
  nextSlug: string | null       // manual "next" override
  body: MDX                     // long-form with H2 anchors
}

type Outcome = {
  eyebrow: string               // "Outcome 01"
  value: string                 // "68"
  valueAccent: string           // "%"  (rendered italic in sage)
  note: string                  // 1-sentence context
}
```

**Outcome shape — exactly 3, or exactly 1.**

The dark stat band renders in one of two layouts, chosen by `outcomes.length`:

- **3 outcomes** → three-column grid (the layout shown in §3 wireframes). Each column: eyebrow + value with italic unit + 1-sentence note.
- **1 outcome** → single centered "hero stat" — value at `clamp(88px, 14vw, 160px)`, note expands to a 44ch paragraph of genuine context. Reserved for engagements where one metric is so decisive that padding to three would weaken the story.

**2 or 4+ outcomes are invalid** and fail the build. The schema enforces this with a zod discriminated union: `z.tuple([Outcome, Outcome, Outcome]).or(z.tuple([Outcome]))`. An attempt to ship two outcomes fails velite validation with a clear error message pointing to the MDX file.

Why not allow arbitrary lengths? The stat band is the signal-carrying element of the page. Bad layouts tank signal. Two options — "three strong metrics in a row" or "one metric so strong it stands alone" — cover every real engagement we've seen without enabling the "four weak stats in a 2×2 grid" failure mode that this constraint exists to prevent.

### 6.2 Journal post schema

File: `content/journal/*.mdx`

```typescript
{
  slug: string
  number: string                // "Journal № 14"
  category: "Field notes" | "Opinion" | "Notes" | "Fieldwork"
  title: string
  titleAccent: string           // italic portion
  subtitle: string
  publishedAt: Date
  readingMinutes: number        // auto-calculated, overridable
  author: Author
  featureImage: Image | null
  body: MDX
  relatedSlugs: string[] | null // manual override; else auto by category
}

type Author = {
  name: string
  role: string
  avatar: Image
}
```

### 6.3 Taxonomies

File: `content/taxonomies.ts`

```typescript
export const industries = [
  "logistics", "financial", "healthcare", "saas",
  "ecommerce", "pro-services", "government", "manufacturing"
] as const;

export const practices = [
  "support", "sales", "it-hr", "data", "ops"
] as const;

export type Industry = typeof industries[number];
export type Practice = typeof practices[number];
```

Adding a new industry/practice = one edit to this file; types propagate everywhere (frontmatter validation, filter UI, TypeScript types).

### 6.4 Home-page content

Stored as a typed TypeScript object (not MDX) at `content/home.ts` — the home page is a fixed composition, not streamed content. MDX is the wrong tool for "hero eyebrow + hero headline + hero lede," so we don't use it.

### 6.5 Velite configuration

`velite.config.ts` scans `content/case-studies/*.mdx` and `content/journal/*.mdx`, validates each with the zod schemas above, and emits `.velite/index.ts` with typed arrays:

```typescript
export const allCaseStudies: CaseStudy[];
export const allJournalPosts: JournalPost[];
```

Pages import from `.velite/` — not from raw MDX. A missing required field fails `pnpm build` with a precise error; no broken content reaches production.

---

## 7. Technical architecture

### 7.1 Folder structure

```
techyardsystems-redesign/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                         → /
│   ├── services/page.tsx                → /services
│   ├── about/page.tsx                   → /about
│   ├── contact/page.tsx                 → /contact
│   ├── security/page.tsx                → /security
│   ├── work/
│   │   ├── page.tsx                     → /work (index)
│   │   └── [slug]/page.tsx              → /work/[slug]
│   ├── journal/
│   │   ├── page.tsx                     → /journal (index)
│   │   └── [slug]/page.tsx              → /journal/[slug]
│   ├── privacy/page.tsx                 → /privacy (MDX)
│   ├── terms/page.tsx                   → /terms (MDX)
│   ├── contact/actions.ts               server action for form submit (see §7.3)
│   ├── api/
│   │   └── og/[...slug]/route.tsx       OG image generation (edge runtime)
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── not-found.tsx
│   ├── error.tsx
│   └── globals.css
├── components/
│   ├── primitives/                      Button, Link, Container, Section, Grid
│   ├── layout/                          Nav, Footer, Breadcrumb
│   ├── content/                         MDXComponents (h1..h6, blockquote, PullQuote, Figure, Code)
│   └── sections/                        HeroHome, PracticesList, FeaturedCaseStudy, CTABand, IndustriesGrid, HowWeWork
├── content/
│   ├── case-studies/                    *.mdx
│   ├── journal/                         *.mdx
│   ├── pages/                           security.mdx, privacy.mdx, terms.mdx
│   ├── taxonomies.ts
│   └── home.ts
├── lib/
│   ├── mdx.ts                           velite helpers
│   ├── seo.ts                           generateMetadata + JSON-LD builders
│   └── resend.ts                        email client + HTML template
├── public/
│   ├── llms.txt
│   ├── favicons/
│   └── (static assets)
├── styles/
│   └── tokens.css                       CSS custom properties from §4
├── .env.local
├── velite.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 7.2 Dependency inventory

**Runtime:**
- `next@^15`
- `react@^19`, `react-dom@^19`
- `tailwindcss@^4`
- `velite` — MDX + zod content pipeline
- `zod` — schema validation (velite, form, API)
- `resend` — transactional email
- `motion` — orchestrated hero entrance reveals only
- `@vercel/og` — OG image generation
- `next-plausible` — analytics script injection
- `@radix-ui/react-dialog` — accessible mobile nav
- `@radix-ui/react-accordion` — accessible Security FAQ
- `@radix-ui/react-slot` — polymorphic link-as-button

**Dev:**
- `typescript`, `@types/*`
- `vitest`, `@vitejs/plugin-react`, `@testing-library/react` — unit/integration
- `@playwright/test` — E2E + visual regression
- `eslint`, `eslint-config-next`, `@typescript-eslint/*`
- `prettier`, `prettier-plugin-tailwindcss`
- `lighthouse-ci` — CI performance budgets

Explicitly *not* included: `shadcn/ui` (aesthetic mismatch), `date-fns` or `dayjs` (Intl.DateTimeFormat suffices), state managers, ORM, form libraries beyond what zod + React native forms provide.

### 7.3 Data flow

**Content → pages.**
1. Author commits an MDX file to `content/`.
2. Commit triggers a Vercel deploy.
3. During build: velite validates frontmatter with zod, compiles MDX body, writes `.velite/index.ts`.
4. Pages import `allCaseStudies` / `allJournalPosts` at module level.
5. `generateStaticParams()` emits every `[slug]` at build — every content page is fully static.
6. Deploy promotes to production. Typical end-to-end time: content-commit → live ≈ 90 seconds.
7. **No ISR in V1** (see §3). The deploy IS the revalidation mechanism; there is no second path by which content changes. Do not add `export const revalidate = N` to any route.

**Contact form flow.**

The form uses a single submission path — React 19 server action — not a parallel `POST /api/contact` route. We expose one mechanism; no drift, no duplicate validation logic.

1. `/contact` renders `<ContactForm />` as a client component (client island — the rest of the page is RSC).
2. Submit fires `useActionState(submitContactForm, initialState)`.
3. `submitContactForm` is a server action (`'use server'`) co-located in `app/contact/actions.ts`. It:
   - Zod-validates the FormData against the contact schema
   - Returns `{ ok: false, kind: 'validation', fieldErrors }` on validation failure (React re-renders form with inline errors)
   - Honeypot + timing check (if tripped → return `{ ok: true }` silently; do not email, do not tell the bot)
   - Calls Resend directly (no intermediate route handler):
     - Admin email → `CONTACT_TO_EMAIL` (full submission, reply-to = submitter)
     - Confirmation auto-reply → submitter, `From: RESEND_FROM_EMAIL`
   - On Resend error (timeout, 5xx, rate-limit): log to stderr (Vercel logs) via a structured logger, and return `{ ok: false, kind: 'delivery' }` to the client
   - Returns `{ ok: true }` on success → form replaces with thank-you state

4. **Error UX branches:**
   - `kind: 'validation'` → inline errors per field, focus first invalid field.
   - `kind: 'delivery'` → replace the form with a fallback panel: "Something went wrong on our end — please write to us at **contactus@techyardsystems.com** instead. We read every message." Include a `mailto:` link with the user's message pre-populated as the body so their work isn't lost. Log client-visible error code to Plausible as a custom event so delivery failures are observable.
   - Network errors (submission never reached the action) → browser's native form error surface + retry suggestion.

5. **Bot mitigation:** honeypot hidden input (`website`) rejected server-side; timing check rejects submits under 1.5s. If abuse materializes post-launch, add Upstash Redis + sliding-window rate-limit (10 submits / IP / hour) gated inside the action — we do not add a route-handler wrapper.

6. **Observability:** server action failures log to Vercel function logs (structured JSON). No Sentry / external error tracker in V1 (YAGNI for a single form on a marketing site). If we ever add one, it goes in `lib/logger.ts` as a single swap. Plausible custom events: `contact_submit_success`, `contact_submit_validation_error`, `contact_submit_delivery_error` — enough signal without being noisy.

**OG image flow.**
1. Page's `generateMetadata()` sets `openGraph.images: [/api/og/work/[slug]]`.
2. Request to `/api/og/[...slug]` — edge route looks up slug, renders `<div>` tree to PNG via `@vercel/og` using Newsreader-on-Stone composition.
3. Vercel caches forever (immutable URL per slug).

### 7.4 Build & deploy

- Hosted on **Vercel**.
- Preview deployments per branch (critical for client approvals during build). **Preview deploys are `noindex, nofollow` and password-protected** via Vercel's built-in access control — see §11.1. This prevents fabricated placeholder metrics from being crawled and indexed before real copy lands.
- Production domain at `techyardsystems.com`.
- Old site preserved at `old.techyardsystems.com` for 30 days post-launch as rollback insurance.

**Environment variables (complete list):**

| Variable | Scope | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Server | Resend API authentication |
| `RESEND_FROM_EMAIL` | Server | `From:` address on outbound email (e.g., `noreply@techyardsystems.com`) — must be verified in Resend dashboard |
| `CONTACT_TO_EMAIL` | Server | Destination for admin notifications (`contactus@techyardsystems.com`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Client | Plausible site domain (client-side script needs it) |
| `NEXT_PUBLIC_SITE_URL` | Client | Canonical site URL for OG/canonical/JSON-LD builders |
| `NEXT_PUBLIC_CALENDLY_URL` | Client | Calendly scheduling URL (used in the lazy-load iframe src) |
| `VERCEL_ENV` | Server | Provided by Vercel; used to gate noindex on preview deploys |

All `NEXT_PUBLIC_*` values are baked into the client bundle at build. `.env.example` committed to repo documents the variables without values.

### 7.5 Security headers

Configured in `next.config.ts` via `headers()`:

```typescript
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Content-Security-Policy', value: csp },
];
```

**CSP (Content-Security-Policy):**

```
default-src 'self';
script-src 'self' 'nonce-{{random}}' plausible.io;
style-src 'self' 'unsafe-inline';  // required for next/font generated CSS
img-src 'self' data: blob:;
font-src 'self';
connect-src 'self' plausible.io;
frame-src calendly.com *.calendly.com;  // only when user clicks to load
form-action 'self';
base-uri 'self';
frame-ancestors 'none';
```

`'unsafe-inline'` on `style-src` is a pragmatic concession to Next.js + next/font generated styles; we can tighten to nonce-based later if CSP reporting shows it's safe. `frame-src` is scoped to Calendly — any other third-party iframe requires an explicit CSP amendment (good: forces a decision, not an accident).

A reporting endpoint (`report-uri` / `report-to`) is not configured in V1 — revisit if we want to instrument CSP violations later.

**`/security.txt` and `SECURITY.md`:**

- `public/.well-known/security.txt` at the well-known path per RFC 9116, with `Contact:` and `Expires:` fields.
- `SECURITY.md` at repo root with responsible-disclosure policy. Links from `/security` page.

A site called `/security` selling to enterprises without either of these is a visible credibility gap. Both are trivial additions in V1.

---

## 8. SEO and GEO strategy

### 8.1 Per-page metadata

Every page implements `generateMetadata()` returning:
- `title` + `description` (from frontmatter or static config)
- `canonical` URL
- `openGraph` — `url`, `title`, `description`, `images: [og-api-url]`, `type`
- `twitter` — `card: summary_large_image`, same image

### 8.2 Structured data (JSON-LD)

Injected per page type via helper functions in `lib/seo.ts`:

- **Home + About** — `Organization` with `name`, `url`, `sameAs`, `contactPoint`, `foundingDate`
- **Services** — `Service` schema per practice, nested under Organization
- `/work/[slug]` — `Article` (schema.org has no native `CaseStudy` type) with `about` referencing the practice and `mentions` referencing the industry; include `datePublished`, `author`, `articleBody`, `headline`, `image` (OG image URL)
- `/journal/[slug]` — `BlogPosting` (subclass of `Article`) with `Person` author, `datePublished`, `wordCount`, `articleBody`, `keywords` from category
- `/security` — `FAQPage` with `Question`/`Answer` pairs

### 8.3 Dynamic OpenGraph images

`@vercel/og` renders a unique OG card per page: Newsreader serif title on Stone background with Techyard Systems wordmark and sage accent underline. Each card is unique per page title — dramatically improves LinkedIn share CTR vs. a static card.

### 8.4 Sitemap + robots + llms.txt

- `app/sitemap.ts` — generates from all static routes + all MDX slugs. Each entry has `lastModified`, `changeFrequency`, and `priority`. Google ignores `priority`/`changefreq` but Bing still honors them; since we submit to both (§11.2), populating them is effectively free upside. Rough assignments: `/` = 1.0 / weekly, `/work/*` = 0.8 / monthly, `/journal/*` = 0.7 / monthly, legal pages = 0.3 / yearly.
- `app/robots.ts` — allow all, reference sitemap, no AI-crawler blocks.
- `public/llms.txt` — canonical summary + pointers to key pages. Signals to ChatGPT web search, Perplexity, Claude web for citation eligibility.

### 8.5 Redirects

`next.config.ts` permanent redirects from old site's URLs:
- `/case-studies/*` → `/work/*`
- `/blog/*` → `/journal/*`
- Any specific legacy URLs captured from the current sitemap

---

## 9. Accessibility commitments

Target: **WCAG 2.2 AA**, verified not assumed.

- **Color contrast** pre-verified per §4.1 token table; tokens lint at review time.
- **Focus indicators**: 2px sage ring + 2px offset on every interactive surface. Never `outline: none` without a replacement.
- **Keyboard navigation**: logical tab order, skip-to-main link first focusable on every page.
- **Semantic HTML first**; ARIA only where semantics are insufficient (Radix-backed accordion + dialog).
- **`prefers-reduced-motion: reduce`** — all `--dur-*` collapse to 0ms. Non-essential entrance motion suppressed.
- **Images**: `next/image` with meaningful `alt`; decorative backgrounds `alt=""`.
- **Forms**: visible `<label>` per field (not placeholder-only), inline error via `aria-describedby`, focus first invalid field on submit failure, `aria-live="polite"` for async states.
- **Heading hierarchy**: h1 per page, sequential h2..h6 with no skipped levels.
- **Screen-reader pass before launch** — VoiceOver (Safari macOS/iOS) + NVDA (Windows Firefox) manual walkthrough of home, case study detail, journal post, contact form.

---

## 10. Testing strategy

### 10.1 Unit / integration

- **Vitest** for `lib/` utilities (MDX helpers, SEO builders, form validators).
- Target: meaningful coverage of business logic, not line-count coverage.

### 10.2 Content validation

- **velite + zod** = primary content test. Bad frontmatter fails `pnpm build`.

### 10.3 End-to-end

- **Playwright**, ~13 flows:
  1. Home loads; proof strip values render
  2. Nav links work + sticky nav behaves
  3. Contact form submits (Resend mocked success) and success state renders
  4. Contact form fails validation with inline errors for missing required fields
  5. Contact form delivery-failure path renders fallback panel (Resend mocked 500) with `mailto:` link populated
  6. Case study page renders with ToC + stat band in both the 3-outcome and 1-outcome layouts (two fixtures)
  7. Journal post renders with drop cap + related posts
  8. 404 page renders for bad slug with in-voice editorial copy (not default framework 404)
  9. `prefers-reduced-motion` suppresses entrance motion
  10. Keyboard-only: full nav path reaches every link + form field + submit; chips toggle with Space/Enter
  11. `sitemap.xml` responds with 200 and valid XML
  12. `/api/og/work/<first-slug>` responds with 200, `Content-Type: image/png`, and non-empty body
  13. `/api/og/journal/<first-slug>` responds with 200 + PNG (confirms the catch-all route handles both prefixes — a single fixture can miss a prefix-handling regression)
  14. Calendly card renders as static button; click loads iframe (catches lazy-load regression)

### 10.4 Visual regression

- **Playwright screenshots** at mobile (375px) + desktop (1440px):
  - `/` (home, full scroll)
  - `/work/[slug]` with 3-outcome layout
  - `/work/[slug]` with 1-outcome layout
  - `/journal/[slug]` (drop-cap paragraph in frame)
  - `/contact`
  - `/not-found` (visit `/nonexistent`)
- **Cross-browser drop-cap check.** The journal post fixture is screenshotted additionally in Chromium, WebKit, and Firefox at the same viewport. `::first-letter` renders differently across engines — this pair catches engine-specific regressions and confirms the drop cap isn't causing FOUT-driven layout shift once Newsreader loads.

### 10.5 Performance budgets (CI-enforced)

- Lighthouse CI on every PR:
  - Performance ≥ 95
  - Accessibility = 100
  - Best Practices ≥ 95
  - SEO = 100
  - CLS < 0.05
  - LCP < 2.0s (mobile, 4G)

---

## 11. Launch and rollback plan

### 11.1 Pre-launch checklist

- [ ] Environment variables set in Vercel production (full list in §7.4)
- [ ] Custom domain + SSL configured
- [ ] Favicons (multi-size) + `apple-touch-icon` + `manifest.json`
- [ ] `next.config.ts` redirects from legacy paths (`/case-studies/*` → `/work/*`, `/blog/*` → `/journal/*`)
- [ ] Plausible tracking verified + goals set (`contact_submit_success`, `contact_submit_delivery_error`, Calendly click)
- [ ] **DNS TTL reduced to 300s at least 48 hours before the DNS cut** — this is the window resolver caches need to drain; same-day reduction doesn't help us
- [ ] All placeholder copy replaced with client-approved copy (see V1 build vs V1 launch note in §2)
- [ ] All fabricated case-study metrics replaced with real (or genuinely-representative-and-labeled-as-illustrative) figures
- [ ] Wordmark finalized (or client-supplied logo wired in)
- [ ] Journal cadence owner named; first 90-day editorial calendar filled with at least 3 committed future posts — otherwise the journal actively signals the opposite of the practice voice it's meant to project
- [ ] Preview deploys set to `noindex, nofollow` + Vercel password protection — verified with a `curl` against a preview URL before launch day
- [ ] Security headers verified with securityheaders.com or Mozilla Observatory (target: A grade)
- [ ] `SECURITY.md` + `/.well-known/security.txt` present and valid
- [ ] Final axe audit passing
- [ ] Final VoiceOver walkthrough recorded/signed off
- [ ] Production Lighthouse run meeting budgets
- [ ] `llms.txt` reviewed and matches live content structure
- [ ] OG images preview correctly on LinkedIn + Twitter + iMessage (manual paste-test)
- [ ] `/api/og/work/<any-slug>` returns 200 in production (Playwright already tests it in CI)
- [ ] Brand-name lint (§1) passing on the `main` branch with no allow-comments

### 11.2 Launch

1. Deploy to Vercel production.
2. Keep old site live at `old.techyardsystems.com` (CNAME to current host).
3. DNS cut `techyardsystems.com` A/AAAA to Vercel.
4. Submit new sitemap to Google Search Console + Bing Webmaster Tools.
5. Verify Plausible is tracking.

### 11.3 Rollback

- **Pre-requisite (T-minus 48h):** DNS TTL on the `techyardsystems.com` A/AAAA records reduced to 300s **at least 48 hours before the cut**. This is not optional and not same-day — resolver caches retain the previous TTL (typically 3600s+) until that cache expires, so a same-day TTL change is ineffective. The 48h window lets existing resolver caches drain.
- **If a critical production issue appears** (form completely broken, hero failing to render, performance regression > 20%, CSP blocking critical functionality):
  - DNS cut-back to `old.techyardsystems.com`'s origin takes 5–15 minutes with the pre-reduced TTL in place.
  - Keep rollback option live for 30 days. After 30 days, `old.techyardsystems.com` is retired.
- Lesser issues (typos, small layout bugs) fix-forward on the new site via redeploy.
- **Rollback is an operational last resort, not a routine.** A rollback after a few hours of production traffic loses any form submissions received on the new site unless we explicitly forward them. Practice fix-forward for anything non-critical.

---

## 12. Out-of-scope items (for V2 consideration)

Not implemented in V1 but explicitly considered:

- Headless CMS migration (Sanity or Payload) — trigger if content team grows beyond dev-led editing. When this happens, also switch `/work/*` and `/journal/*` to ISR with on-demand revalidation (see §3 rendering strategy — we dropped ISR in V1 precisely because it's unnecessary until an out-of-band editor exists).
- Dark mode — tokens already support; UI toggle is the only missing piece
- Newsletter signup + email capture
- Search across `/journal` + `/work` (Pagefind or Algolia)
- i18n (additional locales if Techyard Systems expands geographically)
- Blog RSS feed
- Video case studies embedded in `/work/[slug]`
- **Inbound webhook endpoint** (`app/api/contact/route.ts`) — V1's server-action-only submission path cannot be called from non-browser contexts. If V2 integrates Zapier, HubSpot, or any inbound webhook that wants to create a contact record, we'll need a parallel `POST /api/contact` route handler with its own auth (Bearer token or HMAC). The server action stays the primary form path; the route handler becomes a non-form caller. Flagging now so it's not a surprise discovery during a V2 integration scoping.
- CSP reporting endpoint — collect `report-uri` violations to tighten the `style-src 'unsafe-inline'` concession in §7.5
- Sentry or similar external error tracking — V1 uses Vercel function logs; V2 adds structured error tracking when traffic justifies it.

---

## 13. Open questions (flagged before spec review)

None as of 2026-04-18. All decisions documented above were validated with the stakeholder during brainstorming. This section exists to be populated if spec review surfaces gaps.

---

## 14. Glossary

- **SSG** — Static Site Generation. Page rendered at build time, served as static HTML.
- **ISR** — Incremental Static Regeneration. Next.js pattern that rebuilds individual static pages on a schedule or on-demand without a full redeploy.
- **MDX** — Markdown + JSX. Plain-text content format with component embeds, used here for case studies and journal posts.
- **Velite** — MDX + zod content pipeline; successor to contentlayer.
- **GEO** — Generative Engine Optimization. SEO for AI-answer engines (ChatGPT web, Perplexity, Claude, Gemini).
- **`llms.txt`** — Emerging standard at site root that summarizes the site for AI crawlers.
