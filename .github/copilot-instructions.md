# GitHub Copilot Workspace Instructions — Foundry (`create-foundry-workspace`)

## Mandatory Operating Protocol
Before generating code or suggesting changes, you MUST read and adhere to:
1. [`.ai/rules/guardrails.md`](file:///d:/Extentions/Foundry/.ai/rules/guardrails.md) — Non-negotiable Git safety, zero-LLM core, pure core I/O isolation.
2. [`.ai/context/project-context.md`](file:///d:/Extentions/Foundry/.ai/context/project-context.md) — Canonical project context, layer model, and architecture map.
3. [`AGENTS.md`](file:///d:/Extentions/Foundry/AGENTS.md) — Master AI operating contract.

## Core Architectural Guardrails
- **Zero-LLM Core:** Foundry is a deterministic, local-first developer tool. Never introduce LLM APIs or network dependencies into `src/`.
- **Pure Core Isolation:** All filesystem writes must remain strictly within `src/io/writer.ts`. Zero `node:fs` in `src/core/`.
- **Strict TypeScript:** Maintain strict static type safety without `any`.
- **Deterministic Generation:** Same inputs must produce bit-for-bit identical outputs.
