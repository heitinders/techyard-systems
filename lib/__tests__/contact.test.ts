import { describe, it, expect } from 'vitest'
import { parseContactForm } from '../contact'

function encode(obj: Record<string, string | string[]>): string {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      for (const item of v) params.append(k, item)
    } else {
      params.append(k, v)
    }
  }
  return params.toString()
}

describe('contactSchema / parseContactForm', () => {
  const valid = {
    name: 'Avery Chen',
    email: 'avery@acme.com',
    company: 'Acme',
    practices: ['support', 'sales'],
    message: 'We have 800 support tickets per day and our team is drowning.',
    website: '',
    _t: String(Date.now() - 5000),
  }

  it('accepts a fully valid submission', () => {
    const result = parseContactForm(encode(valid))
    expect(result.kind).toBe('ok')
  })

  it('rejects missing email with field error', () => {
    const r = parseContactForm(encode({ ...valid, email: '' }))
    expect(r.kind).toBe('validation')
    if (r.kind === 'validation') expect(r.fieldErrors.email).toBeDefined()
  })

  it('rejects invalid email format', () => {
    const r = parseContactForm(encode({ ...valid, email: 'not-an-email' }))
    expect(r.kind).toBe('validation')
  })

  it('silently succeeds when honeypot is filled (bot)', () => {
    const r = parseContactForm(encode({ ...valid, website: 'http://spam' }))
    expect(r.kind).toBe('bot')
  })

  it('silently succeeds when submit is too fast (bot)', () => {
    const r = parseContactForm(encode({ ...valid, _t: String(Date.now() - 500) }))
    expect(r.kind).toBe('bot')
  })

  it('requires at least one practice chip', () => {
    const r = parseContactForm(encode({ ...valid, practices: [] }))
    expect(r.kind).toBe('validation')
  })

  it('rejects an over-long message', () => {
    const long = 'x'.repeat(5000)
    const r = parseContactForm(encode({ ...valid, message: long }))
    expect(r.kind).toBe('validation')
  })
})
