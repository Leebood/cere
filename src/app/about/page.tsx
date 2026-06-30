import { PageIntro, SiteChrome } from "../site-chrome";

export default function AboutPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="About" title="CERE is built around export readiness.">
        We help Cambodia food manufacturers understand what a target market requires, close preparation gaps, and keep
        compliance evidence organized before certification, registration, or buyer review.
      </PageIntro>

      <section className="cere-section muted">
        <div className="about-grid">
          <article>
            <strong>What we are</strong>
            <p>
              A consulting and digital preparation partner for food exporters that need clearer routes into China, the
              European Union, the United States, Japan, ASEAN, and Middle East markets.
            </p>
          </article>
          <article>
            <strong>What we do</strong>
            <p>
              We prepare readiness assessments, gap lists, document packages, training evidence, label review notes,
              audit packs, and annual compliance support plans.
            </p>
          </article>
          <article>
            <strong>What we do not do</strong>
            <p>
              CERE is not a certification body, laboratory, government approval authority, customs broker, or guarantee
              of market access.
            </p>
          </article>
        </div>
      </section>
    </SiteChrome>
  );
}
