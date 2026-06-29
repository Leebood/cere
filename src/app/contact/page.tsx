import { PageIntro, SiteChrome } from "../site-chrome";

export default function ContactPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Contact" title="Start with the product and target market.">
        A useful first consultation needs the company name, product category, destination market, current certification
        status, and the main export goal.
      </PageIntro>
      <section className="cere-section contact">
        <div className="cere-contact-box">
          <div>
            <strong>Book a consultation</strong>
            <p>
              Tell us what you produce, where you want to export, and what documents or certifications you already have.
            </p>
          </div>
          <a className="cere-button primary" href="mailto:contact@cere.com">Contact CERE</a>
        </div>
      </section>
    </SiteChrome>
  );
}
