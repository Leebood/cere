export type ContentMarket = {
  slug: string;
  name: string;
  region: string;
  overview: string;
  requirements: string[];
  documents: string[];
};

export type ContentProduct = {
  slug: string;
  name: string;
  category: string;
  hsCode: string;
  overview: string;
};

export type Guide = {
  slug: string;
  title: string;
  question: string;
  quickAnswer: string;
  marketSlug?: string;
  productSlug?: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const contentMarkets: ContentMarket[] = [
  {
    slug: "china",
    name: "China",
    region: "Asia",
    overview:
      "China food export preparation usually starts with GACC registration readiness, HACCP evidence, Chinese label review, factory profile preparation, and traceability records.",
    requirements: ["GACC preparation", "HACCP evidence", "Chinese label review", "Traceability records"],
    documents: ["Factory profile", "HACCP package", "Label review pack", "Product specification"],
  },
  {
    slug: "eu",
    name: "European Union",
    region: "Europe",
    overview:
      "EU food export preparation focuses on traceability, supplier control, product specifications, labeling review, and buyer audit evidence.",
    requirements: ["Traceability", "Supplier approval", "Label review", "Buyer audit evidence"],
    documents: ["Food safety manual", "Recall procedure", "Supplier approval file", "Audit evidence pack"],
  },
  {
    slug: "usa",
    name: "United States",
    region: "North America",
    overview:
      "US food export preparation commonly requires FDA-facing facility information, preventive-control thinking, sanitation records, supplier verification, and label review.",
    requirements: ["Food safety plan", "Sanitation records", "Supplier verification", "Nutrition label review"],
    documents: ["Food safety plan", "SSOP logs", "Supplier verification file", "Recall support file"],
  },
];

export const contentProducts: ContentProduct[] = [
  {
    slug: "cashew",
    name: "Cashew Nuts",
    category: "Nuts",
    hsCode: "080132",
    overview:
      "Cashew export readiness usually depends on food safety records, product specification, traceability, labeling, and destination-market documentation.",
  },
  {
    slug: "pepper",
    name: "Pepper",
    category: "Spices",
    hsCode: "090411",
    overview:
      "Pepper export readiness usually depends on product grading, contamination controls, pesticide residue evidence, traceability, and buyer audit files.",
  },
  {
    slug: "rice",
    name: "Rice",
    category: "Grains",
    hsCode: "100630",
    overview:
      "Rice export readiness usually depends on origin evidence, quality specifications, storage controls, shipment documentation, and market-specific inspection requirements.",
  },
  {
    slug: "coffee",
    name: "Coffee",
    category: "Beverages",
    hsCode: "090111",
    overview:
      "Coffee export readiness usually depends on product specification, origin evidence, moisture control, labeling, and buyer documentation.",
  },
];

export const guides: Guide[] = [
  {
    slug: "can-cambodian-food-products-export-to-china",
    title: "Can Cambodian Food Products Export to China?",
    question: "Can Cambodian food products export to China?",
    marketSlug: "china",
    quickAnswer:
      "Yes. Cambodian food manufacturers can prepare for China export, but the route depends on product category, factory status, GACC preparation, HACCP evidence, Chinese label review, product specifications, and traceability records. CERE helps organize readiness and evidence before formal registration or buyer review.",
    sections: [
      {
        heading: "What does the China route usually require?",
        body:
          "A China route normally starts with product category review, factory profile preparation, food safety system evidence, product specification review, Chinese label readiness, and traceability records that can be reviewed by consultants, buyers, or relevant authorities.",
      },
      {
        heading: "What should a factory prepare first?",
        body:
          "The first step is a readiness review. Before spending money on registration, packaging, or labels, the factory should check whether HACCP evidence, monitoring records, training evidence, pest control, water testing, product specifications, and traceability files are complete.",
      },
      {
        heading: "How does CERE help?",
        body:
          "CERE does not issue certificates or approve market access. It helps the business understand gaps, prepare documents, organize evidence, and build a practical roadmap for China export readiness.",
      },
    ],
    faq: [
      {
        question: "Does CERE issue GACC registration?",
        answer:
          "No. CERE supports preparation and documentation. Registration decisions are handled by the relevant authorities and official procedures.",
      },
      {
        question: "Is HACCP always required?",
        answer:
          "HACCP evidence is commonly important for food export readiness and buyer confidence. The exact route depends on product, factory status, and market requirements.",
      },
      {
        question: "What is the first paid step?",
        answer:
          "The first paid step is usually a gap analysis that reviews current evidence and turns missing items into a practical action plan.",
      },
    ],
  },
  {
    slug: "what-documents-are-needed-for-gacc-preparation",
    title: "What Documents Are Needed for GACC Preparation?",
    question: "What documents are needed for GACC preparation?",
    marketSlug: "china",
    quickAnswer:
      "GACC preparation usually requires a factory profile, business and production license evidence, product specifications, food safety system records, process flow, traceability records, label files, and supporting audit evidence. The exact package depends on the product category and factory status.",
    sections: [
      {
        heading: "Which documents should be checked first?",
        body:
          "Start with basic company documents, production licenses, product scope, factory layout, process flow, HACCP evidence, and traceability records. These are the foundation before preparing more detailed market files.",
      },
      {
        heading: "What causes delays?",
        body:
          "Common delays include inconsistent product names, missing monitoring records, incomplete traceability files, outdated water tests, and labels that do not match destination-market expectations.",
      },
    ],
    faq: [
      {
        question: "Can CERE submit the registration?",
        answer:
          "CERE focuses on readiness and document preparation. Submission responsibility depends on the official route, local partners, and the relevant authority process.",
      },
      {
        question: "Can AI generate the full package?",
        answer:
          "No. Rules and consultant review come first. AI can assist drafting in paid workflows, but evidence and requirements must be checked by humans.",
      },
    ],
  },
  {
    slug: "haccp-readiness-checklist-for-food-factories",
    title: "HACCP Readiness Checklist for Food Factories",
    question: "What should a food factory prepare before HACCP work starts?",
    quickAnswer:
      "A food factory should prepare product descriptions, process flow, hazard analysis inputs, CCP monitoring evidence, GMP/SSOP records, training records, water test evidence, pest control records, traceability files, and internal audit evidence before HACCP work becomes audit-ready.",
    sections: [
      {
        heading: "Why readiness matters before documentation",
        body:
          "A manual alone is not enough. HACCP readiness depends on operating evidence: monitoring records, responsible staff, training proof, corrective actions, verification, and traceability records.",
      },
      {
        heading: "What should be reviewed first?",
        body:
          "Review process flow, product risk, sanitation records, CCP candidates, training history, pest control, water testing, and whether records are maintained consistently.",
      },
    ],
    faq: [
      {
        question: "Can HACCP and GACC preparation happen at the same time?",
        answer:
          "Yes. HACCP system building and China route preparation can run in parallel, because GACC preparation often depends on the same food safety and evidence base.",
      },
      {
        question: "Does CERE certify HACCP?",
        answer:
          "No. CERE helps prepare readiness and evidence. Certification is handled by qualified certification bodies.",
      },
    ],
  },
];

export function getMarket(slug: string) {
  return contentMarkets.find((market) => market.slug === slug);
}

export function getProduct(slug: string) {
  return contentProducts.find((product) => product.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesForMarket(slug: string) {
  return guides.filter((guide) => guide.marketSlug === slug);
}

export function getGuidesForProduct(slug: string) {
  return guides.filter((guide) => guide.productSlug === slug);
}
