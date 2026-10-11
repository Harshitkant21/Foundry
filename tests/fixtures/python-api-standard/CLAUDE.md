# Claude Code Guidelines — python-api-service

## Key Commands
- Build: `python -m build`
- Test:  `pytest`
- Dev:   `python -m app.main`
- Lint:  `ruff check .`

## Project Guardrails
### General Guardrails
- **Code Quality:** Maintain clean, modular code with consistent naming conventions and separation of concerns.
- **Verification:** Run the project test suite and linter before declaring any implementation task complete.
- **Security:** Never commit credentials, API keys, tokens, or raw secrets to version control.
- **Dependencies:** Avoid introducing unnecessary external dependencies. Prefer built-in language capabilities.

## Language Conventions
### Python Conventions
- Follow PEP 8 style guidelines.
- Use explicit type annotations on all function signatures.
- Prefer Python standard library modules over third-party packages where possible.
