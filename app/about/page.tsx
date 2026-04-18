import type { Metadata } from 'next'
import { Container } from '@/components/primitives/Container'
import { CTABand } from '@/components/sections/CTABand'
import { aboutContent } from '@/content/about'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Techyard Systems is a small practice of engineers, designers, and former operators building AI agents for the unglamorous work enterprise has to do.',
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            {aboutContent.hero.eyebrow}
          </div>
          <h1 className="max-w-[16ch] font-serif text-[clamp(48px,8vw,84px)] font-medium leading-[1.02] tracking-[-0.024em]">
            {aboutContent.hero.title}
            <em className="font-normal italic text-accent">{aboutContent.hero.titleAccent}</em>
          </h1>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mb-6 max-w-[56ch] font-serif text-[19px] italic leading-[1.5] text-ink-muted">
                {aboutContent.hero.lede}
              </p>
              {aboutContent.narrative.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="mb-5 max-w-[56ch] text-[16px] leading-[1.65]"
                >
                  {para}
                </p>
              ))}
            </div>
            <div>
              <div className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-accent">
                How we think about it
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {aboutContent.values.map((v) => (
                  <div
                    key={v.titleAccent}
                    className="rounded-md border border-rule bg-paper-raised p-6"
                  >
                    <h3 className="mb-2 font-serif text-[20px] font-medium tracking-tight">
                      {v.title}
                      <em className="font-normal italic text-accent">{v.titleAccent}</em>
                    </h3>
                    <p className="text-[14px] leading-[1.5] text-ink-muted">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container>
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            The team
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutContent.team.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div
                  className="h-16 w-16 shrink-0 rounded-full"
                  style={{ background: m.avatarGradient }}
                  aria-hidden
                />
                <div>
                  <div className="font-serif text-[18px] font-medium tracking-tight">
                    {m.name}
                  </div>
                  <div className="mt-0.5 text-[13px] text-ink-subtle">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  )
}
