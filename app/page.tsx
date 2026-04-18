import type { Metadata } from 'next'
import { HeroHome } from '@/components/sections/HeroHome'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { PracticesList } from '@/components/sections/PracticesList'
import { FeaturedCaseStudy } from '@/components/sections/FeaturedCaseStudy'
import { IndustriesGrid } from '@/components/sections/IndustriesGrid'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { CTABand } from '@/components/sections/CTABand'

export const metadata: Metadata = {
  title: { absolute: 'Techyard Systems — Agents that actually work.' },
  description:
    'Custom AI agents that run your support, sales, and operations — trained on your data, owned by you.',
  openGraph: {
    title: 'Techyard Systems',
    description: 'Agents that actually work.',
    images: ['/api/og/home'],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og/home'] },
}

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ProofStrip />
      <PracticesList />
      <FeaturedCaseStudy />
      <IndustriesGrid />
      <HowWeWork />
      <CTABand />
    </>
  )
}
