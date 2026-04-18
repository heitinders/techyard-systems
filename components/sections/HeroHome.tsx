import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { homeContent } from '@/content/home'

export function HeroHome() {
  const { hero } = homeContent
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <Container>
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          {hero.eyebrow}
        </div>
        <h1 className="max-w-[14ch] font-serif text-[clamp(56px,10vw,96px)] font-medium leading-[0.98] tracking-[-0.024em]">
          {hero.title}
          <em className="font-normal italic text-accent">{hero.titleAccent}</em>
        </h1>
        <p className="mt-8 max-w-[52ch] font-serif text-[22px] italic leading-[1.45] text-ink-muted">
          {hero.lede}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.ghostCta.href} variant="ghost">
            {hero.ghostCta.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
