'use client'

import { useEffect } from 'react'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[unhandled]', error)
  }, [error])

  return (
    <section className="bg-paper py-[var(--space-section)]">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <div className="mb-6 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            Error · Something broke
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,88px)] font-medium leading-[1.05] tracking-[-0.025em] text-ink">
            We&rsquo;re <em className="font-normal italic text-accent">on it</em>.
          </h1>
          <p className="mx-auto mt-7 max-w-[46ch] font-serif text-[20px] italic leading-[1.5] text-ink-muted">
            Please try again in a minute. If it keeps happening, a two-line email to{' '}
            <a
              href="mailto:contactus@techyardsystems.com"
              className="underline decoration-ink-muted underline-offset-2 hover:text-accent"
            >
              contactus@techyardsystems.com
            </a>{' '}
            helps us find the cause.
          </p>
          <div className="mt-12">
            <Button onClick={reset} variant="primary">
              Reload this page
            </Button>
          </div>
          {error.digest ? (
            <p className="mt-10 font-mono text-[11px] text-ink-subtle">
              Reference: {error.digest}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
