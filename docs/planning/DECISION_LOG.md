# Foundry Decision Log & Architectural Baselines

This document tracks recorded architectural baselines observed in the implementation, along with open decision proposals currently pending stakeholder review.

---

## 1. Observed V1 Architectural Baseline

These entries represent structural and operational decisions observed directly in the current V1 codebase. They reflect established system behavior rather than speculative proposals.

### BASE-001: Deterministic Zero-LLM In-Memory Workspace Generation
- **Status:** Observed in implementation ([`src/core/generator.ts`](file:///d:/Extentions/Foundry/src/core/generator.ts#L26-L121)).
- **Context:** Bootstrapping AI instruction files across varied developer environments.
- **Observed Behavior:** Foundry performs zero runtime LLM calls, zero network fetches, and zero stochastic heuristics. Workspace generation is a pure synchronous function mapping context to file definitions.
- **Evidence:** [`tests/integration/generator.test.ts`](file:///d:/Extentions/Foundry/tests/integration/generator.test.ts#L20-L28) asserts bit-for-bit determinism across repeated executions.

### BASE-002: Pure Functional Core vs. Isolated I/O Boundary
- **Status:** Observed in implementation ([`src/core/generator.ts`](file:///d:/Extentions/Foundry/src/core/generator.ts) vs [`src/io/writer.ts`](file:///d:/Extentions/Foundry/src/io/writer.ts)).
- **Context:** Preventing side-effect pollution and ensuring fast, reproducible testing.
- **Observed Behavior:** Modules in `src/core/`, `src/adapters/`, and `src/templates/` never import `node:fs`. Disk I/O, collision detection, safe-merges, and dry-run previewing are strictly isolated in `src/io/writer.ts`.
- **Evidence:** Codebase grep confirms `node:fs` is only imported in `src/io/` and `src/detection/`.

### BASE-003: Self-Governing Dogfooding Contract
- **Status:** Observed in implementation ([`ai-workspace.yaml`](file:///d:/Extentions/Foundry/ai-workspace.yaml), [`tests/integration/dogfood.test.ts`](file:///d:/Extentions/Foundry/tests/integration/dogfood.test.ts)).
- **Context:** Maintaining consistency between Foundry's internal standards and the outputs it generates for users.
- **Observed Behavior:** The Foundry repository itself is governed by the same `ai-workspace.yaml`, `AGENTS.md`, `CLAUDE.md`, `.cursor/`, and `.github/` instruction files that it generates.
- **Evidence:** Automated integration test validates the root `ai-workspace.yaml` against the schema.

---

## 2. Pending Decision Proposals (Open for Review)

These entries represent active design proposals under evaluation. **None of these proposals are approved or frozen.**

### OPEN-001: Three-Layer Capability Separation
- **Status:** Proposed / Under Review.
- **Context:** Evolving Foundry from workspace metadata generation to complete project scaffolding and agent workflows.
- **Proposal:** Formally separate Layer 1 (Workspace Generation), Layer 2 (Project Scaffolding), and Layer 3 (AI Agent Workflow Generation) into decoupled subsystems.
- **Pending Validation:** Ensuring the boundary between Layer 2 and Layer 3 remains clear without duplicating template resolution logic.

### OPEN-002: Scaffolding Component Architecture vs. Agent Execution Nodes
- **Status:** Proposed / Under Review.
- **Context:** Defining the internal structure for modular project scaffolding without conflating it with agent runtime graphs.
- **Proposal:** Introduce `scaffold.component.json` in `src/scaffolding/` for Layer 2 stack modules (FastAPI, PostgreSQL), while reserving workflow node definitions for `src/workflows/`. Explicitly reject the ambiguous directory name `src/nodes/`.
- **Pending Validation:** Authoring a pilot `scaffold.component.json` manifest to test dependency resolution.

### OPEN-003: AI Agent Workflow Strategy (Template-First Starter vs. Declarative Graph Compiler)
- **Status:** Proposed / Under Review.
- **Context:** Balancing developer experience, IDE support, and framework abstraction.
- **Proposal:** Milestone v1.1 will deliver a **Template-First Curated Starter** in Python (LangGraph) for superior ergonomics, while milestone v1.2 will pilot a **Declarative Graph Compiler** for LangGraph.
- **Pending Validation:** Spike testing a sample 4-node research agent in both formats to compare developer maintenance burden.

### OPEN-004: Compile-Time Symbol Reference Contract for Custom Code
- **Status:** Proposed / Under Review.
- **Context:** Allowing declarative workflow graphs to reference custom user tools and condition predicates without executing arbitrary code during scaffolding.
- **Proposal:** Use string symbol pointers (`./tools/search.py:web_search`). Foundry resolves paths strictly via relative containment, emits typed import statements, and stubs missing files without executing user code.
- **Pending Validation:** Prototyping AST import emission in TypeScript for target Python source code.

### OPEN-005: Dedicated `foundry.config.json` Configuration Contract
- **Status:** Proposed / Under Review.
- **Context:** Enabling headless, reproducible scaffolding via a single configuration file (`--config`).
- **Proposal:** Introduce `foundry.config.json` backed by a formal JSON Schema, cleanly partitioned into `project`, `workspace`, `scaffolding`, and `agentWorkflow` blocks.
- **Pending Validation:** Publishing the JSON schema and confirming compatibility with standard IDE completion (`$schema`).

---

## 3. Cross-Document Navigation

- For the detailed audit and phased roadmap, see [docs/planning/FOUNDRY_AUDIT_AND_ROADMAP.md](FOUNDRY_AUDIT_AND_ROADMAP.md).
- For capability layer definitions, see [docs/product/PRODUCT_VISION.md](../product/PRODUCT_VISION.md).
