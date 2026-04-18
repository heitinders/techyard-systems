import type { CaseStudy } from '#site/content'
import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { industryLabels, practiceLabels } from '@/content/taxonomies'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

function renderTitle(title: string, accent: string) {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>
  }
  const [before, ...rest] = title.split(accent)
  const after = rest.join(accent)
  return (
    <>
      {before}
      <em className="font-normal italic text-accent">{accent}</em>
      {after}
    </>
  )
}

export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const clientLabel = study.clientDisclosed
    ? study.clientName
    : `Tier-1 ${industryLabels[study.industry]} (disclosed on request)`

  return (
    <section className="bg-paper pt-16 pb-[var(--space-section)] md:pt-24">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-10 text-[12px] font-medium uppercase tracking-[2px] text-ink-subtle"
        >
          <Link href="/work" className="hover:text-ink">
            Work
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{industryLabels[study.industry]}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16 lg:gap-24">
          <div>
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-accent">
              {study.number}
            </div>
            <h1 className="max-w-[18ch] font-serif text-[clamp(44px,7vw,84px)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
              {renderTitle(study.title, study.titleAccent)}
            </h1>
            <p className="mt-8 max-w-[46ch] font-serif text-[21px] italic leading-[1.5] text-ink-muted">
              {study.lede}
            </p>
          </div>

          <aside className="rounded-[var(--r-md)] border border-rule bg-paper-raised p-7">
            <dl className="space-y-5 text-[14px] leading-[1.4]">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
                  Client
                </dt>
                <dd className="mt-1 text-ink">{clientLabel}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
                  Industry
                </dt>
                <dd className="mt-1 text-ink">{industryLabels[study.industry]}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
                  Practice
                </dt>
                <dd className="mt-1 text-ink">{practiceLabels[study.practice]}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
                  Engagement
                </dt>
                <dd className="mt-1 text-ink">
                  {study.engagementWeeks} weeks · {study.engagementType}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
                  Published
                </dt>
                <dd className="mt-1 text-ink">
                  <time dateTime={study.publishedAt}>
                    {dateFormatter.format(new Date(study.publishedAt))}
                  </time>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </section>
  )
}
