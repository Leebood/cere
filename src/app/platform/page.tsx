import { platformItems } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function PlatformPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Platform" title="Every project is managed digitally.">
        The platform supports consulting delivery. It is not sold as standalone software; it keeps project documents,
        tasks, evidence, training records, and annual follow-up organized.
      </PageIntro>
      <section className="cere-section muted">
        <div className="cere-split">
          <div className="cere-section-heading">
            <h2>Built to keep preparation work visible.</h2>
            <p>
              Export readiness work can become messy quickly. The workspace gives consultants and clients a common
              structure for evidence, task status, document updates, and renewal reminders.
            </p>
          </div>
          <div className="cere-platform-list">
            {platformItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
