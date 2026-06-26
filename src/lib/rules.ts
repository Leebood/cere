import {
  documentLabels,
  type DocumentRecord,
  type DocumentType,
  type GaccStatus,
  type HaccpStatus,
  type ReadinessScore,
} from "./domain";

export type MarketProfile = {
  marketGroup: "China" | "US_EU" | "ASEAN" | "General";
  standards: string[];
  auditTypes: string[];
  exportControls: string[];
  requiredDocuments: DocumentType[];
  notes: string;
};

export function getMarketProfile(targetMarket: string): MarketProfile {
  const market = targetMarket.toLowerCase();

  if (market.includes("china")) {
    return {
      marketGroup: "China",
      standards: ["HACCP / Codex-aligned food safety system", "GACC registration readiness", "CIFER submission package"],
      auditTypes: ["HACCP certification audit", "Competent authority document review", "GACC registration review"],
      exportControls: ["Chinese label and product description check", "Authority recommendation route", "Exporter and product registration consistency"],
      requiredDocuments: ["gacc_application", "certificate_of_origin", "phytosanitary_certificate", "traceability_recall_plan"],
      notes: "China projects should run HACCP implementation and GACC registration preparation in parallel.",
    };
  }

  if (market.includes("eu") || market.includes("europe") || market.includes("us") || market.includes("usa")) {
    return {
      marketGroup: "US_EU",
      standards: ["HACCP / Codex-aligned food safety system", "Buyer audit readiness", "Importer food safety requirements"],
      auditTypes: ["HACCP certification audit", "Customer or importer audit", "Food safety and traceability review"],
      exportControls: ["Allergen control", "Traceability and recall", "Supplier approval", "Residue or contaminant evidence when requested"],
      requiredDocuments: [
        "certificate_of_origin",
        "phytosanitary_certificate",
        "export_health_certificate",
        "allergen_control_plan",
        "traceability_recall_plan",
        "supplier_approval_record",
      ],
      notes: "US/EU projects usually need stronger traceability, allergen, supplier approval, and buyer-audit evidence.",
    };
  }

  if (
    market.includes("asean") ||
    market.includes("southeast") ||
    market.includes("thai") ||
    market.includes("vietnam") ||
    market.includes("singapore") ||
    market.includes("malaysia") ||
    market.includes("indonesia")
  ) {
    return {
      marketGroup: "ASEAN",
      standards: ["HACCP / GMP readiness", "Destination country import document readiness"],
      auditTypes: ["HACCP or GMP audit", "Importer document review", "Local market access check"],
      exportControls: ["Certificate of origin", "Health or phytosanitary certificate", "Importer-specific labeling requirements"],
      requiredDocuments: ["certificate_of_origin", "phytosanitary_certificate", "export_health_certificate"],
      notes: "Southeast Asia projects are often lighter than China or US/EU, but importer and destination-country rules still change the checklist.",
    };
  }

  return {
    marketGroup: "General",
    standards: ["HACCP / GMP readiness", "Importer requirement check"],
    auditTypes: ["HACCP or buyer audit", "Document review"],
    exportControls: ["Certificate of origin", "Importer-specific requirements"],
    requiredDocuments: ["certificate_of_origin"],
    notes: "Use the general route until the destination country and buyer requirements are confirmed.",
  };
}

export function determineGaccRequirement(productType: string, targetMarket: string) {
  const product = productType.toLowerCase();
  const market = targetMarket.toLowerCase();
  const isCashew = product.includes("cashew");
  const isChina = market.includes("china");

  if (isChina && isCashew) {
    return {
      required: true,
      registrationType: "official_recommendation",
      authority: "MAFF / General Directorate of Agriculture",
      reason: "Cashew products entering China should be prepared for GACC registration under nuts and seeds related controls.",
    };
  }

  return {
    required: false,
    registrationType: null,
    authority: null,
    reason: "GACC registration is not required for the selected market in this MVP rule set.",
  };
}

export function checkHaccpOperationEligibility(operationStartDate: string | null) {
  if (!operationStartDate) {
    return {
      eligible: false,
      daysCompleted: 0,
      daysRemaining: 90,
    };
  }

  const start = new Date(operationStartDate);
  const today = new Date();
  const milliseconds = today.getTime() - start.getTime();
  const daysCompleted = Math.max(Math.floor(milliseconds / 86_400_000), 0);

  return {
    eligible: daysCompleted >= 90,
    daysCompleted,
    daysRemaining: Math.max(90 - daysCompleted, 0),
  };
}

export const requiredDocumentsByTrack: Record<"gap" | "haccp" | "gacc", DocumentType[]> = {
  gap: ["business_license", "food_production_license", "factory_layout", "process_flow"],
  haccp: [
    "process_flow",
    "factory_layout",
    "temperature_record",
    "sanitation_record",
    "pest_control_record",
    "training_record",
    "haccp_manual",
    "ssop",
    "hazard_analysis",
    "ccp_plan",
  ],
  gacc: [
    "business_license",
    "food_production_license",
    "haccp_manual",
    "ssop",
    "hazard_analysis",
    "ccp_plan",
    "gacc_application",
  ],
};

export function getRequiredDocumentsForTrack(
  targetMarket: string,
  track: keyof typeof requiredDocumentsByTrack,
) {
  const base = requiredDocumentsByTrack[track];
  const marketProfile = getMarketProfile(targetMarket);

  if (track === "gap") {
    return [...new Set([...base, ...marketProfile.requiredDocuments.slice(0, 2)])];
  }

  if (track === "haccp") {
    return [...new Set([...base, ...marketProfile.requiredDocuments.filter((documentType) => documentType !== "gacc_application")])];
  }

  if (marketProfile.marketGroup !== "China") {
    return [];
  }

  return [...new Set([...base, ...marketProfile.requiredDocuments])];
}

export function getMissingDocuments(
  documents: DocumentRecord[],
  clientId: string,
  track: keyof typeof requiredDocumentsByTrack,
  targetMarket = "General",
) {
  const uploaded = new Set(
    documents
      .filter((document) => document.clientId === clientId && document.status !== "missing")
      .map((document) => document.documentType),
  );

  return getRequiredDocumentsForTrack(targetMarket, track).filter((documentType) => !uploaded.has(documentType));
}

export function getDocumentSummary(documents: DocumentRecord[], clientId: string) {
  const uploaded = documents.filter((document) => document.clientId === clientId);

  return {
    uploadedCount: uploaded.length,
    acceptedCount: uploaded.filter((document) => document.status === "accepted").length,
    reviewNeededCount: uploaded.filter((document) => document.status === "review_needed").length,
  };
}

export function getTrackCompletion(status: HaccpStatus | GaccStatus, statuses: readonly string[]) {
  const index = Math.max(statuses.indexOf(status), 0);
  return Math.round(((index + 1) / statuses.length) * 100);
}

export function formatMissingDocuments(missing: DocumentType[]) {
  if (missing.length === 0) {
    return "No missing documents for this track.";
  }

  return missing.map((documentType) => documentLabels[documentType]).join(", ");
}

export function calculateReadinessScore({
  clientId,
  projectId,
  targetMarket,
  documents,
  haccpStatus,
  gaccStatus,
}: {
  clientId: string;
  projectId: string;
  targetMarket: string;
  documents: DocumentRecord[];
  haccpStatus: HaccpStatus;
  gaccStatus: GaccStatus;
}): ReadinessScore {
  const marketProfile = getMarketProfile(targetMarket);
  const haccpMissing = getMissingDocuments(documents, clientId, "haccp", targetMarket);
  const gaccMissing = getMissingDocuments(documents, clientId, "gacc", targetMarket);
  const gapMissing = getMissingDocuments(documents, clientId, "gap", targetMarket);
  const uploaded = documents.filter((document) => document.clientId === clientId);
  const required = [...new Set([...getRequiredDocumentsForTrack(targetMarket, "gap"), ...getRequiredDocumentsForTrack(targetMarket, "haccp"), ...getRequiredDocumentsForTrack(targetMarket, "gacc")])];
  const documentCompleteness = required.length === 0 ? 100 : Math.round(((required.length - new Set([...gapMissing, ...haccpMissing, ...gaccMissing]).size) / required.length) * 100);

  const haccpStageScore: Record<HaccpStatus, number> = {
    GAP_ANALYSIS: 15,
    DOCUMENTATION: 35,
    TRAINING: 50,
    OPERATION_RUNNING: 65,
    INTERNAL_AUDIT: 80,
    CERTIFICATION_AUDIT: 90,
    CERTIFIED: 100,
  };
  const gaccStageScore: Record<GaccStatus, number> = {
    ELIGIBILITY_CHECK: marketProfile.marketGroup === "China" ? 10 : 100,
    DOCUMENT_COLLECTION: 35,
    AUTHORITY_REVIEW: 55,
    CIFER_PREPARATION: 70,
    SUBMITTED: 85,
    FOLLOW_UP: 92,
    APPROVED: 100,
  };

  const hasTraining = uploaded.some((document) => document.documentType === "training_record");
  const hasWaterTest = uploaded.some((document) => document.documentType === "water_test_report");
  const hasLabelEvidence = uploaded.some((document) =>
    ["allergen_control_plan", "traceability_recall_plan", "gacc_application"].includes(document.documentType),
  );
  const auditRisk = Math.max(0, 100 - haccpMissing.length * 8 - gapMissing.length * 5);

  const dimensions = {
    haccpReadiness: Math.min(haccpStageScore[haccpStatus], Math.max(documentCompleteness, 20)),
    gaccReadiness: marketProfile.marketGroup === "China" ? Math.min(gaccStageScore[gaccStatus], Math.max(100 - gaccMissing.length * 12, 10)) : 100,
    documentCompleteness,
    trainingReadiness: hasTraining ? 80 : 25,
    labTestReadiness: hasWaterTest ? 75 : 20,
    labelCompliance: hasLabelEvidence ? 70 : marketProfile.marketGroup === "General" ? 50 : 25,
    auditRisk,
  };

  const overallScore = Math.round(
    (dimensions.haccpReadiness * 0.22 +
      dimensions.gaccReadiness * 0.16 +
      dimensions.documentCompleteness * 0.22 +
      dimensions.trainingReadiness * 0.12 +
      dimensions.labTestReadiness * 0.1 +
      dimensions.labelCompliance * 0.08 +
      dimensions.auditRisk * 0.1),
  );

  const majorGaps = [
    haccpMissing.length > 0 ? `${haccpMissing.length} HACCP documents or records missing` : null,
    marketProfile.marketGroup === "China" && gaccMissing.length > 0 ? `${gaccMissing.length} GACC documents missing` : null,
    !hasTraining ? "Training evidence is missing" : null,
    !hasWaterTest ? "Lab or water test evidence is missing" : null,
  ].filter((gap): gap is string => Boolean(gap));

  return {
    id: `score-${clientId}-${projectId}`,
    clientId,
    projectId,
    overallScore,
    dimensions,
    majorGaps,
    calculatedAt: new Date().toISOString(),
  };
}
