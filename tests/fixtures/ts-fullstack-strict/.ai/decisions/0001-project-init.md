# ADR 0001: Initial AI Workspace Setup

- **Status:** Accepted
- **Deciders:** Project Author / Foundry Scaffolding Tool

## Context
A new software development workspace is being initialized. To ensure consistent collaboration between human developers and AI assistants (Cursor, Claude Code, Copilot, etc.), an unambiguous workspace contract is required.

## Decision
1. Initialized workspace with application type `fullstack` and language `typescript`.
2. Established strictness level at `strict`.
3. Configured AI workflows: agents, cursor, claude, copilot.

## Consequences
- AI assistants will follow canonical project guidelines in `.ai/` and `AGENTS.md`.
- All architectural decisions must be recorded as ADRs in this directory.
