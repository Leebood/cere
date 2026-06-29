import { processSteps } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function ProcessPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Process" title="A practical path from inquiry to readiness.">
        The workflow keeps both sides clear on what is being reviewed, what will be delivered, and what the factory
        needs to provide at each stage.
      </PageIntro>
      <section className="cere-section">
        <div className="cere-process">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.purpose}</p>
                <dl>
                  <div>
                    <dt>Output</dt>
                    <dd>{step.output}</dd>
                  </div>
                  <div>
                    <dt>Client input</dt>
                    <dd>{step.client}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
