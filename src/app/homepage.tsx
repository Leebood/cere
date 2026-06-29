const productCategories = [
  "Nuts & kernels",
  "Coffee",
  "Pepper & spices",
  "Rice",
  "Dried fruit",
  "Processed food",
  "Beverages",
  "Agricultural ingredients",
];

const solutions = [
  {
    title: "Export Readiness Assessment",
    detail: "Review the product, destination market, current documents, and factory evidence before committing to a certification route.",
  },
  {
    title: "Compliance Preparation",
    detail: "Prepare the practical systems behind HACCP, GMP, SSOP, SOPs, training records, traceability, and corrective actions.",
  },
  {
    title: "Audit and Registration Support",
    detail: "Support certification audits, buyer audits, GACC preparation, label review, and market-entry document checks.",
  },
];

const deliverables = [
  "HACCP package",
  "GACC preparation file",
  "Food safety manual",
  "Hazard analysis",
  "CCP plan",
  "SSOP and SOP records",
  "Training records",
  "Traceability file",
  "Label review pack",
  "Buyer audit pack",
];

const markets = [
  ["China", "GACC preparation, HACCP evidence, Chinese label review, factory profile."],
  ["European Union", "Traceability, supplier approval, allergen control, buyer audit evidence."],
  ["United States", "Food safety plan, sanitation records, supplier verification, recall readiness."],
  ["Japan", "Product specification, process control, quality records, importer documentation."],
  ["ASEAN", "Export documents, origin support, health certificate evidence, shipment file."],
  ["Middle East", "HALAL readiness, ingredient controls, HACCP records, export health evidence."],
];

const processSteps = [
  ["01", "Initial consultation", "Understand product, target market, factory status, and current documents."],
  ["02", "Route review", "Identify market requirements, certification route, registration needs, and likely gaps."],
  ["03", "Gap analysis", "Review documents and factory evidence, then prepare a practical readiness roadmap."],
  ["04", "Preparation work", "Build the required files, records, templates, training evidence, and corrective actions."],
  ["05", "Audit support", "Support certification, buyer audit, registration preparation, and annual maintenance."],
];

const platformItems = [
  "Client workspace",
  "Document center",
  "Task tracking",
  "Evidence library",
  "Training records",
  "Renewal reminders",
];

export function HomePage() {
  return (
    <main className="cere-site">
      <header className="cere-nav">
        <a className="cere-brand" href="#home" aria-label="CERE home">
          <span>CERE</span>
          <small>Cambodia Export Readiness Engine</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">Products</a>
          <a href="#solutions">Solutions</a>
          <a href="#deliverables">Deliverables</a>
          <a href="#markets">Markets</a>
          <a href="#process">Process</a>
          <a href="#platform">Platform</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="cere-hero" id="home">
        <div className="cere-hero-copy">
          <p className="cere-eyebrow">Food export compliance support</p>
          <h1>Prepare your food business for global markets.</h1>
          <p>
            CERE helps food exporters prepare the documents, evidence, and compliance workflows required before
            certification, registration, and buyer audits.
          </p>
          <div className="cere-actions">
            <a className="cere-button primary" href="#contact">Start Consultation</a>
            <a className="cere-button" href="#solutions">Explore Services</a>
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

      <section className="cere-section" id="products">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Product Categories</p>
          <h2>Support for food and agricultural exporters.</h2>
          <p>
            We start by understanding the product, processing stage, target market, and existing certification status.
          </p>
        </div>
        <div className="cere-tag-grid">
          {productCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </section>

      <section className="cere-section muted" id="solutions">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Solutions</p>
          <h2>From market requirements to audit-ready files.</h2>
          <p>
            Services are organized around the business problem: understanding requirements, closing gaps, and preparing
            evidence that can be reviewed.
          </p>
        </div>
        <div className="cere-card-grid three">
          {solutions.map((solution) => (
            <article key={solution.title}>
              <strong>{solution.title}</strong>
              <p>{solution.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cere-section" id="deliverables">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Deliverables</p>
          <h2>Clear files and evidence the client can actually use.</h2>
          <p>
            Each project produces practical documents, records, and preparation packs tied to the chosen market route.
          </p>
        </div>
        <div className="cere-deliverable-list">
          {deliverables.map((deliverable) => (
            <span key={deliverable}>{deliverable}</span>
          ))}
        </div>
      </section>

      <section className="cere-section muted" id="markets">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Markets</p>
          <h2>Different destinations require different preparation.</h2>
          <p>
            CERE helps the client understand what changes when the destination market changes.
          </p>
        </div>
        <div className="cere-market-list">
          {markets.map(([market, detail]) => (
            <article key={market}>
              <strong>{market}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cere-section" id="process">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Process</p>
          <h2>A practical path from inquiry to readiness.</h2>
          <p>
            The workflow keeps both sides clear on what is being reviewed, what will be delivered, and what the factory
            needs to provide.
          </p>
        </div>
        <div className="cere-process">
          {processSteps.map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cere-section muted" id="platform">
        <div className="cere-split">
          <div className="cere-section-heading">
            <p className="cere-eyebrow">Platform</p>
            <h2>Every project is managed digitally.</h2>
            <p>
              The workspace supports consulting delivery: documents, tasks, evidence, training records, progress, and
              annual follow-up stay organized in one place.
            </p>
          </div>
          <div className="cere-platform-list">
            {platformItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cere-section contact" id="contact">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Contact</p>
          <h2>Start with the product and target market.</h2>
          <p>
            A useful first consultation needs the company name, product category, destination market, current
            certification status, and the main export goal.
          </p>
        </div>
        <div className="cere-contact-box">
          <div>
            <strong>Book a consultation</strong>
            <p>
              Tell us what you produce, where you want to export, and what documents or certifications you already have.
            </p>
          </div>
          <a className="cere-button primary" href="mailto:contact@cere.com">Contact CERE</a>
        </div>
      </section>

      <footer className="cere-footer">
        <strong>CERE</strong>
        <p>
          Readiness and compliance support only. Not a certification body, laboratory, government approval authority, or
          guarantee of market access.
        </p>
        <a href="/workspace">Internal workspace</a>
      </footer>
    </main>
  );
}
