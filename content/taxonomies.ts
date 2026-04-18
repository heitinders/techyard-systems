import { z } from 'zod'

export const industries = [
  'logistics',
  'financial',
  'healthcare',
  'saas',
  'ecommerce',
  'pro-services',
  'government',
  'manufacturing',
] as const

export const practices = ['support', 'sales', 'it-hr', 'data', 'ops'] as const

export const categories = ['Field notes', 'Opinion', 'Notes', 'Fieldwork'] as const

export type Industry = (typeof industries)[number]
export type Practice = (typeof practices)[number]
export type Category = (typeof categories)[number]

export const industryLabels: Record<Industry, string> = {
  logistics: 'Logistics & Freight',
  financial: 'Financial Services',
  healthcare: 'Healthcare Ops',
  saas: 'SaaS Support',
  ecommerce: 'E-commerce',
  'pro-services': 'Professional Services',
  government: 'Government & Civic',
  manufacturing: 'Manufacturing',
}

export const practiceLabels: Record<Practice, string> = {
  support: 'Customer support automation',
  sales: 'Sales lead generation & follow-up',
  'it-hr': 'IT & HR request management',
  data: 'Data analysis & reporting',
  ops: 'Operations & logistics monitoring',
}

export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string().min(1, 'alt text is required for content images'),
  width: z.number(),
  height: z.number(),
  caption: z.string().optional(),
})

export type Image = z.infer<typeof ImageSchema>
