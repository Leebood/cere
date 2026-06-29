import { productCategories } from "../site-data";
import { PageIntro, SiteChrome } from "../site-chrome";

export default function ProductsPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Product Categories" title="A quick scope check for food and agricultural exporters.">
        This page is intentionally simple: the goal is to help the client quickly confirm whether their product is
        within CERE&apos;s service scope.
      </PageIntro>
      <section className="cere-section compact-products">
        <div className="cere-tag-grid compact">
          {productCategories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <div className="cere-contact-box">
          <div>
            <strong>Not sure whether your product fits?</strong>
            <p>Send the product name, processing stage, and target market. The first scope check can be fast.</p>
          </div>
          <a className="cere-button primary" href="/contact">Ask CERE</a>
        </div>
      </section>
    </SiteChrome>
  );
}
