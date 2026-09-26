import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderAiDirDecisions(context: ResolvedWorkspaceContext): string {
  const { config } = context;

  return `# ADR 0001: Initial AI Workspace Setup

- **Status:** Accepted
- **Deciders:** Project Author / Foundry Scaffolding Tool

## Context
A new software development workspace is being initialized. To ensure consistent collaboration between human developers and AI assistants (Cursor, Claude Code, Copilot, etc.), an unambiguous workspace contract is required.

## Decision
1. Initialized workspace with application type \`${config.project.type}\` and language \`${config.project.language}\`.
2. Established strictness level at \`${config.strictness}\`.
3. Configured AI workflows: ${config.adapters.join(', ')}.

## Consequences
- AI assistants will follow canonical project guidelines in \`.ai/\` and \`AGENTS.md\`.
- All architectural decisions must be recorded as ADRs in this directory.
`;
}
