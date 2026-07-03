import Link from "next/link";
import { contentMarkets, contentProducts, guides } from "../../lib/content-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function ResourcesPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Resources" title="Export readiness answers, built from structured data.">
        CERE resources start with market, product, and requirement data. The first pages are intentionally small so the
        content engine can grow without turning the homepage into a knowledge dump.
      </PageIntro>

      <section className="cere-section muted">
        <div className="resource-column-grid">
          <article>
            <span>Markets</span>
            <strong>Start from destination requirements.</strong>
            <div className="resource-link-list">
              {contentMarkets.map((market) => (
                <Link href={`/markets/${market.slug}`} key={market.slug}>{market.name}</Link>
              ))}
            </div>
          </article>
          <article>
            <span>Products</span>
            <strong>Match products to export routes.</strong>
            <div className="resource-link-list">
              {contentProducts.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.slug}>{product.name}</Link>
              ))}
            </div>
          </article>
          <article>
            <span>Guides</span>
            <strong>Question-led pages for SEO and AI answers.</strong>
            <div className="resource-link-list">
              {guides.map((guide) => (
                <Link href={`/guides/${guide.slug}`} key={guide.slug}>{guide.question}</Link>
              ))}
            </div>
          </article>
        </div>
      </section>
    </SiteChrome>
  );
}
