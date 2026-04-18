import type { Metadata } from 'next'
import { Container } from '@/components/primitives/Container'
import { SecurityFAQ } from '@/components/sections/SecurityFAQ'
import { ComplianceBadges } from '@/components/sections/ComplianceBadges'
import { securityCategories } from '@/content/security-faq'

export const metadata: Metadata = {
  title: 'Security & Compliance',
  description:
    'SOC 2 Type II, GDPR, HIPAA-ready, ISO 27001. Plainly-answered questions about data handling, compliance, model ownership, and access controls.',
}

export default function SecurityPage() {
  return (
    <>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="mb-8 text-[11px] font-medium uppercase tracking-[2px] text-accent">
            Trust &amp; compliance
          </div>
          <h1 className="max-w-[14ch] font-serif text-[clamp(48px,8vw,84px)] font-medium leading-[1.02] tracking-[-0.024em]">
            Security, <em className="font-normal italic text-accent">plainly answered.</em>
          </h1>
          <p className="mt-8 max-w-[56ch] font-serif text-[19px] italic leading-[1.5] text-ink-muted">
            If you&apos;re here, you&apos;re probably doing vendor due diligence. We&apos;ve tried
            to write these plainly — no weasel words. If a question isn&apos;t answered, write
            to us.
          </p>
        </Container>
      </section>

      <section className="pb-[var(--space-section)]">
        <Container>
          <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {securityCategories.map((c) => (
              <div
                key={c.id}
                className="rounded-md border border-rule bg-paper-raised p-4 text-center"
              >
                <div className="mb-1 text-[10px] uppercase tracking-[1.5px] text-accent">
                  {c.num}
                </div>
                <div className="font-serif text-[17px] font-medium tracking-tight">
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          <SecurityFAQ />
          <ComplianceBadges />
        </Container>
      </section>
    </>
  )
}
