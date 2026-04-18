@AGENTS.md

## Design Context

Full design brief lives in [.impeccable.md](./.impeccable.md). Summary for day-to-day decisions:

### Users

Technical buyers doing vendor due diligence — ops/support leads, CTOs at mid-market companies. Arrive skeptical, pressed for time. Most land *deep* on a case study or journal post via search; every page must stand alone.

### Brand personality

**Confident · proof-first · understated.** Editorial voice, not marketing. No exclamation marks, no "revolutionary", no "10× your results". First 5 seconds should read as competence, clarity, and one small moment of delight.

### Aesthetic direction

**Single-accent palette** — sage is the ONLY chromatic accent in chrome:

- `paper #f1ede4` · `paper-raised #fffaf0` · `ink #2a2f26` · `ink-muted #6b7165` · `ink-subtle #8a7f6b`
- `accent #4a6152` (sage) · `rule #e3dccd` · `ink-deep #1a1d18`
- On dark bands, sage lightens to `#a8c0b4`. No rust/sky/clay secondary accents in chrome.

**Type**: Newsreader (serif display/body, italic for accent phrase inside headlines) · Space Grotesk (UI/labels) · JetBrains Mono (meta/code). Tight negative tracking on headlines (-0.02 to -0.028em); body line-height 1.45–1.6.

**Layout**: Container max 1180px; section padding `clamp(80px, 12vw, 160px)`; alternating paper/ink bands. Corner marks on dark editorial bands. **No dark mode** — dark bands are in-theme inversions, not a theme variant.

### Design principles

1. **Evidence over adjective.** Show the thing working. Claims without a measurement don't ship.
2. **Single accent, single moment.** Sage everywhere; one hero moment of controlled drama per page.
3. **Editorial without affectation.** Keep serif headlines, tight tracking, mono metadata. *Cut* decorative flourishes that don't carry information (masthead volumes, "№ 0X" counters on every eyebrow, empty fig-captions, latinate flourishes in microcopy). If it reads like a museum placard, delete it.
4. **Every page stands alone.** Deep-landing traffic is the rule. Home can't be load-bearing for "what the company does".
5. **WCAG 2.2 AA is the floor.** 4.5:1 text contrast, visible focus rings, `prefers-reduced-motion` respected, correct ARIA roles (Radix primitives for dialog/accordion, `role="checkbox"` for chip multi-select).
