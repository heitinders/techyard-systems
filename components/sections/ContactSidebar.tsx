'use client'

import { useState } from 'react'

const CALENDLY_DEFAULT = 'https://calendly.com/rubal-techyardsystems/15-min-quick-query-call'
const PHONE_DISPLAY = '+1 (661) 488-0808'
const PHONE_TEL = '+16614880808'

export function ContactSidebar() {
  const [loadCalendly, setLoadCalendly] = useState(false)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? CALENDLY_DEFAULT

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

        {loadCalendly ? (
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
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-pill bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 active:translate-y-0"
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
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[2px] text-ink-subtle">
          Direct
        </div>
        <dl className="space-y-5 text-[15px] leading-[1.5]">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
              Phone
            </dt>
            <dd className="mt-1">
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-serif text-[18px] text-ink transition-colors hover:text-accent"
              >
                {PHONE_DISPLAY}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
              Email
            </dt>
            <dd className="mt-1">
              <a
                href="mailto:contactus@techyardsystems.com"
                className="border-b border-rule text-ink transition-colors hover:border-accent hover:text-accent"
              >
                contactus@techyardsystems.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
              Hours
            </dt>
            <dd className="mt-1 text-ink-muted">Mon–Fri · 9 am – 6 pm PST</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
              Based
            </dt>
            <dd className="mt-1 text-ink-muted">Valencia, CA · global clients.</dd>
          </div>
        </dl>
      </div>
    </aside>
  )
}
