# Project Guardrails — python-api-service

> Non-negotiable architectural and behavioral boundaries for humans and AI agents.

### General Guardrails
- **Code Quality:** Maintain clean, modular code with consistent naming conventions and separation of concerns.
- **Verification:** Run the project test suite and linter before declaring any implementation task complete.
- **Security:** Never commit credentials, API keys, tokens, or raw secrets to version control.
- **Dependencies:** Avoid introducing unnecessary external dependencies. Prefer built-in language capabilities.

### Verification Protocol
1. Run automated test suites before claiming tasks or PRs are ready.
2. Confirm static analysis / lint passes with zero warnings.
3. Verify that changes do not introduce unneeded external dependencies.
