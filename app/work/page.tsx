import type { Metadata } from 'next'
import { caseStudies } from '#site/content'
import { Container } from '@/components/primitives/Container'
import { WorkIndexFilter } from './WorkIndexFilter'

export const metadata: Metadata = {
  title: 'Work — Case Studies',
  description:
    'Case studies from agent engagements across logistics, SaaS, healthcare, and operations.',
  openGraph: {
    title: 'Work — Techyard Systems',
    description: 'Case studies from agent engagements across industries.',
    type: 'website',
  },
}

export default function WorkIndexPage() {
  const sorted = [...caseStudies].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <>
      <section className="bg-paper pt-24 pb-20 md:pt-32 md:pb-28">
        <Container>
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            Work
          </div>
          <h1 className="max-w-[18ch] font-serif text-[clamp(48px,7vw,88px)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
            Engagements, <em className="font-normal italic text-accent">measured</em>.
          </h1>
          <p className="mt-8 max-w-[54ch] font-serif text-[21px] italic leading-[1.5] text-ink-muted">
            Every study below lists the outcome we agreed to hit before we started — and what
            happened.
          </p>
        </Container>
      </section>

      <section className="bg-paper pb-[var(--space-section)]">
        <Container>
          <WorkIndexFilter studies={sorted} />
        </Container>
      </section>
    </>
  )
}
