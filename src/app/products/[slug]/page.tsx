import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentProducts, getGuidesForProduct, getProduct } from "../../../lib/content-data";
import { PageIntro, SiteChrome } from "../../site-chrome";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return contentProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} Export Readiness | CERE`,
    description: product.overview,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedGuides = getGuidesForProduct(product.slug);

  return (
    <SiteChrome>
      <PageIntro eyebrow="Product Route" title={`${product.name} export readiness`}>
        {product.overview}
      </PageIntro>

      <section className="cere-section muted">
        <div className="resource-detail-grid">
          <article>
            <span>Category</span>
            <strong>{product.category}</strong>
          </article>
          <article>
            <span>HS code</span>
            <strong>{product.hsCode}</strong>
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
