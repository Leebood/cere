import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getMarket, getProduct, guides } from "../../../lib/content-data";
import { PageIntro, SiteChrome } from "../../site-chrome";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {};
  }

  return {
    title: `${guide.title} | CERE`,
    description: guide.quickAnswer,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const market = guide.marketSlug ? getMarket(guide.marketSlug) : undefined;
  const product = guide.productSlug ? getProduct(guide.productSlug) : undefined;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <SiteChrome>
      <PageIntro eyebrow="Guide" title={guide.title}>
        {guide.question}
      </PageIntro>

      <section className="cere-section">
        <div className="guide-content-layout">
          <article className="guide-article">
            <blockquote className="quick-answer">
              <span>Quick answer</span>
              <p>{guide.quickAnswer}</p>
            </blockquote>

            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <section>
              <h2>FAQ</h2>
              <div className="faq-list">
                {guide.faq.map((item) => (
                  <article key={item.question}>
                    <strong>{item.question}</strong>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </article>

          <aside className="guide-sidebar">
            <span>Related route</span>
            {market ? <Link href={`/markets/${market.slug}`}>{market.name}</Link> : null}
            {product ? <Link href={`/products/${product.slug}`}>{product.name}</Link> : null}
            <Link href="/contact">Book consultation</Link>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </SiteChrome>
  );
}
