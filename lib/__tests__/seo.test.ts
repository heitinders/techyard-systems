import { describe, it, expect } from 'vitest'
import {
  buildOrganizationJsonLd,
  buildArticleJsonLd,
  buildBlogPostingJsonLd,
  buildFaqPageJsonLd,
} from '../seo'

const SITE = 'https://techyardsystems.com'

describe('buildOrganizationJsonLd', () => {
  it('returns @context + @type Organization', () => {
    const ld = buildOrganizationJsonLd(SITE)
    expect(ld['@context']).toBe('https://schema.org')
    expect(ld['@type']).toBe('Organization')
    expect(ld.url).toBe(SITE)
    expect(ld.name).toBe('Techyard Systems')
  })
})

describe('buildArticleJsonLd (case study)', () => {
  it('returns Article with headline, datePublished, image, url', () => {
    const ld = buildArticleJsonLd(SITE, {
      title: 'A freight brokerage stopped watching dashboards.',
      lede: 'lede',
      slug: 'freight-monitoring',
      publishedAt: '2026-03-20',
    })
    expect(ld['@type']).toBe('Article')
    expect(ld.headline).toMatch(/freight/i)
    expect(ld.datePublished).toBe('2026-03-20')
    expect(ld.url).toBe(`${SITE}/work/freight-monitoring`)
    expect(ld.image).toBe(`${SITE}/api/og/work/freight-monitoring`)
    expect(ld.publisher['@type']).toBe('Organization')
  })
})

describe('buildBlogPostingJsonLd (journal)', () => {
  it('returns BlogPosting with author Person', () => {
    const ld = buildBlogPostingJsonLd(SITE, {
      title: 'Measuring outcomes without measuring wrong.',
      subtitle: 'x',
      slug: 'measuring-outcomes',
      publishedAt: '2026-01-31',
      authorName: 'Kirat Singh',
    })
    expect(ld['@type']).toBe('BlogPosting')
    expect(ld.author['@type']).toBe('Person')
    expect(ld.author.name).toBe('Kirat Singh')
    expect(ld.url).toBe(`${SITE}/journal/measuring-outcomes`)
  })
})

describe('buildFaqPageJsonLd (security)', () => {
  it('returns FAQPage with mainEntity Question[] + Answer', () => {
    const ld = buildFaqPageJsonLd([
      { question: 'Where does my data go?', answer: 'Your own infrastructure.' },
      { question: 'Do you train on our data?', answer: 'No, never.' },
    ])
    expect(ld['@type']).toBe('FAQPage')
    expect(ld.mainEntity).toHaveLength(2)
    const [first] = ld.mainEntity
    if (!first) throw new Error('expected first FAQ entry')
    expect(first['@type']).toBe('Question')
    expect(first.acceptedAnswer['@type']).toBe('Answer')
    expect(first.name).toBe('Where does my data go?')
  })
})
