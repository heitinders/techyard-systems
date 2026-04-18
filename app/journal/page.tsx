import type { Metadata } from 'next'
import { journalPosts } from '#site/content'
import { Container } from '@/components/primitives/Container'
import { JournalIndexFilter } from './JournalIndexFilter'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Field notes and opinions on building AI agents that actually work.',
  openGraph: {
    title: 'Journal — Techyard Systems',
    description: 'Field notes and opinions on building AI agents that actually work.',
    type: 'website',
  },
}

export default function JournalIndexPage() {
  const sorted = [...journalPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <>
      <section className="bg-paper pt-24 pb-20 md:pt-32 md:pb-24">
        <Container>
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            Journal
          </div>
          <h1 className="max-w-[20ch] font-serif text-[clamp(48px,7vw,88px)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
            Field notes and <em className="font-normal italic text-accent">opinions</em>.
          </h1>
          <p className="mt-8 max-w-[54ch] font-serif text-[21px] italic leading-[1.5] text-ink-muted">
            What we&rsquo;ve learned from shipping agents into production — the things that held up,
            and the things we got wrong the first time.
          </p>
        </Container>
      </section>

      <section className="bg-paper pb-[var(--space-section)]">
        <Container>
          <JournalIndexFilter posts={sorted} />
        </Container>
      </section>
    </>
  )
}
