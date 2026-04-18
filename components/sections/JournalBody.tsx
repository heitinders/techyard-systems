import type { JournalPost } from '#site/content'
import { MDXRender } from '@/components/content/MDXRender'

export function JournalBody({ post }: { post: JournalPost }) {
  const initials = post.author.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)

  return (
    <section className="bg-paper pb-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[680px] px-6">
        <article className="journal-body">
          <MDXRender code={post.body} />
        </article>

        <div className="mt-16 flex items-center gap-4 border-t border-rule pt-8">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-[14px] font-medium text-paper"
          >
            {initials}
          </div>
          <div className="text-[14px] leading-[1.4]">
            <div className="font-medium text-ink">{post.author.name}</div>
            <div className="text-ink-subtle">{post.author.role}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
