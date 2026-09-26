# Claude Code Guidelines — `create-ai-workspace`

## Key CLI Commands
- `npm run build` — Compile TypeScript to `dist/`
- `npm run test` — Run Vitest suite
- `npm run dev` — Run CLI locally via `tsx`
- `npm run typecheck` — Verify TypeScript types

## Core Guardrails
- **Zero LLM / Zero Network:** No external API calls or generative AI inside the CLI.
- **Strict Determinism:** Generated output must be bit-for-bit identical across runs.
- **Strict Types:** TypeScript strict mode, Zod validation for all schemas.
- **Minimal Files:** Generate only 5 active files by default.
