import { ImageResponse } from 'next/og'
import { caseStudies, journalPosts } from '#site/content'

export const runtime = 'edge'

type Kind = 'home' | 'work' | 'journal'
type Entity = { kind: Kind; title: string; subtitle?: string; eyebrow?: string }

function resolve(segments: string[] | undefined): Entity {
  const [kind, slug] = segments ?? []
  if (kind === 'work') {
    const cs = caseStudies.find((c) => c.slug === slug)
    if (cs) {
      return {
        kind: 'work',
        title: cs.title,
        subtitle: cs.lede,
        eyebrow: `Case study · ${cs.number}`,
      }
    }
  }
  if (kind === 'journal') {
    const post = journalPosts.find((p) => p.slug === slug)
    if (post) {
      return {
        kind: 'journal',
        title: post.title,
        subtitle: post.subtitle,
        eyebrow: `Journal · ${post.category}`,
      }
    }
  }
  return {
    kind: 'home',
    title: 'Agents that actually work.',
    subtitle: 'Custom AI agents for support, sales, and operations.',
    eyebrow: 'Techyard Systems',
  }
}

// Eight compass positions matching OrchestrationCore. Precomputed so Satori
// doesn't need to run Math.cos/sin — numbers inline = deterministic SVG.
const NODES = [
  { angle: -90, cx: 270, cy: 94, label: 'WhatsApp' },
  { angle: -45, cx: 394.5, cy: 145.5, label: 'Email' },
  { angle: 0, cx: 446, cy: 270, label: 'Sales CRM' },
  { angle: 45, cx: 394.5, cy: 394.5, label: 'GoHighLevel' },
  { angle: 90, cx: 270, cy: 446, label: 'Slack' },
  { angle: 135, cx: 145.5, cy: 394.5, label: 'Calendar' },
  { angle: 180, cx: 94, cy: 270, label: 'ERP' },
  { angle: 225, cx: 145.5, cy: 145.5, label: 'QuickBooks' },
] as const

function HomeCard({ title }: { title: string }) {
  const active = NODES[0] // WhatsApp is the illuminated spoke in the frozen snapshot

  return (
    <div
      style={{
        background: '#f1ede4',
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: 'serif',
      }}
    >
      {/* Left: typographic column */}
      <div
        style={{
          width: 520,
          padding: '64px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#4a6152',
            fontFamily: 'sans-serif',
          }}
        >
          Techyard Systems
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 0.96,
              letterSpacing: -2.2,
              color: '#1a1d18',
              fontWeight: 500,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Agents that</span>
            <span>
              actually{' '}
              <span style={{ color: '#4a6152', fontStyle: 'italic', fontWeight: 400 }}>
                work.
              </span>
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#5e6459',
              fontStyle: 'italic',
              lineHeight: 1.35,
              maxWidth: 440,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 16,
            color: '#4a6152',
            fontFamily: 'sans-serif',
            letterSpacing: 0.4,
          }}
        >
          techyardsystems.com
        </div>
      </div>

      {/* Right: orchestration diagram */}
      <div
        style={{
          width: 680,
          height: 630,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="540" height="540" viewBox="0 0 540 540">
          <defs>
            <radialGradient id="og-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a6152" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#4a6152" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#4a6152" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Atmospheric glow */}
          <circle cx="270" cy="270" r="210" fill="url(#og-glow)" />

          {/* Three orbit rings */}
          <circle
            cx="270"
            cy="270"
            r="150"
            fill="none"
            stroke="#d8cfbe"
            strokeWidth="0.9"
            strokeDasharray="2 5"
          />
          <circle cx="270" cy="270" r="176" fill="none" stroke="#c6bba6" strokeWidth="1.2" />
          <circle
            cx="270"
            cy="270"
            r="204"
            fill="none"
            stroke="#d8cfbe"
            strokeWidth="0.9"
            strokeDasharray="2 5"
          />

          {/* 24 compass tick marks on the innermost ring */}
          {Array.from({ length: 24 }, (_, k) => {
            // Pre-rotated tick starting from top
            const t = (k * 15 * Math.PI) / 180 - Math.PI / 2
            const r1 = 147
            const r2 = 151
            const x1 = +(270 + r1 * Math.cos(t)).toFixed(2)
            const y1 = +(270 + r1 * Math.sin(t)).toFixed(2)
            const x2 = +(270 + r2 * Math.cos(t)).toFixed(2)
            const y2 = +(270 + r2 * Math.sin(t)).toFixed(2)
            return (
              <line
                key={k}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#c6bba6"
                strokeWidth="0.8"
              />
            )
          })}

          {/* Spokes — active one drawn last for stacking on top */}
          {NODES.map((n) =>
            n.angle === active.angle ? null : (
              <line
                key={n.angle}
                x1={270}
                y1={270}
                x2={n.cx}
                y2={n.cy}
                stroke="#c6bba6"
                strokeWidth="1"
                opacity="0.7"
              />
            ),
          )}
          <line
            x1={270}
            y1={270}
            x2={active.cx}
            y2={active.cy}
            stroke="#4a6152"
            strokeWidth="1.8"
            opacity="0.95"
          />

          {/* Node dots */}
          {NODES.map((n) => (
            <g key={n.angle}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.angle === active.angle ? 14 : 10}
                fill="#fffaf0"
                stroke={n.angle === active.angle ? '#4a6152' : '#c6bba6'}
                strokeWidth={n.angle === active.angle ? 2 : 1}
              />
            </g>
          ))}

          {/* Packet along the active spoke, ~70% of the way out */}
          <circle cx={270 + 0.7 * (active.cx - 270)} cy={270 + 0.7 * (active.cy - 270)} r="5" fill="#4a6152" />

          {/* Core puck */}
          <circle
            cx="270"
            cy="270"
            r="84"
            fill="#2a2f26"
            stroke="#f1ede4"
            strokeWidth="6"
          />
          <text
            x="270"
            y="252"
            textAnchor="middle"
            fill="rgba(241,237,228,0.55)"
            fontFamily="sans-serif"
            fontSize="11"
            letterSpacing="2"
          >
            TECHYARD AI
          </text>
          <text
            x="270"
            y="280"
            textAnchor="middle"
            fill="#f1ede4"
            fontFamily="serif"
            fontSize="21"
            fontStyle="italic"
          >
            orchestration
          </text>
          <text
            x="270"
            y="302"
            textAnchor="middle"
            fill="#f1ede4"
            fontFamily="serif"
            fontSize="21"
            fontStyle="italic"
          >
            core
          </text>
        </svg>
      </div>
    </div>
  )
}

function EditorialCard({ entity }: { entity: Entity }) {
  return (
    <div
      style={{
        background: '#f1ede4',
        color: '#2a2f26',
        width: '100%',
        height: '100%',
        padding: '80px 88px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          letterSpacing: 2.8,
          textTransform: 'uppercase',
          color: '#4a6152',
          fontFamily: 'sans-serif',
        }}
      >
        {entity.eyebrow ?? 'Techyard Systems'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            lineHeight: 1.04,
            letterSpacing: -1.8,
            maxWidth: 980,
            color: '#1a1d18',
            fontWeight: 500,
          }}
        >
          {entity.title}
        </div>
        {entity.subtitle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              lineHeight: 1.35,
              fontStyle: 'italic',
              color: '#5e6459',
              maxWidth: 900,
            }}
          >
            {entity.subtitle}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'sans-serif',
          fontSize: 18,
        }}
      >
        <div style={{ display: 'flex', color: '#4a6152', letterSpacing: 0.4 }}>
          techyardsystems.com
        </div>
        <div style={{ display: 'flex', width: 64, height: 4, background: '#4a6152' }} />
      </div>
    </div>
  )
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params
  const entity = resolve(slug)

  return new ImageResponse(
    entity.kind === 'home' ? <HomeCard title={entity.subtitle ?? ''} /> : <EditorialCard entity={entity} />,
    { width: 1200, height: 630 },
  )
}
