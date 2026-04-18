'use client'

import { useEffect, useMemo, useState } from 'react'
import { IntegrationIcon, type IntegrationKind } from './IntegrationIcon'

type Node = {
  id: IntegrationKind
  label: string
  angle: number // degrees, 0 = right, rotating clockwise
}

const NODES: Node[] = [
  { id: 'whatsapp', label: 'WhatsApp', angle: -90 },
  { id: 'email', label: 'Email', angle: -45 },
  { id: 'sales', label: 'Sales CRM', angle: 0 },
  { id: 'gohighlevel', label: 'GoHighLevel', angle: 45 },
  { id: 'slack', label: 'Slack', angle: 90 },
  { id: 'calendar', label: 'Calendar', angle: 135 },
  { id: 'erp', label: 'ERP', angle: 180 },
  { id: 'quickbooks', label: 'QuickBooks', angle: 225 },
]

const RADIUS = 175
const CORE = 180 // core puck must be wide enough for "orchestration" at 20px italic serif
const SIZE = RADIUS * 2 + CORE // total SVG/container square size

// Round to 3 decimal places to eliminate sub-ULP float drift between
// the Node SSR runtime and the browser runtime — both produce IEEE-754
// doubles, but Number.prototype.toString can differ in the trailing
// digits, which React 19 flags as a hydration mismatch on SVG attrs.
const r3 = (n: number) => Math.round(n * 1000) / 1000

export function OrchestrationCore() {
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setTick((t) => t + 1), 1800)
    return () => clearInterval(id)
  }, [paused])

  const activeId = NODES[tick % NODES.length]!.id

  const positioned = useMemo(() => {
    return NODES.map((n) => {
      const a = (n.angle * Math.PI) / 180
      return {
        ...n,
        cx: r3(SIZE / 2 + RADIUS * Math.cos(a)),
        cy: r3(SIZE / 2 + RADIUS * Math.sin(a)),
      }
    })
  }, [])

  return (
    <div
      aria-label="Integration orchestration core, live view"
      className="relative mx-auto aspect-square w-full max-w-[530px]"
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="tys-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS + 34} fill="url(#tys-core-glow)" />

        {[RADIUS - 26, RADIUS, RADIUS + 28].map((r, i) => (
          <circle
            key={r}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={r}
            fill="none"
            stroke="var(--color-rule)"
            strokeWidth={i === 1 ? 1 : 0.7}
            strokeDasharray={i === 1 ? undefined : '2 5'}
            opacity={0.85 - i * 0.15}
          />
        ))}

        {Array.from({ length: 24 }, (_, k) => {
          const a = (k * 15 * Math.PI) / 180 - Math.PI / 2
          const r1 = RADIUS - 28
          const r2 = RADIUS - 24
          return (
            <line
              key={k}
              x1={r3(SIZE / 2 + r1 * Math.cos(a))}
              y1={r3(SIZE / 2 + r1 * Math.sin(a))}
              x2={r3(SIZE / 2 + r2 * Math.cos(a))}
              y2={r3(SIZE / 2 + r2 * Math.sin(a))}
              stroke="var(--color-rule)"
              strokeWidth="0.8"
            />
          )
        })}

        {positioned.map((n) => {
          const isActive = n.id === activeId
          return (
            <g key={n.id}>
              <line
                x1={SIZE / 2}
                y1={SIZE / 2}
                x2={n.cx}
                y2={n.cy}
                stroke={isActive ? 'var(--color-accent)' : 'var(--color-rule)'}
                strokeWidth={isActive ? 1.4 : 0.8}
                opacity={isActive ? 0.9 : 0.55}
              />
              {isActive ? (
                <circle r="3.5" fill="var(--color-accent)">
                  <animateMotion
                    dur="1.4s"
                    repeatCount="1"
                    path={`M ${SIZE / 2} ${SIZE / 2} L ${n.cx} ${n.cy}`}
                  />
                  <animate attributeName="opacity" from="1" to="0" dur="1.4s" repeatCount="1" />
                </circle>
              ) : null}
            </g>
          )
        })}
      </svg>

      {/* Core puck — sized as a % of the container so it scales with
           the SVG orbit on mobile. 34% ≈ 180/530 (the desktop proportion). */}
      <div
        className="absolute left-1/2 top-1/2 z-[2] flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink text-center text-paper"
        style={{
          boxShadow:
            '0 16px 40px -16px rgba(26,29,24,0.35), 0 0 0 6px color-mix(in oklab, var(--color-paper) 60%, transparent)',
          padding: '0 clamp(10px, 3%, 20px)',
        }}
      >
        <div
          className="font-mono uppercase tracking-[0.22em] text-paper/55"
          style={{ fontSize: 'clamp(7px, 1.8vw, 9px)' }}
        >
          Techyard AI
        </div>
        <div
          className="mt-[6%] font-serif italic leading-none tracking-[-0.025em]"
          style={{ fontSize: 'clamp(13px, 3.9vw, 20px)' }}
        >
          orchestration
        </div>
        <div
          className="mt-[3%] font-serif italic leading-none tracking-[-0.025em]"
          style={{ fontSize: 'clamp(13px, 3.9vw, 20px)' }}
        >
          core
        </div>
        <div className="mt-[9%] h-px w-7 bg-paper/35" />
        <div
          className="mt-[6%] flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-[#a8c0b4]"
          style={{ fontSize: 'clamp(7px, 1.7vw, 9px)' }}
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#a8c0b4]" />
          online · {NODES.length} systems
        </div>
      </div>

      {/* Labeled perimeter nodes */}
      {positioned.map((n) => {
        const isActive = n.id === activeId
        const left = (n.cx / SIZE) * 100
        const top = (n.cy / SIZE) * 100
        return (
          <div
            key={n.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border bg-paper-raised py-1 pl-1 pr-2 transition-[box-shadow,border-color,transform] duration-[var(--dur-fast)] sm:py-1.5 sm:pr-3 ${
              isActive
                ? 'z-[3] border-accent shadow-[0_10px_28px_-10px_rgba(74,97,82,0.5),0_0_0_4px_color-mix(in_oklab,var(--color-accent)_12%,transparent)]'
                : 'z-[1] border-rule shadow-[0_6px_14px_-10px_rgba(26,29,24,0.2)]'
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-rule bg-paper sm:h-7 sm:w-7">
                <IntegrationIcon kind={n.id} size={16} />
              </span>
              <span className="pr-0.5 font-sans text-[10px] font-medium text-ink sm:text-[12px]">
                {n.label}
              </span>
            </span>
          </div>
        )
      })}

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-rule bg-paper-raised px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ink hover:text-ink"
      >
        {paused ? 'play' : 'pause'}
      </button>
    </div>
  )
}
