import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// React dev mode needs code-eval for stack reconstruction; Next HMR
// needs it for module injection. React never uses it in production
// (documented behavior), so we scope 'unsafe-eval' to NODE_ENV=dev.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  'plausible.io',
].join(' ')

// connect-src needs ws/wss + localhost for HMR in dev only.
const connectSrc = [
  "'self'",
  ...(isDev ? ['ws:', 'wss:', 'http://localhost:*'] : []),
  'plausible.io',
].join(' ')

const cspDirectives = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  `connect-src ${connectSrc}`,
  "frame-src calendly.com *.calendly.com",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy', value: cspDirectives },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return [
      {
        source: '/case-studies/:path*',
        destination: '/work/:path*',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/journal/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
