import { Container } from '@/components/primitives/Container'
import { homeContent } from '@/content/home'

export function HowWeWork() {
  const { howWeWork } = homeContent
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          {howWeWork.eyebrow}
        </div>
        <h2 className="mb-14 max-w-[22ch] font-serif text-[clamp(36px,5vw,60px)] font-medium leading-[1.05] tracking-[-0.02em]">
          {howWeWork.title}
          <em className="font-normal italic text-accent">{howWeWork.titleAccent}</em>
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {howWeWork.phases.map((p) => (
            <div key={p.step}>
              <div className="mb-4 font-serif text-lg italic text-accent">{p.step}</div>
              <h3 className="mb-3 font-serif text-2xl font-medium tracking-tight">{p.title}</h3>
              <p className="text-[15px] leading-[1.55] text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
