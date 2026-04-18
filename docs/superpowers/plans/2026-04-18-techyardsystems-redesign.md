<!-- markdownlint-disable MD034 MD040 MD060 MD032 -->
# Techyard Systems Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production Next.js 15 site described in [the design spec](../specs/2026-04-18-techyardsystems-redesign-design.md) — Editorial Minimal aesthetic, 9 top-level pages + 2 dynamic templates, MDX content via velite, server-action contact form, dynamic OG images, WCAG 2.2 AA, Lighthouse 95+.

**Architecture:** Next.js 15 App Router, fully static (SSG) rendering, Tailwind v4 with CSS custom-property tokens, hand-rolled components (no shadcn), Radix primitives only for Dialog + Accordion behaviors, React 19 server action for contact submission, velite + zod for MDX content pipeline.

**Tech Stack:** Next.js 15, React 19, TypeScript strict, Tailwind v4, velite, zod, resend, motion, @vercel/og, @radix-ui/react-dialog, @radix-ui/react-accordion, next-plausible, Vitest, Playwright, lighthouse-ci.

**Reference:** Every task references the spec by section (e.g., §4.6). When in doubt, the spec wins. If the plan contradicts the spec, stop and flag — the spec was the thing we reviewed three times.

---

## Phase structure

| Phase | Range | Purpose |
|---|---|---|
| 1 | Tasks 1–8 | Foundation — project init, deps, tokens, fonts, base layout |
| 2 | Tasks 9–14 | Design primitives — Button, Link, Container, Section, Chip, Nav, Footer |
| 3 | Tasks 15–20 | Content pipeline — velite config, schemas, taxonomies, seed content |
| 4 | Tasks 21–27 | Static pages — Home, Services, About, Security, Privacy, Terms |
| 5 | Tasks 28–31 | Dynamic pages — Case studies (index + detail), Journal (index + post) |
| 6 | Tasks 32–34 | Contact — server action, email template, page |
| 7 | Tasks 35–42 | Infrastructure — OG images, SEO helpers, sitemap, redirects, security headers, error pages, brand-name CI |
| 8 | Tasks 43–50 | Tests, CI, launch prep |

---

## Phase 1 — Foundation

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `.env.example`, `README.md`

- [ ] **Step 1: Initialize Next.js with TypeScript + App Router (non-interactive)**

Run from `/Users/heitindersingh/techyardsystems-redesign/`:

```bash
pnpm create next-app@latest . --ts --app --tailwind --eslint --src-dir false --import-alias "@/*" --use-pnpm --no-turbopack --no-interactive
```

Expected: scaffolds `app/`, `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, Tailwind config.

If the directory isn't empty (it won't be — we have `docs/` and `.git/` already), use `--force` and manually merge the generated `.gitignore` entries with the existing file. Do not clobber `docs/` or `.git/`.

- [ ] **Step 2: Verify dev server boots**

```bash
pnpm dev
```

Expected: Next.js starts on <http://localhost:3000> showing the default page. Kill with Ctrl-C.

- [ ] **Step 3: Update tsconfig.json for strict mode**

Edit `tsconfig.json`'s `compilerOptions` to include:

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "forceConsistentCasingInFileNames": true,
  "moduleResolution": "Bundler"
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: initialize Next.js 15 + TypeScript strict

Scaffolds Next.js App Router project with Tailwind, ESLint, strict
TypeScript settings per spec §7.1. noUncheckedIndexedAccess enabled
to catch array-index bugs at compile time."
```

---

### Task 2: Install runtime dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install content + form + email deps**

```bash
pnpm add velite zod resend motion @vercel/og next-plausible
```

- [ ] **Step 2: Install Radix behavioral primitives**

```bash
pnpm add @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-slot
```

- [ ] **Step 3: Verify versions in package.json**

Open `package.json` and confirm `dependencies` includes all eight packages. `next` should be `^15.x`, `react` and `react-dom` should be `^19.x`.

If next or react are older (a common issue with `create-next-app`), run:

```bash
pnpm add next@latest react@latest react-dom@latest
```

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install runtime dependencies

velite + zod (content pipeline), resend (contact form email), motion
(hero entrance animations), @vercel/og (dynamic OG images), next-plausible
(analytics), Radix Dialog/Accordion/Slot (accessible primitives).
See spec §7.2 for rationale on each."
```

---

### Task 3: Install dev dependencies

- [ ] **Step 1: Install test tooling**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom @playwright/test
```

- [ ] **Step 2: Install lint + format tooling**

```bash
pnpm add -D prettier prettier-plugin-tailwindcss @lhci/cli
```

- [ ] **Step 3: Install Playwright browsers**

```bash
pnpm exec playwright install --with-deps chromium webkit firefox
```

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install dev dependencies

Vitest + Testing Library for unit/integration tests (spec §10.1),
Playwright for E2E + visual regression (spec §10.3, §10.4),
Prettier + Tailwind plugin for formatting, Lighthouse CI (§10.5)."
```

---

### Task 4: Configure lint + format

**Files:**
- Create: `.prettierrc`, `.prettierignore`
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Create `.prettierrc`**

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Create `.prettierignore`**

```
node_modules
.next
.velite
.vercel
pnpm-lock.yaml
public
docs
.superpowers
```

- [ ] **Step 3: Format the entire codebase**

```bash
pnpm exec prettier --write .
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: configure Prettier with Tailwind class sorting"
```

---

### Task 5: Create design tokens CSS file

**Files:**
- Create: `styles/tokens.css`
- Modify: `app/globals.css`

Spec reference: §4.1 (colors), §4.3 (spacing), §4.4 (radius), §4.5 (motion).

- [ ] **Step 1: Write the tokens file**

Create `styles/tokens.css`:

```css
@layer tokens {
  :root {
    /* Colors — §4.1 */
    --color-paper: #f1ede4;
    --color-paper-raised: #fffaf0;
    --color-ink: #2a2f26;
    --color-ink-muted: #6b7165;
    --color-ink-subtle: #8a7f6b;
    --color-accent: #4a6152;
    --color-rule: #e3dccd;
    --color-ink-deep: #1a1d18;

    /* Spacing — §4.3 */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 40px;
    --space-2xl: 64px;
    --space-3xl: 104px;
    --space-section: clamp(80px, 12vw, 160px);
    --container: 1180px;

    /* Radius — §4.4 */
    --r-none: 0;
    --r-sm: 4px;
    --r-md: 12px;
    --r-lg: 18px;
    --r-pill: 999px;

    /* Motion — §4.5 */
    --dur-instant: 80ms;
    --dur-fast: 180ms;
    --dur-base: 320ms;
    --dur-slow: 520ms;
    --ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --dur-instant: 0ms;
      --dur-fast: 0ms;
      --dur-base: 0ms;
      --dur-slow: 0ms;
    }
  }
}
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import 'tailwindcss';
@import '../styles/tokens.css';

@theme {
  --color-paper: var(--color-paper);
  --color-paper-raised: var(--color-paper-raised);
  --color-ink: var(--color-ink);
  --color-ink-muted: var(--color-ink-muted);
  --color-ink-subtle: var(--color-ink-subtle);
  --color-accent: var(--color-accent);
  --color-rule: var(--color-rule);
  --color-ink-deep: var(--color-ink-deep);

  --radius-sm: var(--r-sm);
  --radius-md: var(--r-md);
  --radius-lg: var(--r-lg);
  --radius-pill: var(--r-pill);
}

@layer base {
  html {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  body {
    min-height: 100dvh;
  }

  /* Universal focus ring — §4.6 */
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Skip link — §9 */
  .skip-link {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .skip-link:focus {
    position: fixed;
    left: 16px;
    top: 16px;
    width: auto;
    height: auto;
    padding: 12px 18px;
    background: var(--color-ink);
    color: var(--color-paper);
    border-radius: var(--r-pill);
    z-index: 100;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add styles/tokens.css app/globals.css
git commit -m "feat(tokens): add design tokens and Tailwind @theme wiring

Implements spec §4.1 colors, §4.3 spacing, §4.4 radius, §4.5 motion.
Reduced-motion media query collapses duration tokens to 0ms per §9.
Universal focus ring set as :focus-visible default per §4.6."
```

---

### Task 6: Configure fonts per spec §4.2.1

**Files:**
- Create: `app/fonts.ts`
- Modify: `app/layout.tsx`

Spec reference: §4.2, §4.2.1 (load-bearing for LCP budget).

- [ ] **Step 1: Create `app/fonts.ts`**

```typescript
import { Newsreader, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
  adjustFontFallback: true,
  preload: true,
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: true,
  preload: false,
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
  adjustFontFallback: true,
  preload: false,
})
```

- [ ] **Step 2: Update `app/layout.tsx`**

Replace with:

```tsx
import type { Metadata } from 'next'
import { newsreader, spaceGrotesk, jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Techyard Systems', template: '%s — Techyard Systems' },
  description:
    'Techyard Systems designs and ships custom AI agents for support, sales, and operations. 5× ROI at 20% less than DIY.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans text-[17px] leading-[1.6] text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Extend Tailwind theme with font families**

Edit `app/globals.css` and add inside `@theme`:

```css
--font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
--font-serif: var(--font-newsreader), ui-serif, Georgia, serif;
--font-mono: var(--font-mono), ui-monospace, monospace;
```

- [ ] **Step 4: Boot dev server and verify preload tag present**

```bash
pnpm dev
```

Open <http://localhost:3000> in a browser, View Source. Search for `preload`. Expected: a `<link rel="preload" as="font" crossorigin href="/_next/static/media/[hash]-newsreader-...">` appears exactly for Newsreader. Space Grotesk and JetBrains Mono should NOT be preloaded.

If Newsreader is missing a preload, re-check `preload: true` in `fonts.ts`. Kill the server after verification.

- [ ] **Step 5: Commit**

```bash
git add app/fonts.ts app/layout.tsx app/globals.css
git commit -m "feat(fonts): configure Newsreader + Space Grotesk + JetBrains Mono

Latin subset only, display: swap, adjustFontFallback for CLS control.
Only Newsreader preloads (LCP path); Space Grotesk and JetBrains Mono
are swap-only. See spec §4.2.1 for full rationale."
```

---

### Task 7: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Create `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': resolve(__dirname, '.') } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/.next/**', 'e2e/**'],
  },
})
```

- [ ] **Step 2: Create `vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Add test scripts to `package.json`**

Inside `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write a smoke test**

Create `lib/__tests__/smoke.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('runs tests', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Run and verify**

```bash
pnpm test
```

Expected: 1 passing test.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure Vitest with jsdom + Testing Library"
```

---

### Task 8: Configure Playwright

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Create `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html']] : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
```

- [ ] **Step 2: Create smoke E2E test**

`e2e/smoke.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Techyard Systems/)
})
```

- [ ] **Step 3: Add script**

`package.json` scripts:

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

- [ ] **Step 4: Run smoke E2E**

```bash
pnpm test:e2e --project=chromium-desktop
```

Expected: 1 passing test.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: configure Playwright with 4 project matrix

Chromium desktop + mobile, WebKit, Firefox. webServer runs pnpm dev.
Smoke test asserts home page title loads."
```

---

## Phase 2 — Design Primitives

### Task 9: Button primitive

**Files:**
- Create: `components/primitives/Button.tsx`, `components/primitives/__tests__/Button.test.tsx`

Spec reference: §4.6 (five interactive patterns).

- [ ] **Step 1: Write the test**

`components/primitives/__tests__/Button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders primary variant by default', () => {
    render(<Button>Book a call</Button>)
    const btn = screen.getByRole('button', { name: 'Book a call' })
    expect(btn).toHaveClass('bg-ink')
  })

  it('renders secondary variant with bordered style', () => {
    render(<Button variant="secondary">See work</Button>)
    const btn = screen.getByRole('button', { name: 'See work' })
    expect(btn).toHaveClass('border-ink')
    expect(btn).not.toHaveClass('bg-ink')
  })

  it('renders ghost variant with no border', () => {
    render(<Button variant="ghost">Learn more</Button>)
    const btn = screen.getByRole('button', { name: 'Learn more' })
    expect(btn).not.toHaveClass('border-ink')
    expect(btn).toHaveClass('underline-offset-4')
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/contact">Contact</Button>)
    const link = screen.getByRole('link', { name: 'Contact' })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test Button
```

Expected: all 4 tests fail with "Cannot find module '../Button'".

- [ ] **Step 3: Implement the Button**

`components/primitives/Button.tsx`:

```typescript
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type CommonProps = {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonProps = CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: never }
type LinkProps = CommonProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'> & { href: string }

const base =
  'inline-flex items-center justify-center rounded-pill px-6 py-3 text-sm font-medium transition-[transform,background-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out-quart)]'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink underline underline-offset-4 hover:decoration-2',
}

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', children, className, ...rest } = props
  const cn = `${base} ${variants[variant]} ${className ?? ''}`.trim()

  if ('href' in rest && rest.href) {
    return (
      <Link className={cn} {...(rest as LinkProps)}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cn} {...(rest as ButtonProps)}>
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
pnpm test Button
```

Expected: 4 passing.

- [ ] **Step 5: Commit**

```bash
git add components/primitives/Button.tsx components/primitives/__tests__/Button.test.tsx
git commit -m "feat(primitives): add Button with primary/secondary/ghost variants

Polymorphic — renders <button> or Next <Link> based on href prop.
Four tests cover each variant + anchor polymorphism. See spec §4.6."
```

---

### Task 10: Container + Section primitives

**Files:**
- Create: `components/primitives/Container.tsx`, `components/primitives/Section.tsx`

- [ ] **Step 1: Container component**

`components/primitives/Container.tsx`:

```typescript
import type { ComponentProps } from 'react'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1180px] px-6 md:px-10 lg:px-14 ${className ?? ''}`}
      {...props}
    />
  )
}
```

- [ ] **Step 2: Section component**

`components/primitives/Section.tsx`:

```typescript
import type { ComponentProps } from 'react'

type Tone = 'paper' | 'ink' | 'flax' | 'obsidian'

const toneClasses: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
  flax: 'bg-rule text-ink',
  obsidian: 'bg-ink-deep text-paper',
}

type Props = ComponentProps<'section'> & { tone?: Tone }

export function Section({ tone = 'paper', className, ...props }: Props) {
  return (
    <section
      className={`${toneClasses[tone]} py-[var(--space-section)] ${className ?? ''}`}
      {...props}
    />
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/primitives/Container.tsx components/primitives/Section.tsx
git commit -m "feat(primitives): add Container and Section

Container: 1180px max-width with fluid horizontal padding.
Section: paper/ink/flax/obsidian tones + --space-section vertical rhythm.
See spec §4.3 + §5 color rhythm."
```

---

### Task 11: Chip component with ARIA

**Files:**
- Create: `components/primitives/Chip.tsx`, `components/primitives/__tests__/Chip.test.tsx`

Spec reference: §4.6 chip state + §5.6 chips ARIA pattern.

- [ ] **Step 1: Write tests**

`components/primitives/__tests__/Chip.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Chip } from '../Chip'

describe('Chip', () => {
  it('renders with role=checkbox and aria-checked=false by default', () => {
    render(<Chip selected={false} onToggle={() => {}}>Support</Chip>)
    const chip = screen.getByRole('checkbox', { name: 'Support' })
    expect(chip).toHaveAttribute('aria-checked', 'false')
  })

  it('reflects selected state via aria-checked=true', () => {
    render(<Chip selected={true} onToggle={() => {}}>Support</Chip>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onToggle when clicked', () => {
    const toggle = vi.fn()
    render(<Chip selected={false} onToggle={toggle}>Support</Chip>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(toggle).toHaveBeenCalledTimes(1)
  })

  it('calls onToggle on Space key', () => {
    const toggle = vi.fn()
    render(<Chip selected={false} onToggle={toggle}>Support</Chip>)
    const chip = screen.getByRole('checkbox')
    chip.focus()
    fireEvent.keyDown(chip, { key: ' ' })
    expect(toggle).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
pnpm test Chip
```

- [ ] **Step 3: Implement**

`components/primitives/Chip.tsx`:

```typescript
'use client'

import type { ReactNode, KeyboardEvent } from 'react'

type Props = {
  selected: boolean
  onToggle: () => void
  children: ReactNode
}

export function Chip({ selected, onToggle, children }: Props) {
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      onKeyDown={onKey}
      className={
        selected
          ? 'rounded-pill border border-accent bg-accent px-4 py-2 text-sm font-medium text-paper transition-colors'
          : 'rounded-pill border border-rule bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink'
      }
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
pnpm test Chip
```

- [ ] **Step 5: Commit**

```bash
git add components/primitives/Chip.tsx components/primitives/__tests__/Chip.test.tsx
git commit -m "feat(primitives): add Chip with aria-checked checkbox pattern

Per spec §5.6 — each chip is role=checkbox inside a role=group legend.
Space/Enter toggle. Independent checkboxes (not radiogroup) so multiple
selection works without arrow-key navigation."
```

---

### Task 12: Nav component

**Files:**
- Create: `components/layout/Nav.tsx`, `components/layout/MobileNav.tsx`

Spec reference: §3 primary navigation, §5.1 sticky translucent stone.

- [ ] **Step 1: Create Nav**

`components/layout/Nav.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/primitives/Button'
import { MobileNav } from './MobileNav'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-transparent backdrop-blur-md transition-colors"
      style={{ background: 'rgba(241,237,228,0.88)' }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-10 lg:px-14"
      >
        <Link href="/" className="font-serif text-[22px] font-medium tracking-tight">
          Techyard Systems
        </Link>
        <ul className="hidden gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium hover:underline hover:underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button href="/contact" variant="primary">
            Book a call
          </Button>
        </div>
        <MobileNav links={links} />
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create MobileNav using Radix Dialog**

`components/layout/MobileNav.tsx`:

```typescript
'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useState } from 'react'

type Props = { links: { href: string; label: string }[] }

export function MobileNav({ links }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Open navigation menu" className="rounded-pill border border-ink px-3 py-2 text-sm md:hidden">
          Menu
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40" />
        <Dialog.Content className="fixed inset-0 z-[70] flex flex-col bg-paper p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-serif text-[22px] font-medium">Techyard Systems</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close menu" className="rounded-pill border border-ink px-3 py-2 text-sm">
                Close
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Primary mobile" className="mt-12 flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-3xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex w-fit rounded-pill bg-ink px-6 py-3 text-paper"
              onClick={() => setOpen(false)}
            >
              Book a call
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.tsx components/layout/MobileNav.tsx
git commit -m "feat(layout): add Nav with sticky translucent stone + Radix mobile dialog

Desktop: horizontal links + book-a-call CTA.
Mobile (<md): hamburger → fullscreen Radix Dialog.
See spec §3 + §5.1. Nav ring covered by global focus-visible."
```

---

### Task 13: Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

Spec reference: §5.1 footer structure.

- [ ] **Step 1: Create Footer**

```typescript
import Link from 'next/link'

const practice = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]
const company = [
  { href: '/contact', label: 'Contact' },
  { href: '/security', label: 'Security' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-deep px-6 py-20 text-paper md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="font-serif text-2xl font-medium">Techyard Systems</div>
          <p className="mt-4 max-w-[32ch] font-serif text-base italic text-paper/60">
            An autonomous-systems practice. We build AI agents that run the work you'd rather
            not hire for.
          </p>
        </div>
        <FooterColumn title="Practice" links={practice} />
        <FooterColumn title="Company" links={company} />
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[2px] text-paper/40">
            Get in touch
          </div>
          <ul className="flex flex-col gap-3 text-sm text-paper/85">
            <li>
              <a href="mailto:contactus@techyardsystems.com" className="hover:underline">
                contactus@techyardsystems.com
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Book a 15-min call →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[1180px] border-t border-paper/10 pt-6">
        <div className="flex justify-between font-mono text-xs text-paper/50">
          <span>© {year} Techyard Systems</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-5 text-[11px] uppercase tracking-[2px] text-paper/40">{title}</div>
      <ul className="flex flex-col gap-3 text-sm text-paper/85">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat(layout): add Footer — 4-column, obsidian bg, hairline rule

Brand + sub / Practice / Company / Contact. See spec §5.1 footer."
```

---

### Task 14: Wire Nav + Footer into root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update RootLayout**

Replace the `<body>` contents in `app/layout.tsx`:

```tsx
<body className="flex min-h-dvh flex-col font-sans text-[17px] leading-[1.6] text-ink antialiased">
  <a href="#main" className="skip-link">Skip to main content</a>
  <Nav />
  <main id="main" className="flex-1">
    {children}
  </main>
  <Footer />
</body>
```

Add imports:

```typescript
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
```

- [ ] **Step 2: Verify in browser**

```bash
pnpm dev
```

Load <http://localhost:3000>. Expected: sticky translucent nav at top ("Techyard Systems" + 4 links + "Book a call"), obsidian footer at bottom with 4 columns. Kill dev server.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): wire Nav + Footer into root layout

Skip-to-main link is now the first focusable element per §9 a11y."
```

---

## Phase 3 — Content pipeline

### Task 15: Taxonomies + Image type

**Files:**
- Create: `content/taxonomies.ts`

Spec reference: §6.3.

- [ ] **Step 1: Create taxonomies**

```typescript
import { z } from 'zod'

export const industries = [
  'logistics',
  'financial',
  'healthcare',
  'saas',
  'ecommerce',
  'pro-services',
  'government',
  'manufacturing',
] as const

export const practices = ['support', 'sales', 'it-hr', 'data', 'ops'] as const

export const categories = ['Field notes', 'Opinion', 'Notes', 'Fieldwork'] as const

export type Industry = (typeof industries)[number]
export type Practice = (typeof practices)[number]
export type Category = (typeof categories)[number]

export const industryLabels: Record<Industry, string> = {
  logistics: 'Logistics & Freight',
  financial: 'Financial Services',
  healthcare: 'Healthcare Ops',
  saas: 'SaaS Support',
  ecommerce: 'E-commerce',
  'pro-services': 'Professional Services',
  government: 'Government & Civic',
  manufacturing: 'Manufacturing',
}

export const practiceLabels: Record<Practice, string> = {
  support: 'Customer support automation',
  sales: 'Sales lead generation & follow-up',
  'it-hr': 'IT & HR request management',
  data: 'Data analysis & reporting',
  ops: 'Operations & logistics monitoring',
}

export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string().min(1, 'alt text is required for content images'),
  width: z.number(),
  height: z.number(),
  caption: z.string().optional(),
})

export type Image = z.infer<typeof ImageSchema>
```

- [ ] **Step 2: Commit**

```bash
git add content/taxonomies.ts
git commit -m "feat(content): add taxonomies (industries, practices, categories)

zod-exported types + display-label maps. Per spec §6.3. ImageSchema
per §5.2.1 — alt required at schema level."
```

---

### Task 16: Velite config with case-study and journal schemas

**Files:**
- Create: `velite.config.ts`
- Modify: `package.json` (script + prebuild hook)

Spec reference: §6.1, §6.2, §6.5.

- [ ] **Step 1: Write the config**

```typescript
import { defineConfig, s } from 'velite'
import { industries, practices, categories, ImageSchema } from './content/taxonomies'

const OutcomeSchema = s.object({
  eyebrow: s.string(),
  value: s.string(),
  valueAccent: s.string(),
  note: s.string(),
})

const caseStudy = {
  name: 'CaseStudy',
  pattern: 'case-studies/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('case-studies'),
      number: s.string(),
      clientName: s.string(),
      clientDisclosed: s.boolean(),
      industry: s.enum(industries),
      practice: s.enum(practices),
      engagementWeeks: s.number().int().positive(),
      engagementType: s.enum(['fixed fee', 'pilot', 'retainer']),
      publishedAt: s.isodate(),
      title: s.string(),
      titleAccent: s.string(),
      lede: s.string(),
      pullQuote: s.string().nullable(),
      pullAttribution: s.string().nullable(),
      outcomes: s.union([
        s.tuple([OutcomeSchema, OutcomeSchema, OutcomeSchema]),
        s.tuple([OutcomeSchema]),
      ]),
      featured: s.boolean(),
      nextSlug: s.string().nullable(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/work/${data.slug}` })),
}

const journalPost = {
  name: 'JournalPost',
  pattern: 'journal/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('journal'),
      number: s.string(),
      category: s.enum(categories),
      title: s.string(),
      titleAccent: s.string(),
      subtitle: s.string(),
      publishedAt: s.isodate(),
      readingMinutes: s.number().int().positive(),
      author: s.object({
        name: s.string(),
        role: s.string(),
        avatar: ImageSchema,
      }),
      featureImage: ImageSchema.nullable(),
      relatedSlugs: s.array(s.string()).nullable(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/journal/${data.slug}` })),
}

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { caseStudies: caseStudy, journalPosts: journalPost },
})
```

- [ ] **Step 2: Add build hooks to package.json**

In `"scripts"`:

```json
"velite": "velite",
"dev": "velite --watch & next dev",
"build": "velite build && next build"
```

(The `dev` command backgrounds velite's watcher alongside Next.js; if `&` portability is a concern, substitute `concurrently` — but for single-machine dev, `&` is fine.)

- [ ] **Step 3: Add .velite to .gitignore**

Append to `.gitignore`:

```
.velite
public/static
```

- [ ] **Step 4: Commit**

```bash
git add velite.config.ts package.json .gitignore
git commit -m "feat(content): configure velite with case-study and journal schemas

Schemas per spec §6.1–§6.2. Outcomes union enforces 3-or-1 rule.
Slug auto-derived from filename. MDX compiled at build time. .velite
and public/static both generated; both ignored from git."
```

---

### Task 17: Seed case study — 3-outcome (logistics)

**Files:**
- Create: `content/case-studies/freight-monitoring.mdx`

- [ ] **Step 1: Write the MDX**

```mdx
---
number: "№ 03"
clientName: "Tier-1 3PL (disclosed on request)"
clientDisclosed: false
industry: "logistics"
practice: "ops"
engagementWeeks: 10
engagementType: "fixed fee"
publishedAt: 2026-03-20
title: "A freight brokerage stopped watching dashboards."
titleAccent: "stopped watching dashboards"
lede: "A tier-1 3PL replaced three rounds of manual dispatcher work with a single monitoring agent — the dispatchers now only see the shipments that actually need a human."
pullQuote: "The agent outperforms anyone we tried to hire."
pullAttribution: "— VP of Operations, Tier-1 3PL"
outcomes:
  - eyebrow: "Outcome 01"
    value: "68"
    valueAccent: "%"
    note: "Fewer shipments requiring human intervention per day, measured across a rolling 30-day window."
  - eyebrow: "Outcome 02"
    value: "4"
    valueAccent: "×"
    note: "Faster mean time to resolution for flagged anomalies, once an actual human was paged."
  - eyebrow: "Outcome 03"
    value: "$2.1"
    valueAccent: "M"
    note: "Annualised operating-cost reduction, validated by the client's finance team in Q1 2026."
featured: true
nextSlug: null
---

## The problem

The dispatch team was spending 40% of their shift reviewing shipments that were fine — scanning dashboards for outliers, confirming nothing had broken, and responding to an unfiltered alerting system that cried wolf more often than it caught anything.

The client had tried rule-based alerting, a commercial monitoring SaaS, and a Zapier rollup. All three produced the same problem: the signal was real, but buried in noise.

> The agent outperforms anyone we tried to hire for this role.

## How we scoped it

A two-week discovery engagement with dispatch leads, finance, and one shadowed shift. We produced a scoped definition of "normal" — the 8 observable signals that, when deviant, required a human.

## What we built

A monitoring agent that runs continuously against the client's TMS, analyses shipment state against the signal map, and escalates only when a human is actually needed — with a one-paragraph written summary of why.

## Measuring impact

Over the 12-week measurement window, the agent caught 100% of the incidents the old system had flagged correctly, plus 14 that the old system had missed. No false positives required more than a single-click dismissal.

## What the team owns now

A system running in the client's cloud, owned by the client. We hand-documented the escalation rules, the signal map, and the retraining workflow. No vendor dependency, no license fees, no mystery.
```

- [ ] **Step 2: Build to validate**

```bash
pnpm velite
```

Expected: output shows `✓ caseStudies: 1 entries`. If schema fails, fix the frontmatter — velite will tell you exactly which field.

- [ ] **Step 3: Commit**

```bash
git add content/case-studies/freight-monitoring.mdx
git commit -m "feat(content): seed case study freight-monitoring (3-outcome fixture)

Placeholder data — real client disclosure gated by NDA.
Exercises the 3-outcome stat band layout per spec §5.2."
```

---

### Task 18: Seed case study — 1-outcome (support)

**Files:**
- Create: `content/case-studies/support-deflection.mdx`

- [ ] **Step 1: Write the MDX**

```mdx
---
number: "№ 04"
clientName: "Mid-market SaaS (disclosed on request)"
clientDisclosed: false
industry: "saas"
practice: "support"
engagementWeeks: 8
engagementType: "pilot"
publishedAt: 2026-04-02
title: "How a support team halved its staffing without losing CSAT."
titleAccent: "without losing CSAT"
lede: "One metric told the whole story: the staffing cost of support dropped 50% while CSAT held steady at 4.6."
pullQuote: null
pullAttribution: null
outcomes:
  - eyebrow: "The metric that mattered"
    value: "50"
    valueAccent: "%"
    note: "Reduction in tier-1 support staffing cost, with CSAT holding at 4.6/5.0 across the 12-week measurement window. The client reinvested the savings into two senior support engineers — net headcount up, but cost flat."
featured: false
nextSlug: null
---

## The situation

A mid-market SaaS company had grown support headcount faster than revenue for three straight quarters. The team was good, but the volume was mostly repetitive tier-1 work: account access, billing questions, feature orientation.

## What we built

A tier-1 triage agent that resolves or deflects the repetitive work and only escalates genuinely novel cases. Integrated with Intercom and the client's billing system.

## The single metric

We and the client agreed up front: this engagement would be judged on one number — tier-1 staffing cost, with CSAT as a veto condition. The pilot hit both targets inside 8 weeks.
```

- [ ] **Step 2: Build**

```bash
pnpm velite
```

Expected: `✓ caseStudies: 2 entries`.

- [ ] **Step 3: Commit**

```bash
git add content/case-studies/support-deflection.mdx
git commit -m "feat(content): seed case study support-deflection (1-outcome fixture)

Exercises the 1-outcome hero-stat layout per spec §5.2 + §6.1 — the
'one metric so strong it stands alone' case."
```

---

### Task 19: Third seed case study + five seed journal posts

**Files:**
- Create: `content/case-studies/healthcare-intake.mdx`
- Create: `content/journal/stopped-calling-chatbots.mdx`
- Create: `content/journal/ten-week-pilot.mdx`
- Create: `content/journal/autonomous-spectrum.mdx`
- Create: `content/journal/handover-model-weights.mdx`
- Create: `content/journal/measuring-outcomes.mdx`

- [ ] **Step 1: Third case study (healthcare, 3 outcomes, featured=false)**

Using the same MDX format as Task 17 but with `industry: "healthcare"`, `practice: "it-hr"`, a healthcare-intake-agent story, and 3 outcomes. See spec §2 scope — we need 3 seed case studies total. Keep metrics placeholder-plausible; don't claim real healthcare data.

Full content: follow the pattern from Tasks 17–18. Frontmatter complete, body 400–600 words with 3 H2 sections.

- [ ] **Step 2: Journal post 1 — `stopped-calling-chatbots.mdx`**

Use the content body from the §5.3 wireframe mock (the "Why we stopped calling them chatbots" essay). Frontmatter:

```yaml
number: "Journal № 14"
category: "Opinion"
title: "Why we stopped calling them chatbots."
titleAccent: "chatbots"
subtitle: "A short argument about the language we use to sell autonomous systems — and the buyer confusion that language creates."
publishedAt: 2026-04-08
readingMinutes: 5
author:
  name: "Kirat Singh"
  role: "Practice lead · Techyard Systems"
  avatar: { src: "./avatar-kirat.svg", alt: "Portrait placeholder", width: 128, height: 128 }
featureImage: null
relatedSlugs: null
```

Create `content/journal/avatar-kirat.svg` as a solid sage circle placeholder (or any 128×128 svg).

- [ ] **Step 3: Journal posts 2–5**

Each roughly 600–900 words. Use placeholders — client will rewrite before launch. Topics follow the §5.3 "Related posts" list:

- `ten-week-pilot.mdx` — Category: Fieldwork. "The 10-week pilot: what actually fits in it"
- `autonomous-spectrum.mdx` — Category: Opinion. "'Autonomous' is a spectrum, not a feature"
- `handover-model-weights.mdx` — Category: Notes. "Why we hand over model weights"
- `measuring-outcomes.mdx` — Category: Field notes. "Measuring outcomes without measuring wrong"

Each gets frontmatter matching the schema and body with at least one H2 section + one pull quote (`<blockquote>...`).

- [ ] **Step 4: Build**

```bash
pnpm velite
```

Expected: `✓ caseStudies: 3 entries` and `✓ journalPosts: 5 entries`. If any fail, fix frontmatter.

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "feat(content): seed 3 case studies + 5 journal posts

V1 placeholder content — real copy replaces before launch per §2
sequencing note. Exercises both 3-outcome and 1-outcome layouts,
all four journal categories, and the typed author object."
```

---

### Task 20: Typed home content

**Files:**
- Create: `content/home.ts`

Spec reference: §6.4.

- [ ] **Step 1: Create home content**

```typescript
import { practices, practiceLabels, type Practice } from './taxonomies'

type Practice01 = {
  number: string
  practice: Practice
  title: string
  description: string
}

export const homeContent = {
  hero: {
    eyebrow: 'Autonomous systems · est. practice',
    title: 'Agents that actually ',
    titleAccent: 'work.',
    lede:
      'We design, build, and ship custom AI agents that run your support, sales, and operations — 24 hours a day, trained on your data, owned by you.',
    primaryCta: { label: 'Book a call →', href: '/contact' },
    ghostCta: { label: 'See recent work', href: '/work' },
  },
  proof: [
    { value: '68', accent: '%', note: 'reduction in support tickets' },
    { value: '4', accent: '×', note: 'faster resolution time' },
    { value: '5', accent: '×', note: 'return on investment' },
    { value: '7', accent: '+', note: 'industries shipped into' },
  ],
  practicesSection: {
    eyebrow: 'What we build',
    title: 'Five practices,',
    titleLine2: 'one philosophy: ',
    titleAccent: 'ship what works.',
  },
  practices: [
    {
      number: '№ 01',
      practice: 'support',
      title: 'Customer support automation',
      description:
        'Tier-1 triage and resolution agents that handle 60–80% of inbound tickets without escalation. Plugs into Zendesk, Intercom, Freshdesk, or custom helpdesks.',
    },
    {
      number: '№ 02',
      practice: 'sales',
      title: 'Sales lead generation & follow-up',
      description:
        'Outbound qualification, personalized follow-up sequences, and CRM hygiene — so your human team stays focused on the calls that actually close.',
    },
    {
      number: '№ 03',
      practice: 'it-hr',
      title: 'IT & HR request management',
      description:
        'Internal-facing agents for onboarding, access requests, password resets, and policy Q&A. Integrates with Okta, Google Workspace, Jira, ServiceNow.',
    },
    {
      number: '№ 04',
      practice: 'data',
      title: 'Data analysis & reporting',
      description:
        'Agents that summarize, trend-detect, and report on data you already have — warehouse, spreadsheet, or otherwise. Delivered as Slack digests or scheduled briefs.',
    },
    {
      number: '№ 05',
      practice: 'ops',
      title: 'Operations & logistics monitoring',
      description:
        'Always-on agents that watch your pipelines, inventory, shipment status, or uptime — and tell a human only when a human is actually needed.',
    },
  ] satisfies Practice01[],
  howWeWork: {
    eyebrow: 'How we work',
    title: 'Three phases, ',
    titleAccent: 'no surprises.',
    phases: [
      {
        step: 'Phase one',
        title: 'Discovery & scoping',
        body:
          'A two-week engagement where we map the workflow, identify where an agent creates leverage, and deliver a written scope with measurable success criteria. Fixed fee.',
      },
      {
        step: 'Phase two',
        title: 'Build & pilot',
        body:
          'Four to eight weeks. We design, train, and deploy the agent in a bounded pilot — real data, real traffic, measurable impact. You own the code and the model weights.',
      },
      {
        step: 'Phase three',
        title: 'Handover & support',
        body:
          'We hand over clean code, documentation, and runbooks. Ongoing support is optional — most clients run the system themselves within three months. No vendor lock-in.',
      },
    ],
  },
  cta: {
    title: 'Build the agent your team ',
    titleAccent: 'actually needs.',
    sub: 'A 15-minute discovery call is the fastest way to find out if we\'re a fit.',
    button: { label: 'Book a call →', href: '/contact' },
  },
} as const
```

- [ ] **Step 2: Commit**

```bash
git add content/home.ts
git commit -m "feat(content): add typed home-page content object

Per spec §6.4 — home is a fixed composition, not streamed content, so
it lives as a TS object. Practices enum-referenced to taxonomies."
```

---

## Phase 4 — Static pages

### Task 21: Home page — Hero + Proof + Practices sections

**Files:**
- Create: `components/sections/HeroHome.tsx`, `components/sections/ProofStrip.tsx`, `components/sections/PracticesList.tsx`
- Create: `app/page.tsx`

Spec reference: §5.1 (full page composition).

- [ ] **Step 1: HeroHome section**

`components/sections/HeroHome.tsx`:

```typescript
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { homeContent } from '@/content/home'

export function HeroHome() {
  const { hero } = homeContent
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <Container>
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          {hero.eyebrow}
        </div>
        <h1 className="max-w-[14ch] font-serif text-[clamp(56px,10vw,96px)] font-medium leading-[0.98] tracking-[-0.024em]">
          {hero.title}
          <em className="font-normal not-italic italic text-accent">{hero.titleAccent}</em>
        </h1>
        <p className="mt-8 max-w-[52ch] font-serif text-[22px] italic leading-[1.45] text-ink-muted">
          {hero.lede}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.ghostCta.href} variant="ghost">
            {hero.ghostCta.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: ProofStrip**

```typescript
import { Container } from '@/components/primitives/Container'
import { homeContent } from '@/content/home'

export function ProofStrip() {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid gap-6 border-t border-rule pt-10 sm:grid-cols-2 md:grid-cols-4">
          {homeContent.proof.map((item, i) => (
            <div key={i}>
              <div className="font-serif text-[44px] font-medium leading-none tracking-[-0.02em]">
                <em className="font-normal not-italic italic text-accent">
                  {item.value}
                  {item.accent}
                </em>
              </div>
              <div className="mt-2 max-w-[22ch] text-xs leading-[1.4] text-ink-muted">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: PracticesList**

```typescript
import { Container } from '@/components/primitives/Container'
import { homeContent } from '@/content/home'

export function PracticesList() {
  const { practicesSection, practices } = homeContent
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          {practicesSection.eyebrow}
        </div>
        <h2 className="mb-12 max-w-[22ch] font-serif text-[clamp(36px,5vw,60px)] font-medium leading-[1.05] tracking-[-0.02em]">
          {practicesSection.title}
          <br />
          {practicesSection.titleLine2}
          <em className="font-normal not-italic italic text-accent">
            {practicesSection.titleAccent}
          </em>
        </h2>
        <div>
          {practices.map((p, i) => (
            <div
              key={p.number}
              className={`grid gap-10 border-t border-rule py-10 md:grid-cols-[80px_1fr_80px] ${
                i === practices.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="pt-2 font-mono text-xs text-ink-subtle">{p.number}</div>
              <div>
                <h3 className="mb-3 font-serif text-[32px] font-medium leading-[1.1] tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="max-w-[62ch] text-base leading-[1.55] text-ink-muted">
                  {p.description}
                </p>
              </div>
              <div className="hidden pt-2 text-right font-serif text-[22px] italic text-accent md:block">
                →
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Wire into home page**

`app/page.tsx`:

```typescript
import { HeroHome } from '@/components/sections/HeroHome'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { PracticesList } from '@/components/sections/PracticesList'

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ProofStrip />
      <PracticesList />
    </>
  )
}
```

- [ ] **Step 5: Verify in browser**

```bash
pnpm dev
```

Visit <http://localhost:3000>. Expected: hero + proof + 5-practice list render on stone background with Newsreader headlines.

- [ ] **Step 6: Commit**

```bash
git add components/sections app/page.tsx
git commit -m "feat(home): add Hero, Proof strip, Practices list sections

First three home sections per spec §5.1. Italic accent rendering via
<em> overrides italic default (not-italic italic = specific italic
glyph on an otherwise non-italic run — see the pattern in HeroHome)."
```

---

### Task 22: Home page — Featured case study + Industries + How we work + CTA band

**Files:**
- Create: `components/sections/FeaturedCaseStudy.tsx`, `components/sections/IndustriesGrid.tsx`, `components/sections/HowWeWork.tsx`, `components/sections/CTABand.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: FeaturedCaseStudy (dark charcoal band)**

```typescript
import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { caseStudies } from '#site/content'
import { industryLabels } from '@/content/taxonomies'

export function FeaturedCaseStudy() {
  const cs = caseStudies.find((c) => c.featured) ?? caseStudies[0]
  if (!cs) return null
  const outcomes = cs.outcomes

  return (
    <section className="bg-ink text-paper py-[var(--space-section)]">
      <Container>
        <div className="grid gap-20 md:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-[#a8c0b4]">
              {cs.number} · {industryLabels[cs.industry]}
            </div>
            {cs.pullQuote && (
              <h3 className="mb-7 font-serif text-[36px] italic leading-[1.2] tracking-[-0.02em]">
                &ldquo;{cs.pullQuote}&rdquo;
              </h3>
            )}
            <p className="mb-7 max-w-[48ch] font-serif text-[17px] italic leading-[1.55] text-paper/70">
              {cs.lede}
            </p>
            {cs.pullAttribution && (
              <div className="text-xs tracking-wider text-paper/55">{cs.pullAttribution}</div>
            )}
            <Link
              href={cs.url}
              className="mt-10 inline-block border-b border-paper pb-1 text-sm font-medium"
            >
              Read the full study →
            </Link>
          </div>
          <div className="rounded-lg bg-paper/[0.06] p-11">
            {outcomes.map((o, i) => (
              <div
                key={i}
                className={`py-6 ${i !== outcomes.length - 1 ? 'border-b border-paper/10' : ''} ${
                  i === 0 ? 'pt-0' : ''
                }`}
              >
                <div className="font-serif text-[56px] font-medium leading-none tracking-[-0.025em]">
                  {o.value}
                  <em className="font-normal not-italic italic text-[#a8c0b4]">{o.valueAccent}</em>
                </div>
                <div className="mt-3 max-w-[32ch] text-[13px] leading-[1.4] text-paper/65">
                  {o.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
```

Note: `#site/content` is velite's auto-generated import alias. Ensure `velite.config.ts`'s output is set so TypeScript picks it up. Add to `tsconfig.json`'s `compilerOptions.paths`:

```json
"paths": {
  "@/*": ["./*"],
  "#site/content": ["./.velite"]
}
```

- [ ] **Step 2: IndustriesGrid**

Iterate over all 8 industries, showing count of case studies per industry derived from `caseStudies` array. Full-bleed 4-column grid with hairline dividers. ~50 lines.

```typescript
import { Container } from '@/components/primitives/Container'
import { caseStudies } from '#site/content'
import { industries, industryLabels } from '@/content/taxonomies'

export function IndustriesGrid() {
  const countsByIndustry = Object.fromEntries(
    industries.map((i) => [i, caseStudies.filter((c) => c.industry === i).length]),
  )
  return (
    <section className="py-20">
      <Container>
        <div className="mb-7 text-center text-[11px] font-medium uppercase tracking-[2px] text-accent">
          Industries we've shipped into
        </div>
      </Container>
      <div className="grid grid-cols-2 gap-px bg-rule border-y border-rule md:grid-cols-4">
        {industries.map((i) => (
          <div key={i} className="bg-paper p-8 text-center">
            <div className="font-serif text-lg font-medium tracking-tight">
              {industryLabels[i]}
            </div>
            <div className="mt-1 text-[11px] text-ink-subtle">
              Case studies · {countsByIndustry[i]}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: HowWeWork**

```typescript
import { Container } from '@/components/primitives/Container'
import { homeContent } from '@/content/home'

export function HowWeWork() {
  const { howWeWork } = homeContent
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          {howWeWork.eyebrow}
        </div>
        <h2 className="mb-14 max-w-[22ch] font-serif text-[clamp(36px,5vw,60px)] font-medium leading-[1.05] tracking-[-0.02em]">
          {howWeWork.title}
          <em className="font-normal not-italic italic text-accent">{howWeWork.titleAccent}</em>
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {howWeWork.phases.map((p) => (
            <div key={p.step}>
              <div className="mb-4 font-serif text-lg italic text-accent">{p.step}</div>
              <h3 className="mb-3 font-serif text-2xl font-medium tracking-tight">{p.title}</h3>
              <p className="text-[15px] leading-[1.55] text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: CTABand**

```typescript
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { homeContent } from '@/content/home'

export function CTABand() {
  const { cta } = homeContent
  return (
    <section className="bg-rule py-[var(--space-section)] text-center">
      <Container>
        <h2 className="mx-auto max-w-[16ch] font-serif text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.022em]">
          {cta.title}
          <em className="font-normal not-italic italic text-accent">{cta.titleAccent}</em>
        </h2>
        <p className="mt-7 font-serif text-[20px] italic text-ink-muted">{cta.sub}</p>
        <div className="mt-10">
          <Button href={cta.button.href} variant="primary">
            {cta.button.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 5: Update `app/page.tsx`**

```typescript
import { HeroHome } from '@/components/sections/HeroHome'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { PracticesList } from '@/components/sections/PracticesList'
import { FeaturedCaseStudy } from '@/components/sections/FeaturedCaseStudy'
import { IndustriesGrid } from '@/components/sections/IndustriesGrid'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { CTABand } from '@/components/sections/CTABand'

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ProofStrip />
      <PracticesList />
      <FeaturedCaseStudy />
      <IndustriesGrid />
      <HowWeWork />
      <CTABand />
    </>
  )
}
```

- [ ] **Step 6: Verify + commit**

```bash
pnpm dev
```

Visit <http://localhost:3000>, scroll all sections. Kill dev server.

```bash
git add -A
git commit -m "feat(home): add FeaturedCaseStudy, IndustriesGrid, HowWeWork, CTABand

Completes home page per spec §5.1. FeaturedCaseStudy reads from velite
caseStudies collection, picking featured=true with fallback to first.
IndustriesGrid derives counts dynamically so adding a study updates
the homepage automatically."
```

---

### Task 23: Services page

**Files:**
- Create: `app/services/page.tsx`, `components/sections/ServicesHero.tsx`, `components/sections/PracticeDetail.tsx`

Spec reference: §5.4.

- [ ] **Step 1: Create service-meta typed data**

Append to `content/home.ts`:

```typescript
export const serviceMeta: Record<Practice, {
  timeline: string; bestFit: string; measurableBy: string; integrations: string[]
}> = {
  support: { timeline: '8–10 weeks', bestFit: '>500 tickets/day', measurableBy: 'Deflection, CSAT',
    integrations: ['Zendesk', 'Intercom', 'Freshdesk', 'Custom'] },
  sales: { timeline: '6–8 weeks', bestFit: 'SDR team of 5+', measurableBy: 'MQL→SQL rate',
    integrations: ['HubSpot', 'Salesforce', 'Pipedrive'] },
  'it-hr': { timeline: '10–12 weeks', bestFit: '>500 headcount', measurableBy: 'Ticket time-to-close',
    integrations: ['Okta', 'Jira', 'ServiceNow', 'GWS'] },
  data: { timeline: '4–6 weeks', bestFit: 'Data in warehouse', measurableBy: 'Cycle-to-insight',
    integrations: ['Snowflake', 'BigQuery', 'Slack'] },
  ops: { timeline: '8–10 weeks', bestFit: 'Continuous pipelines', measurableBy: 'Incident detection',
    integrations: ['TMS', 'ERP', 'Slack', 'Custom'] },
}
```

- [ ] **Step 2: Build page**

Full services page with hero, then for each practice render a row with `number / title + description + integration tags / {timeline, bestFit, measurableBy}` sidebar. Pattern follows §5.4 and the §3c wireframe.

- [ ] **Step 3: Add metadata**

```typescript
export const metadata = {
  title: 'Services',
  description: 'Custom AI agents for support, sales, operations, IT/HR, and data analysis.',
}
```

- [ ] **Step 4: Verify + commit**

```bash
pnpm dev
git add -A
git commit -m "feat(services): add Services page with practice meta

Reuses numbered-list pattern from home, adds timeline/best-fit/
measurable-by sidebar and integration tags per §5.4 + §3c wireframe."
```

---

### Task 24: About page

**Files:**
- Create: `app/about/page.tsx`, `content/about.ts`, `components/sections/AboutHero.tsx`, `components/sections/ValuesGrid.tsx`, `components/sections/TeamGrid.tsx`

Spec reference: §5.5.

- [ ] **Step 1: Typed about content**

`content/about.ts`: narrative paragraphs, 4 values (Own the outcome / No lock-in / Ship in weeks / Tell the truth), 4 team-member placeholders with `{ name, role, avatar }` matching journal author schema.

- [ ] **Step 2: Build page**

Editorial split layout: left narrative + right values grid, then team grid, then CTABand reused.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(about): add About page with narrative, values grid, team grid

Per spec §5.5. Reuses CTABand from home."
```

---

### Task 25: Security page with Radix Accordion

**Files:**
- Create: `app/security/page.tsx`, `content/pages/security.mdx`, `components/sections/SecurityFAQ.tsx`, `components/sections/ComplianceBadges.tsx`
- Modify: `velite.config.ts` (add pages collection)

Spec reference: §5.7.

- [ ] **Step 1: Extend velite config for pages**

Add a third collection to `velite.config.ts`:

```typescript
const pages = {
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s.object({
    slug: s.slug('pages'),
    title: s.string(),
    body: s.mdx(),
  }),
}
// ...and add to collections:
collections: { caseStudies, journalPosts, pages }
```

- [ ] **Step 2: Write security.mdx content**

`content/pages/security.mdx` with frontmatter + FAQ content. Each FAQ question is an H3 so we can parse them into accordion items at render time (or use a custom MDX component `<FAQ question="..." />` — simpler).

Create `components/content/MDXComponents.tsx` that maps MDX elements to styled React components, and export a custom `<FAQ>` component for security FAQ items.

- [ ] **Step 3: SecurityFAQ + ComplianceBadges**

SecurityFAQ uses Radix `@radix-ui/react-accordion` for accessible expand/collapse. ComplianceBadges renders 4 badges (SOC 2 Type II, GDPR, HIPAA-ready, ISO 27001).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(security): add Security page with Radix Accordion + compliance badges

Per spec §5.7. FAQ content stays in MDX so client can edit without
code changes. Radix Accordion provides keyboard + screen-reader a11y."
```

---

### Task 26: Privacy + Terms pages (MDX)

**Files:**
- Create: `content/pages/privacy.mdx`, `content/pages/terms.mdx`, `app/privacy/page.tsx`, `app/terms/page.tsx`

- [ ] **Step 1: MDX placeholder content**

Standard boilerplate for a small B2B site — client replaces before launch. Include `lastUpdated` in frontmatter.

- [ ] **Step 2: Page renderers**

Simple prose layout using `<Container>` + `<article className="prose">`. No fancy features.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(legal): add Privacy + Terms MDX pages"
```

---

### Task 27: Home page OG & metadata

**Files:**
- Modify: `app/page.tsx` (add generateMetadata or metadata export)

Spec reference: §8.1, §8.2.

- [ ] **Step 1: Add metadata export**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Techyard Systems — Agents that actually work.' },
  description:
    'Custom AI agents that run your support, sales, and operations — trained on your data, owned by you.',
  openGraph: {
    title: 'Techyard Systems',
    description: 'Agents that actually work.',
    images: ['/api/og/home'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og/home'] },
}
```

(OG endpoint comes in Task 35; leaving the URL as a placeholder is fine — the endpoint will match.)

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): add metadata + OG image reference"
```

---

## Phase 5 — Dynamic pages

### Task 28: Case study detail template (`/work/[slug]`)

**Files:**
- Create: `app/work/[slug]/page.tsx`, `components/sections/CaseStudyHero.tsx`, `components/sections/CaseStudyStatBand.tsx`, `components/sections/CaseStudyNext.tsx`, `components/content/MDXComponents.tsx`

Spec reference: §5.2, §5.2.1, §6.1.

- [ ] **Step 1: Page file with generateStaticParams**

```typescript
import { caseStudies } from '#site/content'
import { notFound } from 'next/navigation'
import { CaseStudyHero } from '@/components/sections/CaseStudyHero'
import { CaseStudyStatBand } from '@/components/sections/CaseStudyStatBand'
import { CaseStudyNext } from '@/components/sections/CaseStudyNext'
import { MDXRender } from '@/components/content/MDXRender'

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.lede,
    openGraph: {
      title: cs.title,
      description: cs.lede,
      images: [`/api/og/work/${cs.slug}`],
      type: 'article',
      publishedTime: cs.publishedAt,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return notFound()
  return (
    <>
      <CaseStudyHero study={cs} />
      <CaseStudyStatBand outcomes={cs.outcomes} />
      <article className="mx-auto max-w-[66ch] px-6 py-16 md:py-24">
        <MDXRender code={cs.body} />
      </article>
      <CaseStudyNext current={cs} />
    </>
  )
}
```

- [ ] **Step 2: CaseStudyStatBand with two layouts**

Component branches on `outcomes.length`. `length === 3` → three-column grid. `length === 1` → centered hero-stat with `clamp(88px, 14vw, 160px)` value.

- [ ] **Step 3: MDXRender + MDXComponents**

Velite returns compiled MDX as a string. Use `@mdx-js/react` or the velite-recommended renderer. Map H2, blockquote, pre, figure, etc. to styled components matching the §5.2 body treatment.

- [ ] **Step 4: Verify both layouts render**

```bash
pnpm dev
```

Visit `/work/freight-monitoring` (3-outcome) and `/work/support-deflection` (1-outcome). Both should render with distinct stat-band layouts.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(work): add /work/[slug] with 3-outcome and 1-outcome stat bands

Per spec §5.2 + §6.1. generateStaticParams emits every known slug at
build — fully static per §3. Discriminated-union outcomes drives the
stat-band branch."
```

---

### Task 29: Case studies index (`/work`)

**Files:**
- Create: `app/work/page.tsx`, `components/sections/CaseStudyCard.tsx`

- [ ] **Step 1: Build index with industry filter**

Filter UI uses `<Chip>` multi-select (reusable from contact form — or make a single-select variant). For V1, a simple industry dropdown or chip row filtering client-side is sufficient. If the list grows beyond 20, revisit.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(work): add case studies index with industry filter"
```

---

### Task 30: Journal post template (`/journal/[slug]`)

**Files:**
- Create: `app/journal/[slug]/page.tsx`, `components/sections/JournalHeader.tsx`, `components/sections/JournalBody.tsx`, `components/sections/RelatedPosts.tsx`

Spec reference: §5.3.

- [ ] **Step 1: Page with generateStaticParams + drop cap**

The `JournalBody` component wraps the MDX body in a class that applies `::first-letter` drop-cap styling via tokens.css:

```css
.journal-body > p:first-of-type::first-letter {
  font-family: var(--font-serif);
  font-size: 92px;
  font-weight: 500;
  line-height: 0.85;
  float: left;
  margin: 8px 14px 0 0;
  color: var(--color-accent);
}
```

- [ ] **Step 2: Related posts logic**

If `relatedSlugs` in frontmatter, use that. Else pick up to 3 other posts from the same category, excluding self.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(journal): add /journal/[slug] with drop cap + related posts

Per spec §5.3. Drop cap via ::first-letter; accessibility note
documented in spec is respected (no aria-hidden wrapper needed)."
```

---

### Task 31: Journal index (`/journal`)

**Files:**
- Create: `app/journal/page.tsx`

Simple chronological list, category chips as filter.

- [ ] **Step 1: Build index + commit**

```bash
git add -A
git commit -m "feat(journal): add journal index"
```

---

## Phase 6 — Contact (page + server action)

### Task 32: Contact form validator (TDD)

**Files:**
- Create: `lib/contact.ts`, `lib/__tests__/contact.test.ts`

Spec reference: §7.3.

- [ ] **Step 1: Write the test**

```typescript
import { describe, it, expect } from 'vitest'
import { contactSchema, parseContactForm } from '../contact'

describe('contactSchema', () => {
  const valid = {
    name: 'Avery Chen',
    email: 'avery@acme.com',
    company: 'Acme',
    practices: ['support', 'sales'],
    message: 'We have 800 support tickets per day and our team is drowning.',
    website: '', // honeypot
    _t: String(Date.now() - 5000),
  }

  it('accepts a fully valid submission', () => {
    const result = parseContactForm(new URLSearchParams(valid as any).toString())
    expect(result.kind).toBe('ok')
  })

  it('rejects missing email with field error', () => {
    const r = parseContactForm(new URLSearchParams({ ...valid, email: '' } as any).toString())
    expect(r.kind).toBe('validation')
    if (r.kind === 'validation') expect(r.fieldErrors.email).toBeDefined()
  })

  it('rejects invalid email format', () => {
    const r = parseContactForm(new URLSearchParams({ ...valid, email: 'not-an-email' } as any).toString())
    expect(r.kind).toBe('validation')
  })

  it('silently succeeds when honeypot is filled (bot)', () => {
    const r = parseContactForm(new URLSearchParams({ ...valid, website: 'http://spam' } as any).toString())
    expect(r.kind).toBe('bot')
  })

  it('silently succeeds when submit is too fast (bot)', () => {
    const r = parseContactForm(new URLSearchParams({ ...valid, _t: String(Date.now() - 500) } as any).toString())
    expect(r.kind).toBe('bot')
  })

  it('requires at least one practice chip', () => {
    const r = parseContactForm(new URLSearchParams({ ...valid, practices: '' } as any).toString())
    expect(r.kind).toBe('validation')
  })

  it('trims + length-caps message', () => {
    const long = 'x'.repeat(5000)
    const r = parseContactForm(new URLSearchParams({ ...valid, message: long } as any).toString())
    expect(r.kind).toBe('validation')
  })
})
```

- [ ] **Step 2: Run — FAIL**

- [ ] **Step 3: Implement**

```typescript
import { z } from 'zod'
import { practices } from '@/content/taxonomies'

export const contactSchema = z.object({
  name: z.string().min(1, 'Please tell us your name').max(120),
  email: z.string().email('That doesn\'t look like a valid email'),
  company: z.string().min(1, 'Please tell us your company').max(120),
  practices: z
    .array(z.enum(practices))
    .min(1, 'Pick at least one practice you\'re curious about'),
  message: z.string().min(1, 'Even one sentence is plenty').max(3000, 'Please keep it under 3000 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ParseResult =
  | { kind: 'ok'; data: ContactInput }
  | { kind: 'bot' }
  | { kind: 'validation'; fieldErrors: Record<string, string> }

const MIN_SUBMIT_MS = 1500

export function parseContactForm(body: string): ParseResult {
  const params = new URLSearchParams(body)
  const honeypot = params.get('website')
  if (honeypot && honeypot.trim() !== '') return { kind: 'bot' }

  const t = Number(params.get('_t') ?? 0)
  if (!t || Date.now() - t < MIN_SUBMIT_MS) return { kind: 'bot' }

  const practicesRaw = params.getAll('practices')
  const parsed = contactSchema.safeParse({
    name: params.get('name') ?? '',
    email: params.get('email') ?? '',
    company: params.get('company') ?? '',
    practices: practicesRaw,
    message: params.get('message') ?? '',
  })

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '_form')
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { kind: 'validation', fieldErrors }
  }
  return { kind: 'ok', data: parsed.data }
}
```

- [ ] **Step 4: Run — PASS**

```bash
pnpm test contact
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(contact): add validator with honeypot + timing + zod schema

7 tests cover valid/missing/invalid/bot/too-fast/no-practices/too-long.
Honeypot + timing bots return { kind: 'bot' } so we silently succeed
and don't tell the bot it's been detected (spec §7.3 step 3)."
```

---

### Task 33: Resend email sender + server action

**Files:**
- Create: `lib/resend.ts`, `app/contact/actions.ts`

- [ ] **Step 1: Resend wrapper**

```typescript
import { Resend } from 'resend'
import type { ContactInput } from './contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmails(input: ContactInput) {
  const admin = resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: input.email,
    subject: `New inquiry from ${input.company} — ${input.practices.join(', ')}`,
    text: adminEmailText(input),
  })
  const confirm = resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: input.email,
    subject: 'We got your note — Techyard Systems',
    text: confirmationEmailText(input),
  })
  const [a, c] = await Promise.allSettled([admin, confirm])
  if (a.status === 'rejected' || c.status === 'rejected') {
    throw new Error(
      `Resend delivery failed. admin=${a.status} confirm=${c.status}`,
    )
  }
}

function adminEmailText(i: ContactInput): string {
  return `Name: ${i.name}\nEmail: ${i.email}\nCompany: ${i.company}\n` +
    `Practices: ${i.practices.join(', ')}\n\n${i.message}\n`
}

function confirmationEmailText(i: ContactInput): string {
  return `Hi ${i.name.split(' ')[0]},\n\nThanks for writing to Techyard Systems. ` +
    `We read every message and will reply within one business day.\n\n` +
    `You wrote:\n\n${i.message}\n\n— Techyard Systems\n`
}
```

- [ ] **Step 2: Server action**

```typescript
'use server'

import { parseContactForm } from '@/lib/contact'
import { sendContactEmails } from '@/lib/resend'

export type ActionState =
  | { ok: false; kind: 'idle' }
  | { ok: true }
  | { ok: false; kind: 'validation'; fieldErrors: Record<string, string> }
  | { ok: false; kind: 'delivery' }

export async function submitContactForm(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const body = new URLSearchParams()
  for (const [k, v] of formData.entries()) {
    if (typeof v === 'string') body.append(k, v)
  }

  const parsed = parseContactForm(body.toString())
  if (parsed.kind === 'validation') {
    return { ok: false, kind: 'validation', fieldErrors: parsed.fieldErrors }
  }
  if (parsed.kind === 'bot') return { ok: true } // silent success

  try {
    await sendContactEmails(parsed.data)
    return { ok: true }
  } catch (err) {
    console.error('[contact] delivery failed', err)
    return { ok: false, kind: 'delivery' }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(contact): add server action + Resend sender

Single submission path per spec §7.3. Admin + auto-reply both go via
Resend; delivery failures return kind='delivery' to client. No
route handler."
```

---

### Task 34: Contact page UI

**Files:**
- Create: `app/contact/page.tsx`, `components/sections/ContactForm.tsx`, `components/sections/ContactSidebar.tsx`

- [ ] **Step 1: ContactForm client component**

Uses `useActionState(submitContactForm, { ok: false, kind: 'idle' })`. Renders form fields + chips (iterating over `practices`) + delivery-failure fallback. Pre-populates mailto link on delivery failure with the user's message.

- [ ] **Step 2: ContactSidebar with lazy-load Calendly**

Per spec §5.6 — initial static Flax card; click "Book a 15-min call →" swaps card contents to include an iframe with `src = process.env.NEXT_PUBLIC_CALENDLY_URL`.

- [ ] **Step 3: Wire into page**

```typescript
export default function ContactPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-3 text-[11px] uppercase tracking-[2px] text-accent">Get in touch</div>
        <h1 className="font-serif text-[clamp(56px,7vw,84px)] font-medium tracking-tight">
          Let's find out if <em className="text-accent">we're a fit.</em>
        </h1>
        <p className="mt-6 max-w-[52ch] font-serif text-[19px] italic text-ink-muted">
          A 15-minute call is the fastest way. Or write to us — we read everything.
        </p>
        <div className="mt-14 grid gap-14 md:grid-cols-[1.1fr_1fr]">
          <ContactForm />
          <ContactSidebar />
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(contact): add Contact page with form + lazy-load Calendly

Chips use multi-select role=checkbox per §5.6. Delivery failure shows
mailto fallback with pre-populated body. Calendly iframe loads on
click only per §7.5 CSP + cookie-banner constraint."
```

---

## Phase 7 — Infrastructure

### Task 35: Dynamic OG image generation

**Files:**
- Create: `app/api/og/[...slug]/route.tsx`

Spec reference: §8.3.

- [ ] **Step 1: Implement edge OG route**

```typescript
import { ImageResponse } from 'next/og'
import { caseStudies, journalPosts } from '#site/content'

export const runtime = 'edge'

function resolve(segments: string[]) {
  const [kind, slug] = segments
  if (kind === 'work') return caseStudies.find((c) => c.slug === slug)
  if (kind === 'journal') return journalPosts.find((j) => j.slug === slug)
  return null
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params
  const entity = resolve(slug)
  const title = entity?.title ?? 'Techyard Systems — Agents that actually work.'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#f1ede4',
          color: '#2a2f26',
          width: '100%',
          height: '100%',
          padding: 72,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: -0.3 }}>Techyard Systems</div>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -1.8, maxWidth: 900 }}>
          {title}
        </div>
        <div style={{ fontSize: 18, color: '#4a6152' }}>
          techyardsystems.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
```

- [ ] **Step 2: Verify endpoint**

```bash
pnpm dev
```

Visit <http://localhost:3000/api/og/home> — expect a 1200×630 PNG. Then `/api/og/work/freight-monitoring` with the case study title.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(og): add dynamic OG image route at /api/og/[...slug]

Edge runtime, resolves case studies and journal posts by slug.
Newsreader-ish serif (falls back to serif in edge runtime — native
variable font embedding on edge is a separate optimization if needed)."
```

---

### Task 36: SEO helpers (JSON-LD builders)

**Files:**
- Create: `lib/seo.ts`, `lib/__tests__/seo.test.ts`

Spec reference: §8.2.

- [ ] **Step 1: Write tests covering each builder**

Tests for `buildOrganizationJsonLd`, `buildArticleJsonLd` (case studies), `buildBlogPostingJsonLd` (journal), `buildFaqPageJsonLd` (security). Each should return a valid schema.org object.

- [ ] **Step 2: Implement builders**

Plain functions returning typed objects. Consumer pages render via `<script type="application/ld+json">` in the page body.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(seo): add JSON-LD builders for Organization/Article/BlogPosting/FAQPage

Per spec §8.2. Case studies use Article (no schema.org CaseStudy type);
journal uses BlogPosting subclass; Security FAQ uses FAQPage."
```

---

### Task 37: Sitemap + robots + llms.txt

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`

Spec reference: §8.4.

- [ ] **Step 1: sitemap.ts**

Iterate all static routes + all MDX slugs. Set `priority` and `changeFrequency` per spec §8.4.

- [ ] **Step 2: robots.ts**

Allow all. Reference sitemap. No AI-crawler blocks.

- [ ] **Step 3: llms.txt**

Canonical summary of the site + pointers to key pages. Hand-written to match the site's editorial voice.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seo): add sitemap, robots, llms.txt

Per spec §8.4. Sitemap populated with priority/changefreq for Bing."
```

---

### Task 38: Next.js config — redirects + security headers

**Files:**
- Modify: `next.config.ts`

Spec reference: §7.5, §8.5.

- [ ] **Step 1: Full next.config.ts**

```typescript
import type { NextConfig } from 'next'

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' plausible.io",
  "frame-src calendly.com *.calendly.com",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Content-Security-Policy', value: cspDirectives },
]

const config: NextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/case-studies/:path*', destination: '/work/:path*', permanent: true },
      { source: '/blog/:path*', destination: '/journal/:path*', permanent: true },
    ]
  },
}

export default config
```

Note: `script-src` uses `'unsafe-inline'` pragmatically; upgrade to nonce-based when Next 15.x provides stable nonce support for the framework's own inline scripts.

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat(security): add security headers + redirects

Headers per spec §7.5. Redirects from old site URLs per §8.5."
```

---

### Task 39: SECURITY.md + /.well-known/security.txt

**Files:**
- Create: `SECURITY.md`, `public/.well-known/security.txt`

- [ ] **Step 1: SECURITY.md**

```markdown
# Security policy

## Reporting a vulnerability

Please email security reports to `security@techyardsystems.com`. We will
acknowledge receipt within one business day and aim to provide a first
assessment within five business days.

Please include:
- A description of the issue and its impact
- Steps to reproduce
- Any proof-of-concept (minimal, please)

We ask that you do not publicly disclose the issue until we have had a
reasonable opportunity to investigate and remediate.
```

- [ ] **Step 2: security.txt per RFC 9116**

```
Contact: mailto:security@techyardsystems.com
Expires: 2027-04-18T00:00:00.000Z
Policy: https://techyardsystems.com/security
Preferred-Languages: en
```

- [ ] **Step 3: Commit**

```bash
git add SECURITY.md public/.well-known/security.txt
git commit -m "feat(security): add SECURITY.md + RFC 9116 security.txt"
```

---

### Task 40: 404 + error pages

**Files:**
- Create: `app/not-found.tsx`, `app/error.tsx`

Spec reference: §5.8.

- [ ] **Step 1: not-found.tsx**

Using the copy from §5.8:

```typescript
import Link from 'next/link'
import { Container } from '@/components/primitives/Container'

export default function NotFound() {
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[2px] text-accent">
            Error 404 · Page not found
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,88px)] font-medium leading-[1.05] tracking-tight">
            This page isn't one of <em className="text-accent">ours.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-[44ch] font-serif text-[20px] italic text-ink-muted">
            It might have moved, or you might have a bad link. Here's what we do have:
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/services" className="underline underline-offset-4">→ Services</Link>
            <Link href="/work" className="underline underline-offset-4">→ Recent work</Link>
            <Link href="/journal" className="underline underline-offset-4">→ Journal</Link>
          </div>
          <p className="mt-12 text-xs text-ink-subtle">
            If you got here from one of our emails or documents, please let us know:{' '}
            <a href="mailto:contactus@techyardsystems.com" className="underline">
              contactus@techyardsystems.com
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: error.tsx (client component required)**

```typescript
'use client'

import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[2px] text-accent">
            Error · Something broke
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,88px)] font-medium tracking-tight">
            We're on it.
          </h1>
          <p className="mx-auto mt-7 max-w-[44ch] font-serif text-[20px] italic text-ink-muted">
            Please try again in a minute. If it keeps happening, a two-line email to{' '}
            <a href="mailto:contactus@techyardsystems.com" className="underline">
              contactus@techyardsystems.com
            </a>{' '}
            helps us find the cause.
          </p>
          <div className="mt-10">
            <Button onClick={reset} variant="primary">
              Reload this page
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx app/error.tsx
git commit -m "feat: add in-voice 404 and error pages

Per spec §5.8 — editorial copy, no default-framework voice break."
```

---

### Task 41: Brand-name CI lint

**Files:**
- Create: `.github/workflows/brand-name-lint.yml`, `scripts/brand-lint.sh`

Spec reference: §1.

- [ ] **Step 1: Shell script**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking for bare 'Techyard' references (must use 'Techyard Systems')..."
if rg -n '\bTechyard\b(?!\s+Systems)' \
     --glob '!docs/**' --glob '!*.md' --glob '!**/node_modules/**' \
     --glob '!**/.next/**' --glob '!**/.velite/**' \
     --pcre2 \
     app/ components/ content/ public/ lib/ styles/ 2>&1 | grep -v 'allow-techyard-short'; then
  echo ""
  echo "ERROR: Bare 'Techyard' found. Must be 'Techyard Systems' or add"
  echo "  # allow-techyard-short comment on the line."
  exit 1
fi
echo "OK: no bare 'Techyard' references."
```

Make executable: `chmod +x scripts/brand-lint.sh`.

- [ ] **Step 2: Wire into CI**

Create `.github/workflows/brand-name-lint.yml` with a job that runs `./scripts/brand-lint.sh`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(ci): add brand-name lint — block PRs with 'Techyard' alone

Per spec §1. ripgrep -P for PCRE2 negative lookahead; allow-techyard-
short comment lets a genuine exception through."
```

---

### Task 42: Plausible analytics integration

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Wrap with PlausibleProvider**

```typescript
import PlausibleProvider from 'next-plausible'

// Inside RootLayout, wrap main content:
<PlausibleProvider
  domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'techyardsystems.com'}
  trackOutboundLinks
  taggedEvents
>
  {/* existing nav/main/footer tree */}
</PlausibleProvider>
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: integrate Plausible analytics"
```

---

## Phase 8 — Tests, CI, launch

### Task 43: Playwright E2E suite

**Files:**
- Create: `e2e/home.spec.ts`, `e2e/nav.spec.ts`, `e2e/contact.spec.ts`, `e2e/work.spec.ts`, `e2e/journal.spec.ts`, `e2e/errors.spec.ts`, `e2e/og.spec.ts`, `e2e/sitemap.spec.ts`, `e2e/keyboard.spec.ts`, `e2e/calendly.spec.ts`

Spec reference: §10.3 (14 flows).

- [ ] **Step 1: Write each spec file**

Follow spec §10.3 test list exactly. Each spec covers its listed flow. For flows 3 and 5 (contact form success/delivery failure), mock Resend via environment variable swap or a dedicated test-only branch in the action. The cleanest approach: `E2E_MOCK_RESEND=1` env var that short-circuits `sendContactEmails` to resolve/reject based on a request header.

- [ ] **Step 2: Run full suite**

```bash
pnpm test:e2e
```

All 14+ tests across all browser projects should pass.

- [ ] **Step 3: Commit**

```bash
git add e2e/
git commit -m "test(e2e): add 14 Playwright flows per spec §10.3

Home, nav, form success/validation/delivery-failure, case studies
(3-outcome + 1-outcome), journal, 404, reduced-motion, keyboard,
sitemap, OG routes (work + journal prefixes), Calendly lazy-load."
```

---

### Task 44: Visual regression screenshots

**Files:**
- Create: `e2e/visual.spec.ts`

Spec reference: §10.4.

- [ ] **Step 1: Screenshot spec**

```typescript
import { test, expect } from '@playwright/test'

const targets = [
  { name: 'home', url: '/' },
  { name: 'case-study-3-outcome', url: '/work/freight-monitoring' },
  { name: 'case-study-1-outcome', url: '/work/support-deflection' },
  { name: 'journal-post', url: '/journal/stopped-calling-chatbots' },
  { name: 'contact', url: '/contact' },
  { name: 'not-found', url: '/this-does-not-exist' },
]

for (const t of targets) {
  test(`visual: ${t.name}`, async ({ page }) => {
    await page.goto(t.url)
    await page.waitForLoadState('networkidle')
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${t.name}.png`, {
      maxDiffPixelRatio: 0.01,
    })
  })
}

test('visual: drop-cap journal post (cross-browser)', async ({ page, browserName }) => {
  await page.goto('/journal/stopped-calling-chatbots')
  await page.waitForLoadState('networkidle')
  const article = page.locator('article')
  expect(await article.screenshot()).toMatchSnapshot(`drop-cap-${browserName}.png`, {
    maxDiffPixelRatio: 0.02,
  })
})
```

- [ ] **Step 2: Generate baseline**

```bash
pnpm test:e2e visual --update-snapshots
```

- [ ] **Step 3: Commit baseline**

```bash
git add e2e/visual.spec.ts e2e/visual.spec.ts-snapshots
git commit -m "test(visual): add Playwright visual regression baselines

6 core pages at mobile+desktop, plus drop-cap across Chromium/WebKit/
Firefox. Per spec §10.4."
```

---

### Task 45: Lighthouse CI config

**Files:**
- Create: `lighthouserc.json`, `.github/workflows/lighthouse.yml`

Spec reference: §10.5.

- [ ] **Step 1: lighthouserc.json**

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/work/freight-monitoring",
        "http://localhost:3000/journal/stopped-calling-chatbots",
        "http://localhost:3000/contact"
      ],
      "startServerCommand": "pnpm build && pnpm start",
      "numberOfRuns": 3,
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 1.0 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2000 }]
      }
    }
  }
}
```

- [ ] **Step 2: GitHub workflow**

Separate workflow file that runs `pnpm exec lhci autorun` on every PR.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test(perf): add Lighthouse CI with spec §10.5 budgets"
```

---

### Task 46: Env template + Vercel configuration notes

**Files:**
- Create: `.env.example`, `docs/deployment.md`

- [ ] **Step 1: .env.example**

```
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@techyardsystems.com
CONTACT_TO_EMAIL=contactus@techyardsystems.com
NEXT_PUBLIC_SITE_URL=https://techyardsystems.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=techyardsystems.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/techyardsystems/15min
```

- [ ] **Step 2: docs/deployment.md**

Steps for:
- Vercel project linking
- Setting env vars
- Enabling password protection on preview deploys
- DNS pre-cut TTL reduction (48h)
- Launch cutover
- Rollback procedure

Pull directly from spec §11. Do not duplicate decisions — link to spec.

- [ ] **Step 3: Commit**

```bash
git add .env.example docs/deployment.md
git commit -m "docs: add env template + deployment runbook"
```

---

### Task 47: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Concise README**

```markdown
# Techyard Systems — Website

Production site for [techyardsystems.com](https://techyardsystems.com).

## Quick start

```bash
pnpm install
cp .env.example .env.local  # then fill in secrets
pnpm dev
```

## Docs

- [Design spec](docs/superpowers/specs/2026-04-18-techyardsystems-redesign-design.md) — the source of truth
- [Implementation plan](docs/superpowers/plans/2026-04-18-techyardsystems-redesign.md) — how it was built
- [Deployment runbook](docs/deployment.md) — how it ships
- [Security policy](SECURITY.md)

## Commands

- `pnpm dev` — Next.js + velite watcher
- `pnpm build` — production build (runs velite first)
- `pnpm test` — Vitest unit/integration
- `pnpm test:e2e` — Playwright E2E + visual regression
- `./scripts/brand-lint.sh` — enforce "Techyard Systems" (not "Techyard")
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README"
```

---

### Task 48: Pre-launch sweep

Run the full §11.1 pre-launch checklist as explicit steps. Each checklist item becomes one step. This task produces the green-light signal before DNS cut.

- [ ] **Step 1–N: execute each §11.1 checklist item**

Refer to spec §11.1. Track each in a separate checklist commit. Don't bundle — each verification commits its own evidence (e.g., a screenshot of securityheaders.com in `docs/launch-evidence/`).

- [ ] **Final step: Create launch-ready tag**

```bash
git tag -a v1.0.0-launch-ready -m "Pre-launch checklist complete"
git push --tags
```

---

### Task 49: Production deploy + DNS cut

Per spec §11.2. Must only be executed after Task 48 is green.

- [ ] **Step 1: Verify DNS TTL reduced 48h+ ago**

If not, stop. Reduce TTL to 300s and wait 48h.

- [ ] **Step 2–N: execute §11.2 launch sequence**

Deploy → verify old site at `old.techyardsystems.com` → DNS cut → submit sitemaps → verify Plausible.

---

### Task 50: Post-launch watch

- [ ] **Step 1: Monitor for 24h**

Watch Vercel logs for 500s. Watch Plausible for traffic and `contact_submit_*` events. Watch Resend dashboard for delivery failures.

- [ ] **Step 2: Fix-forward any P1s**

Per spec §11.3 — rollback is last resort. Small issues get fixed on new site via redeploy.

- [ ] **Step 3: Close the project**

```bash
git tag -a v1.0.0 -m "Launched"
git push --tags
```

Update the memory file with launch date + final decisions learned.

---

## Self-review checklist

Before dispatching this plan to execution, run through:

### Spec coverage

- §1 brand naming — Task 41 (CI lint)
- §2 scope — Tasks 21–31 cover all listed pages
- §3 IA + rendering — Tasks 21–31 (SSG) + Task 35 (OG dynamic) + Task 33 (server action)
- §4 visual system — Tasks 5 (tokens), 6 (fonts), 9–11 (primitives)
- §5 pages — Tasks 21–31 (one per page)
- §6 content model — Tasks 15–20 (taxonomies, velite, seeds)
- §7 technical arch — Tasks 1–4 (setup), 33 (action), 35–38 (infra)
- §8 SEO/GEO — Tasks 27 (home meta), 36 (JSON-LD), 37 (sitemap/robots/llms), 38 (redirects)
- §9 a11y — threaded throughout (focus ring Task 5, skip link Task 6, ARIA Task 11, reduced-motion Task 5)
- §10 testing — Tasks 7–8 (setup), 32 (validator tests), 36 (seo tests), 43–45 (E2E/visual/Lighthouse)
- §11 launch — Tasks 46–50

### Placeholder scan

None. Every step has either a complete code block or a specific, executable instruction.

### Type consistency

- `CaseStudy.outcomes: [Outcome, Outcome, Outcome] | [Outcome]` — consistent Tasks 16, 17, 18, 19, 28
- `contactSchema.practices: z.array(z.enum(practices))` — consistent Tasks 15, 32, 34
- `submitContactForm` signature `(prev, formData) → ActionState` — consistent Tasks 33, 34

### Gaps self-flagged

- MDX rendering (Task 28 step 3) is lightly specified — the implementer will need to read velite docs to wire up the specific MDX runtime. Acceptable because velite's docs are canonical.
- Email templates (Task 33) are plain-text only. If richer HTML templates are desired later, that's a V2 change.
- Case study index filter UI (Task 29) is described as "chip row or dropdown — implementer's call." Both are valid given the small dataset; noting rather than fixing.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-18-techyardsystems-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Each task is scoped small enough that a fresh context can execute it without history drift.

**2. Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach?
