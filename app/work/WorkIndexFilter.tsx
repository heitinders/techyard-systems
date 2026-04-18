'use client'

import { useMemo, useState } from 'react'
import type { CaseStudy } from '#site/content'
import { Chip } from '@/components/primitives/Chip'
import { CaseStudyCard } from '@/components/sections/CaseStudyCard'
import { industryLabels, type Industry } from '@/content/taxonomies'

export function WorkIndexFilter({ studies }: { studies: CaseStudy[] }) {
  const availableIndustries = useMemo(() => {
    const set = new Set<Industry>()
    for (const s of studies) set.add(s.industry)
    return Array.from(set)
  }, [studies])

  const [selected, setSelected] = useState<Set<Industry>>(new Set())

  const toggle = (ind: Industry) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(ind)) next.delete(ind)
      else next.add(ind)
      return next
    })
  }

  const visible = selected.size === 0 ? studies : studies.filter((s) => selected.has(s.industry))

  return (
    <>
      <fieldset className="mb-14">
        <legend className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Filter by industry
        </legend>
        <div role="group" aria-label="Industry filter" className="flex flex-wrap gap-3">
          {availableIndustries.map((ind) => (
            <Chip key={ind} selected={selected.has(ind)} onToggle={() => toggle(ind)}>
              {industryLabels[ind]}
            </Chip>
          ))}
        </div>
      </fieldset>

      {visible.length === 0 ? (
        <p className="font-serif text-[18px] italic text-ink-muted">
          No case studies match the selected industries yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((s) => (
            <CaseStudyCard key={s.slug} study={s} />
          ))}
        </div>
      )}
    </>
  )
}
