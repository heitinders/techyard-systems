import type { ComponentProps } from 'react'

type Tone = 'paper' | 'ink' | 'flax' | 'obsidian'

const toneClasses: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
  flax: 'bg-rule text-ink',
  obsidian: 'bg-ink-deep text-paper',
}

type Props = ComponentProps<'section'> & { tone?: Tone }

export function Section({ tone = 'paper', className, ...props }: Props) {
  return (
    <section
      className={`${toneClasses[tone]} py-[var(--space-section)] ${className ?? ''}`}
      {...props}
    />
  )
}
