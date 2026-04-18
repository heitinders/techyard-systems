import Link from 'next/link'

const practice = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
]
const company = [
  { href: '/contact', label: 'Contact' },
  { href: '/security', label: 'Security' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-deep px-6 py-20 text-paper md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1180px] gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/SVG/Dark%20BG.svg"
            alt="Techyard Systems"
            width={104}
            height={40}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-[32ch] font-serif text-base italic text-paper/60">
            An autonomous-systems practice. We build AI agents that run the work you'd rather
            not hire for.
          </p>
        </div>
        <FooterColumn title="Practice" links={practice} />
        <FooterColumn title="Company" links={company} />
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[2px] text-paper/40">
            Get in touch
          </div>
          <ul className="flex flex-col gap-3 text-sm text-paper/85">
            <li>
              <a href="mailto:contactus@techyardsystems.com" className="hover:underline">
                contactus@techyardsystems.com
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Book a 15-min call →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[1180px] border-t border-paper/10 pt-6">
        <div className="flex justify-between font-mono text-xs text-paper/50">
          <span>© {year} Techyard Systems</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-5 text-[11px] uppercase tracking-[2px] text-paper/40">{title}</div>
      <ul className="flex flex-col gap-3 text-sm text-paper/85">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
