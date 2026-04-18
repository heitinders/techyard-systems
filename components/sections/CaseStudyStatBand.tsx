import type { CaseStudy } from '#site/content'
import { Container } from '@/components/primitives/Container'
import { CornerMarks } from '@/components/primitives/CornerMarks'

type Outcomes = CaseStudy['outcomes']

export function CaseStudyStatBand({ outcomes }: { outcomes: Outcomes }) {
  if (outcomes.length === 1) {
    const [o] = outcomes
    return (
      <section className="relative overflow-hidden bg-ink-deep py-[var(--space-section)] text-paper">
        <CornerMarks color="rgba(241,237,228,0.28)" />
        <Container>
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-paper">
            {o.eyebrow}
          </div>
          <div className="flex flex-wrap items-baseline gap-2 font-serif font-medium leading-[0.85] tracking-[-0.035em]">
            <span
              style={{ fontSize: 'clamp(120px, 22vw, 300px)' }}
              className="align-baseline"
            >
              {o.value}
            </span>
            <span
              style={{ fontSize: 'clamp(72px, 13vw, 180px)' }}
              className="font-normal italic text-accent-paper"
            >
              {o.valueAccent}
            </span>
          </div>
          <p className="mt-8 max-w-[46ch] font-serif text-[22px] italic leading-[1.5] text-paper/75">
            {o.note}
          </p>
        </Container>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-ink-deep py-[var(--space-section)] text-paper">
      <CornerMarks color="rgba(241,237,228,0.28)" />
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="border-t border-paper/15 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:first:border-l-0 md:first:pl-0"
            >
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-paper">
                {o.eyebrow}
              </div>
              <div className="font-serif text-[clamp(64px,9vw,108px)] font-medium leading-[0.88] tracking-[-0.03em]">
                {o.value}
                <span className="font-normal italic text-accent-paper">{o.valueAccent}</span>
              </div>
              <p className="mt-6 max-w-[32ch] font-serif text-[16px] leading-[1.5] text-paper/70">
                {o.note}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
