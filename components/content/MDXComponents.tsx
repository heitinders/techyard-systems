import type { ComponentProps } from 'react'

// Styled mappings for MDX prose in case-study and journal bodies.
// Paired with a content container that sets measure (66ch case studies, 680px journal).
function H2(props: ComponentProps<'h2'>) {
  const { children, id, ...rest } = props
  const slug =
    id ??
    (typeof children === 'string'
      ? children
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      : undefined)
  return (
    <h2
      id={slug}
      className="mt-16 scroll-mt-24 font-serif text-[30px] font-medium leading-[1.15] tracking-[-0.018em] text-ink"
      {...rest}
    >
      {children}
    </h2>
  )
}

function H3(props: ComponentProps<'h3'>) {
  return (
    <h3
      className="mt-12 font-serif text-[22px] font-medium leading-[1.25] tracking-[-0.012em] text-ink"
      {...props}
    />
  )
}

function P(props: ComponentProps<'p'>) {
  return (
    <p
      className="mt-6 font-serif text-[18px] leading-[1.65] text-ink/85 first:mt-0"
      {...props}
    />
  )
}

function Blockquote(props: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className="my-10 border-l-2 border-accent pl-6 font-serif text-[22px] italic leading-[1.4] text-ink"
      {...props}
    />
  )
}

function UL(props: ComponentProps<'ul'>) {
  return (
    <ul
      className="mt-6 list-disc space-y-2 pl-6 font-serif text-[18px] leading-[1.65] text-ink/85 marker:text-accent"
      {...props}
    />
  )
}

function OL(props: ComponentProps<'ol'>) {
  return (
    <ol
      className="mt-6 list-decimal space-y-2 pl-6 font-serif text-[18px] leading-[1.65] text-ink/85 marker:text-accent"
      {...props}
    />
  )
}

function Strong(props: ComponentProps<'strong'>) {
  return <strong className="font-semibold text-ink" {...props} />
}

function Em(props: ComponentProps<'em'>) {
  return <em className="italic text-accent" {...props} />
}

function A(props: ComponentProps<'a'>) {
  return (
    <a
      className="border-b border-accent/40 text-accent transition-colors hover:border-accent"
      {...props}
    />
  )
}

function Pre(props: ComponentProps<'pre'>) {
  return (
    <pre
      className="my-8 overflow-x-auto rounded-[var(--r-md)] bg-ink-deep p-5 font-mono text-[14px] leading-[1.6] text-paper"
      {...props}
    />
  )
}

function Code(props: ComponentProps<'code'>) {
  return (
    <code
      className="rounded bg-rule px-1.5 py-0.5 font-mono text-[0.88em] text-ink"
      {...props}
    />
  )
}

function HR(props: ComponentProps<'hr'>) {
  return <hr className="my-12 border-t border-rule" {...props} />
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  blockquote: Blockquote,
  ul: UL,
  ol: OL,
  strong: Strong,
  em: Em,
  a: A,
  pre: Pre,
  code: Code,
  hr: HR,
}
