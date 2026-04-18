'use client'

import { useEffect, useMemo, useState } from 'react'
import { Container } from '@/components/primitives/Container'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { IntegrationIcon, type IntegrationKind } from './IntegrationIcon'

type TaskStatus =
  | 'resolved'
  | 'drafted'
  | 'posted'
  | 'scheduled'
  | 'monitored'
  | 'completed'
  | 'routed'

type Task = {
  from: IntegrationKind
  label: string
  meta: string
  status: TaskStatus
}

const STATUS_COLOR: Record<TaskStatus, string> = {
  resolved: '#4a6152',
  drafted: '#c26a3f',
  posted: '#3d5a6c',
  scheduled: '#3d5a6c',
  monitored: '#8a5a3f',
  completed: '#4a6152',
  routed: '#4a6152',
}

const POOL: Task[] = [
  { from: 'whatsapp', label: 'WhatsApp · support', meta: 'billing Q resolved · 38s', status: 'resolved' },
  { from: 'gohighlevel', label: 'Lead · "Ridgeline Co."', meta: 'MQL → SQL · 2 replies drafted', status: 'drafted' },
  { from: 'slack', label: 'Slack · weekly brief', meta: 'churn ↑ 0.4pp · 3 flags', status: 'posted' },
  { from: 'calendar', label: 'Calendar · holds', meta: '3 discovery slots reserved', status: 'scheduled' },
  { from: 'erp', label: 'ERP · shipment watch', meta: 'SKU #FX-118 · route adjusted', status: 'monitored' },
  { from: 'quickbooks', label: 'QuickBooks · AR', meta: '$12.4K reconciled · 7 rules', status: 'completed' },
  { from: 'email', label: 'Email · triage', meta: '114 sorted · 6 escalated', status: 'routed' },
  { from: 'sales', label: 'Sales CRM · hygiene', meta: '32 contacts deduped', status: 'completed' },
]

export function LiveTasksStrip() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400)
    return () => clearInterval(id)
  }, [])

  const visible = useMemo(
    () => [0, 1, 2].map((i) => POOL[(tick + i) % POOL.length]!),
    [tick],
  )

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <EyebrowLine>Recent outputs · one agent, eight systems</EyebrowLine>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-subtle">
            fig. 2 · live feed
          </div>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <TaskCard key={`${tick}-${i}`} task={t} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function TaskCard({ task }: { task: Task }) {
  const statusColor = STATUS_COLOR[task.status]
  return (
    <div
      className="flex flex-col gap-2.5 rounded-[12px] border border-rule bg-paper-raised p-4 tys-taskcard"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-rule bg-paper">
          <IntegrationIcon kind={task.from} size={16} />
        </span>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
          {task.from} → core
        </div>
        <div
          className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: statusColor }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: statusColor }}
          />
          {task.status}
        </div>
      </div>
      <div>
        <div className="font-serif text-[18px] font-medium leading-[1.25] tracking-[-0.015em] text-ink">
          {task.label}
        </div>
        <div className="mt-1 text-[13px] leading-[1.5] text-ink-muted">{task.meta}</div>
      </div>
    </div>
  )
}
