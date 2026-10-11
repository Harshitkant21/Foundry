# Foundry Terminology & Disambiguation Dictionary

## 1. Core Architectural Terms

To prevent architectural ambiguity across engineering discussions and code reviews, this document defines the formal vocabulary used in Foundry.

---

## 2. Disambiguating "Nodes" & Components

A critical potential source of confusion is the word **"node"**, which can refer to a project scaffolding building block or an AI agent workflow execution step. In Foundry, these concepts are strictly separated:

```text
CONCEPT DISAMBIGUATION
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ SCAFFOLDING COMPONENT (Layer 2)                                                        │
│ Definition: A modular unit of project scaffolding defining files, dependencies, and   │
│             templates needed to assemble an application stack.                         │
│ Schema: scaffold.component.json                                                        │
│ Examples: backend.fastapi, database.postgresql, infra.docker                           │
│ Boundary: Internal to project generation; ceases to exist once files are written.     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ AGENT EXECUTION NODE (Layer 3)                                                         │
│ Definition: A discrete computational or LLM step inside an agent runtime state graph   │
│             (e.g., in a LangGraph or CrewAI application).                              │
│ Schema: Defined in workflow graph schema or compiled directly into Python/TS code.     │
│ Examples: researcher_agent, tool_calling_node, supervisor_router                       │
│ Boundary: Executable application code that runs inside the user's project runtime.     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Why `src/nodes/` is Rejected
The generic directory name `src/nodes/` is explicitly rejected in Foundry's architecture because it blurs the line between **Layer 2 Scaffolding Components** and **Layer 3 Agent Execution Nodes**. 
Instead:
- Scaffolding building blocks belong in `src/scaffolding/`.
- Agent workflow graph models belong in `src/workflows/`.

---

## 3. Comprehensive Glossary

### Workspace Generation (Layer 1)
- **Canonical Workspace Contract (`ai-workspace.yaml`):** A machine-readable manifest stored in the project root defining project identity, strictness levels, and enabled tool adapters.
- **AI Tool Adapter (`WorkspaceAdapter`):** An implementation of the adapter interface that transforms a unified workspace context into native prompt formats (e.g., Cursor `.cursor/rules/*.mdc`, Claude `CLAUDE.md`, Copilot `.github/copilot-instructions.md`).
- **Base Guardrails:** Non-negotiable architectural boundaries and testing requirements injected into generated instruction files (`standard` vs. `strict`).

### Project Scaffolding (Layer 2)
- **Scaffolding Component (`scaffold.component.json`):** A declarative packaging manifest that specifies target templates, package dependencies, environment variables, and file collision strategies for a single technology (e.g. FastAPI, PostgreSQL).
- **Stack Composition:** The process of combining multiple compatible scaffolding components into a coherent, non-conflicting project plan.
- **Plan-First Generation:** A generation pipeline where file destinations, template variables, and potential collisions are resolved and previewed in memory before any disk write occurs.

### AI Agent Workflow Generation (Layer 3)
- **Workflow Topology Preset:** A predefined, coarse-grained agent architecture pattern (e.g., `supervisor-workers`, `sequential-pipeline`, `react-loop`) implemented as a tested code starter.
- **Declarative Workflow Graph (Fine-Grained DSL):** An explicit, declarative specification describing individual agent nodes, shared state schemas, directed edges, conditional routing functions, and tool bindings.
- **Symbol Reference (`path:symbol`):** A declarative string pointer (e.g., `./tools/search.py:web_search`) referencing a user-defined function. Foundry parses this string to emit typed import statements at scaffolding time without importing or executing the user's file.

---

## 4. Cross-Document Navigation

- For capability layer definitions, see [docs/product/PRODUCT_VISION.md](PRODUCT_VISION.md).
- For the full repository audit and evolutionary roadmap, see [docs/planning/FOUNDRY_AUDIT_AND_ROADMAP.md](../planning/FOUNDRY_AUDIT_AND_ROADMAP.md).
