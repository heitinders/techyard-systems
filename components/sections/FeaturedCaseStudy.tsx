import Link from 'next/link'
import { Container } from '@/components/primitives/Container'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { CornerMarks } from '@/components/primitives/CornerMarks'
import { caseStudies } from '#site/content'
import { industryLabels, practiceLabels } from '@/content/taxonomies'

function Side({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
        {k}
      </div>
      <div className="mt-1.5 text-[14px] font-medium text-paper">{v}</div>
    </div>
  )
}

export function FeaturedCaseStudy() {
  const cs = caseStudies.find((c) => c.featured) ?? caseStudies[0]
  if (!cs) return null
  const headline = cs.outcomes[0]

  return (
    <section className="relative overflow-hidden bg-ink py-[var(--space-section)] text-paper">
      <CornerMarks color="rgba(241,237,228,0.28)" />
      <Container>
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <EyebrowLine num={cs.number} tone="paper">
              Featured · {industryLabels[cs.industry]}
            </EyebrowLine>
            <h2 className="mt-6 max-w-[24ch] font-serif text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.12] tracking-[-0.02em]">
              {cs.title}
            </h2>
            <p className="mt-5 max-w-[48ch] font-serif text-[18px] italic leading-[1.55] text-paper/70">
              {cs.lede}
            </p>
            <div className="mt-9 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/55">
              <span>Client · {cs.clientDisclosed ? cs.clientName : 'Disclosed on request'}</span>
              <span aria-hidden="true">·</span>
              <span>Engagement · {cs.engagementWeeks} wks</span>
              <span aria-hidden="true">·</span>
              <span>Practice · {practiceLabels[cs.practice]}</span>
            </div>
            <Link
              href={cs.url}
              className="mt-10 inline-block border-b border-paper pb-1 text-sm font-medium transition-colors hover:border-accent-paper hover:text-accent-paper"
            >
              Read the full study →
            </Link>
          </div>

          <div className="rounded-[14px] border border-paper/10 bg-paper/[0.06] p-10">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
              {headline.eyebrow}
            </div>
            <div className="flex items-baseline gap-1 font-serif font-medium leading-[0.88] tracking-[-0.03em]">
              <span className="text-[clamp(78px,11vw,140px)]">{headline.value}</span>
              <span className="text-[clamp(54px,7.7vw,98px)] font-normal italic text-accent-paper">
                {headline.valueAccent}
              </span>
            </div>
            <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.55] text-paper/70">
              {headline.note}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-paper/10 pt-5">
              <Side k="Practice" v={practiceLabels[cs.practice]} />
              <Side k="Pilot" v={`${cs.engagementWeeks} wks`} />
              <Side k="Owned by" v="Client" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
