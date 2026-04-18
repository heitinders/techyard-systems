import type { JournalPost } from '#site/content'
import Link from 'next/link'
import { journalPosts } from '#site/content'
import { Container } from '@/components/primitives/Container'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function pickRelated(current: JournalPost): JournalPost[] {
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const map = new Map(journalPosts.map((p) => [p.slug, p]))
    return current.relatedSlugs
      .map((slug) => map.get(slug))
      .filter((p): p is JournalPost => Boolean(p))
      .slice(0, 3)
  }
  return journalPosts
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)
}

export function RelatedPosts({ current }: { current: JournalPost }) {
  const related = pickRelated(current)
  if (related.length === 0) return null

  return (
    <section className="bg-rule py-[var(--space-section)]">
      <Container>
        <div className="mb-10 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Related reading
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((post) => (
            <Link
              key={post.slug}
              href={post.url}
              className="group flex h-full flex-col gap-5 rounded-[var(--r-md)] border border-ink/10 bg-paper p-7 transition-colors hover:border-ink/40"
            >
              <div className="text-[11px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
                {post.category}
              </div>
              <h3 className="font-serif text-[22px] font-medium leading-[1.2] tracking-[-0.012em] text-ink">
                {post.title}
              </h3>
              <p className="font-serif text-[15px] italic leading-[1.5] text-ink-muted">
                {post.subtitle}
              </p>
              <div className="mt-auto flex items-center justify-between text-[12px] text-ink-subtle">
                <time dateTime={post.publishedAt}>
                  {dateFormatter.format(new Date(post.publishedAt))}
                </time>
                <span>{post.readingMinutes} min</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
