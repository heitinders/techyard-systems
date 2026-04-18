import Link from 'next/link'
import { Container } from '@/components/primitives/Container'

export default function NotFound() {
  return (
    <section className="bg-paper py-[var(--space-section)]">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <div className="mb-6 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            Error 404 · Page not found
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,88px)] font-medium leading-[1.05] tracking-[-0.025em] text-ink">
            This page isn&rsquo;t one of{' '}
            <em className="font-normal italic text-accent">ours.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-[44ch] font-serif text-[20px] italic leading-[1.5] text-ink-muted">
            It might have moved, or you might have a bad link. Here&rsquo;s what we do have:
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-7 text-[15px] font-medium">
            <Link
              href="/services"
              className="border-b border-ink pb-0.5 text-ink hover:border-accent hover:text-accent"
            >
              → Services
            </Link>
            <Link
              href="/work"
              className="border-b border-ink pb-0.5 text-ink hover:border-accent hover:text-accent"
            >
              → Recent work
            </Link>
            <Link
              href="/journal"
              className="border-b border-ink pb-0.5 text-ink hover:border-accent hover:text-accent"
            >
              → Journal
            </Link>
          </div>
          <p className="mt-14 text-[13px] leading-[1.5] text-ink-subtle">
            If you got here from one of our emails or documents, please let us know:{' '}
            <a
              href="mailto:contactus@techyardsystems.com"
              className="underline decoration-ink-subtle underline-offset-2 hover:decoration-accent hover:text-accent"
            >
              contactus@techyardsystems.com
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}
