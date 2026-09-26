# Foundry (`create-foundry-workspace`)

> **Deterministic, local-first, zero-LLM CLI for initializing AI-ready software development workspaces.**

[![CI](https://github.com/Harshitkant21/Foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/Harshitkant21/Foundry/actions)
[![npm version](https://img.shields.io/npm/v/create-foundry-workspace.svg?style=flat&color=CB3837)](https://www.npmjs.com/package/create-foundry-workspace)
[![Node: >=18.0.0](https://img.shields.io/badge/Node->=18.0.0-green.svg)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero-LLM Runtime](https://img.shields.io/badge/Architecture-Deterministic%20Zero--LLM-8A2BE2.svg)](docs/ARCHITECTURE.md)

---

## What is Foundry?

Modern developers increasingly rely on AI coding assistants such as **Cursor**, **Claude Code**, and **GitHub Copilot**. However, when starting a new project, developers are forced to manually author and repeatedly recreate AI instruction files, project rules, context files, and guardrails.

**Foundry** is an open-source, deterministic developer tool distributed via npm as **`create-foundry-workspace`**. When starting a new project, running:

```bash
npx create-foundry-workspace
# or: npm create foundry-workspace
```

asks a minimal set of meaningful project initialization questions and deterministically scaffolds an **AI-ready software workspace** based on predefined, versioned, and maintainable templates.

---

## What Foundry Does

- **Establishes a Canonical Contract:** Generates a clean, machine-readable `ai-workspace.yaml` manifest.
- **Generates Native Tool Adapters:** Renders native, complete instruction files for **Cursor** (`.cursor/rules/*.mdc`), **Claude Code** (`CLAUDE.md`), **GitHub Copilot** (`.github/copilot-instructions.md`), and the cross-tool open standard **`AGENTS.md`**.
- **Generates Project README:** Creates a deterministic, human-facing `README.md` tailored to the selected project stack, commands, and AI tools.
- **Enforces Architectural Guardrails:** Injects strict or standard code quality, security, and testing guardrails.
- **Safeguards Existing Files:** Supports non-destructive safe-merges, overwrite protection, and dry-run execution.

---

## What Foundry Explicitly Does NOT Do

Foundry is **NOT an AI agent** and does not use AI to generate workspaces:
- ❌ **NO OpenAI, Anthropic, or Gemini API calls**
- ❌ **NO local or remote LLM inference**
- ❌ **NO network requests at runtime** (100% offline and local-first)
- ❌ **NO hidden API keys or telemetry**
- ❌ **NO autonomous code generation**

Output is 100% deterministic: given the same inputs and version, the generated workspace is bit-for-bit identical every time.

---

## Quick Start

Initialize an AI-ready workspace in your current directory:
```bash
npx create-foundry-workspace
# or: npm create foundry-workspace
```

Or target a specific folder:
```bash
npx create-foundry-workspace ./my-new-project
```

### Non-Interactive (CI / Scripted) Usage
```bash
npx create-foundry-workspace ./my-new-service \
  --name my-new-service \
  --type api \
  --lang python \
  --strictness strict \
  --ai cursor,claude,copilot,agents \
  --yes
```

---

## CLI Options

| Flag | Description | Default |
|---|---|---|
| `[directory]` | Target directory to initialize | `.` |
| `-n, --name <string>` | Project name | Inferred from folder or `package.json` |
| `-t, --type <type>` | `web` \| `api` \| `fullstack` \| `cli` \| `library` \| `data-ml` \| `mobile` \| `custom` | Inferred or `fullstack` |
| `-l, --lang <lang>` | `typescript` \| `javascript` \| `python` \| `java` \| `go` \| `rust` \| `other` | Inferred or `typescript` |
| `-r, --repo <repo>` | `github` \| `gitlab` \| `none` | `github` |
| `-s, --strictness <level>` | `standard` \| `strict` | `standard` |
| `-a, --ai <adapters>` | Comma-separated list of adapters (`claude,cursor,agents,copilot,codex,gemini,generic`) | `claude,cursor,agents` |
| `--dry-run` | Preview files in terminal without writing to disk | `false` |
| `-f, --force` | Overwrite conflicting files | `false` |
| `-y, --yes` | Accept all defaults non-interactively | `false` |
| `-v, --version` | Display version | |
| `-h, --help` | Display help | |

---

## Generated Workspace Structure

Foundry generates a deterministic, standardized workspace with zero bloat and zero hallucinations:

```text
my-project/
├── ai-workspace.yaml               # Canonical machine contract
├── README.md                       # Project documentation & stack guide
├── AI_CONTEXT.md                   # System map and entrypoint for AI assistants
├── PROJECT_GUARDRAILS.md           # Standalone architectural guardrails & testing rules
├── CONTRIBUTING.md                 # Contribution workflow & guidelines
├── .gitignore                      # Language-tailored ignore rules
│
├── .ai/                            # AI operational intelligence directory
│   ├── context/project-context.md  # Detailed project domain background
│   ├── rules/00-core-rules.md      # Core workspace rules & coding conventions
│   ├── architecture/system-design.md # High-level architecture & layer boundaries
│   ├── decisions/0001-project-init.md # Initial architecture decision record (ADR)
│   └── tasks/task-backlog.md       # Operational scratchpad for AI agent task execution
│
├── docs/                           # Human-facing project documentation
│   ├── README.md                   # Documentation index
│   ├── ARCHITECTURE.md             # System architecture & component design
│   ├── DEVELOPMENT.md              # Local setup, run, and test guides
│   └── DECISIONS.md                # Architecture decision records index
│
└── [Tool Adapters]                 # Based on user selection:
    ├── AGENTS.md                   # Multi-Agent open standard
    ├── CLAUDE.md                   # Anthropic Claude Code CLI
    ├── .cursor/rules/*.mdc         # Cursor IDE modular rules
    ├── .github/copilot-instructions.md # GitHub Copilot context
    ├── .codex/instructions.md      # OpenAI Codex context
    ├── GEMINI.md                   # Google Antigravity & Gemini CLI
    └── AI_INSTRUCTIONS.md          # Generic AI assistant instructions
```

---

## Repository Architecture & Dogfooding

Foundry strictly practices **dogfooding**. The Foundry repository itself is governed by the same `ai-workspace.yaml`, `AGENTS.md`, `CLAUDE.md`, `.cursor/`, and `.github/` files that it generates for users.

For deeper architectural details, review the internal documentation:
- [docs/SPECIFICATION.md](file:///d:/Extentions/Foundry/docs/SPECIFICATION.md) — Formal specification of the AI Workspace contract.
- [docs/ARCHITECTURE.md](file:///d:/Extentions/Foundry/docs/ARCHITECTURE.md) — System architecture, module boundaries, and pure core pipeline.
- [docs/ADAPTERS.md](file:///d:/Extentions/Foundry/docs/ADAPTERS.md) — Adapter interface specification and registry design.
- [docs/DEVELOPMENT.md](file:///d:/Extentions/Foundry/docs/DEVELOPMENT.md) — Developer setup and testing guide.

---

## Development & Testing

```bash
# Clone the repository
git clone https://github.com/Harshitkant21/Foundry.git
cd Foundry

# Install dependencies
npm install

# Run Vitest test suite
npm test

# Build TypeScript to dist/
npm run build

# Run local development CLI
npx tsx src/bin.ts --dry-run
```

---

## License

MIT © Foundry Contributors
