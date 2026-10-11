# Foundry — Canonical AI Project Context & System Reference

> **AUTHORITATIVE SOURCE OF TRUTH FOR AI AGENTS & ENGINEERS**  
> This file contains the complete system architecture, implemented capabilities, module boundaries, domain rules, and operational commands for the Foundry (`create-foundry-workspace`) codebase.

---

## 1. System Identity & Core Purpose

| Attribute | Specification |
| :--- | :--- |
| **Product Name** | **Foundry** |
| **NPM Package** | `create-foundry-workspace` (NPM CLI & library) |
| **Runtime Environment** | Node.js `>=18.0.0` (Native ECMAScript Modules `"type": "module"`) |
| **Language & Tooling** | TypeScript 5.x (Strict Mode), Vitest, Commander, Zod, Inquirer |
| **Core Value Proposition** | A **zero-LLM, deterministic, local-first workspace generator** that standardizes AI context, rules, and guardrails across modern software repositories for 7+ AI coding tools simultaneously. |

---

## 2. Product Capability Layers

Foundry is engineered around three strictly separated capability layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 3: AI Agent Workflow Generation (RESEARCH / RFC)                 │
│ Declarative graph topologies, tool binding, LangGraph/StateGraph loops │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Layer 2: Project Scaffolding (PLANNED)                                 │
│ Language runtimes, service scaffolding, Docker, scaffold.component.json│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Layer 1: Workspace Generation (V1 Core — ACTIVE & PRODUCTION READY)    │
│ Deterministic AI rules, multi-tool adapters, ai-workspace.yaml, .ai/   │
└────────────────────────────────────────────────────────────────────────┘
```

### Layer 1: Workspace Generation (Active V1 Core)
- **Status:** Complete, tested, production-grade.
- **Responsibility:** Ingests project metadata (language, app type, strictness, target AI tools) and generates deterministic instruction sets and guardrails.
- **Artifacts Produced:**
  - `ai-workspace.yaml`: Canonical machine-readable workspace manifest.
  - `AGENTS.md`: Universal root entry point for autonomous agents.
  - `.ai/`: Structured AI intelligence hierarchy (`context/`, `rules/`, `architecture/`, `decisions/`, `tasks/`).
  - `docs/`: Human-readable engineering documentation framework (`README.md`, `ARCHITECTURE.md`, `DEVELOPMENT.md`, `DECISIONS.md`).
  - Tool-specific instruction files for enabled adapters (Cursor, Claude, Copilot, Windsurf, Cline, Aider, OpenCode).

### Layer 2: Project Scaffolding (Planned Milestone)
- **Status:** Under architecture design.
- **Concept:** Modular, component-driven project runtime generators (e.g. FastAPI backend + React frontend + PostgreSQL + Docker).
- **Core Abstraction:** **Scaffolding Components** defined by `scaffold.component.json` manifests.
- **Constraint:** Must remain strictly decoupled from AI execution graph nodes.

### Layer 3: AI Agent Workflow Generation (Research & RFC)
- **Status:** Open RFC / Concept exploratory phase.
- **Concept:** Declarative workflow graphs and tool orchestration definitions.
- **Core Abstraction:** **Agent Execution Nodes** (`WorkflowNode`) representing discrete computational steps (LLM routing, evaluation, deterministic transforms).

---

## 3. Subsystem Architecture & Module Map

Foundry enforces **Clean Hexagonal Architecture**, maintaining complete isolation between pure computational logic and the imperative filesystem shell.

```
                    ┌────────────────────────────────────────┐
                    │               CLI SHELL                │
                    │   src/bin.ts  •  src/cli/command.ts    │
                    │   Interactive Prompts & Flag Parsing   │
                    └───────────────────┬────────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │            CONFIG & SCHEMA             │
                    │  src/config/schema.ts • defaults.ts    │
                    │   Zod Runtime Schema & Normalization   │
                    └───────────────────┬────────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │         PURE GENERATION CORE           │
                    │         src/core/generator.ts          │
                    │   Pure in-memory translation pipeline  │
                    │   Zero fs imports • 100% Deterministic │
                    └───────────┬──────────────────┬─────────┘
                                │                  │
         ┌──────────────────────▼───────┐  ┌───────▼──────────────────────┐
         │     MULTI-TOOL ADAPTERS      │  │      TEMPLATE ENGINE         │
         │      src/adapters/           │  │       src/templates/         │
         │ Cursor, Claude, Copilot, etc.│  │ Base, Languages, App Types   │
         └──────────────────────┬───────┘  └───────┬──────────────────────┘
                                │                  │
                                └──────────┬───────┘
                                           │ returns GeneratedFile[]
                    ┌──────────────────────▼─────────────────┐
                    │           ISOLATED I/O SHELL           │
                    │   src/io/writer.ts • src/io/paths.ts   │
                    │ Path Traversal Defense • Atomic Writes │
                    └────────────────────────────────────────┘
```

### Detailed Subsystem Inventory

| Module | Primary Files | Architectural Role & Constraints |
| :--- | :--- | :--- |
| **Entry Points** | [`src/bin.ts`](file:///d:/Extentions/Foundry/src/bin.ts), [`src/index.ts`](file:///d:/Extentions/Foundry/src/index.ts) | CLI executable binary and programmatic library exports. |
| **CLI Shell** | [`src/cli/command.ts`](file:///d:/Extentions/Foundry/src/cli/command.ts), [`prompts.ts`](file:///d:/Extentions/Foundry/src/cli/prompts.ts) | Commander CLI orchestration, interactive inquirer prompt flow, visual banner formatting. |
| **Config Engine** | [`src/config/schema.ts`](file:///d:/Extentions/Foundry/src/config/schema.ts), [`defaults.ts`](file:///d:/Extentions/Foundry/src/config/defaults.ts) | Zod schema validation for project types, supported languages, strictness modes, and tool adapter lists. |
| **Detection** | [`src/detection/detector.ts`](file:///d:/Extentions/Foundry/src/detection/detector.ts) | Pure heuristic inference of project characteristics from lockfiles and markers. |
| **Generation Core** | [`src/core/generator.ts`](file:///d:/Extentions/Foundry/src/core/generator.ts), [`context.ts`](file:///d:/Extentions/Foundry/src/core/context.ts) | Pure function `(context) => GeneratedFile[]`. Strictly forbidden from importing `node:fs`. |
| **Adapters** | [`src/adapters/registry.ts`](file:///d:/Extentions/Foundry/src/adapters/registry.ts), `adapters/*.ts` | Translates resolved context into tool-specific file formats for Cursor, Claude, Copilot, Windsurf, Cline, Aider, OpenCode. |
| **Templates** | [`src/templates/`](file:///d:/Extentions/Foundry/src/templates) | Modular string interpolation templates. Zero runtime dependencies. |
| **I/O Shell** | [`src/io/writer.ts`](file:///d:/Extentions/Foundry/src/io/writer.ts), [`paths.ts`](file:///d:/Extentions/Foundry/src/io/paths.ts) | The only boundary allowed to execute disk mutations. Enforces path traversal containment. |
| **Test Suite** | [`tests/`](file:///d:/Extentions/Foundry/tests) | 8 comprehensive test suites covering unit logic, generator integration, writer disk I/O, and golden snapshots. |

---

## 4. Development & Operational Commands

All operations must be run from the repository root:

```bash
# Typecheck static analysis (strict mode, zero errors required)
npm run typecheck

# Execute full automated test suite via Vitest
npm test

# Run tests in continuous watch mode
npm run test:watch

# Execute local CLI under development via tsx
npm run dev

# Compile TypeScript to production bundle (dist/)
npm run build

# Clean ephemeral build artifacts
npm run clean
```

---

## 5. Canonical Deep Documentation Links

- **Documentation Portal & Sitemap:** [`docs/README.md`](file:///d:/Extentions/Foundry/docs/README.md)
- **Product Vision & Non-Goals:** [`docs/product/PRODUCT_VISION.md`](file:///d:/Extentions/Foundry/docs/product/PRODUCT_VISION.md)
- **Domain Dictionary & Terminology:** [`docs/product/TERMINOLOGY.md`](file:///d:/Extentions/Foundry/docs/product/TERMINOLOGY.md)
- **Architecture Deep Dive:** [`docs/architecture/ARCHITECTURE.md`](file:///d:/Extentions/Foundry/docs/architecture/ARCHITECTURE.md)
- **Tool Adapter Specifications:** [`docs/architecture/ADAPTERS.md`](file:///d:/Extentions/Foundry/docs/architecture/ADAPTERS.md)
- **Workspace Contract Specification:** [`docs/specifications/SPECIFICATION.md`](file:///d:/Extentions/Foundry/docs/specifications/SPECIFICATION.md)
- **Contributor & Engineering Guide:** [`docs/development/DEVELOPMENT.md`](file:///d:/Extentions/Foundry/docs/development/DEVELOPMENT.md)
- **Audit & Phased Implementation Roadmap:** [`docs/planning/FOUNDRY_AUDIT_AND_ROADMAP.md`](file:///d:/Extentions/Foundry/docs/planning/FOUNDRY_AUDIT_AND_ROADMAP.md)
- **Architectural Decision Log:** [`docs/planning/DECISION_LOG.md`](file:///d:/Extentions/Foundry/docs/planning/DECISION_LOG.md)
