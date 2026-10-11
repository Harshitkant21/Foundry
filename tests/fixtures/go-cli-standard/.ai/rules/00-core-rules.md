# Core Workspace Rules — go-cli-tool

## Strictness Level: standard

### General Guardrails
- **Code Quality:** Maintain clean, modular code with consistent naming conventions and separation of concerns.
- **Verification:** Run the project test suite and linter before declaring any implementation task complete.
- **Security:** Never commit credentials, API keys, tokens, or raw secrets to version control.
- **Dependencies:** Avoid introducing unnecessary external dependencies. Prefer built-in language capabilities.

### Go Conventions
- Handle every returned error explicitly; never discard errors with `_`.
- Use standard Go project layout (`cmd/`, `internal/`, `pkg/`).
- Favor composition over inheritance and keep interfaces small.
