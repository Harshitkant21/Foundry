# Foundry Development & Contributing Guide

## 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

---

## 2. Getting Started

Clone the repository and install dependencies:
```bash
git clone https://github.com/Harshitkant21/Foundry.git
cd Foundry
npm install
```

Build TypeScript to `dist/`:
```bash
npm run build
```

Run test suite:
```bash
npm test
```

Typecheck without emitting:
```bash
npm run typecheck
```

---

## 3. Running Locally

Execute the CLI locally using `tsx`:
```bash
# Interactive mode
npx tsx src/bin.ts ./test-project

# Non-interactive mode (dry-run)
npx tsx src/bin.ts ./test-project --dry-run --name demo-app --type api --lang python --yes

# Non-interactive mode (real generation)
npx tsx src/bin.ts ./test-project --name demo-app --type api --lang python --yes

# Direct compiled binary test
node ./bin/index.js --help
```

---

## 4. Packaging & NPM Release Workflow

Before releasing to npm, test the package artifact locally:

```bash
# 1. Package tarball locally (verifies file whitelisting and builds dist)
npm pack

# 2. Test the packaged tarball from an external directory
cd ..
npx --package ./Foundry/create-ai-workspace-1.0.0.tgz create-ai-workspace

# 3. Perform a dry-run publish (validates credentials without uploading)
npm publish --dry-run

# 4. Publish live to npm
npm publish --access public
```

---

## 5. Testing Architecture

Tests are divided into:
- **Unit Tests (`tests/unit/`):** Test schema parsing, detector heuristics, string interpolation, and individual adapters.
- **Integration Tests (`tests/integration/`):** Test CLI flag handling, directory safety, and file writing.
- **Golden Fixture Tests (`tests/golden/`):** Assert that full generation across combinations matches committed reference fixtures byte-for-byte.
- **Dogfooding Test (`tests/integration/dogfood.test.ts`):** Asserts that generating a workspace from Foundry's own `ai-workspace.yaml` matches the repository's root files.

---

## 6. Architectural Guardrails for Contributors

1. **Zero External API / LLM Calls:** Never introduce OpenAI, Anthropic, Gemini, or third-party AI SDKs into the CLI codebase.
2. **Zero Network Calls at Runtime:** The tool must execute 100% offline.
3. **No Non-Deterministic Data:** Never inject timestamps, random IDs, or machine-specific paths into generated content.
4. **Pure Core:** Do not import `node:fs` inside `src/core/`, `src/adapters/`, or `src/templates/`. Keep generation logic pure.
5. **Clean Repository Hygiene:** Never commit `dist/`, `node_modules/`, `*.tgz`, or secrets to git (governed by `.gitignore`).
