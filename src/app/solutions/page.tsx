import { solutions } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function SolutionsPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Solutions" title="From market requirements to audit-ready files.">
        Services are organized around business problems: understanding requirements, closing gaps, preparing evidence,
        and staying ready after the first audit or registration package.
      </PageIntro>
      <section className="cere-section muted">
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
