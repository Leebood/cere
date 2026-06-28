"use client";

import { useMemo, useState } from "react";
import {
  documentLabels,
  gaccStatusLabels,
  gaccStatuses,
  generationTypes,
  haccpStatusLabels,
  haccpStatuses,
  MAX_AI_CALLS_PER_CLIENT,
  type AiGeneration,
  type AppState,
  type Client,
  type DocumentType,
  type GenerationType,
  type HaccpSection,
} from "@/lib/domain";
import { retrieveKnowledgeContext } from "@/lib/knowledge";
import { initialState } from "@/lib/seed";
import {
  calculateReadinessScore,
  checkHaccpOperationEligibility,
  determineGaccRequirement,
  formatMissingDocuments,
  getDocumentSummary,
  getMarketProfile,
  getMissingDocuments,
  getTrackCompletion,
} from "@/lib/rules";

const platformBoundary =
  "Readiness and compliance support only. Rules and workflow first; limited AI only in paid workspaces. Not a certification body, laboratory, government approval authority, or guarantee of market access.";

const zhLabels: Record<string, string> = {
  "Cambodia Food Export OS": "柬埔寨食品出口操作系统",
  "Certification consulting workspace": "认证咨询工作台",
  "Operating system for food exporters": "面向食品出口企业的操作系统",
  "Strategic position": "战略定位",
  "Commercial access model": "免费与付费阶段",
  "Export Readiness Score": "出口准备度评分",
  "Readiness core": "准备度核心",
  "Documents and evidence": "文件与证据",
  "Paid AI actions": "付费 AI 动作",
  "HACCP workstream": "HACCP 工作流",
  "Strategic roadmap": "战略路线图",
  "Language layer": "语言层预留",
  "Annual support": "年度支持",
  "Gap Analysis": "差距分析报告",
  "GACC Package": "GACC 注册资料包",
  "Training Package": "培训材料包",
  "Internal Audit Plan": "内审计划",
  "Improvement Roadmap": "改进路线图",
  Draft: "草稿",
};

const accessStages = [
  {
    title: "Free Readiness Snapshot",
    zhTitle: "免费出口准备度快照",
    status: "No AI",
    description: "Rules-based scoring, major gaps, market fit, and lead capture. Enough to show urgency without giving away the full consulting work.",
    items: ["Basic company profile", "Target market selection", "0-100 readiness score", "Top gap categories"],
  },
  {
    title: "Paid Compliance Workspace",
    zhTitle: "付费合规工作台",
    status: "Limited AI",
    description: "A guided project space for HACCP, GACC, documents, evidence, reports, training packs, and consultant review.",
    items: ["Full gap report", "HACCP section drafts", "GACC package checklist", "Task and CAPA workflow"],
  },
  {
    title: "Annual Export Support",
    zhTitle: "年度出口支持",
    status: "Ongoing",
    description: "Continuous monitoring for evidence, renewals, buyer audits, market expansion, and account management.",
    items: ["Evidence expiry control", "Renewal reminders", "Buyer audit readiness", "CRM follow-up"],
  },
];

const operatingModules = [
  {
    title: "Readiness Core",
    detail: "Company profile, target market, score, gap analysis, priorities, and improvement roadmap.",
  },
  {
    title: "Rules Engine",
    detail: "Market and certification requirements are handled by code rules. AI explains and drafts, but does not decide.",
  },
  {
    title: "Evidence System",
    detail: "Documents, records, lab report evidence, training records, pest control, water tests, and traceability proof.",
  },
  {
    title: "Workflow / CAPA",
    detail: "Every major gap becomes a task, owner, due date, corrective action, and closure evidence.",
  },
  {
    title: "Agent Layer",
    detail: "Research, Sales, Compliance, and CRM agents support high-value work after the paid stage begins.",
  },
  {
    title: "Consulting CRM",
    detail: "Lead status, service recommendation, quotation stage, meetings, and annual support lifecycle.",
  },
];

const nextDocumentOptions: DocumentType[] = [
  "food_production_license",
  "certificate_of_origin",
  "phytosanitary_certificate",
  "export_health_certificate",
  "allergen_control_plan",
  "traceability_recall_plan",
  "supplier_approval_record",
  "water_test_report",
  "temperature_record",
  "sanitation_record",
  "pest_control_record",
  "training_record",
  "haccp_manual",
  "ssop",
  "hazard_analysis",
  "ccp_plan",
  "gacc_application",
];

const haccpGenerationSteps: {
  label: string;
  type: GenerationType;
  sectionType: HaccpSection["sectionType"];
}[] = [
  {
    label: "Product & Process",
    type: "haccp_product_process",
    sectionType: "PRODUCT_PROCESS",
  },
  {
    label: "Hazard Analysis",
    type: "haccp_hazard_analysis",
    sectionType: "HAZARD_ANALYSIS",
  },
  {
    label: "CCP Plan",
    type: "haccp_ccp_plan",
    sectionType: "CCP_PLAN",
  },
  {
    label: "SSOP",
    type: "haccp_ssop",
    sectionType: "SSOP",
  },
  {
    label: "GMP / PRP",
    type: "haccp_gmp_prp",
    sectionType: "GMP_PRP",
  },
  {
    label: "Manual Summary",
    type: "haccp_manual_summary",
    sectionType: "MANUAL_SUMMARY",
  },
];

const generationTitles: Record<GenerationType, { en: string; zh: string }> = {
  gap_analysis: { en: "Gap Analysis Report", zh: "差距分析报告" },
  gacc_package: { en: "GACC Registration Package", zh: "GACC 注册资料包" },
  training_package: { en: "Training Package", zh: "培训材料包" },
  internal_audit_plan: { en: "Internal Audit Plan", zh: "内审计划" },
  export_readiness_roadmap: { en: "Export Readiness Improvement Roadmap", zh: "出口准备度改进路线图" },
  haccp_product_process: { en: "HACCP Product & Process", zh: "HACCP 产品与工艺" },
  haccp_hazard_analysis: { en: "HACCP Hazard Analysis", zh: "HACCP 危害分析" },
  haccp_ccp_plan: { en: "HACCP CCP Plan", zh: "HACCP CCP 计划" },
  haccp_ssop: { en: "HACCP SSOP", zh: "HACCP 卫生标准操作程序" },
  haccp_gmp_prp: { en: "HACCP GMP / PRP", zh: "HACCP GMP / 前提方案" },
  haccp_manual_summary: { en: "HACCP Manual Summary", zh: "HACCP 手册概要" },
};

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatDateTime(value: string) {
  return value.replace("T", " ").replace(".000Z", " UTC");
}

function createBlankHaccpSections(clientId: string, projectId: string): HaccpSection[] {
  return haccpGenerationSteps.map((step) => ({
    id: createId("section"),
    clientId,
    projectId,
    sectionType: step.sectionType,
    status: "not_started",
    inputJson: {},
    outputJson: null,
    reviewerNotes: "",
    generatedAt: null,
    reviewedAt: null,
  }));
}

function createGeneration(
  client: Client,
  projectId: string,
  generationType: GenerationType,
  inputJson: Record<string, unknown>,
  regenerateReason?: string,
): AiGeneration {
  const base = {
    client: client.name,
    product: client.productType,
    market: client.targetMarket,
  };
  const marketProfile = getMarketProfile(client.targetMarket);
  const gaccRequirement = determineGaccRequirement(client.productType, client.targetMarket);

  const outputs: Record<GenerationType, Record<string, unknown>> = {
    gap_analysis: {
      executive_summary: `${client.name} should follow the ${marketProfile.marketGroup} route. HACCP work can proceed immediately while market-specific export and audit evidence is collected.`,
      major_gaps: ["Food production license is not yet accepted", "90-day HACCP operation evidence is incomplete"],
      medium_gaps: ["Factory layout needs consultant review", `${marketProfile.marketGroup} market evidence is not yet complete`],
      recommended_actions: ["Close missing statutory files", "Start daily operation record control", ...marketProfile.exportControls],
      estimated_timeline: "14 to 18 weeks from kickoff, depending on operation record readiness.",
      disclaimer: platformBoundary,
    },
    gacc_package: {
      required: gaccRequirement.required,
      company_profile_en: `${client.name} is a Cambodia-based cashew processor located in ${client.factoryLocation}.`,
      product_description_en: `${client.productType} intended for export to ${client.targetMarket}.`,
      authority_recommendation_letter_draft: gaccRequirement.required
        ? "Draft recommendation package for MAFF / General Directorate of Agriculture review."
        : "GACC package is not required for this target market under the MVP rule set.",
      document_checklist: gaccRequirement.required
        ? ["Business license", "Food production license", "HACCP manual", "Hazard analysis", "CCP plan", "SSOP"]
        : marketProfile.requiredDocuments.map((documentType) => documentLabels[documentType]),
      disclaimer: platformBoundary,
    },
    training_package: {
      management_training: "Management briefing on export readiness, certification responsibilities, and corrective-action ownership.",
      haccp_team_training: "HACCP team module covering hazard analysis, CCP monitoring, verification, and record control.",
      worker_training_khmer: "Khmer worker module covering handwashing, hygiene, sanitation, allergen awareness, pest reporting, and CCP record discipline.",
      quiz_questions: [
        "When should CCP monitoring records be completed?",
        "What should workers do when sanitation tools are damaged?",
        "Who must be informed when a critical limit is exceeded?",
      ],
      attendance_template: ["Name", "Role", "Department", "Training topic", "Signature", "Date"],
      disclaimer: platformBoundary,
    },
    internal_audit_plan: {
      audit_scope: "HACCP implementation, sanitation, pest control, training records, CCP monitoring, traceability, and China export readiness.",
      priority_findings_to_verify: [
        "Roasting temperature records are incomplete",
        "Metal detection records are missing",
        "Worker food safety training records are missing",
        "Raw material traceability is incomplete",
        "Water test is older than 12 months",
        "Formal pest control plan is missing",
      ],
      audit_schedule: ["Opening meeting", "Document review", "Factory walk-through", "Record sampling", "Finding review", "Corrective action assignment"],
      expected_evidence: ["Temperature logs", "Metal detector checks", "Training attendance", "Supplier lot records", "Water test report", "Pest control records"],
      disclaimer: platformBoundary,
    },
    export_readiness_roadmap: {
      current_score_note: "Demo pack baseline: HACCP 25%, GACC 10%, documents 40%, training 15%, lab tests 20%, overall 22%.",
      thirty_day_actions: ["Create HACCP manual", "Draft hazard analysis", "Define CCP plan", "Start worker training records"],
      sixty_day_actions: ["Run CCP monitoring records", "Complete SSOP", "Update water testing", "Launch pest control records"],
      ninety_day_actions: ["Complete internal audit", "Close corrective actions", "Prepare GACC package", "Review export documentation"],
      success_target: "Reach 70%+ export readiness before external audit or authority review preparation.",
      disclaimer: platformBoundary,
    },
    haccp_product_process: {
      ...base,
      product_description: "Cashew kernels processed under controlled receiving, roasting, cooling, metal detection, and packing steps.",
      process_steps: ["Raw material receiving", "Sorting", "Drying", "Roasting", "Cooling", "Metal detection", "Packing", "Storage"],
      disclaimer: platformBoundary,
    },
    haccp_hazard_analysis: {
      hazards: [
        { step: "Receiving", hazard: "Aflatoxin or foreign material", control: "Supplier approval and incoming inspection" },
        { step: "Roasting", hazard: "Survival of pathogens", control: "Validated time and temperature control" },
        { step: "Packing", hazard: "Metal fragments", control: "Metal detector verification" },
      ],
      disclaimer: platformBoundary,
    },
    haccp_ccp_plan: {
      ccp_plan: [
        { ccp: "Roasting", critical_limit: "Validated roast profile", monitoring: "Batch temperature and time record" },
        { ccp: "Metal detection", critical_limit: "Fe, non-Fe, stainless test pieces detected", monitoring: "Start, hourly, and end checks" },
      ],
      disclaimer: platformBoundary,
    },
    haccp_ssop: {
      programs: ["Cleaning and sanitation", "Personal hygiene", "Water quality", "Pest control", "Cross-contamination prevention"],
      disclaimer: platformBoundary,
    },
    haccp_gmp_prp: {
      prerequisite_programs: ["Supplier management", "Equipment maintenance", "Training", "Traceability", "Recall readiness"],
      disclaimer: platformBoundary,
    },
    haccp_manual_summary: {
      manual_sections: ["Scope", "HACCP team", "Product description", "Process flow", "Hazard analysis", "CCP plan", "Verification", "Records"],
      disclaimer: platformBoundary,
    },
  };

  return {
    id: createId("gen"),
    clientId: client.id,
    projectId,
    generationType,
    inputJson,
    outputJson: outputs[generationType],
    modelName: "mock-structured-generator",
    tokenUsage: {
      promptTokens: 800 + generationTypes.indexOf(generationType) * 40,
      completionTokens: 950 + generationTypes.indexOf(generationType) * 55,
    },
    costEstimate: Number(((1750 + generationTypes.indexOf(generationType) * 95) * 0.000002).toFixed(4)),
    createdAt: new Date().toISOString(),
    regenerateReason,
  };
}

export function Workbench() {
  const [state, setState] = useState<AppState>(initialState);
  const [selectedClientId, setSelectedClientId] = useState(initialState.clients[0]?.id ?? "");
  const [newClientName, setNewClientName] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType>("food_production_license");
  const [regenerateReason, setRegenerateReason] = useState("");

  const selectedClient = state.clients.find((client) => client.id === selectedClientId) ?? state.clients[0];
  const selectedProject = state.projects.find((project) => project.clientId === selectedClient?.id);

  const clientGenerations = useMemo(
    () => state.aiGenerations.filter((generation) => generation.clientId === selectedClient?.id),
    [selectedClient?.id, state.aiGenerations],
  );

  if (!selectedClient || !selectedProject) {
    return <main className="empty-state">No client selected.</main>;
  }

  const project = selectedProject;
  const documentSummary = getDocumentSummary(state.documents, selectedClient.id);
  const marketProfile = getMarketProfile(selectedClient.targetMarket);
  const gapMissing = getMissingDocuments(state.documents, selectedClient.id, "gap", selectedClient.targetMarket);
  const haccpMissing = getMissingDocuments(state.documents, selectedClient.id, "haccp", selectedClient.targetMarket);
  const gaccMissing = getMissingDocuments(state.documents, selectedClient.id, "gacc", selectedClient.targetMarket);
  const gaccRequirement = determineGaccRequirement(selectedClient.productType, selectedClient.targetMarket);
  const operation = checkHaccpOperationEligibility(project.haccpOperationStartDate);
  const readinessScore = calculateReadinessScore({
    clientId: selectedClient.id,
    projectId: project.id,
    targetMarket: selectedClient.targetMarket,
    documents: state.documents,
    haccpStatus: project.haccpStatus,
    gaccStatus: project.gaccStatus,
  });
  const aiCallsUsed = clientGenerations.length;
  const canGenerate = aiCallsUsed < MAX_AI_CALLS_PER_CLIENT;

  function addClient() {
    const name = newClientName.trim();
    if (!name) {
      return;
    }

    const clientId = createId("client");
    const projectId = createId("project");

    setState((current) => ({
      ...current,
      clients: [
        ...current.clients,
        {
          id: clientId,
          name,
          country: "Cambodia",
          factoryLocation: "Factory location pending",
          contactName: "Contact pending",
          contactEmail: "pending@example.com",
          productType: "roasted cashew kernels",
          targetMarket: "China",
          employeeCount: 0,
        },
      ],
      projects: [
        ...current.projects,
        {
          id: projectId,
          clientId,
          certificationType: "HACCP",
          productCategory: "Cashew",
          haccpStatus: "GAP_ANALYSIS",
          gaccStatus: "ELIGIBILITY_CHECK",
          haccpStartDate: new Date().toISOString().slice(0, 10),
          haccpOperationStartDate: null,
          expectedCertificationDate: null,
        },
      ],
      haccpSections: [...current.haccpSections, ...createBlankHaccpSections(clientId, projectId)],
      auditLogs: [
        {
          id: createId("audit"),
          clientId,
          projectId,
          action: "client_created",
          details: "Client and parallel HACCP/GACC project tracks created.",
          createdAt: new Date().toISOString(),
        },
        ...current.auditLogs,
      ],
    }));
    setSelectedClientId(clientId);
    setNewClientName("");
  }

  function addDocument() {
    const existing = state.documents.some(
      (document) => document.clientId === selectedClient.id && document.documentType === selectedDocumentType,
    );

    if (existing) {
      return;
    }

    setState((current) => ({
      ...current,
      documents: [
        ...current.documents,
        {
          id: createId("doc"),
          clientId: selectedClient.id,
          projectId: project.id,
          documentType: selectedDocumentType,
          fileName: `${selectedDocumentType}.pdf`,
          storageProvider: "local_placeholder",
          storageId: `local/${selectedDocumentType}`,
          status: "review_needed",
          uploadedAt: new Date().toISOString(),
        },
      ],
      auditLogs: [
        {
          id: createId("audit"),
          clientId: selectedClient.id,
          projectId: project.id,
          action: "document_uploaded",
          details: `${documentLabels[selectedDocumentType]} added as local placeholder.`,
          createdAt: new Date().toISOString(),
        },
        ...current.auditLogs,
      ],
    }));
  }

  function generate(generationType: GenerationType, forceRegenerate = false) {
    if (!canGenerate) {
      return;
    }

    const exists = clientGenerations.some((generation) => generation.generationType === generationType);
    if (exists && !forceRegenerate) {
      return;
    }

    if (exists && !regenerateReason.trim()) {
      return;
    }

    const inputJson = {
      clientProfile: selectedClient,
      uploadedDocuments: state.documents.filter((document) => document.clientId === selectedClient.id),
      retrievedContext: retrieveKnowledgeContext({
        generationType,
        targetMarket: selectedClient.targetMarket,
        productType: selectedClient.productType,
        sources: state.knowledgeSources,
      }),
      missingDocuments: {
        gap: gapMissing,
        haccp: haccpMissing,
        gacc: gaccMissing,
      },
      rules: {
        gaccRequirement,
        marketProfile,
        operation,
      },
    };

    const generation = createGeneration(
      selectedClient,
      project.id,
      generationType,
      inputJson,
      forceRegenerate ? regenerateReason.trim() : undefined,
    );

    setState((current) => ({
      ...current,
      aiGenerations: [generation, ...current.aiGenerations],
      haccpSections: updateHaccpSection(current.haccpSections, generation),
      auditLogs: [
        {
          id: createId("audit"),
          clientId: selectedClient.id,
          projectId: project.id,
          action: forceRegenerate ? "ai_regenerated" : "ai_generated",
          details: `${generationType} generated through unified AI function.`,
          createdAt: new Date().toISOString(),
        },
        ...current.auditLogs,
      ],
    }));
    setRegenerateReason("");
  }

  return (
    <main className="public-shell">
      <header className="public-nav">
        <div>
          <strong>CERE</strong>
          <span>Cambodia Export Readiness Engine</span>
        </div>
        <nav aria-label="Page sections">
          <a href="#process">Process</a>
          <a href="#architecture">Architecture</a>
          <a href="#workspace">Demo</a>
        </nav>
      </header>

      <section className="client-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Cambodia Food Export OS
            <Zh text={zhLabels["Cambodia Food Export OS"]} />
          </p>
          <h1>
            Export readiness, certification consulting, and compliance workflow in one platform.
            <Zh text="把出口准备度、认证咨询和合规流程放进一个系统。" />
          </h1>
          <p>
            CERE helps food exporters understand whether they are ready for target markets such as China, the EU, the US,
            Japan, and ASEAN, then turns gaps into documents, evidence, tasks, and consultant-reviewed next steps.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#workspace">View demo workspace</a>
            <a className="secondary-link" href="#process">See workflow</a>
          </div>
        </div>

        <div className="readiness-preview" aria-label="Readiness score preview">
          <div>
            <span>{readinessScore.overallScore}%</span>
            <strong>Export Readiness Score</strong>
            <p>{selectedClient.name}</p>
          </div>
          <div className="preview-bars">
            <ScorePill label="HACCP" value={readinessScore.dimensions.haccpReadiness} />
            <ScorePill label="GACC" value={readinessScore.dimensions.gaccReadiness} />
            <ScorePill label="Documents" value={readinessScore.dimensions.documentCompleteness} />
            <ScorePill label="Training" value={readinessScore.dimensions.trainingReadiness} />
          </div>
        </div>
      </section>

      <section className="client-section" id="process">
        <div className="section-header">
          <p className="eyebrow">
            Business flow
            <Zh text="业务流程" />
          </p>
          <h2>From readiness score to export support</h2>
          <p>
            The platform is designed as a guided operating flow, not a marketplace and not a government approval portal.
          </p>
        </div>
        <div className="process-grid">
          {[
            ["01", "Readiness intake", "Factory profile, product category, target market, and existing evidence."],
            ["02", "Score and gaps", "Rules generate a 0-100 readiness score and identify the highest-priority weaknesses."],
            ["03", "Consulting workspace", "HACCP, GACC, documents, training, audit plan, and evidence review move into one project space."],
            ["04", "CAPA and tasks", "Every gap becomes a corrective action with owner, deadline, evidence, and closure status."],
            ["05", "Annual support", "After project delivery, the factory keeps renewal reminders, evidence tracking, and buyer audit readiness."],
          ].map(([step, title, detail]) => (
            <article className="process-card" key={step}>
              <span>{step}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="client-section split-section" id="architecture">
        <div className="section-header">
          <p className="eyebrow">
            Platform architecture
            <Zh text="平台业务架构" />
          </p>
          <h2>Rules handle judgment. Consultants review. AI drafts only where it adds value.</h2>
          <p>{platformBoundary}</p>
        </div>
        <div className="architecture-grid">
          {operatingModules.map((module) => (
            <article className="architecture-card" key={module.title}>
              <strong>{module.title}</strong>
              <p>{module.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="client-section">
        <div className="section-header">
          <p className="eyebrow">
            Service path
            <Zh text="服务路径" />
          </p>
          <h2>Clear free entry, paid delivery, and long-term support</h2>
        </div>
        <div className="stage-grid">
          {accessStages.map((stage) => (
            <article className="stage-card" key={stage.title}>
              <div>
                <span>{stage.status}</span>
                <strong>
                  {stage.title}
                  <Zh text={stage.zhTitle} />
                </strong>
              </div>
              <p>{stage.description}</p>
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="client-section deliverables-section">
        <div className="section-header">
          <p className="eyebrow">What clients get</p>
          <h2>Practical outputs for food export preparation</h2>
        </div>
        <div className="deliverable-grid">
          {[
            "Export Readiness Score",
            "Gap Analysis Report",
            "HACCP Workstream",
            "GACC Readiness Package",
            "Training Evidence",
            "Audit Preparation Plan",
            "Lab Report Evidence Tracking",
            "Annual Compliance Support",
          ].map((item) => (
            <article key={item}>{item}</article>
          ))}
        </div>
      </section>

      <section className="client-section demo-workspace" id="workspace">
        <div className="section-header">
          <p className="eyebrow">
            Demo workspace
            <Zh text="演示工作台" />
          </p>
          <h2>{selectedClient.name}</h2>
          <p>
            {selectedClient.factoryLocation} · {selectedClient.productType} · Target: {selectedClient.targetMarket}
          </p>
        </div>

        <div className="demo-layout">
          <aside className="demo-clients">
            <div className="new-client">
              <input
                value={newClientName}
                onChange={(event) => setNewClientName(event.target.value)}
                placeholder="New client name"
                aria-label="New client name"
              />
              <button onClick={addClient}>Add</button>
            </div>
            <nav className="client-list" aria-label="Clients">
              {state.clients.map((client) => (
                <button
                  key={client.id}
                  className={client.id === selectedClient.id ? "client-link active" : "client-link"}
                  onClick={() => setSelectedClientId(client.id)}
                >
                  <span>{client.name}</span>
                  <small>{client.productType}</small>
                </button>
              ))}
            </nav>
          </aside>

          <div className="demo-main">
            <section className="grid two">
              <TrackCard
                title="HACCP track"
                status={haccpStatusLabels[project.haccpStatus]}
                progress={getTrackCompletion(project.haccpStatus, haccpStatuses)}
                detail={
                  operation.eligible
                    ? "90-day operation requirement is ready for audit planning."
                    : `${operation.daysCompleted} days completed, ${operation.daysRemaining} days remaining.`
                }
              />
              <TrackCard
                title="GACC track"
                status={gaccStatusLabels[project.gaccStatus]}
                progress={getTrackCompletion(project.gaccStatus, gaccStatuses)}
                detail={gaccRequirement.reason}
              />
            </section>

            <section className="panel readiness-panel">
              <div className="readiness-score">
                <div>
                  <p className="eyebrow">
                    Export Readiness Score
                    <Zh text={zhLabels["Export Readiness Score"]} />
                  </p>
                  <h3>{readinessScore.overallScore}%</h3>
                  <p>{readinessScore.majorGaps.length > 0 ? readinessScore.majorGaps.join(" · ") : "No major gaps in current rules."}</p>
                </div>
              </div>
              <div className="score-grid">
                <ScorePill label="HACCP" value={readinessScore.dimensions.haccpReadiness} />
                <ScorePill label="GACC" value={readinessScore.dimensions.gaccReadiness} />
                <ScorePill label="Documents" value={readinessScore.dimensions.documentCompleteness} />
                <ScorePill label="Training" value={readinessScore.dimensions.trainingReadiness} />
                <ScorePill label="Lab evidence" value={readinessScore.dimensions.labTestReadiness} />
                <ScorePill label="Label" value={readinessScore.dimensions.labelCompliance} />
                <ScorePill label="Audit risk" value={readinessScore.dimensions.auditRisk} />
              </div>
            </section>

            <section className="grid three">
              <Metric label="Uploaded files" value={documentSummary.uploadedCount.toString()} detail="Evidence currently stored in placeholder storage" />
              <Metric label="Accepted evidence" value={documentSummary.acceptedCount.toString()} detail="Ready for readiness scoring inputs" />
              <Metric label="Needs review" value={documentSummary.reviewNeededCount.toString()} detail="Consultant check required before paid output" />
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Documents and evidence</p>
                  <h3>Rule-based document checks</h3>
                </div>
                <div className="inline-control">
                  <select
                    value={selectedDocumentType}
                    onChange={(event) => setSelectedDocumentType(event.target.value as DocumentType)}
                    aria-label="Document type"
                  >
                    {nextDocumentOptions.map((documentType) => (
                      <option key={documentType} value={documentType}>
                        {documentLabels[documentType]}
                      </option>
                    ))}
                  </select>
                  <button onClick={addDocument}>Add file</button>
                </div>
              </div>
              <div className="check-grid">
                <CheckBlock title="Snapshot gaps" missing={gapMissing} />
                <CheckBlock title="HACCP readiness" missing={haccpMissing} />
                <CheckBlock title="GACC readiness" missing={gaccMissing} />
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Paid workspace outputs</p>
                  <h3>Limited high-value generation</h3>
                </div>
                <div className="call-budget compact-budget">
                  <span>{aiCallsUsed}</span>
                  <small>of {MAX_AI_CALLS_PER_CLIENT} paid AI actions</small>
                </div>
              </div>
              <input
                className="reason-input"
                value={regenerateReason}
                onChange={(event) => setRegenerateReason(event.target.value)}
                placeholder="Regenerate reason"
                aria-label="Regenerate reason"
              />
              <div className="actions">
                <GenerateButton label="Gap Analysis" type="gap_analysis" generations={clientGenerations} onGenerate={generate} />
                <GenerateButton label="GACC Package" type="gacc_package" generations={clientGenerations} onGenerate={generate} />
                <GenerateButton label="Training Package" type="training_package" generations={clientGenerations} onGenerate={generate} />
                <GenerateButton label="Internal Audit Plan" type="internal_audit_plan" generations={clientGenerations} onGenerate={generate} />
                <GenerateButton label="Improvement Roadmap" type="export_readiness_roadmap" generations={clientGenerations} onGenerate={generate} />
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Market entry profile</p>
                  <h3>{marketProfile.marketGroup} export and audit route</h3>
                </div>
              </div>
              <div className="market-grid">
                <ProfileBlock title="Standards" items={marketProfile.standards} />
                <ProfileBlock title="Audits" items={marketProfile.auditTypes} />
                <ProfileBlock title="Export controls" items={marketProfile.exportControls} />
              </div>
              <p className="market-note">{marketProfile.notes}</p>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Generated client reports</p>
                  <h3>Consultant-reviewed outputs</h3>
                </div>
              </div>
              <div className="generation-list">
                {clientGenerations.length === 0 ? (
                  <p className="muted">Generate a paid workspace output to preview client-facing reports.</p>
                ) : (
                  clientGenerations.slice(0, 3).map((generation) => <GenerationCard key={generation.id} generation={generation} />)
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

function updateHaccpSection(sections: HaccpSection[], generation: AiGeneration): HaccpSection[] {
  const map: Partial<Record<GenerationType, HaccpSection["sectionType"]>> = {
    haccp_product_process: "PRODUCT_PROCESS",
    haccp_hazard_analysis: "HAZARD_ANALYSIS",
    haccp_ccp_plan: "CCP_PLAN",
    haccp_ssop: "SSOP",
    haccp_gmp_prp: "GMP_PRP",
    haccp_manual_summary: "MANUAL_SUMMARY",
  };

  const sectionType = map[generation.generationType];
  if (!sectionType) {
    return sections;
  }

  const exists = sections.some((section) => section.clientId === generation.clientId && section.sectionType === sectionType);
  if (!exists) {
    const newSection: HaccpSection = {
      id: createId("section"),
      clientId: generation.clientId,
      projectId: generation.projectId,
      sectionType,
      status: "generated",
      inputJson: generation.inputJson,
      outputJson: generation.outputJson,
      reviewerNotes: "",
      generatedAt: generation.createdAt,
      reviewedAt: null,
    };

    return [
      ...sections,
      newSection,
    ];
  }

  return sections.map((section) =>
    section.clientId === generation.clientId && section.sectionType === sectionType
      ? ({
          ...section,
          status: "generated",
          inputJson: generation.inputJson,
          outputJson: generation.outputJson,
          generatedAt: generation.createdAt,
        } satisfies HaccpSection)
      : section,
  );
}

function TrackCard({
  title,
  zhTitle,
  status,
  progress,
  detail,
}: {
  title: string;
  zhTitle?: string;
  status: string;
  progress: number;
  detail: string;
}) {
  return (
    <article className="track-card">
      <div>
        <p className="eyebrow">
          {title}
          <Zh text={zhTitle} />
        </p>
        <h3>{status}</h3>
      </div>
      <div className="progress" aria-label={`${title} progress`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <p>{detail}</p>
    </article>
  );
}

function Metric({ label, zhLabel, value, detail }: { label: string; zhLabel?: string; value: string; detail: string }) {
  return (
    <article className="metric">
      <span>{value}</span>
      <strong>
        {label}
        <Zh text={zhLabel} />
      </strong>
      <p>{detail}</p>
    </article>
  );
}

function ScorePill({ label, zhLabel, value }: { label: string; zhLabel?: string; value: number }) {
  return (
    <article className="score-pill">
      <span>{value}%</span>
      <p>
        {label}
        <Zh text={zhLabel} />
      </p>
    </article>
  );
}

function CheckBlock({ title, zhTitle, missing }: { title: string; zhTitle?: string; missing: DocumentType[] }) {
  return (
    <article className={missing.length === 0 ? "check-block complete" : "check-block"}>
      <strong>
        {title}
        <Zh text={zhTitle} />
      </strong>
      <p>{formatMissingDocuments(missing)}</p>
    </article>
  );
}

function ProfileBlock({ title, zhTitle, items }: { title: string; zhTitle?: string; items: string[] }) {
  return (
    <article className="profile-block">
      <strong>
        {title}
        <Zh text={zhTitle} />
      </strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function GenerationCard({ generation }: { generation: AiGeneration }) {
  const title = generationTitles[generation.generationType];
  const summary = getGenerationSummary(generation.outputJson);
  const highlights = getGenerationHighlights(generation.outputJson);

  return (
    <article className="generation-card">
      <header>
        <div>
          <strong>
            {title.en}
            <Zh text={title.zh} />
          </strong>
          <small>{formatDateTime(generation.createdAt)}</small>
        </div>
        <span className="draft-badge">Draft</span>
      </header>

      <p>{summary}</p>

      {highlights.length > 0 ? (
        <ul>
          {highlights.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <div className="generation-actions">
        <button className="secondary" type="button">
          <span>View</span>
        </button>
        <button className="secondary" type="button">
          <span>Edit</span>
        </button>
        <button className="secondary" type="button">
          <span>Export</span>
        </button>
      </div>

      <details className="technical-json">
        <summary>Technical JSON</summary>
        <pre>{JSON.stringify(generation.outputJson, null, 2)}</pre>
      </details>
    </article>
  );
}

function getGenerationSummary(output: Record<string, unknown>) {
  const candidates = [
    output.executive_summary,
    output.current_score_note,
    output.audit_scope,
    output.company_profile_en,
    output.management_training,
    output.product_description,
  ];

  return candidates.find((item): item is string => typeof item === "string") ?? "Generated draft ready for consultant review.";
}

function getGenerationHighlights(output: Record<string, unknown>) {
  const candidates = [
    output.major_gaps,
    output.recommended_actions,
    output.document_checklist,
    output.quiz_questions,
    output.priority_findings_to_verify,
    output.thirty_day_actions,
    output.process_steps,
    output.programs,
    output.manual_sections,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.map((item) => (typeof item === "string" ? item : JSON.stringify(item)));
    }
  }

  return [];
}

function GenerateButton({
  label,
  type,
  generations,
  onGenerate,
  disabled = false,
}: {
  label: string;
  type: GenerationType;
  generations: AiGeneration[];
  onGenerate: (type: GenerationType, forceRegenerate?: boolean) => void;
  disabled?: boolean;
}) {
  const exists = generations.some((generation) => generation.generationType === type);

  return (
    <div className="generate-control">
      <button onClick={() => onGenerate(type, false)} disabled={exists || disabled}>
        <span>{disabled ? "Locked" : exists ? "Generated" : label}</span>
      </button>
      <button className="secondary" onClick={() => onGenerate(type, true)} disabled={disabled}>
        <span>Regenerate</span>
      </button>
    </div>
  );
}

function Zh({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  return <span className="zh">{text}</span>;
}
