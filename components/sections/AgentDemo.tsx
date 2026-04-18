'use client'

import { useEffect, useMemo, useState } from 'react'

// Scripted support-agent run that loops. Proof-by-demonstration for the
// hero: an incoming ticket, the agent's private thoughts, the tools it
// calls, and the resolution — no dashboards, no slides, just the system
// running.

type Node =
  | { kind: 'incoming'; who: string; at: string; text: string }
  | { kind: 'thought'; text: string }
  | { kind: 'tool'; name: string; arg: string; ms: number }
  | { kind: 'outgoing'; who: string; at: string; text: string }
  | { kind: 'status'; text: string; tone: 'good' }

const SCRIPT: Node[] = [
  {
    kind: 'incoming',
    who: 'Support · Inbound #2841',
    at: '08:41',
    text: "Hi — my invoice shows last month's plan but I upgraded on the 3rd. Can you fix?",
  },
  { kind: 'thought', text: 'Matching ticket ↔ account · checking plan change ledger' },
  { kind: 'tool', name: 'billing.fetchInvoice', arg: 'acct_09H2', ms: 420 },
  { kind: 'tool', name: 'billing.planChangeLog', arg: 'acct_09H2', ms: 360 },
  { kind: 'thought', text: 'Found proration gap · generating credit · drafting reply' },
  {
    kind: 'outgoing',
    who: 'Agent · ty-support-v3',
    at: '08:41',
    text: "Thanks for flagging. I've applied a $48 proration credit dated Apr 3 — it'll appear on next month's invoice. Let me know if anything still looks off.",
  },
  { kind: 'status', text: 'Resolved · no escalation · CSAT pending', tone: 'good' },
]

export function AgentDemo() {
  const [paused, setPaused] = useState(false)
  const [idx, setIdx] = useState(0)
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (paused) return
    const active = SCRIPT[step]
    if (!active) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    if (active.kind === 'incoming' || active.kind === 'outgoing') {
      const full = active.text
      setTyped('')
      let i = 0
      const tick = () => {
        if (cancelled) return
        i += 2
        setTyped(full.slice(0, i))
        if (i < full.length) timer = setTimeout(tick, 18)
        else
          timer = setTimeout(() => {
            if (!cancelled) setStep((s) => s + 1)
          }, 700)
      }
      timer = setTimeout(tick, 260)
    } else if (active.kind === 'tool') {
      timer = setTimeout(
        () => !cancelled && setStep((s) => s + 1),
        active.ms + 200,
      )
    } else if (active.kind === 'thought') {
      timer = setTimeout(() => !cancelled && setStep((s) => s + 1), 900)
    } else if (active.kind === 'status') {
      timer = setTimeout(() => !cancelled && setStep((s) => s + 1), 2600)
    }

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [step, paused])

  useEffect(() => {
    if (step >= SCRIPT.length) {
      const t = setTimeout(() => {
        setStep(0)
        setIdx((i) => i + 1)
        setTyped('')
      }, 1400)
      return () => clearTimeout(t)
    }
  }, [step])

  const visible = SCRIPT.slice(0, step + 1)

  return (
    <div
      aria-label="Live support-agent run, demonstration"
      className="relative overflow-hidden rounded-[14px] border border-rule bg-paper-raised font-sans shadow-[0_20px_50px_-30px_rgba(26,29,24,0.18),0_2px_6px_rgba(26,29,24,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-rule bg-gradient-to-b from-black/[0.015] to-transparent px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
            ty-support · live · run #{4000 + idx}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play agent demo' : 'Pause agent demo'}
          className="min-h-[28px] rounded-full border border-rule bg-transparent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ink hover:text-ink"
        >
          {paused ? 'play' : 'pause'}
        </button>
      </div>

      <div className="flex min-h-[340px] flex-col gap-2.5 px-[18px] pb-[18px] pt-4">
        {visible.map((n, i) => {
          const isLast = i === visible.length - 1
          const key = `${idx}-${i}`
          if (n.kind === 'incoming') {
            return (
              <MsgBubble
                key={key}
                who={n.who}
                at={n.at}
                dir="in"
                text={isLast ? typed : n.text}
                typing={isLast}
              />
            )
          }
          if (n.kind === 'outgoing') {
            return (
              <MsgBubble
                key={key}
                who={n.who}
                at={n.at}
                dir="out"
                text={isLast ? typed : n.text}
                typing={isLast}
              />
            )
          }
          if (n.kind === 'thought') return <ThoughtLine key={key} text={n.text} />
          if (n.kind === 'tool')
            return <ToolCall key={key} name={n.name} arg={n.arg} ms={n.ms} />
          if (n.kind === 'status') return <StatusLine key={key} text={n.text} />
          return null
        })}
      </div>
    </div>
  )
}

function MsgBubble({
  who,
  at,
  dir,
  text,
  typing,
}: {
  who: string
  at: string
  dir: 'in' | 'out'
  text: string
  typing: boolean
}) {
  const isIn = dir === 'in'
  return (
    <div className={`flex flex-col gap-1 ${isIn ? 'items-start' : 'items-end'}`}>
      <div className="font-mono text-[10px] tracking-[0.08em] text-ink-subtle">
        {who} · {at}
      </div>
      <div
        className={`max-w-[86%] rounded-xl border px-3.5 py-2.5 font-serif text-[15px] leading-[1.5] ${
          isIn
            ? 'rounded-tl-[4px] border-rule bg-paper italic text-ink'
            : 'rounded-tr-[4px] border-ink bg-ink text-paper'
        }`}
      >
        {text}
        {typing ? <span className="tys-caret ml-0.5 opacity-60">▍</span> : null}
      </div>
    </div>
  )
}

function ThoughtLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 px-0.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink-subtle">
      <span aria-hidden="true" className="inline-block h-px w-3.5 bg-accent" />
      <span className="font-serif text-[13px] italic text-ink-muted">{text}</span>
    </div>
  )
}

function ToolCall({ name, arg, ms }: { name: string; arg: string; ms: number }) {
  return (
    <div className="flex items-center justify-between gap-2.5 rounded-lg border border-dashed border-rule bg-paper/[0.96] px-3 py-1.5 font-mono text-[11px] text-ink-muted">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-accent">▸</span>
        <span>
          {name}
          <span className="opacity-60">(</span>
          <span className="text-ink">{`"${arg}"`}</span>
          <span className="opacity-60">)</span>
        </span>
      </div>
      <span className="text-ink-subtle">{ms}ms · ok</span>
    </div>
  )
}

function StatusLine({ text }: { text: string }) {
  return (
    <div className="mt-1 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      {text}
    </div>
  )
}
