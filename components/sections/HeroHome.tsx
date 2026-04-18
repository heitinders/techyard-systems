import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { AgentDemo } from '@/components/sections/AgentDemo'
import { homeContent } from '@/content/home'

const VOLUME = 'Vol. IV · No. 02'

export function HeroHome() {
  const { hero } = homeContent
  const year = new Date().getFullYear()

  return (
    <section className="relative pt-14 pb-16 md:pt-20 md:pb-24">
      <Container>
        <div className="mb-12 flex items-center justify-between border-t border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-subtle md:mb-16">
          <span>{VOLUME}</span>
          <span>{year} · Practice Review</span>
          <span className="hidden md:inline">Built on paper</span>
        </div>

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

          <div>
            <AgentDemo />
            <div className="mt-3.5 flex justify-between font-mono text-[11px] tracking-[0.08em] text-ink-subtle">
              <span>fig. 1 · support agent, typical run</span>
              <span>real agent · recorded 4/02/26</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
