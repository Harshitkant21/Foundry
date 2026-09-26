# AI Adapters Specification & Registry

## 1. Adapter Concept

An **AI Adapter** translates the canonical, resolved workspace context into the native configuration or instruction format required by a specific AI coding tool.

The generator does **not** rely on hardcoded `if/else` checks for each tool. Instead, it interacts with an **Adapter Registry** that implements a uniform interface.

---

## 2. The `WorkspaceAdapter` Interface

Every adapter must implement the following contract:

```typescript
import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile } from '../core/generator.js';

export interface WorkspaceAdapter {
  /** Unique identifier matching the adapter ID in ai-workspace.yaml */
  readonly id: string;

  /** Human-readable display name for the CLI */
  readonly name: string;

  /** Brief description shown in interactive multi-select menus */
  readonly description: string;

  /** Default selection status in new workspaces */
  readonly defaultSelected: boolean;

  /**
   * Pure transformation from resolved workspace context to one or more files.
   * MUST be deterministic and return identical contents given identical context.
   */
  render(context: ResolvedWorkspaceContext): GeneratedFile[];
}
```

---

## 3. Shipped V1 Adapters

Foundry includes 7 native, deterministic adapters in the default registry:

### 1. `agents` (Multi-Agent Open Standard)
- **Target File:** `AGENTS.md`
- **Format:** Top-level Markdown file formatted according to the cross-agent specification. Contains full project metadata, development commands, architectural standards, and guardrails.

### 2. `claude` (Anthropic Claude Code CLI)
- **Target File:** `CLAUDE.md`
- **Format:** Root Markdown file optimized for Claude Code CLI. Features immediate shell build/test commands, architecture style constraints, and concise guardrail bullet points.

### 3. `cursor` (Cursor IDE)
- **Target File:** `.cursor/rules/00-core-rules.mdc`
- **Format:** Modular MDC file with YAML frontmatter:
  ```markdown
  ---
  description: Core architectural rules and development guidelines
  globs: *
  alwaysApply: true
  ---
  ```

### 4. `copilot` (GitHub Copilot)
- **Target File:** `.github/copilot-instructions.md`
- **Format:** Plain Markdown instruction block read automatically by GitHub Copilot chat and code completions.

### 5. `codex` (OpenAI Codex)
- **Target File:** `.codex/instructions.md`
- **Format:** Markdown instruction document structured for OpenAI Codex environments.

### 6. `gemini` (Google Antigravity & Gemini CLI)
- **Target File:** `GEMINI.md`
- **Format:** Markdown contract tailored for Gemini CLI and Antigravity IDE workspaces.

### 7. `generic` (Generic AI Assistant)
- **Target File:** `AI_INSTRUCTIONS.md`
- **Format:** Tool-agnostic instructions suitable for any coding assistant (Aider, Windsurf, Cline, RooCode, etc.).

---

## 4. Candidate & Future Adapters (Post-V1)

Future adapters can be added by implementing `WorkspaceAdapter` and registering them in `src/adapters/registry.ts`:
- **`windsurf`**: `.windsurfrules` (Codeium Windsurf native format)
- **`cline` / `roocode`**: `.clinerules`
- **`aider`**: `.aider.conf.yml` / `CONVENTIONS.md`
