# Contributing to Foundry (`create-foundry-workspace`)

Thank you for your interest in contributing to Foundry! This document outlines the development workflow, architecture principles, commit standards, and pull request guidelines.

---

## 1. Architectural Constitution

Foundry is a **deterministic, local-first, zero-LLM developer tool**. Any contribution that violates these principles will be rejected:

1. **Strict Zero-LLM Runtime:** Foundry must never call OpenAI, Anthropic, Gemini, or any LLM API at runtime. It is a deterministic scaffolding generator, not an autonomous agent.
2. **Bit-for-Bit Determinism:** Given identical configuration inputs and package version, Foundry must produce identical byte outputs every time. Never inject timestamps, random UUIDs, or machine-dependent absolute paths.
3. **Pure Core:** Generation logic in `src/core/`, `src/adapters/`, and `src/templates/` must be pure functions with zero `node:fs` imports. All disk I/O must remain isolated in `src/io/writer.ts`.
4. **TypeScript Strictness:** Strict mode is enforced without exception. No `any` types, no unannotated `@ts-ignore`.

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

# 3. Verify typecheck
npm run typecheck

# 4. Run test suite
npm test

# 5. Build TypeScript to dist/
npm run build
```

---

## 3. Git & Commit Conventions (Conventional Commits)

We enforce the **Conventional Commits** format for all commit messages:

```text
<type>(<scope>): <description>
```

### Commit Types:
- `feat`: A new user-facing feature or adapter.
- `fix`: A bug fix or security patch.
- `docs`: Documentation additions, structural updates, or clarifications.
- `refactor`: Internal code refactoring with zero external behavior change.
- `test`: Adding, updating, or fixing unit, integration, or golden tests.
- `chore`: Dependency updates, build script adjustments, or release bumps.

### Valid Examples:
- `feat(adapters): add support for new AI tool adapter`
- `fix(io): prevent path traversal in resolveSafePath`
- `docs(readme): update quickstart and architecture links`
- `test(golden): verify byte-for-byte generation across fixtures`

### Branch Naming Patterns:
- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

---

## 4. Pull Request Checklist

Before submitting a pull request:
- [ ] Run `npm run typecheck` and ensure 0 TypeScript compilation errors.
- [ ] Run `npm test` and ensure all 27+ Vitest unit, integration, and golden tests pass.
- [ ] Run `npm run build` cleanly.
- [ ] Confirm adherence to [`PROJECT_GUARDRAILS.md`](./PROJECT_GUARDRAILS.md).
- [ ] Provide a clear description linking any relevant issues.
