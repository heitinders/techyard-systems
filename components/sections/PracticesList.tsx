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
          <em className="font-normal italic text-accent">
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
