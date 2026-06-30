import { PageIntro, SiteChrome } from "../site-chrome";

const targetMarkets = ["China", "European Union", "United States", "Japan", "ASEAN", "Middle East"];

export default function ContactPage() {
  return (
    <SiteChrome>
      <PageIntro eyebrow="Contact" title="Let's talk about your export plan.">
        Start with the company, product, target market, current certification status, and the main export goal.
      </PageIntro>
      <section className="cere-section contact">
        <form className="contact-form">
          <label>
            <span>Name</span>
            <input name="name" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" placeholder="name@company.com" type="email" />
          </label>
          <label>
            <span>Company</span>
            <input name="company" placeholder="Company name" />
          </label>
          <label>
            <span>Target market</span>
            <select name="market" defaultValue="">
              <option value="" disabled>Choose a market</option>
              {targetMarkets.map((market) => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </label>
          <label className="contact-form-wide">
            <span>Message</span>
            <textarea name="message" placeholder="Product, current documents, certification status, and export goal." />
          </label>
          <div className="contact-form-actions">
            <p>Form submission will connect to the client intake workflow in the next build.</p>
            <a className="cere-button primary" href="mailto:contact@cere.com">Submit by email</a>
          </div>
        </form>
      </section>
    </SiteChrome>
  );
}
