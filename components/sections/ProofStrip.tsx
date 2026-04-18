import { Container } from '@/components/primitives/Container'
import { homeContent } from '@/content/home'

export function ProofStrip() {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid gap-6 border-t border-rule pt-10 sm:grid-cols-2 md:grid-cols-4">
          {homeContent.proof.map((item, i) => (
            <div key={i}>
              <div className="font-serif text-[44px] font-medium leading-none tracking-[-0.02em]">
                <em className="font-normal italic text-accent">
                  {item.value}
                  {item.accent}
                </em>
              </div>
              <div className="mt-2 max-w-[22ch] text-xs leading-[1.4] text-ink-muted">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
