# GitHub Copilot Workspace Instructions — python-api-service

This file provides system context for GitHub Copilot when assisting on this repository.

## Project Metadata
- Application Type: api
- Language: python
- Strictness Level: standard

## Primary Commands
- Build: `python -m build`
- Test:  `pytest`
- Dev:   `python -m app.main`
- Lint:  `ruff check .`

## Architecture
### Backend API Architecture
- Structure endpoints logically with strict request payload validation and response schemas.
- Isolate business logic in domain services; keep controller/handler functions thin.
- Implement centralized error handling, structured logging, and robust authentication middleware.

## Language Conventions
### Python Conventions
- Follow PEP 8 style guidelines.
- Use explicit type annotations on all function signatures.
- Prefer Python standard library modules over third-party packages where possible.

## Safety & Quality Guardrails
### General Guardrails
- **Code Quality:** Maintain clean, modular code with consistent naming conventions and separation of concerns.
- **Verification:** Run the project test suite and linter before declaring any implementation task complete.
- **Security:** Never commit credentials, API keys, tokens, or raw secrets to version control.
- **Dependencies:** Avoid introducing unnecessary external dependencies. Prefer built-in language capabilities.
