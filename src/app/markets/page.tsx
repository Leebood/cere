import { markets } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function MarketsPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Markets" title="Different destinations require different preparation.">
        The target market changes the documents, records, timelines, and first consulting step. Start here before
        choosing a certification or registration route.
      </PageIntro>
      <section className="cere-section muted market-priority">
        <div className="cere-market-list priority">
          {markets.map((market) => (
            <article key={market.name}>
              <div className="market-card-head">
                <strong>{market.name}</strong>
                <span>{market.timeline}</span>
              </div>
              <p>{market.summary}</p>
              <div className="market-detail-grid">
                <div>
                  <small>Core requirements</small>
                  <ul>
                    {market.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <small>Common files</small>
                  <ul>
                    {market.documents.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <a className="market-consult-link" href="/contact">{market.consultation}</a>
            </article>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
