# CERE MVP Schema

The current MVP uses typed local state so the interface can run before PostgreSQL, Dify, OpenAI, and Google Drive are connected. These tables are the intended persistence shape for the next phase.

## product_boundary

The platform supports readiness and compliance preparation. It does not issue certificates, perform laboratory testing, approve registrations, replace certification bodies, replace government authorities, or guarantee market access.

AI outputs should include a disclaimer that generated content is a preparation aid and must be reviewed by a qualified consultant, certification body, customer auditor, or relevant authority where applicable.

Commercial AI rule:

- Free readiness snapshot uses rules only and no AI calls.
- Paid compliance workspace can use limited AI calls.
- AI outputs must be tied to a specific workflow action such as gap report, HACCP draft, training package, internal audit plan, or roadmap.
- Core scoring and compliance requirements should be code/rule generated, not AI-generated.

## clients

- id
- name
- country
- factory_location
- contact_name
- contact_email
- product_type
- product_category
- target_market
- employee_count
- created_at

## projects

GACC is not the final step of a linear HACCP flow. The app treats HACCP and GACC as parallel tracks.

- id
- client_id
- certification_type
- product_category
- haccp_status
- gacc_status
- haccp_start_date
- haccp_operation_start_date
- expected_certification_date
- created_at
- updated_at

## documents

- id
- client_id
- project_id
- document_type
- file_name
- storage_provider
- storage_id
- status
- uploaded_at

## ai_generations

All paid AI calls should go through one function and write here.

- id
- client_id
- project_id
- generation_type
- input_json
- output_json
- model_name
- token_usage
- cost_estimate
- regenerate_reason
- created_at

The generation input_json should include retrievedContext from the knowledge layer.

## knowledge_sources

V1 uses local mock knowledge sources. Later this can be backed by Dify Knowledge Base, OpenAI vector stores, or another retrieval service.

- id
- title
- category
- market_group
- product_category
- source_type
- summary
- tags
- updated_at

## knowledge_citations

These can be stored inline in ai_generations.input_json during V1, then normalized later if needed.

- source_id
- title
- excerpt

## readiness_scores

The score is rule-generated, not AI-generated. It is the main entry point for Free Snapshot, Paid Compliance Workspace, and Annual Export Support.

- id
- client_id
- project_id
- overall_score
- dimensions
- major_gaps
- calculated_at

## audit_logs

- id
- client_id
- project_id
- action
- details
- created_at

## haccp_sections

Reserved in v1 so the HACCP package can expand without a rewrite.

- id
- client_id
- project_id
- section_type
- status
- input_json
- output_json
- reviewer_notes
- generated_at
- reviewed_at

Initial section types:

- PRODUCT_PROCESS
- HAZARD_ANALYSIS
- CCP_PLAN
- SSOP
- GMP_PRP
- MANUAL_SUMMARY

## future reserved tables

These are not implemented in V1 workflows, but they are visible as planned roadmap placeholders in the UI so they are not forgotten.

- products
- certifications
- compliance_checks
- lab_report_evidence
- training_records
- non_conformities
- corrective_actions
- batches
- suppliers
- shipments
- crm_leads
- service_recommendations
- access_plans
- language_content

## future_modules

- id
- title
- phase
- status
- description

Initial planned modules:

- Free Readiness Snapshot
- Client portal
- Payments
- Google Drive OAuth automation
- Research Agent
- Sales / CRM Agent
- GB7718 / GB28050 label checker
- Lab report evidence tracking
- CAPA workflow
- Khmer language layer
- Batch traceability / QR code
- Multi-industry rule packs

## configurable dimensions

Certification types:

- HACCP
- GACC
- HALAL
- ISO22000
- FSSC22000
- BRCGS
- Organic

Market groups:

- China
- US_EU
- EU
- Japan
- USA
- Malaysia
- Indonesia
- Middle East
- ASEAN
- General

Product categories:

- Cashew
- Nuts
- Seeds
- Pepper
- Rice
- Mango
- Dried Fruit
