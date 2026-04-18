import { Container } from '@/components/primitives/Container'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'
import { AgentDemo } from './AgentDemo'

export function AgentDemoSection() {
  return (
    <section className="pt-0 pb-20 md:pb-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <EyebrowLine num="№ 03">Inside one run</EyebrowLine>
            <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.08] tracking-[-0.022em]">
              Every action, logged. Every{' '}
              <em className="font-normal italic text-accent">tool call, auditable</em>.
            </h2>
            <p className="mt-5 max-w-[48ch] font-serif text-[18px] italic leading-[1.55] text-ink-muted">
              No black box. The orchestration core narrates what it did, which system it
              touched, and why — so your team can trust it, correct it, or take it offline in
              one click.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 font-mono text-[12px] tracking-[0.04em] text-ink-subtle">
              <li>• deterministic trace · replayable</li>
              <li>• human handoff · one keystroke</li>
              <li>• runs on your infra · weights are yours</li>
            </ul>
          </div>
          <div>
            <AgentDemo />
            <div className="mt-3 flex justify-between font-mono text-[11px] tracking-[0.08em] text-ink-subtle">
              <span>fig. 3 · support agent, typical run</span>
              <span>recorded · 4/02/26</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
