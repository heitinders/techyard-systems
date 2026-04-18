// SVG glyphs for integration nodes in the OrchestrationCore and
// LiveTasksStrip. Stroke/fill colors mimic each partner's brand glyph
// so eight nodes read distinct at a glance without overriding the
// site's single-accent chrome rule (those muted tones stay inside the
// SVGs only).
export type IntegrationKind =
  | 'whatsapp'
  | 'gohighlevel'
  | 'email'
  | 'slack'
  | 'calendar'
  | 'erp'
  | 'quickbooks'
  | 'sales'

const COLORS = {
  sage: '#4a6152',
  rust: '#c26a3f',
  sky: '#3d5a6c',
  clay: '#8a5a3f',
  ink: '#2a2f26',
} as const

export function IntegrationIcon({
  kind,
  size = 20,
}: {
  kind: IntegrationKind
  size?: number
}) {
  const common = { width: size, height: size, 'aria-hidden': true } as const
  switch (kind) {
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M20 12a8 8 0 1 1-3.2-6.4L20 4l-1.2 3.6A8 8 0 0 1 20 12z"
            fill="none"
            stroke={COLORS.sage}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9 10c.5 3 2 4.5 5 5l1.5-1.5-2-1-1 .6c-1-.4-1.8-1.2-2.2-2.2l.6-1-1-2z"
            fill={COLORS.sage}
          />
        </svg>
      )
    case 'gohighlevel':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke={COLORS.rust} strokeWidth="1.6" />
          <path
            d="M8 16V9h2v3h4V9h2v7"
            stroke={COLORS.rust}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'email':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke={COLORS.sage} strokeWidth="1.6" />
          <path d="M3 7l9 6 9-6" fill="none" stroke={COLORS.sage} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="9" width="11" height="3" rx="1.5" fill={COLORS.rust} />
          <rect x="9" y="4" width="3" height="11" rx="1.5" fill={COLORS.sage} />
          <rect x="9" y="12" width="11" height="3" rx="1.5" fill={COLORS.clay} />
          <rect x="12" y="9" width="3" height="11" rx="1.5" fill={COLORS.sky} />
        </svg>
      )
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke={COLORS.sky} strokeWidth="1.6" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke={COLORS.sky} strokeWidth="1.6" strokeLinecap="round" />
          <rect x="7" y="13" width="3" height="3" rx="0.5" fill={COLORS.sky} />
        </svg>
      )
    case 'erp':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="7" width="18" height="12" rx="1.5" fill="none" stroke={COLORS.ink} strokeWidth="1.6" />
          <path
            d="M3 11h18M8 7V4h8v3M8 15h3M14 15h3"
            stroke={COLORS.ink}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'quickbooks':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="8.5" fill="none" stroke={COLORS.sage} strokeWidth="1.8" />
          <path
            d="M9 8v8h3a3 3 0 0 0 0-6M15 16V8h-3a3 3 0 0 0 0 6"
            stroke={COLORS.sage}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'sales':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M4 18l5-6 4 3 7-9"
            fill="none"
            stroke={COLORS.rust}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 6h6v6"
            fill="none"
            stroke={COLORS.rust}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
