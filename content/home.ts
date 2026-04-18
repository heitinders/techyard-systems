import type { Practice } from './taxonomies'

type Practice01 = {
  number: string
  practice: Practice
  title: string
  description: string
}

export const homeContent = {
  hero: {
    eyebrow: 'Autonomous systems · est. practice',
    title: 'Agents that actually ',
    titleAccent: 'work.',
    lede:
      'We design, build, and ship custom AI agents that run your support, sales, and operations — 24 hours a day, trained on your data, owned by you.',
    primaryCta: { label: 'Book a call →', href: '/contact' },
    ghostCta: { label: 'See recent work', href: '/work' },
  },
  proof: [
    { value: '68', accent: '%', note: 'reduction in support tickets' },
    { value: '4', accent: '×', note: 'faster resolution time' },
    { value: '5', accent: '×', note: 'return on investment' },
    { value: '7', accent: '+', note: 'industries shipped into' },
  ],
  practicesSection: {
    eyebrow: 'What we build',
    title: 'Five practices,',
    titleLine2: 'one philosophy: ',
    titleAccent: 'ship what works.',
  },
  practices: [
    {
      number: '№ 01',
      practice: 'support',
      title: 'Customer support automation',
      description:
        'Tier-1 triage and resolution agents that handle 60–80% of inbound tickets without escalation. Plugs into Zendesk, Intercom, Freshdesk, or custom helpdesks.',
    },
    {
      number: '№ 02',
      practice: 'sales',
      title: 'Sales lead generation & follow-up',
      description:
        'Outbound qualification, personalized follow-up sequences, and CRM hygiene — so your human team stays focused on the calls that actually close.',
    },
    {
      number: '№ 03',
      practice: 'it-hr',
      title: 'IT & HR request management',
      description:
        'Internal-facing agents for onboarding, access requests, password resets, and policy Q&A. Integrates with Okta, Google Workspace, Jira, ServiceNow.',
    },
    {
      number: '№ 04',
      practice: 'data',
      title: 'Data analysis & reporting',
      description:
        'Agents that summarize, trend-detect, and report on data you already have — warehouse, spreadsheet, or otherwise. Delivered as Slack digests or scheduled briefs.',
    },
    {
      number: '№ 05',
      practice: 'ops',
      title: 'Operations & logistics monitoring',
      description:
        'Always-on agents that watch your pipelines, inventory, shipment status, or uptime — and tell a human only when a human is actually needed.',
    },
  ] satisfies Practice01[],
  howWeWork: {
    eyebrow: 'How we work',
    title: 'Three phases, ',
    titleAccent: 'no surprises.',
    phases: [
      {
        step: 'Phase one',
        title: 'Discovery & scoping',
        body:
          'A two-week engagement where we map the workflow, identify where an agent creates leverage, and deliver a written scope with measurable success criteria. Fixed fee.',
      },
      {
        step: 'Phase two',
        title: 'Build & pilot',
        body:
          'Four to eight weeks. We design, train, and deploy the agent in a bounded pilot — real data, real traffic, measurable impact. You own the code and the model weights.',
      },
      {
        step: 'Phase three',
        title: 'Handover & support',
        body:
          'We hand over clean code, documentation, and runbooks. Ongoing support is optional — most clients run the system themselves within three months. No vendor lock-in.',
      },
    ],
  },
  cta: {
    title: 'Build the agent your team ',
    titleAccent: 'actually needs.',
    sub: "A 15-minute discovery call is the fastest way to find out if we're a fit.",
    button: { label: 'Book a call →', href: '/contact' },
  },
} as const

export const serviceMeta: Record<Practice, {
  timeline: string
  bestFit: string
  measurableBy: string
  integrations: string[]
}> = {
  support: {
    timeline: '8–10 weeks',
    bestFit: '>500 tickets/day',
    measurableBy: 'Deflection, CSAT',
    integrations: ['Zendesk', 'Intercom', 'Freshdesk', 'Custom'],
  },
  sales: {
    timeline: '6–8 weeks',
    bestFit: 'SDR team of 5+',
    measurableBy: 'MQL→SQL rate',
    integrations: ['HubSpot', 'Salesforce', 'Pipedrive'],
  },
  'it-hr': {
    timeline: '10–12 weeks',
    bestFit: '>500 headcount',
    measurableBy: 'Ticket time-to-close',
    integrations: ['Okta', 'Jira', 'ServiceNow', 'GWS'],
  },
  data: {
    timeline: '4–6 weeks',
    bestFit: 'Data in warehouse',
    measurableBy: 'Cycle-to-insight',
    integrations: ['Snowflake', 'BigQuery', 'Slack'],
  },
  ops: {
    timeline: '8–10 weeks',
    bestFit: 'Continuous pipelines',
    measurableBy: 'Incident detection',
    integrations: ['TMS', 'ERP', 'Slack', 'Custom'],
  },
}
