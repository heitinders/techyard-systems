import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders primary variant by default', () => {
    render(<Button>Book a call</Button>)
    const btn = screen.getByRole('button', { name: 'Book a call' })
    expect(btn).toHaveClass('bg-ink')
  })

  it('renders secondary variant with bordered style', () => {
    render(<Button variant="secondary">See work</Button>)
    const btn = screen.getByRole('button', { name: 'See work' })
    expect(btn).toHaveClass('border-ink')
    expect(btn).not.toHaveClass('bg-ink')
  })

  it('renders ghost variant with no border', () => {
    render(<Button variant="ghost">Learn more</Button>)
    const btn = screen.getByRole('button', { name: 'Learn more' })
    expect(btn).not.toHaveClass('border-ink')
    expect(btn).toHaveClass('underline-offset-4')
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/contact">Contact</Button>)
    const link = screen.getByRole('link', { name: 'Contact' })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
