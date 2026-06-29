import { SiteChrome } from "./site-chrome";

export function HomePage() {
  return (
    <SiteChrome>
      <section className="cere-hero">
        <div className="cere-hero-copy">
          <p className="cere-eyebrow">Food export compliance support</p>
          <h1>Prepare your food business for global markets.</h1>
          <p>
            CERE helps food exporters prepare the documents, evidence, and compliance workflows required before
            certification, registration, and buyer audits.
          </p>
          <div className="cere-actions">
            <a className="cere-button primary" href="/contact">Start Consultation</a>
            <a className="cere-button" href="/markets">Explore Markets</a>
          </div>
        </div>
        <aside className="cere-hero-panel" aria-label="CERE service summary">
          <img
            alt="Food export preparation and documentation"
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80"
          />
          <div>
            <strong>Readiness, not approval.</strong>
            <p>
              We support preparation and compliance evidence. CERE is not a certification body, laboratory, government
              authority, or guarantee of market access.
            </p>
          </div>
        </aside>
      </section>

      <section className="cere-section compact">
        <div className="cere-value-grid">
          <article>
            <span>01</span>
            <strong>Export readiness</strong>
            <p>Clarify whether the business is ready for the intended market and what must be fixed first.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Compliance preparation</strong>
            <p>Build the files, records, templates, and operational evidence needed for the route.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Continuous support</strong>
            <p>Maintain evidence, renewals, training records, buyer audit readiness, and new market expansion.</p>
          </article>
        </div>
      </section>

      <section className="cere-section muted">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">How the site is organized</p>
          <h2>Start with the client decision, then go deeper.</h2>
          <p>
            Choose a target market, review the services, understand the process, then confirm deliverables and product
            scope before booking a consultation.
          </p>
        </div>
        <div className="cere-card-grid three">
          <article>
            <strong>Markets</strong>
            <p>Different destinations require different files, timelines, and preparation routes.</p>
            <a className="market-consult-link" href="/markets">View market routes</a>
          </article>
          <article>
            <strong>Solutions</strong>
            <p>Services are organized around readiness, preparation, documentation, labels, audits, and maintenance.</p>
            <a className="market-consult-link" href="/solutions">View services</a>
          </article>
          <article>
            <strong>Process</strong>
            <p>See what CERE produces and what the client needs to provide at each stage.</p>
            <a className="market-consult-link" href="/process">View process</a>
          </article>
        </div>
      </section>

      <section className="cere-section contact">
        <div className="cere-contact-box">
          <div>
            <strong>Ready to discuss an export route?</strong>
            <p>Start with the product category, destination market, and current certification status.</p>
          </div>
          <a className="cere-button primary" href="/contact">Book Consultation</a>
        </div>
      </section>
    </SiteChrome>
  );
}
