import { solutions } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

const serviceJourney = [
  {
    title: "Assess",
    text: "We evaluate your factory, products, processes, and current documents against the target market route.",
  },
  {
    title: "Prepare",
    text: "We turn the gaps into tasks, timeline, responsibilities, document packages, and implementation priorities.",
  },
  {
    title: "Review",
    text: "We review documents, labels, records, and evidence before they are used for audits or registration support.",
  },
  {
    title: "Support",
    text: "We support audit preparation, corrective actions, annual updates, and the next market expansion route.",
  },
];

export default function ServicesPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Services" title="How CERE helps you prepare for export.">
        You do not need a certificate first. You need a route, a gap list, the right files, and reviewable evidence.
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
