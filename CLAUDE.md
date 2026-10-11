# Claude Code Guidelines — Foundry (`create-foundry-workspace`)

> **MANDATORY INSTRUCTION FOR CLAUDE CODE CLI AGENT:**  
> Before formulating plans or executing tool calls, you MUST read and strictly adhere to the project governance framework.

## 1. Required Reading Sequence
1. [`.ai/rules/guardrails.md`](file:///d:/Extentions/Foundry/.ai/rules/guardrails.md) — **Non-negotiable operational & Git rules.** Read-only Git by default, zero unauthorized commits/pushes/resets.
2. [`.ai/context/project-context.md`](file:///d:/Extentions/Foundry/.ai/context/project-context.md) — **Canonical project context & architecture map.** Scope boundaries, Layer 1 vs Layer 2/3, standard commands.
3. [`AGENTS.md`](file:///d:/Extentions/Foundry/AGENTS.md) — **Master AI agent operating contract.**

## 2. Key Commands
- `npm run typecheck` — Verify TypeScript strict types (`tsc --noEmit`)
- `npm test` — Run full Vitest test suite (`vitest run`)
- `npm run dev` — Run local CLI binary via `tsx`
- `npm run build` — Compile TypeScript to `dist/`

## 3. Core Architectural Boundaries
- **Zero-LLM Core:** No external API calls, AI SDKs, or network dependencies inside `src/`.
- **Pure Functional Core:** Zero `node:fs` imports in `src/core/`, `src/adapters/`, or `src/templates/`.
- **Strict Determinism:** Identical inputs must yield bit-for-bit identical generated files.
- **Strict Typing:** No `any`, full Zod schema validation.
