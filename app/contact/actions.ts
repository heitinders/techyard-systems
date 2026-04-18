'use server'

import { parseContactForm } from '@/lib/contact'
import { sendContactEmails } from '@/lib/resend'

export type ActionState =
  | { ok: false; kind: 'idle' }
  | { ok: true }
  | { ok: false; kind: 'validation'; fieldErrors: Record<string, string> }
  | { ok: false; kind: 'delivery' }

export async function submitContactForm(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const body = new URLSearchParams()
  for (const [k, v] of formData.entries()) {
    if (typeof v === 'string') body.append(k, v)
  }

  const parsed = parseContactForm(body.toString())
  if (parsed.kind === 'validation') {
    return { ok: false, kind: 'validation', fieldErrors: parsed.fieldErrors }
  }
  if (parsed.kind === 'bot') return { ok: true } // silent success

  try {
    await sendContactEmails(parsed.data)
    return { ok: true }
  } catch (err) {
    console.error('[contact] delivery failed', err)
    return { ok: false, kind: 'delivery' }
  }
}
