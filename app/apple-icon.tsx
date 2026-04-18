import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Apple touch icon. Next.js auto-wires this as <link rel="apple-touch-icon">.
// Paper-cream background with the brand monogram centered; sage-tinted
// gradients on the TY glyph match the rest of the brand (not the original
// blue palette from the uploaded logo).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f1ede4',
          borderRadius: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="132" height="110" viewBox="0 0 174 145" fill="none">
          <defs>
            <linearGradient id="a" x1="0" y1="88" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4a6152" />
              <stop offset="1" stopColor="#1a1d18" />
            </linearGradient>
            <linearGradient id="b" x1="153" y1="4" x2="80" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1a1d18" />
              <stop offset="1" stopColor="#4a6152" />
            </linearGradient>
          </defs>
          <path
            d="M83.76 141.28C83.76 143.34 82.1 145 80.04 145L53.38 145C51.33 145 49.66 143.34 49.66 141.28V83.12C49.66 81.06 48 79.4 45.94 79.4H3.72C1.67 79.4 0 77.73 0 75.68V50.66C0 48.6 1.67 46.94 3.72 46.94H80.04C82.1 46.94 83.76 48.6 83.76 50.66V141.28Z"
            fill="url(#a)"
          />
          <path
            d="M70.33 37.43C70.33 36.32 70.82 35.28 71.67 34.57L112.25 0.86C112.92 0.3 113.76 0 114.63 0H163.26C166.79 0 168.34 4.44 165.58 6.63L110.95 50.05C110.07 50.75 109.55 51.83 109.55 52.96V119.72C109.55 121.77 107.88 123.44 105.83 123.44H74.05C72 123.44 70.33 121.77 70.33 119.72V37.43Z"
            fill="url(#b)"
          />
        </svg>
      </div>
    ),
    size,
  )
}
