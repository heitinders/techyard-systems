import { Container } from '@/components/primitives/Container'
import { caseStudies } from '#site/content'
import { industries, industryLabels } from '@/content/taxonomies'

export function IndustriesGrid() {
  const countsByIndustry = Object.fromEntries(
    industries.map((i) => [i, caseStudies.filter((c) => c.industry === i).length]),
  )
  return (
    <section className="py-20">
      <Container>
        <div className="mb-7 text-center text-[11px] font-medium uppercase tracking-[2px] text-accent">
          Industries we&apos;ve shipped into
        </div>
      </Container>
      <div className="grid grid-cols-2 gap-px border-y border-rule bg-rule md:grid-cols-4">
        {industries.map((i) => (
          <div key={i} className="bg-paper p-8 text-center">
            <div className="font-serif text-lg font-medium tracking-tight">
              {industryLabels[i]}
            </div>
            <div className="mt-1 text-[11px] text-ink-subtle">
              Case studies · {countsByIndustry[i]}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
