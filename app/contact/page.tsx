import type { Metadata } from 'next'
import { Container } from '@/components/primitives/Container'
import { ContactForm } from '@/components/sections/ContactForm'
import { ContactSidebar } from '@/components/sections/ContactSidebar'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us the problem. A 15-minute call or a paragraph — both land in the same inbox.',
  openGraph: {
    title: 'Contact — Techyard Systems',
    description:
      'Tell us the problem. A 15-minute call or a paragraph — both land in the same inbox.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <section className="bg-paper pt-24 pb-[var(--space-section)] md:pt-32">
      <Container>
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          Get in touch
        </div>
        <h1 className="max-w-[18ch] font-serif text-[clamp(48px,7vw,84px)] font-medium leading-[1.02] tracking-[-0.025em] text-ink">
          Let&rsquo;s find out if <em className="font-normal italic text-accent">we&rsquo;re a fit</em>.
        </h1>
        <p className="mt-7 max-w-[52ch] font-serif text-[20px] italic leading-[1.5] text-ink-muted">
          A 15-minute call is the fastest way. Or write to us — we read everything.
        </p>
        <div className="mt-16 grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <ContactForm />
          <ContactSidebar />
        </div>
      </Container>
    </section>
  )
}
