import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type CommonProps = {
  variant?: Variant
  children: ReactNode
  className?: string
}

type ButtonProps = CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: never }
type LinkProps = CommonProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'> & { href: string }

const base =
  'inline-flex min-h-[44px] items-center justify-center rounded-pill px-6 py-3.5 text-sm font-medium transition-[transform,background-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out-quart)]'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink underline underline-offset-4 hover:decoration-2',
}

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', children, className, ...rest } = props
  const cn = `${base} ${variants[variant]} ${className ?? ''}`.trim()

  if ('href' in rest && rest.href) {
    return (
      <Link className={cn} {...(rest as LinkProps)}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cn} {...(rest as ButtonProps)}>
      {children}
    </button>
  )
}
