import type { Metadata } from 'next'
import { Container } from '@/components/primitives/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Techyard Systems website terms of service.',
}

export default function TermsPage() {
  return (
    <section className="pt-24 pb-[var(--space-section)] md:pt-32">
      <Container>
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          Legal
        </div>
        <h1 className="mb-4 font-serif text-[clamp(40px,6vw,64px)] font-medium leading-[1.05] tracking-[-0.02em]">
          Terms of Service
        </h1>
        <p className="mb-12 max-w-[56ch] text-[13px] text-ink-subtle">
          Last updated: 2026-04-18 · <em className="text-accent not-italic">Placeholder copy — client&apos;s legal team provides final language before launch.</em>
        </p>

        <article className="max-w-[66ch] space-y-5 text-[16px] leading-[1.7]">
          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            1. Acceptance
          </h2>
          <p>
            By accessing techyardsystems.com, you agree to these terms. If you don&apos;t agree,
            please don&apos;t use the site. The site is provided for informational purposes and
            does not constitute an offer or contract.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            2. Engagement agreements
          </h2>
          <p>
            Any consulting or engineering engagement between Techyard Systems and a client is
            governed by a separate written agreement (MSA, SOW, or equivalent). These website
            Terms do not supersede or modify any such agreement.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            3. Content &amp; accuracy
          </h2>
          <p>
            We try to keep the content on this site current and accurate. We make no warranty
            that case study metrics, technology claims, or other figures reflect the present day
            — they reflect the engagement they describe. Nothing on the site should be relied
            on as legal, financial, or engineering advice.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            4. Intellectual property
          </h2>
          <p>
            The Techyard Systems wordmark, site design, written content, and case studies are
            copyright Techyard Systems. Client logos and trade names used in case studies (where
            disclosed) are the property of their respective owners and used with permission.
          </p>

          <h2 className="mt-10 font-serif text-[28px] font-medium tracking-tight">
            5. Changes
          </h2>
          <p>
            We&apos;ll update these Terms when our practice changes. Material changes will
            include a visible note on the site. The &quot;Last updated&quot; date above reflects
            the most recent material change.
          </p>
        </article>
      </Container>
    </section>
  )
}
