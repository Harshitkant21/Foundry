# Development Guide — go-cli-tool

## 1. Setup & Requirements
- Target Language: `go`
- Repository Hosting: `github`

## 2. Standard Commands
- **Compile / Build:** `go build ./...`
- **Execute Test Suite:** `go test -v ./...`
- **Local Dev Server / Runner:** `go run main.go`
- **Linter & Code Format:** `golangci-lint run`

## 3. Pull Request & Verification Checklist
1. Ensure all tests pass locally: `go test -v ./...`.
2. Confirm code passes static analysis with zero errors: `golangci-lint run`.
3. Adhere to guardrails declared in [`PROJECT_GUARDRAILS.md`](../PROJECT_GUARDRAILS.md).
