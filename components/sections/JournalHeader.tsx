import type { JournalPost } from '#site/content'
import Image from 'next/image'
import { Container } from '@/components/primitives/Container'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function renderTitle(title: string, accent: string) {
  if (!accent || !title.includes(accent)) return <>{title}</>
  const [before, ...rest] = title.split(accent)
  const after = rest.join(accent)
  return (
    <>
      {before}
      <em className="font-normal italic text-accent">{accent}</em>
      {after}
    </>
  )
}

export function JournalHeader({ post }: { post: JournalPost }) {
  return (
    <>
      <div className="bg-ink-deep py-3 text-paper/70">
        <Container>
          <div className="text-[11px] font-medium uppercase tracking-[2px]">
            Techyard Systems · {post.number}
          </div>
        </Container>
      </div>

      <section className="bg-paper pt-20 pb-16 md:pt-28 md:pb-20">
        <Container>
          <div className="mx-auto max-w-[36rem] text-center">
            <div className="mb-6 inline-block rounded-pill border border-rule px-4 py-1 text-[11px] font-medium uppercase tracking-[2px] text-ink-muted">
              {post.category}
            </div>
            <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.025em] text-ink">
              {renderTitle(post.title, post.titleAccent)}
            </h1>
            <p className="mx-auto mt-7 max-w-[44ch] font-serif text-[22px] italic leading-[1.45] text-ink-muted">
              {post.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[13px] text-ink-subtle">
              <span className="font-medium text-ink">{post.author.name}</span>
              <span aria-hidden="true">·</span>
              <span>{post.author.role}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </Container>
      </section>

      {post.featureImage ? (
        <section className="bg-paper pb-16 md:pb-24">
          <Container>
            <figure className="overflow-hidden rounded-[var(--r-lg)] border border-rule">
              <Image
                src={post.featureImage.src}
                alt={post.featureImage.alt}
                width={post.featureImage.width}
                height={post.featureImage.height}
                sizes="(min-width: 1180px) 1100px, 100vw"
                className="h-auto w-full"
                priority
              />
              {post.featureImage.caption ? (
                <figcaption className="border-t border-rule bg-paper-raised px-5 py-3 text-[12px] text-ink-subtle">
                  {post.featureImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </Container>
        </section>
      ) : null}
    </>
  )
}
