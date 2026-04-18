import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { caseStudies } from '#site/content'
import { industryLabels } from '@/content/taxonomies'

export function FeaturedCaseStudy() {
  const cs = caseStudies.find((c) => c.featured) ?? caseStudies[0]
  if (!cs) return null

  return (
    <section className="bg-ink py-[var(--space-section)] text-paper">
      <Container>
        <div className="grid gap-20 md:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-[#a8c0b4]">
              {cs.number} · {industryLabels[cs.industry]}
            </div>
            {cs.pullQuote && (
              <h3 className="mb-7 font-serif text-[36px] italic leading-[1.2] tracking-[-0.02em]">
                &ldquo;{cs.pullQuote}&rdquo;
              </h3>
            )}
            <p className="mb-7 max-w-[48ch] font-serif text-[17px] italic leading-[1.55] text-paper/70">
              {cs.lede}
            </p>
            {cs.pullAttribution && (
              <div className="text-xs tracking-wider text-paper/55">{cs.pullAttribution}</div>
            )}
            <Link
              href={cs.url}
              className="mt-10 inline-block border-b border-paper pb-1 text-sm font-medium"
            >
              Read the full study →
            </Link>
          </div>
          <div className="rounded-lg bg-paper/[0.06] p-11">
            {cs.outcomes.map((o, i) => (
              <div
                key={i}
                className={`py-6 ${i !== cs.outcomes.length - 1 ? 'border-b border-paper/10' : ''} ${
                  i === 0 ? 'pt-0' : ''
                }`}
              >
                <div className="font-serif text-[56px] font-medium leading-none tracking-[-0.025em]">
                  {o.value}
                  <em className="font-normal italic text-[#a8c0b4]">{o.valueAccent}</em>
                </div>
                <div className="mt-3 max-w-[32ch] text-[13px] leading-[1.4] text-paper/65">
                  {o.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
