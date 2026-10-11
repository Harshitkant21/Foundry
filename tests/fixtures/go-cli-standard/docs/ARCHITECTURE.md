# Architecture & System Design — go-cli-tool

## 1. High-Level Overview
- **Project Name:** go-cli-tool
- **Application Classification:** cli
- **Primary Language:** go
- **Strictness Tier:** standard

## 2. Architectural Guidelines
### CLI Tool Architecture
- Provide intuitive argument and flag parsing with comprehensive `--help` menus.
- Support both interactive terminal prompts and non-interactive scripted/CI execution modes.
- Implement structured exit codes and send human messages to stdout and diagnostics to stderr.

## 3. Language & Implementation Standards
### Go Conventions
- Handle every returned error explicitly; never discard errors with `_`.
- Use standard Go project layout (`cmd/`, `internal/`, `pkg/`).
- Favor composition over inheritance and keep interfaces small.

## 4. Component Boundaries
- Maintain high cohesion within modules and loose coupling between domains.
- Isolate external dependencies behind well-defined interface contracts.
