"use client";

import { useMemo, useState } from "react";

const marketRoutes = [
  {
    id: "china",
    name: "China",
    zh: "中国",
    complexity: "Medium",
    timeline: "4-8 months",
    route: "HACCP readiness, GACC preparation, Chinese label review, manufacturer registration file.",
    requirements: ["HACCP", "GACC", "Chinese label", "Traceability", "Authority-facing profile"],
    documents: [
      "HACCP manual and hazard analysis",
      "GACC registration file",
      "Chinese label draft",
      "Production license and factory profile",
      "Traceability and sanitation records",
    ],
    products: ["Cashew", "Pepper", "Rice", "Dried fruit", "Coffee"],
    gaps: ["HACCP evidence", "GACC file", "Chinese label"],
  },
  {
    id: "eu",
    name: "European Union",
    zh: "欧盟",
    complexity: "High",
    timeline: "5-10 months",
    route: "Food safety system, traceability, buyer audit readiness, allergen and recall evidence.",
    requirements: ["HACCP", "Traceability", "Allergen control", "Supplier approval", "Recall procedure"],
    documents: [
      "Food safety system file",
      "Traceability procedure and batch records",
      "Supplier approval records",
      "Allergen and recall procedures",
      "Buyer audit evidence pack",
    ],
    products: ["Cashew", "Dried fruit", "Pepper", "Rice", "Processed food"],
    gaps: ["Traceability", "Supplier approval", "Buyer audit evidence"],
  },
  {
    id: "usa",
    name: "United States",
    zh: "美国",
    complexity: "High",
    timeline: "5-10 months",
    route: "Preventive-control mindset, importer expectations, sanitation records, supplier verification.",
    requirements: ["Food safety plan", "Preventive controls", "Sanitation records", "Supplier verification", "Recall readiness"],
    documents: [
      "Food safety plan",
      "Preventive controls records",
      "Sanitation and pest control logs",
      "Supplier verification file",
      "Recall and importer support file",
    ],
    products: ["Cashew", "Dried fruit", "Spices", "Coffee", "Processed food"],
    gaps: ["Preventive controls", "Sanitation evidence", "Importer file"],
  },
  {
    id: "japan",
    name: "Japan",
    zh: "日本",
    complexity: "Medium",
    timeline: "4-8 months",
    route: "Quality discipline, product specifications, process control, importer documentation.",
    requirements: ["HACCP", "Product specification", "Quality records", "Importer checks", "Complaint handling"],
    documents: [
      "HACCP evidence file",
      "Product specification sheet",
      "Process control records",
      "Quality inspection records",
      "Complaint handling procedure",
    ],
    products: ["Cashew", "Pepper", "Coffee", "Dried fruit", "Rice"],
    gaps: ["Product specification", "Quality records", "Process control"],
  },
  {
    id: "asean",
    name: "ASEAN",
    zh: "东盟",
    complexity: "Focused",
    timeline: "2-5 months",
    route: "Baseline food safety documents, export documentation, shipment evidence by destination.",
    requirements: ["Export documents", "HACCP baseline", "Certificate of origin", "Health certificate", "Shipment file"],
    documents: [
      "Export document checklist",
      "Certificate of origin support file",
      "Health certificate support evidence",
      "Baseline HACCP records",
      "Shipment and packing file",
    ],
    products: ["Cashew", "Rice", "Pepper", "Dried fruit", "Cassava"],
    gaps: ["Export documents", "Baseline HACCP", "Shipment evidence"],
  },
  {
    id: "middle-east",
    name: "Middle East",
    zh: "中东",
    complexity: "Medium",
    timeline: "4-8 months",
    route: "HALAL readiness, ingredient controls, HACCP documents, export health evidence.",
    requirements: ["HALAL readiness", "HACCP", "Ingredient controls", "Supplier declarations", "Health evidence"],
    documents: [
      "HALAL readiness checklist",
      "Ingredient and supplier declarations",
      "HACCP manual and records",
      "Cleaning and segregation evidence",
      "Export health evidence file",
    ],
    products: ["Cashew", "Rice", "Coffee", "Processed food", "Spices"],
    gaps: ["HALAL readiness", "Supplier declarations", "Health evidence"],
  },
];

const certificationBadges = [
  "HACCP",
  "GACC",
  "HALAL",
  "ISO 22000",
  "BRCGS",
  "Label Review",
  "Traceability",
  "Buyer Audit",
];

const productShowcase = [
  {
    name: "Nuts & Kernels",
    zh: "坚果与果仁",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rice",
    zh: "大米",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Pepper & Spices",
    zh: "胡椒与香料",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Coffee Beans",
    zh: "咖啡豆",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dried Fruit",
    zh: "果干",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Processed Food",
    zh: "加工食品",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=80",
  },
];

const documentCapabilities = [
  {
    title: "HACCP Manual",
    zh: "HACCP 手册",
    detail: "Defines the food safety system, process flow, hazard controls, CCP logic, monitoring, verification, and records.",
    work: ["Confirm product and process flow", "Identify hazards and control measures", "Prepare monitoring and verification records"],
  },
  {
    title: "GACC Registration File",
    zh: "GACC 注册资料",
    detail: "Organizes factory profile, product scope, licenses, process information, food safety evidence, and China-facing registration materials.",
    work: ["Check factory and product eligibility", "Prepare profile and supporting licenses", "Align documents with China route requirements"],
  },
  {
    title: "Label Review Pack",
    zh: "标签审核资料",
    detail: "Reviews product name, ingredients, nutrition, origin, claims, language, importer details, and destination-market label format.",
    work: ["Collect product formula and label draft", "Check mandatory label fields", "List corrections before printing"],
  },
  {
    title: "Traceability Records",
    zh: "追溯记录",
    detail: "Connects raw materials, batches, processing dates, packing, storage, shipment, and recall readiness.",
    work: ["Map batch coding method", "Link supplier and production records", "Prepare mock recall evidence"],
  },
  {
    title: "Training Records",
    zh: "培训记录",
    detail: "Shows that staff understand hygiene, food safety, CCP monitoring, cleaning, allergen control, and export requirements.",
    work: ["Define training topics", "Prepare attendance and assessment records", "Keep annual refresh evidence"],
  },
  {
    title: "SSOP & Sanitation Logs",
    zh: "卫生标准程序",
    detail: "Documents cleaning responsibilities, frequencies, chemicals, verification, pest control, water checks, and sanitation evidence.",
    work: ["Write cleaning procedures", "Set record templates", "Check water, pest, and hygiene evidence"],
  },
  {
    title: "Supplier Approval File",
    zh: "供应商审核资料",
    detail: "Collects supplier licenses, specifications, declarations, incoming checks, and risk-based approval evidence.",
    work: ["Build supplier list", "Collect declarations and specifications", "Set incoming inspection records"],
  },
  {
    title: "Buyer Audit Pack",
    zh: "买家审核包",
    detail: "Prepares a practical evidence set for buyers: system documents, records, photos, corrective actions, and readiness summary.",
    work: ["Organize key evidence", "Prepare gap and CAPA status", "Build a buyer-facing summary"],
  },
];

const journeySteps = [
  "Business Intake",
  "Market Selection",
  "Readiness Assessment",
  "Gap Analysis",
  "Compliance Workspace",
  "Evidence Management",
  "Certification Support",
  "Buyer Audit Support",
  "Continuous Compliance",
];

const lifecycleSolutions = [
  {
    title: "Before Export",
    zh: "出口前",
    items: ["Market requirements", "Product classification", "Readiness assessment", "Route planning"],
  },
  {
    title: "During Preparation",
    zh: "准备中",
    items: ["HACCP", "GACC", "Documents", "Training", "CAPA", "Lab report evidence"],
  },
  {
    title: "After Certification",
    zh: "认证后",
    items: ["Renewal", "Evidence upkeep", "Buyer audit", "New market expansion"],
  },
];

const resources = [
  "China Export Guide",
  "EU Food Export Guide",
  "GACC Explained",
  "HACCP Basics",
  "Buyer Audit Checklist",
  "Cambodia Export Updates",
];

const servicePackages = [
  ["Start Free", "Readiness Snapshot", "Rules-only market route and first-gap assessment."],
  ["Step 2", "Gap Analysis", "Consultant-reviewed report and preparation roadmap."],
  ["Step 3", "Compliance Workspace", "HACCP, GACC, documents, tasks, evidence, and consultant-reviewed drafts."],
  ["Ongoing", "Annual Support", "Renewal reminders, buyer audit readiness, and market expansion support."],
];

export function HomePage() {
  const [selectedMarkets, setSelectedMarkets] = useState(["china"]);
  const [featuredMarketId, setFeaturedMarketId] = useState("china");
  const [activeDocument, setActiveDocument] = useState(documentCapabilities[0]);

  const selectedRoutes = useMemo(
    () => marketRoutes.filter((market) => selectedMarkets.includes(market.id)),
    [selectedMarkets],
  );

  const featuredMarket = useMemo(
    () => marketRoutes.find((market) => market.id === featuredMarketId) ?? marketRoutes[0],
    [featuredMarketId],
  );

  const snapshot = useMemo(() => {
    const complexityPenalty = selectedRoutes.reduce((total, market) => {
      if (market.complexity === "High") return total + 14;
      if (market.complexity === "Medium") return total + 9;
      return total + 5;
    }, 0);
    const score = Math.max(18, Math.min(76, 68 - complexityPenalty + selectedRoutes.length * 4));
    const missing = Array.from(new Set(selectedRoutes.flatMap((market) => market.gaps))).slice(0, 6);
    const firstStep = selectedRoutes.some((market) => market.id === "china")
      ? "Start with HACCP + GACC gap analysis"
      : selectedRoutes.some((market) => market.complexity === "High")
        ? "Start with traceability and buyer-audit gap analysis"
        : "Start with baseline export readiness assessment";

    return {
      score,
      missing,
      firstStep,
      complexity: selectedRoutes.some((market) => market.complexity === "High")
        ? "High"
        : selectedRoutes.length > 1
          ? "Medium"
          : "Focused",
    };
  }, [selectedRoutes]);

  function toggleMarket(marketId: string) {
    setSelectedMarkets((current) => {
      if (current.includes(marketId)) {
        return current.length === 1 ? current : current.filter((item) => item !== marketId);
      }

      return [...current, marketId];
    });
  }

  function chooseFeaturedMarket(marketId: string) {
    setFeaturedMarketId(marketId);
    setSelectedMarkets((current) => (current.includes(marketId) ? current : [...current, marketId]));
  }

  return (
    <main className="site-shell">
      <header className="site-nav">
        <a className="brand" href="#home" aria-label="CERE home">
          <span>CERE</span>
          <small>Export Readiness for Cambodia Food Manufacturers</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#markets">Markets</a>
          <a href="#scope">Scope</a>
          <a href="#journey">How It Works</a>
          <a href="#workspace">Workspace</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
        </nav>
      </header>

      <section className="home-hero" id="home">
        <div className="home-hero-copy">
          <p className="eyebrow">Cambodia food export readiness</p>
          <h1>
            Prepare your factory for the markets that matter.
            <span>出口准备，而不是简单做证书。</span>
          </h1>
          <p>
            CERE helps food manufacturers understand destination-market requirements, close compliance gaps, and build
            the evidence needed for certification support, registration files, and buyer audits.
          </p>
          <div className="hero-cta">
            <a className="primary-link" href="#markets">Start Readiness Check</a>
            <a className="secondary-link" href="#scope">View Business Scope</a>
          </div>
        </div>

        <div className="hero-market-board" aria-label="Cambodia export destination board">
          <div className="hero-photo">
            <img
              alt="Agricultural export containers and trade route"
              src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80"
            />
            <div className="hero-photo-label">
              <span>Cambodia</span>
              <strong>Food Export Base</strong>
            </div>
          </div>
          <div className="destination-panel">
            <p className="eyebrow">Target destinations</p>
            <div className="destination-grid">
              {marketRoutes.map((market) => (
                <button
                  className={featuredMarket.id === market.id ? "destination-chip active" : "destination-chip"}
                  key={market.id}
                  onClick={() => chooseFeaturedMarket(market.id)}
                  type="button"
                >
                  <span>{market.name}</span>
                  <small>{market.zh}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="hero-document-panel">
            <div>
              <p className="eyebrow">Core documents</p>
              <strong>{featuredMarket.name} preparation file</strong>
              <small>{featuredMarket.zh} · {featuredMarket.timeline}</small>
            </div>
            <ul>
              {featuredMarket.documents.map((document) => (
                <li key={document}>{document}</li>
              ))}
            </ul>
          </div>
          <div className="cert-strip" aria-label="Certification readiness scope">
            {certificationBadges.slice(0, 5).map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section document-section" id="scope">
        <div className="site-section-heading">
          <p className="eyebrow">Document preparation</p>
          <h2>Files we help factories prepare before certification, registration, and buyer audits.</h2>
          <p className="zh">我们协助整理出口准备所需文件与证据，不负责发证或政府审批。</p>
        </div>
        <div className="document-layout">
          <div className="document-grid" aria-label="Document preparation scope">
            {documentCapabilities.map((document) => (
              <button
                className={activeDocument.title === document.title ? "document-chip active" : "document-chip"}
                key={document.title}
                onClick={() => setActiveDocument(document)}
                type="button"
              >
                <span>{document.title}</span>
                <small>{document.zh}</small>
              </button>
            ))}
          </div>
          <aside className="document-popover" aria-live="polite">
            <p className="eyebrow">What this file covers</p>
            <strong>{activeDocument.title}</strong>
            <small>{activeDocument.zh}</small>
            <p>{activeDocument.detail}</p>
            <ul>
              {activeDocument.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="certification-wall">
          {certificationBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </section>

      <section className="site-section product-section">
        <div className="site-section-heading">
          <p className="eyebrow">Export categories</p>
          <h2>Food and agricultural products we can support for export preparation.</h2>
        </div>
        <div className="product-showcase">
          {productShowcase.map((product) => (
            <article className="product-card" key={product.name}>
              <img alt="" src={product.image} />
              <strong>{product.name}</strong>
              <small>{product.zh}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section market-section" id="markets">
        <div className="site-section-heading">
          <p className="eyebrow">Target markets</p>
          <h2>Choose your export destination</h2>
          <p>Pick one or more markets to see the documents, readiness gaps, and first consulting step for each route.</p>
        </div>

        <div className="market-selector-layout">
          <div className="market-picker" aria-label="Target market selector">
            {marketRoutes.map((market) => (
              <button
                className={selectedMarkets.includes(market.id) ? "market-option active" : "market-option"}
                key={market.id}
                onClick={() => toggleMarket(market.id)}
                type="button"
              >
                <span>{market.name}</span>
                <small>{market.zh}</small>
              </button>
            ))}
          </div>

          <div className="snapshot-card">
            <p className="eyebrow">Your Readiness Snapshot</p>
            <div className="snapshot-score">
              <span>{snapshot.score}</span>
              <small>/100 estimated readiness</small>
            </div>
            <dl>
              <div>
                <dt>Target market</dt>
                <dd>{selectedRoutes.map((market) => market.name).join(", ")}</dd>
              </div>
              <div>
                <dt>Complexity</dt>
                <dd>{snapshot.complexity}</dd>
              </div>
              <div>
                <dt>Recommended first step</dt>
                <dd>{snapshot.firstStep}</dd>
              </div>
            </dl>
            <div className="missing-list">
              {snapshot.missing.map((gap) => (
                <span key={gap}>{gap}</span>
              ))}
            </div>
            <a className="primary-link" href="#pricing">Start Full Assessment</a>
          </div>
        </div>

        <div className="route-detail-grid">
          {selectedRoutes.map((market) => (
            <article className="route-detail-card" key={market.id}>
              <div>
                <span>{market.complexity}</span>
                <strong>{market.name}</strong>
              </div>
              <p>{market.route}</p>
              <small>{market.timeline}</small>
              <ul className="document-list">
                {market.documents.slice(0, 4).map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
              <ul>
                {market.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section" id="journey">
        <div className="site-section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Export capability is a journey, not a one-time certificate.</h2>
        </div>
        <div className="journey-line">
          {journeySteps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section" id="solutions">
        <div className="site-section-heading">
          <p className="eyebrow">Solutions across the export lifecycle</p>
          <h2>Before export, during preparation, and after certification.</h2>
        </div>
        <div className="lifecycle-grid">
          {lifecycleSolutions.map((stage) => (
            <article key={stage.title}>
              <strong>{stage.title}</strong>
              <small>{stage.zh}</small>
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section belief-section">
        <div className="site-section-heading">
          <p className="eyebrow">Why CERE</p>
          <h2>Rules, evidence, and continuous compliance.</h2>
        </div>
        <div className="belief-grid">
          <article>
            <strong>Rules First</strong>
            <p>Structured compliance logic comes first, so recommendations stay tied to route requirements and evidence.</p>
          </article>
          <article>
            <strong>Evidence Matters</strong>
            <p>Every recommendation should connect back to documents, records, reports, or operational evidence.</p>
          </article>
          <article>
            <strong>Built for Continuity</strong>
            <p>Export readiness continues through renewals, buyer audits, annual support, and market expansion.</p>
          </article>
        </div>
      </section>

      <section className="site-section workspace-preview" id="workspace">
        <div className="site-section-heading">
          <p className="eyebrow">Inside the workspace</p>
          <h2>From a free snapshot to a consultant-reviewed operating system.</h2>
        </div>
        <div className="workspace-mockup">
          <div className="mockup-sidebar">
            <span>Readiness</span>
            <span>Markets</span>
            <span>Documents</span>
            <span>Training</span>
            <span>CAPA</span>
          </div>
          <div className="mockup-main">
            <div className="mockup-score">
              <strong>{snapshot.score}/100</strong>
              <span>Export readiness</span>
            </div>
            <div className="mockup-grid">
              <span>HACCP</span>
              <span>GACC</span>
              <span>Evidence</span>
              <span>Tasks</span>
              <span>Buyer audit</span>
              <span>Annual support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section" id="pricing">
        <div className="site-section-heading">
          <p className="eyebrow">Service packages</p>
          <h2>Start free. Move into consulting when the route is clear.</h2>
        </div>
        <div className="package-grid">
          {servicePackages.map(([label, title, detail]) => (
            <article key={title}>
              <span>{label}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section resources-section" id="resources">
        <div className="site-section-heading">
          <p className="eyebrow">Resources</p>
          <h2>Guides, updates, and checklists for food exporters.</h2>
        </div>
        <div className="resource-grid">
          {resources.map((resource) => (
            <article key={resource}>
              <strong>{resource}</strong>
              <p>Coming soon</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>CERE</strong>
          <p>
            Readiness and compliance support only. CERE is not a certification body, laboratory, government approval
            authority, or guarantee of market access.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#home">Who We Are</a>
          <a href="#pricing">Contact</a>
          <a href="#resources">Resources</a>
          <a href="/workspace">Workspace</a>
        </nav>
      </footer>
    </main>
  );
}
