import { Container } from '@/components/primitives/Container'
import { EyebrowLine } from '@/components/primitives/EyebrowLine'

// Valencia, CA coordinates (approximate centroid of Avenue Stanford / Rye
// Canyon Business Park). OSM's embed accepts a bounding box and a pinned
// marker — no third-party cookies, no API key, no cookie banner required.
const COORDS = {
  lat: 34.4175,
  lon: -118.5685,
}

const BBOX = {
  minLon: -118.585,
  minLat: 34.4095,
  maxLon: -118.552,
  maxLat: 34.426,
}

const ADDRESS_LINES = ['28470 Avenue Stanford #345', 'Valencia, CA 91355 · USA'] as const
const PHONE_DISPLAY = '+1 (661) 488-0808'
const PHONE_TEL = '+16614880808'
const HOURS = 'Monday–Friday · 9 am – 6 pm PST'

const GMAPS_URL =
  'https://maps.google.com/?q=28470+Avenue+Stanford+%23345,+Valencia,+CA+91355'

function osmEmbedUrl() {
  const bbox = `${BBOX.minLon}%2C${BBOX.minLat}%2C${BBOX.maxLon}%2C${BBOX.maxLat}`
  const marker = `${COORDS.lat}%2C${COORDS.lon}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`
}

export function ContactLocation() {
  return (
    <section className="border-t border-rule bg-paper py-[var(--space-section)]">
      <Container>
        <EyebrowLine>Find us</EyebrowLine>
        <h2 className="mt-5 max-w-[18ch] font-serif text-[clamp(36px,5vw,56px)] font-medium leading-[1.08] tracking-[-0.022em]">
          Santa Clarita Valley, <em className="font-normal italic text-accent">California</em>.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Left column — contact details */}
          <dl className="flex flex-col gap-10 text-[15px] leading-[1.5]">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                Office
              </dt>
              <dd className="mt-3 font-serif text-[20px] leading-[1.45] text-ink">
                {ADDRESS_LINES[0]}
                <br />
                {ADDRESS_LINES[1]}
              </dd>
              <a
                href={GMAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 border-b border-accent pb-0.5 text-[14px] font-medium text-accent transition-colors hover:border-ink hover:text-ink"
              >
                Open in Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                Phone
              </dt>
              <dd className="mt-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-serif text-[22px] leading-[1.3] text-ink transition-colors hover:text-accent"
                >
                  {PHONE_DISPLAY}
                </a>
              </dd>
              <div className="mt-2 text-[13px] text-ink-muted">{HOURS}</div>
            </div>

            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                Email
              </dt>
              <dd className="mt-3">
                <a
                  href="mailto:contactus@techyardsystems.com"
                  className="font-serif text-[18px] leading-[1.4] text-ink underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  contactus@techyardsystems.com
                </a>
              </dd>
              <div className="mt-2 text-[13px] text-ink-muted">
                Response within one business day.
              </div>
            </div>

            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                Service area
              </dt>
              <dd className="mt-3 text-[15px] text-ink-muted">
                Based in California. We work with clients across North America, Europe, and APAC.
              </dd>
            </div>
          </dl>

          {/* Right column — map */}
          <div className="flex flex-col gap-3">
            <figure className="overflow-hidden rounded-[var(--r-lg)] border border-rule bg-paper-raised">
              <iframe
                src={osmEmbedUrl()}
                title="Map of 28470 Avenue Stanford #345, Valencia, CA 91355"
                className="h-[420px] w-full grayscale-[0.15]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </figure>
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-ink-subtle">
              <span>fig. 4 · map via OpenStreetMap</span>
              <a
                href={GMAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                Directions ↗
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
