import type { Metadata } from 'next'
import { newsreader, spaceGrotesk, jetbrainsMono } from './fonts'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { buildOrganizationJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/content/JsonLd'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: { default: 'Techyard Systems', template: '%s — Techyard Systems' },
  description:
    'Techyard Systems designs and ships custom AI agents for support, sales, and operations. 5× ROI at 20% less than DIY.',
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = buildOrganizationJsonLd(SITE_URL)
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col font-sans text-[17px] leading-[1.6] text-ink antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={orgLd} />
      </body>
    </html>
  )
}
