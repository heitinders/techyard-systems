import { defineConfig, s } from 'velite'
import { industries, practices, categories } from './content/taxonomies'

const ImageSchema = s.object({
  src: s.string(),
  alt: s.string().min(1, 'alt text is required for content images'),
  width: s.number(),
  height: s.number(),
  caption: s.string().optional(),
})

const OutcomeSchema = s.object({
  eyebrow: s.string(),
  value: s.string(),
  valueAccent: s.string(),
  note: s.string(),
})

const caseStudy = {
  name: 'CaseStudy',
  pattern: 'case-studies/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('case-studies'),
      number: s.string(),
      clientName: s.string(),
      clientDisclosed: s.boolean(),
      industry: s.enum(industries),
      practice: s.enum(practices),
      engagementWeeks: s.number().int().positive(),
      engagementType: s.enum(['fixed fee', 'pilot', 'retainer']),
      publishedAt: s.isodate(),
      title: s.string(),
      titleAccent: s.string(),
      lede: s.string(),
      pullQuote: s.string().nullable(),
      pullAttribution: s.string().nullable(),
      outcomes: s.union([
        s.tuple([OutcomeSchema, OutcomeSchema, OutcomeSchema]),
        s.tuple([OutcomeSchema]),
      ]),
      featured: s.boolean(),
      nextSlug: s.string().nullable(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/work/${data.slug}` })),
}

const journalPost = {
  name: 'JournalPost',
  pattern: 'journal/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('journal'),
      number: s.string(),
      category: s.enum(categories),
      title: s.string(),
      titleAccent: s.string(),
      subtitle: s.string(),
      publishedAt: s.isodate(),
      readingMinutes: s.number().int().positive(),
      author: s.object({
        name: s.string(),
        role: s.string(),
        avatar: ImageSchema,
      }),
      featureImage: ImageSchema.nullable(),
      relatedSlugs: s.array(s.string()).nullable(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/journal/${data.slug}` })),
}

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { caseStudies: caseStudy, journalPosts: journalPost },
})
