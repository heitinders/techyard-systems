import type { CaseStudy } from '#site/content'
import Link from 'next/link'
import { caseStudies } from '#site/content'
import { Container } from '@/components/primitives/Container'
import { industryLabels } from '@/content/taxonomies'

function pickNext(current: CaseStudy): CaseStudy | null {
  if (current.nextSlug) {
    const manual = caseStudies.find((c) => c.slug === current.nextSlug)
    if (manual) return manual
  }
  const sorted = [...caseStudies].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  const idx = sorted.findIndex((c) => c.slug === current.slug)
  if (idx === -1) return sorted[0] ?? null
  return sorted[(idx + 1) % sorted.length] ?? null
}

export function CaseStudyNext({ current }: { current: CaseStudy }) {
  const next = pickNext(current)
  if (!next || next.slug === current.slug) return null

  return (
    <section className="bg-rule py-[var(--space-section)]">
      <Container>
        <div className="mb-6 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Next case study
        </div>
        <Link
          href={next.url}
          className="group grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-12"
        >
          <div className="font-serif text-[64px] font-medium leading-none tracking-[-0.025em] text-accent md:text-[96px]">
            {next.number}
          </div>
          <div>
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
              {industryLabels[next.industry]}
            </div>
            <h3 className="max-w-[22ch] font-serif text-[clamp(28px,3.5vw,44px)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
              {next.title}
            </h3>
          </div>
          <div className="text-[14px] font-medium text-ink transition-transform group-hover:translate-x-1">
            Read the study →
          </div>
        </Link>
      </Container>
    </section>
  )
}
