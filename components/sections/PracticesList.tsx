import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { homeContent, serviceMeta } from '@/content/home'

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
        {k}
      </span>
      <span className="text-[13px] font-medium text-ink">{v}</span>
    </div>
  )
}

export function PracticesList() {
  const { practicesSection, practices } = homeContent
  return (
    <section className="py-[var(--space-section)]" id="practices">
      <Container>
        <EyebrowLine>{practicesSection.eyebrow}</EyebrowLine>
        <h2 className="mb-14 mt-5 max-w-[22ch] font-serif text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.022em]">
          {practicesSection.title}
          <br />
          {practicesSection.titleLine2}
          <em className="font-normal italic text-accent">
            {practicesSection.titleAccent}
          </em>
        </h2>

        <div>
          {practices.map((p, i) => {
            const meta = serviceMeta[p.practice]
            const isLast = i === practices.length - 1
            return (
              <Link
                key={p.number}
                href={`/services#${p.practice}`}
                className={`group grid items-start gap-8 border-t border-rule px-3 py-10 transition-colors duration-[var(--dur-fast)] hover:bg-[color-mix(in_oklab,var(--color-accent)_5%,transparent)] md:grid-cols-[100px_1fr_220px_40px] md:gap-8 ${
                  isLast ? 'border-b' : ''
                }`}
              >
                <div className="pt-2 font-mono text-[12px] tracking-[0.04em] text-ink-subtle">
                  {p.number}
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-[clamp(24px,2.8vw,36px)] font-medium leading-[1.1] tracking-[-0.02em] text-ink transition-colors duration-[var(--dur-fast)] group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="max-w-[58ch] text-[15px] leading-[1.55] text-ink-muted">
                    {p.description}
                  </p>
                </div>
                <div className="hidden flex-col gap-2.5 pt-3 md:flex">
                  <Meta k="Timeline" v={meta.timeline} />
                  <Meta k="Best fit" v={meta.bestFit} />
                  <Meta k="Measured by" v={meta.measurableBy} />
                </div>
                <div className="hidden pt-2 text-right font-serif text-[28px] italic text-accent transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-1.5 md:block">
                  →
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
