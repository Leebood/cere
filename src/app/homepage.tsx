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
      <section className="cere-hero guide-hero">
        <div className="cere-hero-copy">
          <p className="cere-eyebrow">Export Decision Guide</p>
          <h1>The platform that gets you export-ready.</h1>
          <p>
            We do not sell certificates. We build export readiness. Start with one question: where do you want to
            export?
          </p>
          <div className="cere-actions">
            <a className="cere-button primary" href="/markets">Start Free Assessment</a>
            <a className="cere-button" href="/contact">Book Consultation</a>
          </div>
        </div>
        <aside className="guide-choice-panel" aria-label="Choose export destination">
          <p className="cere-eyebrow">Can I export?</p>
          <strong>Choose your destination.</strong>
          <div className="guide-market-grid">
            {markets.map((market) => (
              <a className="guide-market-card" href={`/markets#${market.slug}`} key={market.slug}>
                <span>{market.name}</span>
                <small>{market.timeline}</small>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="cere-section muted">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">What do I need?</p>
          <h2>Each destination changes the files, evidence, and preparation timeline.</h2>
          <p>
            The first step is not choosing a certificate. The first step is understanding what your target market will
            ask the factory to prove.
          </p>
        </div>
        <div className="guide-route-grid">
          {markets.slice(0, 3).map((market) => (
            <article className="market-route-card" key={market.slug}>
              <div className="market-card-head">
                <strong>{market.name}</strong>
                <span>{market.timeline}</span>
              </div>
              <p>{market.summary}</p>
              <ul>
                {market.requirements.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="market-consult-link" href={`/markets#${market.slug}`}>View this route</a>
            </article>
          ))}
        </div>
      </section>

      <section className="cere-section">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Services</p>
          <h2>How CERE helps you move from interest to export readiness.</h2>
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
