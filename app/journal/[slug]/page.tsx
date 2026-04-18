import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { journalPosts } from '#site/content'
import { JournalHeader } from '@/components/sections/JournalHeader'
import { JournalBody } from '@/components/sections/JournalBody'
import { RelatedPosts } from '@/components/sections/RelatedPosts'
import { JsonLd } from '@/components/content/JsonLd'
import { buildBlogPostingJsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = journalPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: [`/api/og/journal/${post.slug}`],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: { card: 'summary_large_image', images: [`/api/og/journal/${post.slug}`] },
  }
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = journalPosts.find((p) => p.slug === slug)
  if (!post) return notFound()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const postLd = buildBlogPostingJsonLd(siteUrl, {
    title: post.title,
    subtitle: post.subtitle,
    slug: post.slug,
    publishedAt: post.publishedAt,
    authorName: post.author.name,
  })
  return (
    <>
      <JournalHeader post={post} />
      <JournalBody post={post} />
      <RelatedPosts current={post} />
      <JsonLd data={postLd} />
    </>
  )
}
