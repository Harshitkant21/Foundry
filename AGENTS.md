# `create-ai-workspace` — AI Workspace Reference Contract

Welcome to `create-ai-workspace`. This repository is both the implementation codebase and the primary reference environment for the AI Workspace standard.

## Core Architectural Guardrails

1. **STRICT ZERO-LLM CONSTRAINT:**
   - The CLI package MUST NOT contain any generative AI, LLM API calls (OpenAI, Anthropic, Gemini), model inference, embeddings, or network requests.
   - All workspace generation logic MUST be 100% deterministic local string rendering.

2. **BIT-FOR-BIT DETERMINISM:**
   - Same inputs + same package version = 100% identical byte outputs.
   - Never inject dynamic dates, timestamps, random IDs, or system-dependent file paths into generated files.

3. **TYPE SAFETY & STRICTNESS:**
   - Enforce TypeScript strict mode without exception.
   - Do not use `any` types. Use explicit Zod schema validation for external data & CLI options.

4. **MINIMALIST OUTPUT:**
   - Scaffold only non-empty, utility-bearing files.
   - Never generate empty placeholder directories.

## Development Commands

- Build: `npm run build`
- Dev Runner: `npm run dev`
- Test Suite: `npm run test`
- Type Check: `npm run typecheck`
