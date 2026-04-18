'use client'

import { useActionState, useEffect, useMemo, useState } from 'react'
import { Chip } from '@/components/primitives/Chip'
import { practices, practiceLabels, type Practice } from '@/content/taxonomies'
import { submitContactForm, type ActionState } from '@/app/contact/actions'

const INITIAL: ActionState = { ok: false, kind: 'idle' }

function errorFor(state: ActionState, field: string): string | undefined {
  if (state.ok === false && state.kind === 'validation') return state.fieldErrors[field]
  return undefined
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-[13px] text-accent">
      {message}
    </p>
  )
}

function mailtoFallback(
  name: string,
  email: string,
  company: string,
  message: string,
): string {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    '',
    message,
  ].join('\n')
  const params = new URLSearchParams({
    subject: `Inquiry from ${company || name || 'you'}`,
    body,
  })
  return `mailto:contactus@techyardsystems.com?${params.toString()}`
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, INITIAL)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState<Set<Practice>>(new Set())

  // Timing anti-bot — set when the form mounts on the client.
  const mountedAt = useMemo(() => Date.now(), [])

  const togglePractice = (p: Practice) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  // Scroll error into view on validation.
  useEffect(() => {
    if (state.ok === false && state.kind === 'validation') {
      const first = Object.keys(state.fieldErrors)[0]
      if (first) {
        const el = document.getElementById(`field-${first}`)
        el?.focus()
      }
    }
  }, [state])

  if (state.ok) {
    return (
      <div className="rounded-[var(--r-md)] border border-rule bg-paper-raised p-10">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[2px] text-accent">
          Thank you
        </div>
        <h2 className="font-serif text-[32px] font-medium leading-[1.15] tracking-[-0.018em] text-ink">
          We got your note.
        </h2>
        <p className="mt-5 max-w-[44ch] font-serif text-[18px] italic leading-[1.55] text-ink-muted">
          We read every message. You&rsquo;ll hear from us within one business day — check your
          inbox for a confirmation in the meantime.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      <input type="hidden" name="_t" value={mountedAt} />
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto">
        <label>
          Website (leave blank)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="field-name" className="block text-[12px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
            Name
          </label>
          <input
            id="field-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errorFor(state, 'name'))}
            aria-describedby={errorFor(state, 'name') ? 'err-name' : undefined}
            className="mt-2 w-full rounded-[var(--r-sm)] border border-rule bg-paper-raised px-4 py-3 text-[16px] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
          />
          <FieldError id="err-name" message={errorFor(state, 'name')} />
        </div>

        <div>
          <label htmlFor="field-email" className="block text-[12px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
            Email
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errorFor(state, 'email'))}
            aria-describedby={errorFor(state, 'email') ? 'err-email' : undefined}
            className="mt-2 w-full rounded-[var(--r-sm)] border border-rule bg-paper-raised px-4 py-3 text-[16px] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
          />
          <FieldError id="err-email" message={errorFor(state, 'email')} />
        </div>
      </div>

      <div>
        <label htmlFor="field-company" className="block text-[12px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
          Company
        </label>
        <input
          id="field-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-invalid={Boolean(errorFor(state, 'company'))}
          aria-describedby={errorFor(state, 'company') ? 'err-company' : undefined}
          className="mt-2 w-full rounded-[var(--r-sm)] border border-rule bg-paper-raised px-4 py-3 text-[16px] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
        />
        <FieldError id="err-company" message={errorFor(state, 'company')} />
      </div>

      <fieldset>
        <legend id="practice-legend" className="block text-[12px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
          Which practice are you curious about?
        </legend>
        <div role="group" aria-labelledby="practice-legend" className="mt-3 flex flex-wrap gap-2">
          {practices.map((p) => (
            <Chip
              key={p}
              selected={selected.has(p)}
              onToggle={() => togglePractice(p)}
            >
              {practiceLabels[p]}
            </Chip>
          ))}
        </div>
        {/* Submit selected practices as repeated hidden fields */}
        {Array.from(selected).map((p) => (
          <input key={p} type="hidden" name="practices" value={p} />
        ))}
        <FieldError id="err-practices" message={errorFor(state, 'practices')} />
      </fieldset>

      <div>
        <label htmlFor="field-message" className="block text-[12px] font-medium uppercase tracking-[1.8px] text-ink-subtle">
          What&rsquo;s the problem you&rsquo;re trying to solve?
        </label>
        <textarea
          id="field-message"
          name="message"
          required
          rows={6}
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errorFor(state, 'message'))}
          aria-describedby={errorFor(state, 'message') ? 'err-message' : undefined}
          className="mt-2 w-full resize-y rounded-[var(--r-sm)] border border-rule bg-paper-raised px-4 py-3 font-serif text-[17px] leading-[1.55] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none"
          placeholder="A paragraph is plenty. More is fine."
        />
        <FieldError id="err-message" message={errorFor(state, 'message')} />
      </div>

      {state.ok === false && state.kind === 'delivery' && (
        <div className="rounded-[var(--r-md)] border border-accent/40 bg-accent/5 p-5 text-[14px] leading-[1.55] text-ink">
          Something went wrong on our end.{' '}
          <a
            href={mailtoFallback(name, email, company, message)}
            className="border-b border-accent text-accent"
          >
            Write to contactus@techyardsystems.com instead
          </a>{' '}
          — we&rsquo;ve pre-filled your message.
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-pill bg-ink px-7 py-3 text-sm font-medium text-paper transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isPending ? 'Sending…' : 'Send the note'}
      </button>
    </form>
  )
}
