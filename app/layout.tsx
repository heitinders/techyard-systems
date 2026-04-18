import type { Metadata } from 'next'
import { newsreader, spaceGrotesk, jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Techyard Systems', template: '%s — Techyard Systems' },
  description:
    'Techyard Systems designs and ships custom AI agents for support, sales, and operations. 5× ROI at 20% less than DIY.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans text-[17px] leading-[1.6] text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
