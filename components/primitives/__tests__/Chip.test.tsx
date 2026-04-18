import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Chip } from '../Chip'

describe('Chip', () => {
  it('renders with role=checkbox and aria-checked=false by default', () => {
    render(<Chip selected={false} onToggle={() => {}}>Support</Chip>)
    const chip = screen.getByRole('checkbox', { name: 'Support' })
    expect(chip).toHaveAttribute('aria-checked', 'false')
  })

  it('reflects selected state via aria-checked=true', () => {
    render(<Chip selected={true} onToggle={() => {}}>Support</Chip>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onToggle when clicked', () => {
    const toggle = vi.fn()
    render(<Chip selected={false} onToggle={toggle}>Support</Chip>)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(toggle).toHaveBeenCalledTimes(1)
  })

  it('calls onToggle on Space key', () => {
    const toggle = vi.fn()
    render(<Chip selected={false} onToggle={toggle}>Support</Chip>)
    const chip = screen.getByRole('checkbox')
    chip.focus()
    fireEvent.keyDown(chip, { key: ' ' })
    expect(toggle).toHaveBeenCalledTimes(1)
  })
})
