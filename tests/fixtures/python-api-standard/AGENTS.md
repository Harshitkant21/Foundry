# python-api-service — AI Development Contract (AGENTS.md)

Welcome to **python-api-service**. This file defines the core context, commands, and non-negotiable architectural boundaries for human engineers and AI coding assistants collaborating on this project.

---

## 1. Application Profile & Scope
- **Project Name:** python-api-service
- **Application Type:** api
- **Primary Language:** python
- **Strictness Level:** standard

---

## 2. Standard Development Commands
- **Build:** `python -m build`
- **Test:** `pytest`
- **Development Server / Entry:** `python -m app.main`
- **Lint / Static Analysis:** `ruff check .`

Always run and verify tests and linting before marking tasks or issues as resolved.

---

## 3. Project Architecture & Standards
### Backend API Architecture
- Structure endpoints logically with strict request payload validation and response schemas.
- Isolate business logic in domain services; keep controller/handler functions thin.
- Implement centralized error handling, structured logging, and robust authentication middleware.

---

## 4. Language & Code Style Conventions
### Python Conventions
- Follow PEP 8 style guidelines.
- Use explicit type annotations on all function signatures.
- Prefer Python standard library modules over third-party packages where possible.

---

## 5. Architectural Guardrails
### General Guardrails
- **Code Quality:** Maintain clean, modular code with consistent naming conventions and separation of concerns.
- **Verification:** Run the project test suite and linter before declaring any implementation task complete.
- **Security:** Never commit credentials, API keys, tokens, or raw secrets to version control.
- **Dependencies:** Avoid introducing unnecessary external dependencies. Prefer built-in language capabilities.
