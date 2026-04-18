'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { JournalPost } from '#site/content'
import { Chip } from '@/components/primitives/Chip'
import type { Category } from '@/content/taxonomies'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export function JournalIndexFilter({ posts }: { posts: JournalPost[] }) {
  const availableCategories = useMemo(() => {
    const set = new Set<Category>()
    for (const p of posts) set.add(p.category)
    return Array.from(set)
  }, [posts])

  const [selected, setSelected] = useState<Set<Category>>(new Set())

  const toggle = (cat: Category) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const visible = selected.size === 0 ? posts : posts.filter((p) => selected.has(p.category))

  return (
    <>
      <fieldset className="mb-14">
        <legend className="mb-5 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Filter by category
        </legend>
        <div role="group" aria-label="Category filter" className="flex flex-wrap gap-3">
          {availableCategories.map((cat) => (
            <Chip key={cat} selected={selected.has(cat)} onToggle={() => toggle(cat)}>
              {cat}
            </Chip>
          ))}
        </div>
      </fieldset>

      {visible.length === 0 ? (
        <p className="font-serif text-[18px] italic text-ink-muted">
          No posts match the selected categories yet.
        </p>
      ) : (
        <ul className="divide-y divide-rule">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link
                href={post.url}
                className="group grid gap-3 py-10 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10"
              >
                <time
                  dateTime={post.publishedAt}
                  className="text-[12px] font-medium uppercase tracking-[1.8px] text-ink-subtle md:w-[120px]"
                >
                  {dateFormatter.format(new Date(post.publishedAt))}
                </time>
                <div>
                  <div className="mb-2 text-[11px] font-medium uppercase tracking-[1.8px] text-accent">
                    {post.category}
                  </div>
                  <h2 className="font-serif text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.2] tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-[56ch] font-serif text-[17px] italic leading-[1.5] text-ink-muted">
                    {post.subtitle}
                  </p>
                </div>
                <div className="text-[12px] text-ink-subtle md:whitespace-nowrap">
                  {post.readingMinutes} min read
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
