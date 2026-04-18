import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { homeContent } from '@/content/home'

export function CTABand() {
  const { cta } = homeContent
  return (
    <section className="bg-rule py-[var(--space-section)] text-center">
      <Container>
        <h2 className="mx-auto max-w-[16ch] font-serif text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.022em]">
          {cta.title}
          <em className="font-normal italic text-accent">{cta.titleAccent}</em>
        </h2>
        <p className="mt-7 font-serif text-[20px] italic text-ink-muted">{cta.sub}</p>
        <div className="mt-10">
          <Button href={cta.button.href} variant="primary">
            {cta.button.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
