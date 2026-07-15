/* eslint-disable @next/next/no-html-link-for-pages */
import { markets, productCategories } from "./site-data";
import { SiteChrome } from "./site-chrome";

const marketCodes: Record<string, string> = {
  china: "CN",
  eu: "EU",
  usa: "US",
  japan: "JP",
  asean: "SEA",
  "middle-east": "ME",
};

const marketFocus: Record<string, string> = {
  china: "GACC + traceability",
  eu: "Food safety + buyer audit",
  usa: "FDA + preventive controls",
  japan: "Quality + specifications",
  asean: "Regional export files",
  "middle-east": "HALAL + ingredient control",
};

const problemBlocks = [
  { number: "01", title: "Market entry", tag: "Choose the right route", href: "/markets" },
  { number: "02", title: "Certification", tag: "Find and close gaps", href: "/solutions" },
  { number: "03", title: "Documentation", tag: "Build usable evidence", href: "/services" },
  { number: "04", title: "Buyer & audit", tag: "Prepare before review", href: "/process" },
];

const trustSignals = [
  { value: "06", label: "Priority markets" },
  { value: String(productCategories.length).padStart(2, "0"), label: "Product categories" },
  { value: "4", label: "Readiness stages" },
  { value: "1", label: "Evidence-led route" },
];

export function HomePage() {
  return (
    <SiteChrome>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-kicker"><span /> Cambodia Export Readiness Engine</p>
          <h1>From Cambodia to the markets that matter.</h1>
          <p className="home-hero-line">Choose the route. See the requirements. Build the evidence.</p>
          <div className="home-actions">
            <a className="home-button light" href="#markets">Explore markets <span>↗</span></a>
            <a className="home-button outline" href="/contact">Book consultation</a>
          </div>
          <div className="hero-mini-proof" aria-label="CERE focus areas">
            <span>Food exporters</span>
            <span>Factories</span>
            <span>Cooperatives</span>
          </div>
        </div>

        <div className="hero-map-block">
          <div className="map-block-head">
            <span>Export routes</span>
            <strong>Start in Cambodia</strong>
          </div>
          <div className="world-map-visual" role="img" aria-label="World map showing CERE export routes from Cambodia">
            <span className="map-origin-pulse" aria-hidden="true" />
            <span className="map-origin-name">Cambodia</span>
            <span className="map-route route-cn" aria-hidden="true" />
            <span className="map-route route-eu" aria-hidden="true" />
            <span className="map-route route-us" aria-hidden="true" />
            <span className="map-route route-jp" aria-hidden="true" />
            <span className="map-route route-sea" aria-hidden="true" />
            <span className="map-route route-me" aria-hidden="true" />
            {markets.map((market) => (
              <a
                className={`map-node node-${market.slug}`}
                href={`/markets#${market.slug}`}
                key={market.slug}
                aria-label={`${market.name} market route`}
              >
                <b>{marketCodes[market.slug]}</b>
                <span>{market.name}</span>
              </a>
            ))}
          </div>
          <a className="map-block-link" href="/markets">View all market routes <span>→</span></a>
        </div>
      </section>

      <section className="home-block home-markets" id="markets">
        <div className="home-section-title">
          <div>
            <p>Where we work</p>
            <h2>Choose a destination.</h2>
          </div>
          <a href="/markets">Market guides <span>↗</span></a>
        </div>
        <div className="market-block-grid">
          {markets.map((market, index) => (
            <a className={`market-block market-tone-${index + 1}`} href={`/markets#${market.slug}`} key={market.slug}>
              <span className="market-code">{marketCodes[market.slug]}</span>
              <strong>{market.name}</strong>
              <small>{marketFocus[market.slug]}</small>
              <span className="block-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="home-block home-problems">
        <div className="home-section-title inverse">
          <div>
            <p>What we solve</p>
            <h2>One clear readiness path.</h2>
          </div>
          <a href="/solutions">See solutions <span>↗</span></a>
        </div>
        <div className="problem-flow">
          {problemBlocks.map((problem, index) => (
            <a href={problem.href} className="problem-node" key={problem.title}>
              <span className="problem-number">{problem.number}</span>
              <div className="problem-symbol" aria-hidden="true">
                <i /><i /><i />
              </div>
              <strong>{problem.title}</strong>
              <small>{problem.tag}</small>
              {index < problemBlocks.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
            </a>
          ))}
        </div>
      </section>

      <section className="home-block home-trust">
        <div className="trust-statement">
          <p>Why CERE</p>
          <h2>Evidence before claims.</h2>
          <span>Practical preparation for market, buyer and audit review.</span>
        </div>
        <div className="trust-signal-grid">
          {trustSignals.map((signal) => (
            <div className="trust-signal" key={signal.label}>
              <strong>{signal.value}</strong>
              <span>{signal.label}</span>
            </div>
          ))}
        </div>
        <div className="trust-standard-row" aria-label="Standards and frameworks supported">
          <span>HACCP</span><span>GACC</span><span>FSMA</span><span>HALAL</span><span>TRACEABILITY</span>
        </div>
        <div className="trust-action">
          <span>CERE provides readiness and compliance support — not certification or market-access guarantees.</span>
          <a href="/contact">Plan your route <b>→</b></a>
        </div>
      </section>
    </SiteChrome>
  );
}
