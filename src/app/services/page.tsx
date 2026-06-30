import { solutions } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

const serviceJourney = [
  {
    title: "We assess your readiness",
    text: "Review the product, market, factory status, and existing documents before recommending a route.",
  },
  {
    title: "We identify the gaps",
    text: "Turn market expectations into a clear list of missing files, records, evidence, and factory actions.",
  },
  {
    title: "We prepare the documents",
    text: "Build practical manuals, forms, checklists, labels, registration files, and audit preparation packs.",
  },
  {
    title: "We organize the evidence",
    text: "Help the factory keep records, training files, traceability evidence, and corrective actions reviewable.",
  },
  {
    title: "We support your audit",
    text: "Prepare the business for certification audits, buyer audits, registration review, and annual maintenance.",
  },
];

export default function ServicesPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Services" title="How CERE helps you prepare for export.">
        Our work starts from the export destination, then moves into readiness assessment, gap closure, documentation,
        evidence organization, and audit support.
      </PageIntro>

      <section className="cere-section">
        <div className="service-journey">
          {serviceJourney.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cere-section muted">
        <div className="cere-section-heading">
          <p className="cere-eyebrow">Service areas</p>
          <h2>The details sit inside the export route, not before it.</h2>
        </div>
        <div className="cere-card-grid three">
          {solutions.map((solution) => (
            <article key={solution.title}>
              <strong>{solution.title}</strong>
              <span>{solution.problem}</span>
              <p>{solution.detail}</p>
              <ul className="solution-deliverables">
                {solution.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
