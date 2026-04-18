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
        <Link
          href="/"
          aria-label="Techyard Systems — home"
          className="flex items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/SVG/Light%20BG.svg"
            alt="Techyard Systems"
            width={83}
            height={32}
            className="h-8 w-auto"
          />
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
