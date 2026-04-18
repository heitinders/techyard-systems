import { Resend } from 'resend'
import type { ContactInput } from './contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmails(input: ContactInput): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!from || !to) {
    throw new Error('Resend env not configured (RESEND_FROM_EMAIL, CONTACT_TO_EMAIL)')
  }

  const admin = resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `New inquiry from ${input.company} — ${input.practices.join(', ')}`,
    text: adminEmailText(input),
  })

  const confirm = resend.emails.send({
    from,
    to: input.email,
    subject: 'We got your note — Techyard Systems',
    text: confirmationEmailText(input),
  })

  const [a, c] = await Promise.allSettled([admin, confirm])
  if (a.status === 'rejected' || c.status === 'rejected') {
    throw new Error(`Resend delivery failed. admin=${a.status} confirm=${c.status}`)
  }
}

function adminEmailText(i: ContactInput): string {
  return (
    `Name: ${i.name}\n` +
    `Email: ${i.email}\n` +
    `Company: ${i.company}\n` +
    `Practices: ${i.practices.join(', ')}\n\n` +
    `${i.message}\n`
  )
}

function confirmationEmailText(i: ContactInput): string {
  const firstName = i.name.split(/\s+/)[0] ?? i.name
  return (
    `Hi ${firstName},\n\n` +
    `Thanks for writing to Techyard Systems. We read every message and will ` +
    `reply within one business day.\n\n` +
    `You wrote:\n\n${i.message}\n\n` +
    `— Techyard Systems\n`
  )
}
