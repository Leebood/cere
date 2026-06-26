export const MAX_AI_CALLS_PER_CLIENT = 20;

export const certificationTypes = ["HACCP", "GACC", "HALAL", "ISO22000", "FSSC22000", "BRCGS", "Organic"] as const;

export const marketGroups = ["China", "US_EU", "EU", "Japan", "USA", "Malaysia", "Indonesia", "Middle East", "ASEAN", "General"] as const;

export const productCategories = ["Cashew", "Nuts", "Seeds", "Pepper", "Rice", "Mango", "Dried Fruit"] as const;

export const haccpStatuses = [
  "GAP_ANALYSIS",
  "DOCUMENTATION",
  "TRAINING",
  "OPERATION_RUNNING",
  "INTERNAL_AUDIT",
  "CERTIFICATION_AUDIT",
  "CERTIFIED",
] as const;

export const gaccStatuses = [
  "ELIGIBILITY_CHECK",
  "DOCUMENT_COLLECTION",
  "AUTHORITY_REVIEW",
  "CIFER_PREPARATION",
  "SUBMITTED",
  "FOLLOW_UP",
  "APPROVED",
] as const;

export const documentTypes = [
  "business_license",
  "food_production_license",
  "factory_layout",
  "process_flow",
  "certificate_of_origin",
  "phytosanitary_certificate",
  "export_health_certificate",
  "allergen_control_plan",
  "traceability_recall_plan",
  "supplier_approval_record",
  "water_test_report",
  "pest_control_record",
  "training_record",
  "temperature_record",
  "sanitation_record",
  "haccp_manual",
  "ssop",
  "hazard_analysis",
  "ccp_plan",
  "gacc_application",
] as const;

export const generationTypes = [
  "gap_analysis",
  "gacc_package",
  "training_package",
  "internal_audit_plan",
  "export_readiness_roadmap",
  "haccp_product_process",
  "haccp_hazard_analysis",
  "haccp_ccp_plan",
  "haccp_ssop",
  "haccp_gmp_prp",
  "haccp_manual_summary",
] as const;

export type HaccpStatus = (typeof haccpStatuses)[number];
export type GaccStatus = (typeof gaccStatuses)[number];
export type DocumentType = (typeof documentTypes)[number];
export type GenerationType = (typeof generationTypes)[number];
export type CertificationType = (typeof certificationTypes)[number];
export type MarketGroup = (typeof marketGroups)[number];
export type ProductCategory = (typeof productCategories)[number];

export type Client = {
  id: string;
  name: string;
  country: string;
  factoryLocation: string;
  contactName: string;
  contactEmail: string;
  productType: string;
  targetMarket: string;
  employeeCount: number;
};

export type Project = {
  id: string;
  clientId: string;
  certificationType: CertificationType;
  productCategory: ProductCategory;
  haccpStatus: HaccpStatus;
  gaccStatus: GaccStatus;
  haccpStartDate: string;
  haccpOperationStartDate: string | null;
  expectedCertificationDate: string | null;
};

export type DocumentRecord = {
  id: string;
  clientId: string;
  projectId: string;
  documentType: DocumentType;
  fileName: string;
  storageProvider: "local_placeholder" | "google_drive";
  storageId: string;
  status: "uploaded" | "missing" | "review_needed" | "accepted";
  uploadedAt: string;
};

export type AiGeneration = {
  id: string;
  clientId: string;
  projectId: string;
  generationType: GenerationType;
  inputJson: Record<string, unknown>;
  outputJson: Record<string, unknown>;
  modelName: string;
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
  };
  costEstimate: number;
  createdAt: string;
  regenerateReason?: string;
};

export type KnowledgeSource = {
  id: string;
  title: string;
  category: "HACCP" | "GACC" | "Market" | "Training" | "Labeling" | "Export";
  marketGroup: MarketGroup | "All";
  productCategory: ProductCategory | "All";
  sourceType: "internal_note" | "template" | "regulation_reference" | "checklist";
  summary: string;
  tags: string[];
  updatedAt: string;
};

export type KnowledgeCitation = {
  sourceId: string;
  title: string;
  excerpt: string;
};

export type FutureModule = {
  id: string;
  title: string;
  phase: string;
  status: "planned" | "designing" | "building" | "available";
  description: string;
};

export type ReadinessScore = {
  id: string;
  clientId: string;
  projectId: string;
  overallScore: number;
  dimensions: {
    haccpReadiness: number;
    gaccReadiness: number;
    documentCompleteness: number;
    trainingReadiness: number;
    labTestReadiness: number;
    labelCompliance: number;
    auditRisk: number;
  };
  majorGaps: string[];
  calculatedAt: string;
};

export type AuditLog = {
  id: string;
  clientId: string;
  projectId: string;
  action: string;
  details: string;
  createdAt: string;
};

export type HaccpSectionType =
  | "PRODUCT_PROCESS"
  | "HAZARD_ANALYSIS"
  | "CCP_PLAN"
  | "SSOP"
  | "GMP_PRP"
  | "MANUAL_SUMMARY";

export type HaccpSection = {
  id: string;
  clientId: string;
  projectId: string;
  sectionType: HaccpSectionType;
  status: "not_started" | "generated" | "reviewed";
  inputJson: Record<string, unknown>;
  outputJson: Record<string, unknown> | null;
  reviewerNotes: string;
  generatedAt: string | null;
  reviewedAt: string | null;
};

export type AppState = {
  clients: Client[];
  projects: Project[];
  documents: DocumentRecord[];
  aiGenerations: AiGeneration[];
  auditLogs: AuditLog[];
  haccpSections: HaccpSection[];
  readinessScores: ReadinessScore[];
  knowledgeSources: KnowledgeSource[];
  futureModules: FutureModule[];
};

export const documentLabels: Record<DocumentType, string> = {
  business_license: "Business license",
  food_production_license: "Food production license",
  factory_layout: "Factory layout",
  process_flow: "Process flow",
  certificate_of_origin: "Certificate of origin",
  phytosanitary_certificate: "Phytosanitary certificate",
  export_health_certificate: "Export health certificate",
  allergen_control_plan: "Allergen control plan",
  traceability_recall_plan: "Traceability and recall plan",
  supplier_approval_record: "Supplier approval record",
  water_test_report: "Water test report",
  pest_control_record: "Pest control record",
  training_record: "Training record",
  temperature_record: "Temperature record",
  sanitation_record: "Sanitation record",
  haccp_manual: "HACCP manual",
  ssop: "SSOP",
  hazard_analysis: "Hazard analysis",
  ccp_plan: "CCP plan",
  gacc_application: "GACC application",
};

export const haccpStatusLabels: Record<HaccpStatus, string> = {
  GAP_ANALYSIS: "Gap analysis",
  DOCUMENTATION: "Documentation",
  TRAINING: "Training",
  OPERATION_RUNNING: "90-day operation",
  INTERNAL_AUDIT: "Internal audit",
  CERTIFICATION_AUDIT: "Certification audit",
  CERTIFIED: "Certified",
};

export const gaccStatusLabels: Record<GaccStatus, string> = {
  ELIGIBILITY_CHECK: "Eligibility check",
  DOCUMENT_COLLECTION: "Document collection",
  AUTHORITY_REVIEW: "Authority review",
  CIFER_PREPARATION: "CIFER preparation",
  SUBMITTED: "Submitted",
  FOLLOW_UP: "Follow-up",
  APPROVED: "Approved",
};
