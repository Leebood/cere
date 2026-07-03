# CERE Product Roadmap

## Final Positioning

The product should evolve from an internal certification consulting tool into CERE: Cambodia Export Readiness Engine.

External customer positioning:

> Food exporter certification consulting and compliance-readiness platform.

Strategic positioning:

> The Operating System for Cambodia Food Exporters.

Long-term infrastructure narrative:

> Starting with cashew certification readiness, expanding into Cambodia food export compliance infrastructure.

## Public Architecture

CERE is now split into three connected layers:

```text
Public Website
Brand trust, market selection, service positioning, and consultation conversion.

Knowledge & Content Engine
Markets, products, requirements, guides, FAQ pages, quick answers, SEO, and AI-engine citation readiness.

Compliance Workspace
Client projects, readiness scoring, documents, gap analysis, HACCP/GACC packages, evidence tracking, and consultant review.
```

The homepage should remain a focused official website and export-route entry point. The knowledge engine should grow through `/resources`, `/markets/[slug]`, `/products/[slug]`, and `/guides/[slug]`, not by adding dense content to the homepage.

## Product Boundary

The platform is responsible for readiness and compliance preparation.

It is not responsible for certification, approval, laboratory testing, registration decisions, or market-access guarantees.

Use this statement across the product:

> CERE helps food exporters prepare for export compliance, certification audits, and market-entry documentation. The platform supports readiness assessment, compliance workflows, document preparation, training evidence, lab report evidence tracking, and audit pre-checks. It does not issue certificates, perform laboratory testing, approve registrations, replace certification bodies, replace government authorities, or guarantee market access.

This boundary applies to HACCP, GACC, HALAL, ISO22000, label review, CAPA, traceability, and future market modules.

## Access And AI Cost Model

Core commercial rule:

> Free stage uses no AI. Paid stage can use limited AI. Core judgment stays in rules and workflow.

Free Readiness Snapshot:

- Rules-only intake
- Target market selection
- Product category selection
- Basic 0-100 Export Readiness Score
- Top gap categories
- Lead capture and meeting request
- No detailed report
- No HACCP document generation
- No open-ended AI chat

Paid Compliance Workspace:

- Full gap report
- HACCP workstream
- GACC package checklist
- Training package
- Internal audit plan
- CAPA tasks
- Consultant review
- Limited AI generation quota

Annual Export Support:

- Evidence expiry tracking
- Renewal reminders
- Buyer audit readiness
- Market expansion support
- CRM follow-up
- Continuous compliance monitoring

It should support:

- Export readiness assessment
- Certification system building
- Document management
- Training management
- Lab report evidence tracking
- Label compliance
- GACC registration
- HALAL / ISO22000 upgrades
- Batch traceability
- Audit pre-checks

## Phase 1: Internal Consultant Workbench

Status: current build.

V1 should include:

- Client Management
- Project Management
- Document Management
- Export Readiness Score
- Gap Analysis
- HACCP Package
- GACC Package
- Training Package
- AI Usage Audit
- Free / paid / annual support architecture display
- Khmer-ready language layer placeholder

V1 should not include:

- Client login
- Payment
- Chatbot
- Mobile app
- Complex permissions

## Phase 2: Export Readiness Score As Sales Entry

Add a stronger free-check workflow around rules-only scoring:

- HACCP Readiness
- GACC Readiness
- Document Completeness
- Training Readiness
- Lab Test Readiness
- Label Compliance
- Audit Risk

The current V1 includes the first rule-based score so this phase can grow without a rewrite.

## Phase 2A: Knowledge And Content Engine

Add a database-driven content layer before building full automation:

- Markets data
- Products data
- Requirements data
- Regulations data
- Guide templates
- Quick Answer blocks
- FAQ structured data
- Internal links between markets, products, guides, and services

Initial public routes:

- `/resources`
- `/markets/[slug]`
- `/products/[slug]`
- `/guides/[slug]`

Do not generate hundreds of pages immediately. Start with a small reviewed seed set, then expand based on Google Search Console and customer questions.

Content format:

- Question title
- 50-80 word Quick Answer
- Question-based headings
- FAQ section
- CTA to consultation or readiness assessment

Rules:

- Facts, timelines, costs, and authority references must be reviewed.
- AI can draft explanations, but cannot invent official requirements.
- Compliance statements must preserve CERE's boundary: readiness and preparation, not approval or certification.

## Phase 3: Client Portal And CRM

Add customer-facing progress views, upload flows, task lists, timelines, notifications, sales stage, service recommendation, and annual support follow-up.

Keep it workflow-based. Do not expose unlimited AI generation or consultant bypass.

## Phase 4: China Compliance

Add:

- China Label Compliance Checker
- GB7718 Checker
- GB28050 Nutrition Label Checker
- Chinese Label Generator
- Importer Requirement Tracker
- GACC Renewal Tracker

Rule checks should stay in code. AI should draft explanations and label suggestions.

## Phase 5: Lab Report Evidence And CAPA

Add:

- Lab Report Evidence Tracker
- Water Test Tracker
- Aflatoxin Test Tracker
- Microbiology Test Tracker
- CAPA Manager
- Non-Conformity Tracker
- Corrective Action Workflow

The platform tracks third-party test report evidence, expiry, missing documents, and renewal reminders. It does not perform testing.

CAPA should model the audit loop: find issue, take action, verify effectiveness, close evidence.

## Phase 6: Certification Upgrades

Support:

- HALAL
- ISO22000
- FSSC22000
- BRCGS
- Organic

The database should keep certification_type, certification_standard, certification_body, certification_status, expiry_date, and renewal_date configurable.

## Phase 7: Khmer Training Center

Add:

- Worker Training Records
- Training Quiz
- Attendance Records
- Certificate Generator
- Training Evidence Export

AI can generate materials, quiz questions, and Khmer translations. Learning and exam tracking should not require repeated AI calls.

## Phase 8: Traceability

Add:

- Supplier Management
- Raw Material Lots
- Production Batches
- Packaging Batches
- Export Shipments
- QR Code Traceability
- Recall Simulation

## Phase 9: Multi-Industry Expansion

Expand rule modules in this order:

1. Cashew
2. Pepper
3. Mango
4. Rice
5. Dried Fruit
6. Seafood
7. Processed Food

Rules must remain modular by product_category, hazard_profile, target_market, required_certifications, required_documents, lab_test_requirements, and label_requirements.

## My Recommendation

Keep these out of V1 implementation:

- Client portal
- Payment
- Full Google Drive OAuth automation
- Label compliance engines
- CAPA workflow
- Traceability and QR codes
- Multi-industry rule packs

V1 should still show them as planned placeholders in the workbench.

Keep these in V1 architecture:

- Export Readiness Score
- Training Package
- Configurable certification types
- Configurable market groups
- Configurable product categories
- AI cost and usage audit
- Reserved schema for future modules
