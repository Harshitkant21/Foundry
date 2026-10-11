# ts-fullstack-app — AI Development Contract (AGENTS.md)

Welcome to **ts-fullstack-app**. This file defines the core context, commands, and non-negotiable architectural boundaries for human engineers and AI coding assistants collaborating on this project.

---

## 1. Application Profile & Scope
- **Project Name:** ts-fullstack-app
- **Application Type:** fullstack
- **Primary Language:** typescript
- **Strictness Level:** strict

---

## 2. Standard Development Commands
- **Build:** `npm run build`
- **Test:** `npm test`
- **Development Server / Entry:** `npm run dev`
- **Lint / Static Analysis:** `npm run lint`

Always run and verify tests and linting before marking tasks or issues as resolved.

---

## 3. Project Architecture & Standards
### Full-Stack Architecture
- Enforce clean separation between client-side presentation and server-side domain logic.
- Share data contracts or type definitions across client and server boundaries to eliminate schema drift.
- Ensure all mutation operations are fully validated on the server regardless of client validation.

---

## 4. Language & Code Style Conventions
### TypeScript Conventions
- Enforce strict null checks and explicit function return types on public APIs.
- Prefer interfaces for object contracts and type aliases for unions/intersections.
- Avoid type assertions (`as UnknownType`); use proper type guards.

---

## 5. Architectural Guardrails
### Strict Guardrails (Non-Negotiable)
- **Type Safety & Zero Bypasses:** Strict static typing is enforced without exception. Never use bypass types (such as `any` in TypeScript, untyped signatures, or `as unknown as T`). Compiler type errors must not be suppressed without explicit written authorization (no unannotated `@ts-ignore` or `type: ignore`).
- **Mandatory Automated Test Verification:** Every modified function, API route, component, or core business logic flow must include automated unit/integration test verification before marking a task complete. Test suites must execute cleanly with zero failures.
- **Absolute Prohibition of Destructive Commands:** Destructive, irrevocable, or unscoped system commands are strictly prohibited. Never execute without explicit, verified human instruction:
  - Destructive file/directory removal (`rm -rf *`, `rmdir /s /q`)
  - Irreversible Git operations (`git push --force`, `git reset --hard`, `git clean -fdx`)
  - Destructive database commands (`DROP DATABASE`, `DROP TABLE`, unbacked-up destructive migrations)
- **Layer Boundary Isolation:** Strictly respect architectural layer boundaries. Never import database models, queries, or raw infrastructure drivers directly into UI components or presentation views. No circular module dependencies permitted.
- **Zero Plaintext Secrets & Strict Environment Validation:** Never commit credentials, API keys, tokens, certificates, or raw secrets to version control. All external configuration must be validated at runtime via strict environment schemas.
- **Deterministic Error Handling:** Never swallow errors or use empty catch blocks. All asynchronous operations must include deterministic timeouts and typed error propagation. Failures must log actionable context without leaking sensitive data.
- **Dependency Lockdown & Supply Chain Discipline:** External packages require explicit architectural justification. Avoid redundant micro-packages. Never use floating wildcards (`*`) in dependency versions. Prefer native standard library primitives.
- **Determinism & Side-Effect Isolation:** Business logic must remain deterministic. Isolate non-deterministic behavior (timestamps, random number generators, network calls) behind testable interfaces.
