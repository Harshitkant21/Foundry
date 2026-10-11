# Foundry Architecture Documentation

## 1. System Overview

Foundry (published on npm as `create-foundry-workspace`) is designed around a **pure functional core and a side-effect shell**. The generation pipeline operates strictly in memory, producing an immutable array of file definitions that are verified and written atomically by an isolated I/O layer.

```text
┌────────────────────────────────────────────────────────┐
│                        CLI / UI                        │
│   (Commander flags, @clack/prompts, non-TTY checks)    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   DETECTION SUBSYSTEM                  │
│    (Infers project name, language & type from disk)    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   CONFIG VALIDATION                    │
│             (Zod schema parses parameters)             │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                 CORE GENERATOR (Pure)                  │
│             ResolvedContext -> GeneratedFile[]         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Base Rules + Language Rules + App Type Rules     │  │
│  │                      +                           │  │
│  │ Extensible Adapter Registry (Cursor, Claude, etc)│  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                     I/O SUBSYSTEM                      │
│ (Atomic writes, path normalization, safe-merge, force) │
└────────────────────────────────────────────────────────┘
```

---

## 2. Directory Responsibilities

### `src/cli/`
Handles human interaction:
- Argument and flag parsing (`commander`).
- Interactive prompts (`@clack/prompts`).
- TTY detection and headless execution fallback.
- Output formatting (success trees, dry-run previews, error reporting).

### `src/detection/`
Pure project detection:
- Inspects target directory markers (`package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle`).
- Disconnected from CLI prompts; returns deterministic detection candidates.

### `src/config/`
Formal contracts:
- Zod schema for `ai-workspace.yaml` and CLI flags.
- Type definitions for `WorkspaceConfig`, `ResolvedWorkspaceContext`, and `CliOptions`.
- Canonical system defaults.

### `src/templates/`
Modular, inspectable rule definitions:
- `base/`: Universal guardrails (`standard` vs `strict`).
- `languages/`: Language-specific idioms, style rules, and default command sets (TypeScript, JavaScript, Python, Java, Go, Rust, Other).
- `app-types/`: Application-type guidance (`web`, `api`, `fullstack`, `cli`, `library`, `data-ml`, `mobile`, `custom`).
- Root templates: `manifest.ts` (`ai-workspace.yaml`), `readme.ts` (`README.md`), `ai-context.ts` (`AI_CONTEXT.md`), `guardrails-doc.ts` (`PROJECT_GUARDRAILS.md`), `contributing.ts` (`CONTRIBUTING.md`), `gitignore.ts` (`.gitignore`).
- `docs/`: Human documentation templates (`README.md`, `ARCHITECTURE.md`, `DEVELOPMENT.md`, `DECISIONS.md`).
- `ai-dir/`: AI intelligence templates (`project-context.md`, `00-core-rules.md`, `system-design.md`, `0001-project-init.md`, `task-backlog.md`).

### `src/adapters/`
AI tool format translation:
- Defines the `WorkspaceAdapter` interface.
- Holds an extensible `AdapterRegistry`.
- Implements concrete adapters for `AGENTS.md` (Multi-Agent), `CLAUDE.md` (Claude Code), `.cursor/rules/*.mdc` (Cursor), `.github/copilot-instructions.md` (GitHub Copilot), `.codex/instructions.md` (OpenAI Codex), `GEMINI.md` (Google Antigravity & Gemini CLI), and `AI_INSTRUCTIONS.md` (Generic AI Assistant).
- No if/else branches in the core generator; the generator queries the registry.

### `src/core/`
The pure generation engine:
- `context.ts`: Resolves config, detected facts, and templates into a `ResolvedWorkspaceContext`.
- `interpolator.ts`: Deterministic string substitution engine.
- `generator.ts`: Pure function mapping `ResolvedWorkspaceContext` to `GeneratedFile[]`.

### `src/io/`
The filesystem boundary:
- Path normalization (POSIX relative paths across Windows/Linux/macOS).
- Collision detection.
- Strategies: `safe-merge` (skip existing), `overwrite` (`--force`), `dry-run` (in-memory preview).
- Atomic disk writing.

---

## 3. The Pure Core Principle

Under no circumstances may modules in `src/core/`, `src/templates/`, or `src/adapters/` import `node:fs` or execute disk writes. All file construction happens purely in-memory:

```typescript
export interface GeneratedFile {
  readonly relativePath: string;
  readonly content: string;
}

export function generateWorkspace(context: ResolvedWorkspaceContext): GeneratedFile[];
```

This ensures fast, completely deterministic unit and snapshot testing with zero mock filesystem complexity.
