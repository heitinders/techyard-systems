import { Newsreader, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
  adjustFontFallback: true,
  preload: true,
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: true,
  preload: false,
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
  adjustFontFallback: true,
  preload: false,
})
