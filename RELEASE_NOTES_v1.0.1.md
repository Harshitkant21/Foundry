# Release Notes — Foundry v1.0.1

**Release Date:** October 2026  
**Type:** Patch & Architectural Hardening Release  
**Package:** `create-foundry-workspace`

---

## Highlights

Foundry v1.0.1 hardens the foundation of the Layer 1 Workspace Generation engine. This release resolves critical security vulnerabilities in path containment, seals filesystem I/O boundary leaks in environment detection, establishes immutable regression testing for golden snapshots, and standardizes contribution workflows with Conventional Commits.

---

## What Was Fixed & Improved

### 1. Security: Prefix Path Traversal Protection
- **Module:** [`src/io/paths.ts`](./src/io/paths.ts)
- **Problem:** Target path resolution previously validated paths with `.startsWith(resolvedBase)`. A malicious or malformed relative path like `../workspace-secret/key.pem` would bypass validation if the base directory was `/workspace`.
- **Solution:** Replaced with strict relative path containment (`path.relative(resolvedBase, resolvedTarget)`), verifying that target paths do not start with `..` and are not absolute paths.
- **Coverage:** Added dedicated security unit test suite in [`tests/unit/paths.test.ts`](./tests/unit/paths.test.ts).

### 2. Clean Architecture: Pure Core Isolation for Environment Detection
- **Modules:** [`src/io/scanner.ts`](./src/io/scanner.ts), [`src/detection/detector.ts`](./src/detection/detector.ts), [`src/detection/rules/`](./src/detection/rules/)
- **Problem:** Detection rules directly imported `node:fs/promises`, violating the architectural boundary that pure core modules must remain free of direct disk mutations/reads.
- **Solution:** Introduced the `ProjectFileSystem` interface in [`src/io/scanner.ts`](./src/io/scanner.ts). All detection rules (`node.ts`, `python.ts`, `go.ts`, `rust.ts`, `java.ts`) now depend strictly on the abstraction, adhering to the Dependency Inversion Principle (DIP).

### 3. Reliability: Golden Fixture Regression Guard
- **Module:** [`tests/golden/golden.test.ts`](./tests/golden/golden.test.ts)
- **Problem:** Golden tests previously regenerated and overwrote disk fixtures in `beforeAll()` on every test run, causing regressions to silently overwrite fixtures instead of asserting failures.
- **Solution:** Gated snapshot updates behind the `UPDATE_SNAPSHOTS=true` environment flag. Default test runs now strictly assert against immutable reference fixtures. Removed `tests/fixtures/` from `.gitignore` to track baseline snapshots in version control.

### 4. Standards: Conventional Commits in `CONTRIBUTING.md` (GitHub Issue #1)
- **Module:** [`src/templates/contributing.ts`](./src/templates/contributing.ts)
- **Problem:** The generated contribution template provided only an elementary 5-step build workflow without commit or branch standards.
- **Solution:** Expanded the template with Conventional Commits format (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`), standard branch patterns (`feature/`, `bugfix/`), atomic PR rules, and AI guardrail compliance checks.

---

## Verification & Test Results

```bash
# Static analysis: 0 errors
npm run typecheck

# Automated test suite: 9 test files passed, 31 tests passed
npm test
```

- ✓ `tests/unit/interpolator.test.ts` (3 tests)
- ✓ `tests/unit/paths.test.ts` (4 tests)
- ✓ `tests/unit/config.test.ts` (4 tests)
- ✓ `tests/integration/writer.test.ts` (4 tests)
- ✓ `tests/unit/detection.test.ts` (5 tests)
- ✓ `tests/unit/adapters.test.ts` (4 tests)
- ✓ `tests/integration/generator.test.ts` (3 tests)
- ✓ `tests/integration/dogfood.test.ts` (1 test)
- ✓ `tests/golden/golden.test.ts` (3 tests)

---

## Next Planned Milestones

- **v1.1.0:** Config-driven scaffolding via `foundry.config.json`, plan-first CLI dry run, Python FastAPI and TypeScript Express service starters, and curated LangGraph agent templates.
- **v1.2.0:** Declarative workflow graph compilation for LangGraph, visual graph previews, and production NPM package distribution.
