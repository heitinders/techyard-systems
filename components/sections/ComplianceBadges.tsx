const badges = [
  { label: 'Attestation', name: 'SOC 2 Type II' },
  { label: 'Framework', name: 'GDPR' },
  { label: 'Framework', name: 'HIPAA-ready' },
  { label: 'Standard', name: 'ISO 27001' },
] as const

export function ComplianceBadges() {
  return (
    <div className="mt-12 flex flex-wrap gap-3 border-t border-rule pt-8">
      {badges.map((b) => (
        <div
          key={b.name}
          className="rounded-md border border-rule bg-paper-raised px-4 py-3"
        >
          <div className="mb-0.5 text-[10px] uppercase tracking-[1.5px] text-ink-subtle">
            {b.label}
          </div>
          <div className="font-serif text-[17px] font-medium tracking-tight">{b.name}</div>
        </div>
      ))}
    </div>
  )
}
