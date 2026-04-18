import Link from 'next/link'
import { Button } from '@/components/primitives/Button'
import { MobileNav } from './MobileNav'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-transparent backdrop-blur-md transition-colors"
      style={{ background: 'rgba(241,237,228,0.88)' }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 md:px-10 lg:px-14"
      >
        <Link href="/" className="font-serif text-[22px] font-medium tracking-tight">
          Techyard Systems
        </Link>
        <ul className="hidden gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium hover:underline hover:underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button href="/contact" variant="primary">
            Book a call
          </Button>
        </div>
        <MobileNav links={links} />
      </nav>
    </header>
  )
}
