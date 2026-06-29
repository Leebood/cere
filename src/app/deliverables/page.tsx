import { deliverables } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function DeliverablesPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Deliverables" title="Clear files and evidence the client can actually use.">
        Each project produces practical documents, records, and preparation packs tied to the chosen market route.
      </PageIntro>
      <section className="cere-section">
        <div className="deliverable-grid">
          {deliverables.map((deliverable) => (
            <article key={deliverable.group}>
              <strong>{deliverable.group}</strong>
              <p>{deliverable.purpose}</p>
              <ul>
                {deliverable.items.map((item) => (
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
