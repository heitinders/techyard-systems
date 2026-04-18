import { HeroHome } from '@/components/sections/HeroHome'
import { ProofStrip } from '@/components/sections/ProofStrip'
import { PracticesList } from '@/components/sections/PracticesList'
import { FeaturedCaseStudy } from '@/components/sections/FeaturedCaseStudy'
import { IndustriesGrid } from '@/components/sections/IndustriesGrid'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { CTABand } from '@/components/sections/CTABand'

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
