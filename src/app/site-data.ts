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
    problem: "Know where you stand before you start.",
    detail:
      "Evaluate the factory, products, processes, current documents, and target market requirements before committing to a route.",
    deliverables: ["Readiness score", "Gap list", "Feasibility report"],
  },
  {
    title: "Gap Analysis",
    problem: "See the gap. Close the gap.",
    detail:
      "Compare the current situation with target market requirements and build a clear action plan with priorities.",
    deliverables: ["Gap report", "Action plan", "Priority list"],
  },
  {
    title: "Documentation",
    problem: "Get your documents right before external review.",
    detail:
      "Prepare, review, and organize manuals, forms, records, labels, templates, and document indexes for the export route.",
    deliverables: ["Document checklist", "Template package", "Review and correction"],
  },
  {
    title: "Audit Support",
    problem: "Be ready when a buyer or certification body asks for evidence.",
    detail:
      "Support pre-audit preparation, evidence organization, corrective action tracking, and practical audit readiness.",
    deliverables: ["Pre-audit checklist", "Audit pack", "Follow-up actions"],
  },
  {
    title: "Continuous Compliance",
    problem: "Stay compliant. Stay export-ready.",
    detail:
      "Support regulation updates, annual reviews, record maintenance, renewal preparation, and new market assessment.",
    deliverables: ["Regulation updates", "Annual audit support", "New market assessment"],
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
    summary: "GACC registration, HACCP readiness, Chinese labels, and structured traceability evidence.",
    requirements: ["HACCP evidence", "GACC preparation", "Chinese label review", "Factory profile"],
    documents: ["HACCP package", "GACC file", "Label review pack", "Traceability records"],
    timeline: "4-8 months",
    consultation: "Route review + GACC readiness check",
  },
  {
    slug: "eu",
    name: "European Union",
    summary: "EU food safety expectations, traceability, labeling review, and buyer audit evidence.",
    requirements: ["Traceability", "Supplier approval", "Label review", "Buyer audit evidence"],
    documents: ["Food safety manual", "Supplier approval file", "Recall procedure", "Audit evidence pack"],
    timeline: "5-10 months",
    consultation: "Traceability + buyer audit gap analysis",
  },
  {
    slug: "usa",
    name: "United States",
    summary: "FDA registration support, FSMA-style preventive controls, sanitation records, and nutrition labeling.",
    requirements: ["Food safety plan", "Sanitation records", "Supplier verification", "Nutrition label review"],
    documents: ["Food safety plan", "SSOP logs", "Supplier verification file", "Recall support file"],
    timeline: "5-10 months",
    consultation: "Food safety plan readiness review",
  },
  {
    slug: "japan",
    name: "Japan",
    summary: "Japanese labeling, importer documentation, product specifications, and quality discipline.",
    requirements: ["Product specification", "Quality records", "Japanese label review", "Importer documentation"],
    documents: ["Specification sheet", "HACCP evidence file", "Quality inspection records", "Complaint procedure"],
    timeline: "4-8 months",
    consultation: "Product specification + quality record review",
  },
  {
    slug: "asean",
    name: "ASEAN",
    summary: "Regional food safety preparation, HALAL readiness where needed, local standards, and shipment files.",
    requirements: ["Export documents", "Origin support", "Local standard review", "Shipment file"],
    documents: ["Export checklist", "Certificate support file", "Health evidence", "Packing and shipment file"],
    timeline: "2-5 months",
    consultation: "Baseline export documentation check",
  },
  {
    slug: "middle-east",
    name: "Middle East",
    summary: "SFDA/GSO-style preparation, HALAL readiness, ingredient controls, and export health evidence.",
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
