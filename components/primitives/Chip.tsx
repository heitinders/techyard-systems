'use client'

import type { ReactNode, KeyboardEvent } from 'react'

type Props = {
  selected: boolean
  onToggle: () => void
  children: ReactNode
}

export function Chip({ selected, onToggle, children }: Props) {
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      onKeyDown={onKey}
      className={
        selected
          ? 'inline-flex min-h-[36px] items-center rounded-pill border border-accent bg-accent px-4 py-2 text-sm font-medium text-paper transition-colors'
          : 'inline-flex min-h-[36px] items-center rounded-pill border border-rule bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink'
      }
    >
      {children}
    </button>
  )
}
