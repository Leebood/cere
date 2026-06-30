import { markets } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function MarketsPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Markets" title="Where do you want to export?">
        Choose a destination first. Each market has a different route, different evidence expectations, and a different
        first step for preparation.
      </PageIntro>

      <section className="cere-section muted">
        <div className="market-decision-grid">
          {markets.map((market) => (
            <article className="market-decision-card" id={market.slug} key={market.slug}>
              <div className="market-card-head">
                <strong>{market.name}</strong>
                <span>{market.timeline}</span>
              </div>

              <div className="route-answer">
                <small>Can I export?</small>
                <p>{market.summary}</p>
              </div>

              <div className="route-answer">
                <small>What do I need?</small>
                <ul>
                  {market.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="route-answer">
                <small>Common preparation files</small>
                <ul>
                  {market.documents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <a className="market-consult-link" href="/contact">{market.consultation}</a>
            </article>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
