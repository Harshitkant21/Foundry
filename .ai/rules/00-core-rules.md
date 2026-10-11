# Engineering Core Rules — Foundry

> Coding standards, architecture constraints, and styling rules for Foundry.

---

## 1. Clean Architecture & Layering

- **Functional Core:** `src/core/`, `src/adapters/`, `src/config/`, `src/templates/` must be pure and side-effect free.
- **Isolated I/O Shell:** `src/io/` is the only package permitted to read from or write to disk.
- **CLI Shell:** `src/cli/` handles user interaction, parsing flags, and invoking the core pipeline.

---

## 2. TypeScript & Code Style Standards

- Native ESM (`import`/`export` with explicit `.js` extensions in imports).
- Strict typing with Zod schema validation for all user configs.
- No `any`, no implicit types, no non-null assertion abuse (`!`).
- Error messages must be clean, deterministic, and informative.

---

## 3. Testing Requirements

- Unit tests for all pure functions in `tests/unit/`.
- Integration tests for end-to-end generation and disk I/O in `tests/integration/`.
- Golden tests for checking exact snapshot byte-parity in `tests/golden/`.
