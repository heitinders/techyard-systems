import type { ComponentProps } from 'react'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1180px] px-6 md:px-10 lg:px-14 ${className ?? ''}`}
      {...props}
    />
  )
}
