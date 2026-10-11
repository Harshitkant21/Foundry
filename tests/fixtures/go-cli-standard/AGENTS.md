# go-cli-tool — AI Development Contract (AGENTS.md)

Welcome to **go-cli-tool**. This file defines the core context, commands, and non-negotiable architectural boundaries for human engineers and AI coding assistants collaborating on this project.

---

## 1. Application Profile & Scope
- **Project Name:** go-cli-tool
- **Application Type:** cli
- **Primary Language:** go
- **Strictness Level:** standard

---

## 2. Standard Development Commands
- **Build:** `go build ./...`
- **Test:** `go test -v ./...`
- **Development Server / Entry:** `go run main.go`
- **Lint / Static Analysis:** `golangci-lint run`

Always run and verify tests and linting before marking tasks or issues as resolved.

---

## 3. Project Architecture & Standards
### CLI Tool Architecture
- Provide intuitive argument and flag parsing with comprehensive `--help` menus.
- Support both interactive terminal prompts and non-interactive scripted/CI execution modes.
- Implement structured exit codes and send human messages to stdout and diagnostics to stderr.

---

## 4. Language & Code Style Conventions
### Go Conventions
- Handle every returned error explicitly; never discard errors with `_`.
- Use standard Go project layout (`cmd/`, `internal/`, `pkg/`).
- Favor composition over inheritance and keep interfaces small.

---

## 5. Architectural Guardrails
### General Guardrails
- **Code Quality:** Maintain clean, modular code with consistent naming conventions and separation of concerns.
- **Verification:** Run the project test suite and linter before declaring any implementation task complete.
- **Security:** Never commit credentials, API keys, tokens, or raw secrets to version control.
- **Dependencies:** Avoid introducing unnecessary external dependencies. Prefer built-in language capabilities.
