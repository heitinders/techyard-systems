import type { Metadata } from 'next'
import { Container } from '@/components/primitives/Container'
import { CTABand } from '@/components/sections/CTABand'
import { homeContent, serviceMeta } from '@/content/home'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Five practices: customer support automation, sales lead generation, IT & HR request management, data analysis, and operations monitoring. Custom AI agents built to ship in weeks.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            What we build
          </div>
          <h1 className="max-w-[22ch] font-serif text-[clamp(42px,7vw,72px)] font-medium leading-[1.05] tracking-[-0.02em]">
            Five practices,
            <br />
            one philosophy: <em className="font-normal italic text-accent">ship what works.</em>
          </h1>
          <p className="mt-8 max-w-[52ch] font-serif text-[19px] italic leading-[1.5] text-ink-muted">
            Every engagement is custom. These are the shapes we ship most often — with the
            context that helps you decide if one of them fits your team.
          </p>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container>
          <div>
            {homeContent.practices.map((p, i) => {
              const meta = serviceMeta[p.practice]
              return (
                <div
                  key={p.number}
                  className={`grid gap-10 border-t border-rule py-10 md:grid-cols-[60px_1fr_280px] ${
                    i === homeContent.practices.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="pt-2 font-mono text-xs text-ink-subtle">{p.number}</div>
                  <div>
                    <h2 className="mb-3 font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.02em]">
                      {p.title}
                    </h2>
                    <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {meta.integrations.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-pill border border-rule px-2.5 py-0.5 text-[11px] text-ink-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 text-xs">
                    <MetaRow label="Typical timeline" value={meta.timeline} />
                    <MetaRow label="Best fit" value={meta.bestFit} />
                    <MetaRow label="Measurable by" value={meta.measurableBy} />
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-rule py-1.5">
      <span className="text-ink-subtle">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  )
}
