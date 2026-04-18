import { ImageResponse } from 'next/og'
import { caseStudies, journalPosts } from '#site/content'

export const runtime = 'edge'

type Entity = { title: string; subtitle?: string; eyebrow?: string }

function resolve(segments: string[] | undefined): Entity {
  if (!segments || segments.length === 0) {
    return {
      title: 'Agents that actually work.',
      subtitle: 'Custom AI agents for support, sales, and operations.',
      eyebrow: 'Techyard Systems',
    }
  }
  const [kind, slug] = segments
  if (kind === 'home') {
    return {
      title: 'Agents that actually work.',
      subtitle: 'Custom AI agents for support, sales, and operations.',
      eyebrow: 'Techyard Systems',
    }
  }
  if (kind === 'work') {
    const cs = caseStudies.find((c) => c.slug === slug)
    if (cs) {
      return {
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
        title: post.title,
        subtitle: post.subtitle,
        eyebrow: `Journal · ${post.category}`,
      }
    }
  }
  return { title: 'Techyard Systems', eyebrow: 'Techyard Systems' }
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await ctx.params
  const entity = resolve(slug)

  return new ImageResponse(
    (
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
            fontSize: 22,
            letterSpacing: 1.6,
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
              fontSize: 72,
              lineHeight: 1.04,
              letterSpacing: -1.6,
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
                fontSize: 26,
                lineHeight: 1.35,
                fontStyle: 'italic',
                color: '#6b7165',
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
          <div style={{ color: '#4a6152', letterSpacing: 0.4 }}>techyardsystems.com</div>
          <div
            style={{
              width: 64,
              height: 4,
              background: '#4a6152',
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
