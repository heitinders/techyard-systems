import { Container } from '@/components/primitives/Container'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { homeContent } from '@/content/home'

const PHASE_WEEKS = ['2 wks', '4–8 wks', '2 wks'] as const

export function HowWeWork() {
  const { howWeWork } = homeContent
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <EyebrowLine>{howWeWork.eyebrow}</EyebrowLine>
        <h2 className="mb-16 mt-5 max-w-[22ch] font-serif text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.022em]">
          {howWeWork.title}
          <em className="font-normal italic text-accent">{howWeWork.titleAccent}</em>
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {howWeWork.phases.map((p, i) => (
            <div
              key={p.step}
              className="relative h-full rounded-[14px] border border-rule bg-[color-mix(in_oklab,var(--color-paper-raised)_80%,transparent)] px-7 py-8"
            >
              <div className="absolute -top-3.5 left-5 rounded-pill border border-rule bg-paper px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {p.step} · {PHASE_WEEKS[i]}
              </div>
              <div className="mb-2.5 mt-1.5 font-mono text-[12px] tracking-[0.04em] text-ink-subtle">
                0{i + 1} / 0{howWeWork.phases.length}
              </div>
              <h3 className="mb-3.5 font-serif text-[24px] font-medium leading-[1.2] tracking-[-0.018em] text-ink">
                {p.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
