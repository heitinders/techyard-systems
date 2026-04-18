import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { OrchestrationCore } from '@/components/sections/OrchestrationCore'
import { homeContent } from '@/content/home'

export function HeroHome() {
  const { hero } = homeContent

  return (
    <section className="relative pt-16 pb-16 md:pt-24 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <EyebrowLine num="№ 01">{hero.eyebrow}</EyebrowLine>
            <h1 className="mt-7 max-w-[14ch] font-serif text-[clamp(54px,10vw,112px)] font-medium leading-[0.95] tracking-[-0.028em]">
              {hero.title}
              <em className="font-normal italic text-accent">{hero.titleAccent}</em>
            </h1>
            <p className="mt-7 max-w-[52ch] font-serif text-[clamp(18px,2.1vw,23px)] italic leading-[1.45] text-ink-muted">
              {hero.lede}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.ghostCta.href} variant="ghost">
                {hero.ghostCta.label}
              </Button>
            </div>
          </div>

          <div className="pb-12 lg:pb-0">
            <OrchestrationCore />
            <div className="mt-12 flex justify-between font-mono text-[11px] tracking-[0.08em] text-ink-subtle">
              <span>fig. 1 · orchestration core, live</span>
              <span>8 integrations · online</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
