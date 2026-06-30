export const productCategories = [
  "Nuts & kernels",
  "Coffee",
  "Pepper & spices",
  "Rice",
  "Dried fruit",
  "Processed food",
  "Beverages",
  "Agricultural ingredients",
];

export const solutions = [
  {
    title: "Export Readiness Assessment",
    problem: "The business is not sure whether it can enter a target market.",
    detail:
      "Review the product, destination market, current documents, and factory evidence before committing to a certification route.",
    deliverables: ["Readiness summary", "Gap list", "Preparation roadmap"],
  },
  {
    title: "Compliance Preparation",
    problem: "Documents, records, and operating procedures are incomplete or inconsistent.",
    detail:
      "Prepare the practical systems behind HACCP, GMP, SSOP, SOPs, training records, traceability, and corrective actions.",
    deliverables: ["System documents", "Record templates", "Implementation checklist"],
  },
  {
    title: "Documentation",
    problem: "The factory has operations, but the evidence is not organized for external review.",
    detail: "Build manuals, forms, records, templates, and document indexes that match the route and audit purpose.",
    deliverables: ["Manuals", "Forms", "Document register"],
  },
  {
    title: "Label Review",
    problem: "The label needs to match destination-market expectations before printing or shipment.",
    detail: "Review product name, ingredients, nutrition, claims, origin, importer details, language, and mandatory fields.",
    deliverables: ["Label gap list", "Correction notes", "Review checklist"],
  },
  {
    title: "Audit Support",
    problem: "A certification body or buyer needs evidence that can be reviewed quickly.",
    detail: "Prepare audit files, evidence summaries, corrective action status, and mock-audit readiness checks.",
    deliverables: ["Audit pack", "CAPA status", "Evidence index"],
  },
  {
    title: "Continuous Compliance",
    problem: "Export readiness must be maintained after the first audit or registration package.",
    detail: "Support renewals, training updates, record maintenance, buyer audit preparation, and new-market expansion.",
    deliverables: ["Renewal tracker", "Annual review", "Update plan"],
  },
];

export const deliverables = [
  {
    group: "Management System",
    purpose: "Shows how the factory controls food safety and export preparation.",
    items: ["Food safety manual", "HACCP package", "GMP / SSOP / SOP set"],
  },
  {
    group: "Documentation",
    purpose: "Turns daily operations into reviewable records and templates.",
    items: ["Hazard analysis", "CCP plan", "Monitoring forms", "Traceability file"],
  },
  {
    group: "Training",
    purpose: "Shows that staff understand hygiene, process control, and export requirements.",
    items: ["Training plan", "Attendance records", "Assessment records"],
  },
  {
    group: "Audit",
    purpose: "Prepares evidence for buyer audits, certification audits, and internal checks.",
    items: ["Buyer audit pack", "Internal audit plan", "CAPA status"],
  },
  {
    group: "Registration",
    purpose: "Organizes market-entry preparation for routes that require registration or label review.",
    items: ["GACC preparation file", "Factory profile", "Label review pack"],
  },
];

export const markets = [
  {
    slug: "china",
    name: "China",
    summary: "Best for factories preparing GACC registration, Chinese label review, and structured food safety evidence.",
    requirements: ["HACCP evidence", "GACC preparation", "Chinese label review", "Factory profile"],
    documents: ["HACCP package", "GACC file", "Label review pack", "Traceability records"],
    timeline: "4-8 months",
    consultation: "Route review + GACC readiness check",
  },
  {
    slug: "eu",
    name: "European Union",
    summary: "Best for exporters facing buyer audit expectations, traceability checks, and stricter supplier controls.",
    requirements: ["Traceability", "Supplier approval", "Allergen control", "Buyer audit evidence"],
    documents: ["Food safety manual", "Supplier approval file", "Recall procedure", "Audit evidence pack"],
    timeline: "5-10 months",
    consultation: "Traceability + buyer audit gap analysis",
  },
  {
    slug: "usa",
    name: "United States",
    summary: "Best for businesses needing stronger preventive-control thinking and importer-facing documentation.",
    requirements: ["Food safety plan", "Sanitation records", "Supplier verification", "Recall readiness"],
    documents: ["Food safety plan", "SSOP logs", "Supplier verification file", "Recall support file"],
    timeline: "5-10 months",
    consultation: "Food safety plan readiness review",
  },
  {
    slug: "japan",
    name: "Japan",
    summary: "Best for exporters that need stronger product specifications, quality discipline, and process records.",
    requirements: ["Product specification", "Quality records", "Process control", "Importer documentation"],
    documents: ["Specification sheet", "HACCP evidence file", "Quality inspection records", "Complaint procedure"],
    timeline: "4-8 months",
    consultation: "Product specification + quality record review",
  },
  {
    slug: "asean",
    name: "ASEAN",
    summary: "Best for regional export routes where baseline food safety and shipment documentation must be organized.",
    requirements: ["Export documents", "Origin support", "Health certificate evidence", "Shipment file"],
    documents: ["Export checklist", "Certificate support file", "Health evidence", "Packing and shipment file"],
    timeline: "2-5 months",
    consultation: "Baseline export documentation check",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    summary: "Best for products where HALAL readiness, ingredient controls, and export health evidence are important.",
    requirements: ["HALAL readiness", "Ingredient controls", "HACCP records", "Export health evidence"],
    documents: ["HALAL readiness checklist", "Ingredient declarations", "Cleaning evidence", "Health evidence file"],
    timeline: "4-8 months",
    consultation: "HALAL readiness + ingredient file review",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Initial consultation",
    purpose: "Understand product, target market, factory status, and current documents.",
    output: "Consultation notes and required information list.",
    client: "Product details, target market, current licenses, and existing certification status.",
  },
  {
    number: "02",
    title: "Route review",
    purpose: "Identify market requirements, certification route, registration needs, and likely gaps.",
    output: "Recommended route and preparation priorities.",
    client: "Confirm product scope, buyer request, destination, and timeline.",
  },
  {
    number: "03",
    title: "Gap analysis",
    purpose: "Review documents and factory evidence, then prepare a practical readiness roadmap.",
    output: "Gap report, risk list, and corrective action priorities.",
    client: "Share records, photos, process flow, training files, and audit history if available.",
  },
  {
    number: "04",
    title: "Preparation work",
    purpose: "Build the required files, records, templates, training evidence, and corrective actions.",
    output: "Document packages, record templates, and evidence index.",
    client: "Implement records, assign responsible staff, and provide operational evidence.",
  },
  {
    number: "05",
    title: "Audit support",
    purpose: "Support certification, buyer audit, registration preparation, and annual maintenance.",
    output: "Audit pack, review notes, and annual follow-up plan.",
    client: "Maintain records, respond to findings, and update files when products or markets change.",
  },
];

export const platformItems = [
  "Client workspace",
  "Document center",
  "Task tracking",
  "Evidence library",
  "Training records",
  "Renewal reminders",
];
