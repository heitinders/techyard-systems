import { z } from 'zod'
import { practices } from '@/content/taxonomies'

export const contactSchema = z.object({
  name: z.string().min(1, 'Please tell us your name').max(120),
  email: z.email("That doesn't look like a valid email"),
  company: z.string().min(1, 'Please tell us your company').max(120),
  practices: z
    .array(z.enum(practices))
    .min(1, "Pick at least one practice you're curious about"),
  message: z
    .string()
    .min(1, 'Even one sentence is plenty')
    .max(3000, 'Please keep it under 3000 characters'),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ParseResult =
  | { kind: 'ok'; data: ContactInput }
  | { kind: 'bot' }
  | { kind: 'validation'; fieldErrors: Record<string, string> }

const MIN_SUBMIT_MS = 1500

export function parseContactForm(body: string): ParseResult {
  const params = new URLSearchParams(body)

  const honeypot = params.get('website')
  if (honeypot && honeypot.trim() !== '') return { kind: 'bot' }

  const t = Number(params.get('_t') ?? 0)
  if (!t || Date.now() - t < MIN_SUBMIT_MS) return { kind: 'bot' }

  const practicesRaw = params.getAll('practices').filter((p) => p !== '')
  const parsed = contactSchema.safeParse({
    name: params.get('name') ?? '',
    email: params.get('email') ?? '',
    company: params.get('company') ?? '',
    practices: practicesRaw,
    message: params.get('message') ?? '',
  })

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '_form')
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { kind: 'validation', fieldErrors }
  }
  return { kind: 'ok', data: parsed.data }
}
