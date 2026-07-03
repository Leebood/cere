import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentMarkets, getGuidesForMarket, getMarket } from "../../../lib/content-data";
import { PageIntro, SiteChrome } from "../../site-chrome";

type MarketPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return contentMarkets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarket(slug);

  if (!market) {
    return {};
  }

  return {
    title: `${market.name} Export Readiness | CERE`,
    description: market.overview,
  };
}

export default async function MarketDetailPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = getMarket(slug);

  if (!market) {
    notFound();
  }

  const relatedGuides = getGuidesForMarket(market.slug);

  return (
    <SiteChrome>
      <PageIntro eyebrow="Market Route" title={`${market.name} export readiness`}>
        {market.overview}
      </PageIntro>

      <section className="cere-section muted">
        <div className="resource-detail-grid">
          <article>
            <span>Core requirements</span>
            <ul>
              {market.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>Common files</span>
            <ul>
              {market.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>Related guides</span>
            <div className="resource-link-list">
              {relatedGuides.length > 0 ? (
                relatedGuides.map((guide) => (
                  <Link href={`/guides/${guide.slug}`} key={guide.slug}>{guide.question}</Link>
                ))
              ) : (
                <Link href="/resources">View all resources</Link>
              )}
            </div>
          </article>
        </div>
      </section>
    </SiteChrome>
  );
}
