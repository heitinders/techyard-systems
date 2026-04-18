import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  num?: string
  width?: number
  tone?: 'accent' | 'paper'
  className?: string
}

// Editorial eyebrow: optional monospace "№" number, a sage rule line, then the
// small caps eyebrow text. Used as the opening signal on every major section.
export function EyebrowLine({ children, num, width = 40, tone = 'accent', className }: Props) {
  const numColor = tone === 'paper' ? 'text-paper/55' : 'text-ink-subtle'
  const ruleColor = tone === 'paper' ? 'bg-accent-paper' : 'bg-accent'
  const textColor = tone === 'paper' ? 'text-accent-paper' : 'text-accent'
  return (
    <div className={`inline-flex items-center gap-3.5 ${className ?? ''}`}>
      {num ? (
        <span className={`font-mono text-[11px] ${numColor}`}>{num}</span>
      ) : null}
      <span
        aria-hidden="true"
        className={`inline-block h-px ${ruleColor}`}
        style={{ width }}
      />
      <span
        className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${textColor}`}
      >
        {children}
      </span>
    </div>
  )
}
