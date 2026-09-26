# AI Workspace Specification (v1.0.0)

## 1. Overview & Objective

An **AI Workspace** is a standardized, contract-driven project configuration that establishes unambiguous project context, architectural boundaries, commands, and guardrails for both human software engineers and AI coding assistants.

The goal is to eliminate manual, ad-hoc prompt recreation and configuration drift across different AI coding environments (e.g., Cursor, Claude Code, GitHub Copilot) by generating native, tool-specific configuration files from a single, deterministic project contract.

---

## 2. Core Architectural Principles

1. **Strict Determinism:** Identical inputs and version must produce byte-for-byte identical generated outputs. No dynamic timestamps, randomized identifiers, or machine-specific absolute paths.
2. **Zero-LLM Boundary:** The workspace generator contains zero generative models, zero network dependencies, and zero autonomous agent heuristics.
3. **Minimal Default Footprint:** Avoid generating empty directories, speculative tasks, or unpopulated decision record trees on Day 0.
4. **Native Format Translation:** Each supported AI tool receives native configuration files adhering to its official specification rather than proprietary transclusion directives.
5. **Human and Machine Readability:** The workspace must be transparent, easily inspectable, and editable by human developers using standard Git workflows.

---

## 3. The Canonical Machine Contract: `ai-workspace.yaml`

The single machine-readable contract stored in the root of the project is `ai-workspace.yaml`. It records project metadata, classification, guardrail strictness, and enabled adapters.

### Formal Schema (YAML v1)

```yaml
version: "1"

project:
  name: string          # Project identifier (e.g., "my-service")
  type: string          # web | api | fullstack | cli | library | data-ml | mobile | custom
  language: string      # typescript | javascript | python | java | go | rust | other

repository: string      # github | gitlab | none

strictness: string      # standard | strict

adapters:
  - string              # list of enabled adapter IDs (e.g., agents, cursor, claude, copilot, codex, gemini, generic)
```

### Schema Constraints
- `version`: Fixed string literal `"1"`.
- `project.name`: Non-empty alphanumeric string (allowing hyphens and underscores).
- `project.type`: One of `['web', 'api', 'fullstack', 'cli', 'library', 'data-ml', 'mobile', 'custom']`.
- `project.language`: One of `['typescript', 'javascript', 'python', 'java', 'go', 'rust', 'other']`.
- `repository`: One of `['github', 'gitlab', 'none']` (defaults to `'github'`).
- `strictness`: One of `['standard', 'strict']` (defaults to `'standard'`).
- `adapters`: Array of non-empty strings corresponding to registered adapter IDs (defaults to `['claude', 'cursor', 'agents']`).

---

## 4. Generated Workspace Structure

The generator produces a complete, deterministic AI-ready workspace partitioned into root files, documentation, the `.ai/` intelligence directory, and tool-specific adapters:

```text
<project-root>/
├── ai-workspace.yaml               # Canonical machine contract
├── README.md                       # Human & team project documentation
├── AI_CONTEXT.md                   # System map and entrypoint for AI assistants
├── PROJECT_GUARDRAILS.md           # Standalone non-negotiable architectural boundaries
├── CONTRIBUTING.md                 # Team workflow and branch conventions
├── .gitignore                      # Language-tailored ignore rules
│
├── .ai/                            # AI operational intelligence directory
│   ├── context/
│   │   └── project-context.md      # Detailed domain & runtime background
│   ├── rules/
│   │   └── 00-core-rules.md        # Core operational rules & language conventions
│   ├── architecture/
│   │   └── system-design.md        # Architectural patterns & system overview
│   ├── decisions/
│   │   └── 0001-project-init.md    # Initial architectural decision record (ADR)
│   └── tasks/
│       └── task-backlog.md         # Operational scratchpad for agent task execution
│
├── docs/                           # Human-facing project documentation
│   ├── README.md                   # Documentation index
│   ├── ARCHITECTURE.md             # System architecture & component design
│   ├── DEVELOPMENT.md              # Local setup, run, and test guides
│   └── DECISIONS.md                # Architecture decision records index
│
└── [Tool-Specific Adapters]        # Selected during setup:
    ├── AGENTS.md                   # Multi-Agent open standard (agents)
    ├── CLAUDE.md                   # Anthropic Claude Code CLI (claude)
    ├── .cursor/rules/*.mdc         # Cursor IDE modular rules (cursor)
    ├── .github/copilot-instructions.md # GitHub Copilot workspace context (copilot)
    ├── .codex/instructions.md      # OpenAI Codex / extension instructions (codex)
    ├── GEMINI.md                   # Google Antigravity & Gemini CLI (gemini)
    └── AI_INSTRUCTIONS.md          # Generic AI assistant instructions (generic)
```

### File Responsibilities:
* `ai-workspace.yaml`: Machine contract read by tooling and future migration scripts.
* `README.md`: Explains the project purpose, stack, development commands, and AI workspace workflow to human developers.
* `AI_CONTEXT.md`: Single entry point directing AI coding tools to relevant context files, docs, and commands.
* `PROJECT_GUARDRAILS.md`: Non-negotiable architectural boundaries and testing requirements for both humans and AI.
* `CONTRIBUTING.md`: Contributor workflow, branch naming conventions, and PR checklist.
* `.gitignore`: Language-specific ignore file ensuring clean git commits.
* `.ai/context/project-context.md`: Deep background on project domains and data structures.
* `.ai/rules/00-core-rules.md`: Active guardrails and code style conventions.
* `.ai/architecture/system-design.md`: Architectural layout, boundaries, and layer organization.
* `.ai/decisions/0001-project-init.md`: Record of initialization and baseline technology choices.
* `.ai/tasks/task-backlog.md`: Operational scratchpad for AI agents to claim, verify, and complete discrete tasks.
* `docs/*`: Comprehensive human documentation for architecture, local development, and decisions.

---

## 5. Strictness Semantics

Strictness controls the intensity of rules injected into generated instruction files:

### Standard (`standard`)
- Enforces modular file organization and separation of concerns.
- Enforces executing project test and lint suites before committing changes.
- Prohibits committing credentials, API keys, or raw secrets.
- Recommends sensible dependency management.

### Strict (`strict`)
- **Zero Type Bypasses:** Strict static typing is enforced without exception. Never use bypass types (`any`, untyped signatures, `as unknown as T`) or suppress compiler type errors (`@ts-ignore` prohibited).
- **Mandatory Automated Test Verification:** Every modified function, API route, component, or core business logic flow must include automated unit/integration test verification before marking a task complete. Test suites must execute cleanly with zero failures.
- **Absolute Prohibition of Destructive Commands:** Destructive, irrevocable, or unscoped system commands are strictly prohibited without explicit human authorization (`rm -rf`, `DROP TABLE`, force pushing, git reset --hard).
- **Layer Boundary Isolation:** Strictly respect architectural layer boundaries (e.g., UI components cannot import database models or raw infrastructure drivers directly). No circular module dependencies permitted.
- **Zero Plaintext Secrets & Strict Environment Validation:** Never commit credentials, tokens, or raw secrets. All configuration must be validated at runtime via strict environment schemas.
- **Deterministic Error Handling:** Never swallow errors or use empty catch blocks. All asynchronous operations must include deterministic timeouts and typed error propagation.
- **Dependency Lockdown & Supply Chain Discipline:** External packages require explicit architectural justification. Never use floating wildcards (`*`) in dependency versions. Prefer native standard library primitives.
- **Determinism & Side-Effect Isolation:** Business logic must remain deterministic. Isolate non-deterministic behavior (timestamps, random number generators, network calls) behind testable interfaces.
