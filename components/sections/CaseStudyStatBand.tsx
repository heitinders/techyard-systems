import type { CaseStudy } from '#site/content'
import { Container } from '@/components/primitives/Container'

type Outcomes = CaseStudy['outcomes']

export function CaseStudyStatBand({ outcomes }: { outcomes: Outcomes }) {
  if (outcomes.length === 1) {
    const [o] = outcomes
    return (
      <section className="bg-ink-deep py-[var(--space-section)] text-paper">
        <Container>
          <div className="mx-auto max-w-[52ch] text-center">
            <div className="mb-6 text-[11px] font-medium uppercase tracking-[2px] text-paper/55">
              {o.eyebrow}
            </div>
            <div className="font-serif font-medium leading-[0.95] tracking-[-0.03em]">
              <span
                style={{ fontSize: 'clamp(88px, 14vw, 160px)' }}
                className="align-baseline"
              >
                {o.value}
              </span>
              <em
                style={{ fontSize: 'clamp(56px, 9vw, 104px)' }}
                className="font-normal italic text-[#a8c0b4]"
              >
                {o.valueAccent}
              </em>
            </div>
            <p className="mx-auto mt-8 max-w-[44ch] font-serif text-[19px] leading-[1.55] text-paper/75">
              {o.note}
            </p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-ink-deep py-[var(--space-section)] text-paper">
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="border-t border-paper/15 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:first:border-l-0 md:first:pl-0"
            >
              <div className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-paper/55">
                {o.eyebrow}
              </div>
              <div className="font-serif text-[clamp(56px,8vw,88px)] font-medium leading-[0.95] tracking-[-0.025em]">
                {o.value}
                <em className="font-normal italic text-[#a8c0b4]">{o.valueAccent}</em>
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
