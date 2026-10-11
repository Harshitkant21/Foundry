# Foundry — Permanent Project Guardrails & AI Operating Protocol

> **CRITICAL MANDATE FOR ALL AI AGENTS & CONTRIBUTORS**  
> This document establishes the **permanent, non-negotiable operational and architectural boundaries** for the Foundry (`create-foundry-workspace`) codebase.  
> Every AI coding agent (regardless of model, client, or IDE) and human contributor MUST strictly adhere to these rules without deviation.

---

## 1. Operational & Version Control Safety Guardrails

### 1.1 Strict Read-Only Git Policy by Default
AI agents operate in **read-only Git mode** by default. Any modification to version control state without explicit human authorization is a critical protocol violation.
- 🚫 **STRICTLY PROHIBITED without explicit human authorization in the current turn:**
  - Staging files: `git add`
  - Creating commits: `git commit`
  - Pushing to remotes: `git push`
  - Creating or deleting branches: `git checkout -b`, `git branch -d`, `git branch -D`
  - Stashing uncommitted changes: `git stash`
- ⛔ **ABSOLUTELY FORBIDDEN under all circumstances (No exceptions):**
  - Destructive or history-rewriting operations: `git push --force`, `git push -f`
  - Hard workspace resets: `git reset --hard`
  - Unchecked directory cleans: `git clean -fdx`, `git clean -f`
  - Dropping stashes or commits: `git stash drop`, `git stash clear`

### 1.2 Inspect-Before-Change Mandate
- Never propose, edit, or delete a file without first inspecting its actual content, AST structure, and relationship to the wider workspace.
- Check active imports, exports, and associated test suites before modifying any file.
- Verify path existence and directory boundaries before performing file operations.

### 1.3 Evidence-Based Claims & Grounding
- Every factual claim about codebase state, functionality, bug causes, or test status must cite verified evidence:
  - Exact file path with line numbers (`file:///path/to/file.ts#L10-L25`)
  - Verifiable command execution output (`tsc --noEmit`, `vitest run`)
- Never speculate about runtime behavior or make assumptions about unread code.

### 1.4 Scope Discipline & Anti-Bloat Principle
- Implement only the direct requirements requested by the user.
- Do NOT generate speculative abstractions, unused utility functions, unrequested dependencies, or empty future directories.
- Maintain minimal surface area across all interfaces and schemas.

---

## 2. Core Architectural & Code Quality Guardrails

### 2.1 Strict Zero-LLM Generation Engine
Foundry is fundamentally a **deterministic, local-first developer tool**, not an AI runtime or generative wrapper.
- **Rule:** The core generation engine (`src/core/`, `src/adapters/`, `src/templates/`, `src/config/`, `src/detection/`) must remain 100% offline and deterministic.
- **Prohibition:** NEVER import OpenAI, Anthropic, Google GenAI, LangChain, LlamaIndex, or any runtime generative model SDKs into `src/`.
- **Integrity:** Generating workspace configurations, rule files, and scaffolding must never require network connectivity or API tokens.

### 2.2 Bit-for-Bit Determinism
- Given identical configuration inputs (`ResolvedWorkspaceContext`) and package versions, the output from `generateWorkspace()` must be **byte-for-byte identical**.
- **Prohibited in Core Generators & Templates:**
  - Dynamic generation timestamps (e.g., `new Date().toISOString()`)
  - Random UUIDs or hashes (`Math.random()`, `crypto.randomUUID()`)
  - Absolute local machine paths (e.g., `C:\Users\...`, `/home/...`)
  - Non-deterministic object key iteration orders

### 2.3 Pure Functional Core vs. Isolated I/O Shell (Architectural Boundary)
Foundry enforces strict hexagonal isolation between pure computational logic and disk side effects:
- **Pure Core Modules (`src/core/`, `src/adapters/`, `src/templates/`, `src/config/`, `src/detection/`):**
  - Must remain 100% pure, synchronous/in-memory functions.
  - **Strictly forbidden** from importing `node:fs`, `node:fs/promises`, or performing disk reads/writes.
  - Output must always be in-memory data structures (`GeneratedFile[]`).
- **Isolated I/O Shell (`src/io/`):**
  - The **only** subsystem permitted to interact with the file system.
  - Responsible for path sanitization, traversal containment, atomic writing, and backup handling.

### 2.4 Path Traversal Containment & Filesystem Safety
- All file write targets must be strictly validated against the target workspace root.
- Sibling directory traversal attempts (e.g., target directory `/app` trying to write to `/app-secret/file.txt`) must be caught and rejected using proper relative path containment (`path.relative(baseDir, targetPath)`).

### 2.5 Strict Static Typing & Schema Validation
- TypeScript `strict` mode is enabled and non-negotiable.
- **Prohibitions:**
  - No usage of `any`. Use `unknown`, generic type variables, or explicit discriminated unions.
  - No unsafe type assertions (`as unknown as T`).
  - No unannotated `@ts-ignore` or `@ts-nocheck` directives.
- All external user inputs and configuration files (`ai-workspace.yaml`, CLI flags) must be strictly validated at runtime using **Zod** schemas before reaching the core generator.

### 2.6 Error Handling & Diagnostics
- Never swallow exceptions or leave empty `catch` blocks.
- Throw typed, domain-specific errors containing actionable context (e.g., schema validation paths, received vs. expected values).

### 2.7 Mandatory Automated Verification
Every code modification must satisfy the full validation suite:
1. `npm run typecheck` (`tsc --noEmit`) — Zero type errors.
2. `npm test` (`vitest run`) — 100% passing tests across unit, integration, and golden fixture suites.

---

## 3. Product Boundary & Terminology Disambiguation

When reading, planning, or implementing features, AI agents must strictly uphold these domain boundaries:

| Concept | Canonical Identifier | Definition & Boundary | Status |
| :--- | :--- | :--- | :--- |
| **Workspace Generation** | Layer 1 (V1 Core) | Deterministic generation of AI instructions, tool adapters, and governance (`ai-workspace.yaml`, `.ai/`, `AGENTS.md`, `CLAUDE.md`, `.cursor/`, `.github/`). Zero project code scaffolding. | **ACTIVE & VERIFIED** |
| **Project Scaffolding** | Layer 2 (Planned) | Scaffolding executable language runtimes, service frameworks (FastAPI, Express, React), databases, and Docker configurations. Driven by **Scaffolding Components** (`scaffold.component.json`). | **DESIGN / PLANNED** |
| **AI Agent Workflows** | Layer 3 (Research) | Declarative orchestration graphs, execution loops, and tool-binding pipelines (LangGraph/CrewAI/AutoGPT integration). Driven by **Agent Execution Nodes** (`WorkflowNode`). | **RESEARCH & RFC** |

> ⚠️ **CRITICAL DISTINCTION:** Never conflate *Scaffolding Components* (project templates like `fastapi-service`) with *Agent Workflow Execution Nodes* (graph nodes like `LLMDecisionNode`). They belong to distinct architectural domains.

---

## 4. Conflict Resolution & Precedence Protocol

In the event of ambiguity or conflicting instructions across files, adhere strictly to this priority ladder:

```
┌────────────────────────────────────────────────────────┐
│ 1. Current Explicit Human Maintainer Instruction       │ (Highest Priority)
└──────────────────────────┬─────────────────────────────┘
                           │ (unless asking to violate section 1 safety)
┌──────────────────────────▼─────────────────────────────┐
│ 2. .ai/rules/guardrails.md (This Document)             │ (Non-negotiable core)
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ 3. .ai/context/project-context.md                      │ (Canonical facts & maps)
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ 4. docs/ (Technical Architecture & Specifications)     │ (Detailed specs)
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│ 5. Tool Adapter Files (CLAUDE.md, .cursor/, .github/)  │ (Lowest Priority)
└────────────────────────────────────────────────────────┘
```
