'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { securityFAQ } from '@/content/security-faq'

export function SecurityFAQ() {
  return (
    <Accordion.Root type="multiple" className="flex flex-col">
      {securityFAQ.map((item, i) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className={`border-t border-rule py-1 ${
            i === securityFAQ.length - 1 ? 'border-b' : ''
          }`}
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left">
              <span className="font-serif text-[22px] font-medium leading-[1.25] tracking-[-0.01em]">
                {item.question}
              </span>
              <span
                aria-hidden
                className="shrink-0 font-mono text-[22px] text-accent transition-transform group-data-[state=open]:rotate-45"
              >
                +
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_180ms] data-[state=open]:animate-[accordion-down_180ms]">
            <p className="max-w-[66ch] pb-6 text-[15px] leading-[1.6] text-ink-muted">
              {item.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
