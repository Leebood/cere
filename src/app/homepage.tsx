/* eslint-disable @next/next/no-html-link-for-pages */
import { markets } from "./site-data";
import { SiteChrome } from "./site-chrome";

const serviceSteps = [
  {
    title: "Assess",
    text: "Evaluate current readiness and identify gaps.",
  },
  {
    title: "Prepare",
    text: "Build a roadmap with tasks, timeline, and responsibilities.",
  },
  {
    title: "Review",
    text: "Check documents and evidence before external review.",
  },
  {
    title: "Support",
    text: "Guide the project until the business is export-ready.",
  },
];

export function HomePage() {
  return (
    <SiteChrome>
      <section className="brand-hero">
        <div className="brand-hero-copy">
          <p className="cere-eyebrow">Cambodia Export Readiness Engine</p>
          <h1>CERE</h1>
          <p className="brand-hero-lead">Export readiness for global food markets.</p>
          <p className="brand-hero-sub">
            Choose a destination. Understand the requirements. Prepare the evidence before you start.
          </p>
          <div className="brand-actions">
            <a className="cere-button primary" href="#choose-market">Choose your market</a>
            <a className="cere-button dark" href="/contact">Book consultation</a>
          </div>
        </div>
        <div className="brand-map" aria-label="Choose export destination on abstract route map">
          <div className="brand-map-caption">
            <span>Export routes from Cambodia</span>
            <strong>Tap a market to see what you need.</strong>
          </div>
          <svg className="world-route-map" viewBox="0 0 980 470" role="img" aria-label="Abstract export route map">
            <g className="map-grid" aria-hidden="true">
              <path d="M70 120H910" />
              <path d="M70 205H910" />
              <path d="M70 290H910" />
              <path d="M70 375H910" />
              <path d="M145 70V420" />
              <path d="M314 70V420" />
              <path d="M484 70V420" />
              <path d="M617 70V420" />
              <path d="M744 70V420" />
              <path d="M792 70V420" />
            </g>
            <ellipse className="map-orbit" cx="490" cy="244" rx="405" ry="156" />
            <ellipse className="map-orbit subtle" cx="490" cy="244" rx="285" ry="106" />
            <path className="map-route-line" d="M617 285 C690 222, 741 188, 792 156" />
            <path className="map-route-line" d="M617 285 C552 201, 458 153, 314 128" />
            <path className="map-route-line" d="M617 285 C432 267, 276 225, 145 186" />
            <path className="map-route-line" d="M617 285 C659 226, 700 191, 744 181" />
            <path className="map-route-line" d="M617 285 C642 298, 674 314, 706 331" />
            <path className="map-route-line" d="M617 285 C557 247, 518 212, 484 177" />
            <circle className="map-origin-dot" cx="617" cy="285" r="8" />
            <text className="map-origin-label" x="631" y="291">Cambodia</text>

            <a className="map-market active" href="/markets#china" aria-label="China market route">
              <circle cx="792" cy="156" r="29" />
              <text x="792" y="162">China</text>
            </a>
            <a className="map-market" href="/markets#eu" aria-label="European Union market route">
              <circle cx="484" cy="177" r="27" />
              <text x="484" y="183">EU</text>
            </a>
            <a className="map-market" href="/markets#usa" aria-label="United States market route">
              <circle cx="145" cy="186" r="30" />
              <text x="145" y="192">USA</text>
            </a>
            <a className="map-market" href="/markets#japan" aria-label="Japan market route">
              <circle cx="744" cy="181" r="25" />
              <text x="744" y="187">Japan</text>
            </a>
            <a className="map-market" href="/markets#asean" aria-label="ASEAN market route">
              <circle cx="706" cy="331" r="31" />
              <text x="706" y="337">ASEAN</text>
            </a>
            <a className="map-market" href="/markets#middle-east" aria-label="Middle East market route">
              <circle cx="314" cy="128" r="34" />
              <text x="314" y="134">Middle East</text>
            </a>
          </svg>
        </div>
      </section>

      <section className="cere-section market-choice-section" id="choose-market">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Start here</p>
          <h2>Where do you want to export?</h2>
          <p>
            Choose a destination first. Each route has different documents, evidence, and preparation timelines.
          </p>
        </div>
        <div className="official-market-grid">
          {markets.map((market) => (
            <a className="official-market-card" href={`/markets#${market.slug}`} key={market.slug}>
              <strong>{market.name}</strong>
              <span>{market.summary}</span>
              <small>{market.timeline}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="cere-section muted">
        <div className="route-feature">
          <div>
            <p className="cere-eyebrow">What you will need</p>
            <h2>Every market becomes a clear preparation route.</h2>
            <p>
              CERE helps you understand what must be prepared before registration, certification, buyer review, or
              shipment support.
            </p>
          </div>
          <article className="route-preview-card">
            <span>Example route</span>
            <strong>Exporting to China</strong>
            <ul>
              <li>HACCP readiness</li>
              <li>GACC preparation</li>
              <li>Chinese label review</li>
              <li>Traceability records</li>
            </ul>
            <small>Estimated preparation: 4-8 months</small>
          </article>
        </div>
      </section>

      <section className="cere-section official-services">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Services</p>
          <h2>From export goal to audit-ready evidence.</h2>
        </div>
        <div className="guide-flow">
          {serviceSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="guide-service-note">
          <strong>Every recommendation is evidence-based and reviewed before delivery.</strong>
          <p>
            CERE prepares documents, workflows, records, and audit evidence. We are not a certification body,
            laboratory, government approval authority, or guarantee of market access.
          </p>
          <a className="market-consult-link" href="/services">See services</a>
        </div>
      </section>

      <section className="cere-section contact">
        <div className="cere-contact-box">
          <div>
            <strong>Ready to plan your export route?</strong>
            <p>Tell us the product, destination market, factory status, and current certification position.</p>
          </div>
          <a className="cere-button primary" href="/contact">Book Consultation</a>
        </div>
      </section>
    </SiteChrome>
  );
}
