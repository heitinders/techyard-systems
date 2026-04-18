import type { CaseStudy } from '#site/content'
import Link from 'next/link'
import { industryLabels } from '@/content/taxonomies'

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const headline = study.outcomes[0]
  return (
    <Link
      href={study.url}
      className="group flex h-full flex-col justify-between gap-10 rounded-[var(--r-lg)] border border-rule bg-paper-raised p-8 transition-colors hover:border-ink/40 md:p-10"
    >
      <div>
        <div className="mb-5 flex items-center justify-between text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          <span>{study.number}</span>
          <span>{industryLabels[study.industry]}</span>
        </div>
        <h3 className="font-serif text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-0.018em] text-ink">
          {study.title}
        </h3>
        <p className="mt-5 max-w-[46ch] font-serif text-[16px] italic leading-[1.55] text-ink-muted">
          {study.lede}
        </p>
      </div>
      <div className="flex items-end justify-between gap-6 border-t border-rule pt-6">
        <div className="font-serif text-[44px] font-medium leading-none tracking-[-0.02em] text-ink">
          {headline.value}
          <em className="font-normal italic text-accent">{headline.valueAccent}</em>
        </div>
        <span className="text-[13px] font-medium text-ink transition-transform group-hover:translate-x-1">
          Read →
        </span>
      </div>
    </Link>
  )
}
