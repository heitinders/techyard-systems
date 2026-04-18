'use client'

import { useState } from 'react'

export function ContactSidebar() {
  const [loadCalendly, setLoadCalendly] = useState(false)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''

  return (
    <aside className="space-y-10">
      <div className="rounded-[var(--r-md)] bg-rule p-8">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Or book directly
        </div>
        <h2 className="font-serif text-[26px] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
          15 minutes. No slides.
        </h2>
        <p className="mt-4 max-w-[36ch] font-serif text-[15px] italic leading-[1.55] text-ink-muted">
          We&rsquo;ll ask what the problem is, where you&rsquo;ve tried to fix it, and whether a
          pilot makes sense.
        </p>

        {loadCalendly && calendlyUrl ? (
          <div className="mt-6 overflow-hidden rounded-[var(--r-sm)] border border-ink/10 bg-paper">
            <iframe
              src={calendlyUrl}
              title="Book a 15-min call via Calendly"
              className="h-[640px] w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setLoadCalendly(true)}
              className="mt-6 inline-flex items-center justify-center rounded-pill bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Book a 15-min call →
            </button>
            <p className="mt-4 text-[12px] leading-[1.5] text-ink-subtle">
              The scheduler loads only after you click — we don&rsquo;t set third-party cookies
              until then.
            </p>
          </>
        )}
      </div>

      <div className="rounded-[var(--r-md)] border border-rule p-7">
        <div className="mb-3 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Direct
        </div>
        <ul className="space-y-3 text-[15px] leading-[1.5]">
          <li>
            <a
              href="mailto:contactus@techyardsystems.com"
              className="border-b border-rule text-ink hover:border-accent"
            >
              contactus@techyardsystems.com
            </a>
          </li>
          <li className="text-ink-subtle">Response within one business day.</li>
          <li className="text-ink-subtle">Based in Canada · working worldwide.</li>
        </ul>
      </div>
    </aside>
  )
}
