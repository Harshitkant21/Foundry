# Development Guide — python-api-service

## 1. Setup & Requirements
- Target Language: `python`
- Repository Hosting: `github`

## 2. Standard Commands
- **Compile / Build:** `python -m build`
- **Execute Test Suite:** `pytest`
- **Local Dev Server / Runner:** `python -m app.main`
- **Linter & Code Format:** `ruff check .`

## 3. Pull Request & Verification Checklist
1. Ensure all tests pass locally: `pytest`.
2. Confirm code passes static analysis with zero errors: `ruff check .`.
3. Adhere to guardrails declared in [`PROJECT_GUARDRAILS.md`](../PROJECT_GUARDRAILS.md).
