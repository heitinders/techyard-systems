type OrgPublisher = {
  '@type': 'Organization'
  name: string
  url: string
  logo: { '@type': 'ImageObject'; url: string }
}

const ORG_NAME = 'Techyard Systems'

function publisher(siteUrl: string): OrgPublisher {
  return {
    '@type': 'Organization',
    name: ORG_NAME,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logos/SVG/Light%20BG.svg`,
    },
  }
}

export type OrganizationLd = {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: 'customer support'
    email: string
  }
}

export function buildOrganizationJsonLd(siteUrl: string): OrganizationLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: siteUrl,
    logo: `${siteUrl}/logos/SVG/Light%20BG.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contactus@techyardsystems.com',
    },
  }
}

export type ArticleLd = {
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: string
  description: string
  datePublished: string
  url: string
  image: string
  publisher: OrgPublisher
}

export function buildArticleJsonLd(
  siteUrl: string,
  input: { title: string; lede: string; slug: string; publishedAt: string },
): ArticleLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.lede,
    datePublished: input.publishedAt,
    url: `${siteUrl}/work/${input.slug}`,
    image: `${siteUrl}/api/og/work/${input.slug}`,
    publisher: publisher(siteUrl),
  }
}

export type BlogPostingLd = {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  headline: string
  description: string
  datePublished: string
  url: string
  image: string
  author: { '@type': 'Person'; name: string }
  publisher: OrgPublisher
}

export function buildBlogPostingJsonLd(
  siteUrl: string,
  input: {
    title: string
    subtitle: string
    slug: string
    publishedAt: string
    authorName: string
  },
): BlogPostingLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.subtitle,
    datePublished: input.publishedAt,
    url: `${siteUrl}/journal/${input.slug}`,
    image: `${siteUrl}/api/og/journal/${input.slug}`,
    author: { '@type': 'Person', name: input.authorName },
    publisher: publisher(siteUrl),
  }
}

export type FaqEntry = { question: string; answer: string }
export type FaqPageLd = {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: { '@type': 'Answer'; text: string }
  }>
}

export function buildFaqPageJsonLd(entries: FaqEntry[]): FaqPageLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  }
}
