# Knowledge Base Plan

## Current V1

V1 uses local mock knowledge sources in `src/lib/seed.ts` and a deterministic retrieval helper in `src/lib/knowledge.ts`.

This gives the app the same data flow it will need later:

1. User clicks a generation button.
2. The app builds structured inputs from client, project, documents, rules, and market profile.
3. The app retrieves relevant knowledge context.
4. The app writes retrievedContext into ai_generations.input_json.
5. The generated output and audit log are saved.

## Why Mock First

The first version should prove the workflow before adding API and retrieval complexity.

Do not connect a real knowledge base until these are ready:

- Source document inventory
- Chunking policy
- Citation display
- Retrieval quality checks
- API keys and billing controls
- Regeneration and audit behavior

## Future Options

### Dify Knowledge Base

Use if the workflow is managed mostly in Dify:

- gap_analysis_workflow
- haccp_package_workflow
- training_package_workflow
- gacc_package_workflow

### OpenAI Vector Store / File Search

Use if generation stays inside this app:

- Upload HACCP/GACC/templates to vector store
- Retrieve context per generation type
- Store citations in ai_generations
- Keep rule checks in code

## Initial Knowledge Source Categories

- HACCP
- GACC
- Market
- Training
- Labeling
- Export

## V1 Sources

- HACCP implementation baseline
- China GACC registration route
- US/EU importer audit readiness
- China label compliance placeholder
- Khmer worker training baseline

## Rule

Knowledge retrieval supports AI generation. It does not replace deterministic checks.

Knowledge retrieval also does not replace certification bodies, government authorities, customer auditors, or legal review.

Keep these in code:

- Required document checks
- Market routing
- AI call budget
- Export Readiness Score
- HACCP operation period
- GACC requirement decision
