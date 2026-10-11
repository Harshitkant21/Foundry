# `create-foundry-workspace` — Universal AI Agent Operating Contract

> **MANDATORY INSTRUCTION FOR ALL AI CODING ASSISTANTS & AUTONOMOUS AGENTS:**  
> You are operating within the official Foundry codebase. You must read and strictly adhere to the project governance files in the exact sequence specified below before formulating plans, executing commands, or proposing modifications.

---

## 1. Required Reading Order & Discovery Protocol

Before taking ANY action, you MUST read the following canonical governance files in this strict sequence:

1. [`.ai/rules/guardrails.md`](file:///d:/Extentions/Foundry/.ai/rules/guardrails.md) — **Permanent Non-Negotiable Operational & Architectural Boundaries.**  
   Contains strict Git safety rules (read-only Git by default, zero unauthorized commits/pushes/resets), code quality guardrails, zero-LLM constraints, pure core isolation rules, and verification mandates.
2. [`.ai/context/project-context.md`](file:///d:/Extentions/Foundry/.ai/context/project-context.md) — **Canonical Project Context & Architecture Reference.**  
   Contains verified implementation scope, the 3-layer product model, subsystem architecture map, standard commands, and terminology.
3. [`.ai/rules/00-core-rules.md`](file:///d:/Extentions/Foundry/.ai/rules/00-core-rules.md) — **Engineering Rules & Coding Standards.**  
   Details TypeScript strictness, ESM conventions, functional purity, and test requirements.
4. [`docs/README.md`](file:///d:/Extentions/Foundry/docs/README.md) — **Technical Documentation Index.**  
   Links to deep architectural specifications, product vision, and decision logs.

---

## 2. Order of Precedence & Conflict Resolution

If you encounter conflicting instructions between different documents or user prompts, resolve them using this strict priority ladder:

1. **Explicit, Current Human Maintainer Instruction** (unless it asks to violate section 1 safety rules in `.ai/rules/guardrails.md`).
2. [`.ai/rules/guardrails.md`](file:///d:/Extentions/Foundry/.ai/rules/guardrails.md) (Overrides all documentation and tool-specific files).
3. [`.ai/context/project-context.md`](file:///d:/Extentions/Foundry/.ai/context/project-context.md) (Canonical source of truth for project facts and architecture).
4. [`docs/`](file:///d:/Extentions/Foundry/docs/) (Detailed technical specifications and design docs).
5. Tool-specific adapter files (`CLAUDE.md`, `.cursor/rules/*.mdc`, `.github/copilot-instructions.md`).

---

## 3. Core AI Operating Mandates (Non-Negotiable)

- 🔒 **Git is Strictly Read-Only by Default:** Never stage (`git add`), commit (`git commit`), push (`git push`), reset (`git reset`), or stash without explicit human authorization.
- 🔍 **Inspect Before Changing:** Every factual claim, bug diagnosis, or refactoring proposal must cite verified files, line numbers, or test outputs.
- ⚡ **Zero-LLM Core Engine:** Never introduce generative model APIs, LLM SDKs, or runtime network dependencies into `src/`.
- 🛡️ **Pure Core Isolation:** All filesystem mutations must remain strictly within `src/io/writer.ts`. Never import `node:fs` in `src/core/`, `src/adapters/`, or `src/templates/`.
- 📐 **Strict Static Typing:** No `any`, no untyped functions, no unannotated compiler suppressions (`@ts-ignore`).
- 🧪 **Mandatory Validation:** Every code change must be validated with `npm run typecheck` and `npm test` before concluding your turn.
