export const securityCategories = [
  { id: 'data-handling', label: 'Data handling', num: '01' },
  { id: 'compliance', label: 'Compliance', num: '02' },
  { id: 'model-ownership', label: 'Model ownership', num: '03' },
  { id: 'access-auth', label: 'Access & auth', num: '04' },
] as const

export type SecurityCategory = (typeof securityCategories)[number]['id']

export const securityFAQ: {
  id: string
  category: SecurityCategory
  question: string
  answer: string
}[] = [
  {
    id: 'data-storage',
    category: 'data-handling',
    question: 'Where is our data stored during an engagement, and who has access to it?',
    answer:
      'We default to your infrastructure. If you need us to host, we use your preferred cloud with encryption-at-rest, SSO-gated access, and named-engineer audit logs. We don\'t retain any data after the engagement closes unless you ask us to.',
  },
  {
    id: 'compliance-frameworks',
    category: 'compliance',
    question: 'Which compliance frameworks do you support?',
    answer:
      'We ship engagements under SOC 2 Type II, GDPR, HIPAA, and ISO 27001 as standard. For frameworks not listed — or for client-specific compliance regimes — we scope that into the discovery engagement and report on it formally before the build.',
  },
  {
    id: 'model-weights',
    category: 'model-ownership',
    question: 'Do we own the model weights and agent code at the end?',
    answer:
      'Yes. Both the code and the fine-tuned model weights belong to the client at engagement end. All code lives in your repository from day one. Weights live in your object storage. You retain everything — including the retraining infrastructure.',
  },
  {
    id: 'legal-docs',
    category: 'access-auth',
    question: 'Can you sign our DPA, MSA, or security questionnaire?',
    answer:
      'Yes. We routinely sign client-paper DPAs, MSAs, and security questionnaires. Expect a one-week turnaround for standard questionnaires; longer if the questionnaire requires custom compliance attestations we haven\'t produced before.',
  },
  {
    id: 'model-external-calls',
    category: 'data-handling',
    question: 'Do agents make calls to external LLM APIs?',
    answer:
      'By default, no. Fine-tuned models run in your infrastructure. If an engagement specifically benefits from a frontier model, we scope that explicitly, surface the data-boundary implications, and get written client approval before making any external inference call.',
  },
  {
    id: 'access-controls',
    category: 'access-auth',
    question: 'How do you manage engineer access to client systems?',
    answer:
      'Named engineers, least privilege, SSO where your org supports it, time-bounded. Access logs are audit-available. Offboarding happens within one business day of engagement close.',
  },
]
