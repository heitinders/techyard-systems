import type { Metadata } from 'next'
import { Container } from '@/components/primitives/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Techyard Systems privacy policy.',
}

export default function PrivacyPage() {
  return (
    <section className="pt-24 pb-[var(--space-section)] md:pt-32">
      <Container>
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          Legal
        </div>
        <h1 className="mb-4 font-serif text-[clamp(40px,6vw,64px)] font-medium leading-[1.05] tracking-[-0.02em]">
          Privacy Policy
        </h1>
        <p className="mb-12 max-w-[56ch] text-[13px] text-ink-subtle">
          Last updated: 2026-04-18 · <em className="text-accent not-italic">Placeholder copy — client&apos;s legal team provides final language before launch.</em>
        </p>

        <article className="max-w-[66ch] space-y-5 text-[16px] leading-[1.7]">
          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            1. What we collect
          </h2>
          <p>
            When you visit techyardsystems.com we collect the minimum information needed to
            operate the site: pages visited, referrer, approximate location (country-level only),
            device type, and screen size. We do this through Plausible Analytics, which is
            cookieless and does not track individuals across sites.
          </p>
          <p>
            If you submit the contact form, we collect the name, email, company, practice
            interests, and message you provide. We use this information to respond to your
            inquiry and for no other purpose.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            2. What we do with it
          </h2>
          <p>
            Analytics data is aggregated and used solely to understand which pages and topics
            are useful to visitors. We do not sell, rent, or share it with third parties.
          </p>
          <p>
            Contact form submissions are sent to{' '}
            <a href="mailto:contactus@techyardsystems.com" className="text-accent underline underline-offset-4">
              contactus@techyardsystems.com
            </a>{' '}
            and stored in our inbox. We reply within one business day. We do not add you to any
            marketing list.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            3. Cookies
          </h2>
          <p>
            This site does not set cookies for analytics or tracking. The Calendly embed on the
            contact page is loaded only when you click to book a call — at which point Calendly
            sets its own cookies under their domain. We disclose this in-page before the embed
            loads.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            4. Your rights
          </h2>
          <p>
            Under GDPR, CCPA, and similar frameworks, you can request access to, correction of,
            or deletion of any personal data we hold about you. Write to{' '}
            <a href="mailto:contactus@techyardsystems.com" className="text-accent underline underline-offset-4">
              contactus@techyardsystems.com
            </a>{' '}
            and we&apos;ll respond within 30 days.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            5. Updates
          </h2>
          <p>
            We&apos;ll update this page when our practice changes. Material changes will include
            a visible note on the site. The &quot;Last updated&quot; date above reflects the most
            recent material change.
          </p>
        </article>
      </Container>
    </section>
  )
}
