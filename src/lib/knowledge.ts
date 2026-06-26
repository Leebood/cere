import type { GenerationType, KnowledgeCitation, KnowledgeSource } from "./domain";
import { getMarketProfile } from "./rules";

export function retrieveKnowledgeContext({
  generationType,
  targetMarket,
  productType,
  sources,
}: {
  generationType: GenerationType;
  targetMarket: string;
  productType: string;
  sources: KnowledgeSource[];
}): KnowledgeCitation[] {
  const marketProfile = getMarketProfile(targetMarket);
  const product = productType.toLowerCase();
  const generationKeywords = getGenerationKeywords(generationType);

  return sources
    .filter((source) => source.marketGroup === "All" || source.marketGroup === marketProfile.marketGroup)
    .filter((source) => source.productCategory === "All" || product.includes(source.productCategory.toLowerCase()))
    .map((source) => ({
      source,
      score:
        source.tags.filter((tag) => generationKeywords.includes(tag)).length +
        source.tags.filter((tag) => product.includes(tag)).length +
        (source.marketGroup === marketProfile.marketGroup ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ source }) => ({
      sourceId: source.id,
      title: source.title,
      excerpt: source.summary,
    }));
}

function getGenerationKeywords(generationType: GenerationType) {
  if (generationType === "gap_analysis") {
    return ["gap", "readiness", "documents", "audit"];
  }

  if (generationType === "gacc_package") {
    return ["gacc", "china", "cifer", "registration"];
  }

  if (generationType === "training_package") {
    return ["training", "khmer", "worker", "quiz"];
  }

  if (generationType.startsWith("haccp_")) {
    return ["haccp", "hazard", "ccp", "ssop", "gmp", "records"];
  }

  return ["export", "compliance"];
}
