# Foundry Documentation

Welcome to the internal documentation for **Foundry** (`create-foundry-workspace`).

This directory organizes formal specifications, system architecture documentation, contributor guides, and active evolution plans.

---

## Directory Overview

```text
docs/
├── README.md                                    # This documentation index
│
├── product/                                     # Product definition, vision & terminology
│   ├── PRODUCT_VISION.md                        # The 3 product layers, core philosophy & non-goals
│   └── TERMINOLOGY.md                           # Dictionary disambiguating Scaffolding Components vs Workflow Nodes
│
├── architecture/                                # Core architecture & implementation design
│   ├── ARCHITECTURE.md                          # V1 pure functional core, generation pipeline & I/O shell
│   └── ADAPTERS.md                              # AI Tool Adapter interface, registry & supported tools
│
├── specifications/                              # Formal machine contracts & schema specifications
│   └── SPECIFICATION.md                         # Formal AI Workspace Contract Specification (v1.0.0)
│
├── development/                                 # Contributor & engineering guides
│   └── DEVELOPMENT.md                           # Local setup, test execution, Vitest & npm packaging
│
└── planning/                                    # Roadmaps, repository audits & architectural decisions
    ├── FOUNDRY_AUDIT_AND_ROADMAP.md             # Consolidated audit, scaffolding architecture & phased plan (Working Plan)
    └── DECISION_LOG.md                          # Observed V1 architectural baselines & open pending proposals
```

---

## Quick Reference

| Document | Purpose | Target Audience |
|---|---|---|
| [**product/PRODUCT_VISION.md**](./product/PRODUCT_VISION.md) | High-level product definition, 3-layer architecture, and explicit non-goals. | All Engineers & Stakeholders |
| [**product/TERMINOLOGY.md**](./product/TERMINOLOGY.md) | Standardized vocabulary; disambiguates Scaffolding Components from Workflow Nodes. | All Contributors |
| [**architecture/ARCHITECTURE.md**](./architecture/ARCHITECTURE.md) | Pure functional generation core, in-memory pipeline, filesystem boundary, and security model. | Architects & Core Contributors |
| [**architecture/ADAPTERS.md**](./architecture/ADAPTERS.md) | Specifications for tool adapters (Cursor, Claude Code, GitHub Copilot, AGENTS.md, etc.). | Tool Integrators |
| [**specifications/SPECIFICATION.md**](./specifications/SPECIFICATION.md) | Formal machine contract for `ai-workspace.yaml` and strictness levels. | Tool Authors & Integrators |
| [**development/DEVELOPMENT.md**](./development/DEVELOPMENT.md) | Local prerequisites, build commands, test runner guides, packaging, and guardrails. | All Developers |
| [**planning/FOUNDRY_AUDIT_AND_ROADMAP.md**](./planning/FOUNDRY_AUDIT_AND_ROADMAP.md) | Complete repository audit, workflow evaluation, and phased roadmap (**Proposed / Working Plan**). | Leadership & Reviewers |
| [**planning/DECISION_LOG.md**](./planning/DECISION_LOG.md) | Observed V1 implementation baselines (`BASE-001..003`) and open proposals (`OPEN-001..005`). | Architects & Reviewers |
