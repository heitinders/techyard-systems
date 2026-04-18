import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies } from '#site/content'
import { CaseStudyHero } from '@/components/sections/CaseStudyHero'
import { CaseStudyStatBand } from '@/components/sections/CaseStudyStatBand'
import { CaseStudyNext } from '@/components/sections/CaseStudyNext'
import { MDXRender } from '@/components/content/MDXRender'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.lede,
    openGraph: {
      title: cs.title,
      description: cs.lede,
      images: [`/api/og/work/${cs.slug}`],
      type: 'article',
      publishedTime: cs.publishedAt,
    },
    twitter: { card: 'summary_large_image', images: [`/api/og/work/${cs.slug}`] },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return notFound()
  return (
    <>
      <CaseStudyHero study={cs} />
      <CaseStudyStatBand outcomes={cs.outcomes} />
      <article className="mx-auto max-w-[66ch] px-6 py-20 md:py-28">
        <MDXRender code={cs.body} />
      </article>
      <CaseStudyNext current={cs} />
    </>
  )
}
