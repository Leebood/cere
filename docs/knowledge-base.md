# Knowledge And Content Engine Plan

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

## Public Content Engine

The public website now has a separate seed layer for SEO/AEO resources:

- `src/lib/content-data.ts`
- `/resources`
- `/markets/[slug]`
- `/products/[slug]`
- `/guides/[slug]`

This layer is not the same as AI retrieval. It is structured public content that can later move into a database.

Content flow:

```text
Market data
↓
Product data
↓
Requirement data
↓
Question-based guide
↓
Quick Answer
↓
FAQ structured data
↓
Consultation CTA
```

## AEO Format

Guide pages should follow this structure:

1. Question title
2. Quick Answer block
3. Question-based sections
4. Related market/product links
5. FAQ structured data
6. CTA to consultation or readiness assessment

This supports both search engines and AI answer engines without turning the homepage into an article hub.

## Content Governance

Before scaling generated content:

- Maintain source inventory.
- Add `last_verified_at` to future regulation and requirement records.
- Mark costs and processing times as estimates.
- Review official authority names and URLs.
- Keep China, Taiwan, South China Sea, and other sensitive geographic representations out of custom maps unless an official map source is used.
- Do not let AI invent official requirements.

## Initial Resource Seeds

Initial guide pages:

- Can Cambodian Cashews Export to China?
- What Documents Are Needed for GACC Preparation?
- HACCP Readiness Checklist for Food Factories

Initial market pages:

- China
- European Union
- United States

Initial product pages:

- Cashew Nuts
- Pepper
- Rice
- Coffee
