# Contributing to Foundry (`create-ai-workspace`)

Thank you for your interest in contributing to Foundry! This document outlines the development workflow, architecture principles, and contribution guidelines.

---

## 1. Architectural Constitution

Foundry is a **deterministic, local-first, zero-LLM developer tool**. Any contribution that violates these principles will be rejected:

1. **Strict Zero-LLM Runtime:** Foundry must never call OpenAI, Anthropic, Gemini, or any LLM API at runtime. It is a determinist scaffolding generator, not an autonomous agent.
2. **Bit-for-Bit Determinism:** Given identical configuration inputs and package version, Foundry must produce identical byte outputs every time. Never inject timestamps, random UUIDs, or machine-dependent absolute paths.
3. **Pure Core:** Generation logic in `src/core/`, `src/adapters/`, and `src/templates/` must be pure functions with zero `node:fs` imports. All disk I/O must remain in `src/io/`.
4. **TypeScript Strictness:** Strict mode is enforced without exception. No `any` types, no `@ts-ignore`.

---

## 2. Local Development Setup

Prerequisites:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

```bash
# 1. Fork and clone the repository
git clone https://github.com/Harshitkant21/Foundry.git
cd Foundry

# 2. Install dependencies
npm install

# 3. Run test suite
npm test

# 4. Typecheck code
npm run typecheck

# 5. Build TypeScript to dist/
npm run build
```

---

## 3. Adding or Updating an AI Tool Adapter

To add support for a new AI coding assistant:

1. Create a new adapter file in `src/adapters/<tool>.adapter.ts`.
2. Implement the `WorkspaceAdapter` interface:
   ```typescript
   export interface WorkspaceAdapter {
     readonly id: string;
     readonly name: string;
     readonly description: string;
     readonly defaultSelected: boolean;
     render(context: ResolvedWorkspaceContext): GeneratedFile[];
   }
   ```
3. Register the adapter in `src/adapters/registry.ts`.
4. Add unit test coverage in `tests/unit/adapters.test.ts`.
5. Update `docs/ADAPTERS.md`.

---

## 4. Pull Request Checklist

Before submitting a pull request:
- [ ] Run `npm run typecheck` and ensure 0 TypeScript errors.
- [ ] Run `npm test` and ensure all unit, integration, and golden tests pass.
- [ ] Run `npm run build` cleanly.
- [ ] Provide a clear description and link any related issues.
