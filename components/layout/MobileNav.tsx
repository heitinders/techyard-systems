'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useState } from 'react'

type Props = { links: { href: string; label: string }[] }

export function MobileNav({ links }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Open navigation menu" className="rounded-pill border border-ink px-3 py-2 text-sm md:hidden">
          Menu
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40" />
        <Dialog.Content className="fixed inset-0 z-[70] flex flex-col bg-paper p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-serif text-[22px] font-medium">Techyard Systems</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close menu" className="rounded-pill border border-ink px-3 py-2 text-sm">
                Close
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Primary mobile" className="mt-12 flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-3xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 inline-flex w-fit rounded-pill bg-ink px-6 py-3 text-paper"
              onClick={() => setOpen(false)}
            >
              Book a call
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
