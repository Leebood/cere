import { PageIntro, SiteChrome } from "../site-chrome";

export default function AboutPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="About" title="CERE is built around export readiness.">
        Our mission is simple: help companies become export-ready before they spend time and money on certification,
        registration, or buyer review.
      </PageIntro>

      <section className="cere-section muted">
        <div className="about-grid">
          <article>
            <strong>Why CERE</strong>
            <p>
              Traditional consulting often starts with the certificate. CERE starts from the export goal, then builds
              the route, documents, evidence, and responsibilities around it.
            </p>
          </article>
          <article>
            <strong>Our approach</strong>
            <p>
              We start with where, not how. We sell readiness, not certificates. We reduce risk, not just complete
              tasks. We build partnerships, not one-time projects.
            </p>
          </article>
          <article>
            <strong>Our boundary</strong>
            <p>
              CERE is not a certification body, laboratory, government approval authority, customs broker, or guarantee
              of market access.
            </p>
          </article>
        </div>
        <div className="trust-tags" aria-label="CERE trust principles">
          <span>Evidence-Based</span>
          <span>Human-Reviewed</span>
          <span>Transparent</span>
          <span>Continuous</span>
        </div>
      </section>
    </SiteChrome>
  );
}
