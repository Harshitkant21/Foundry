import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderDecisionsDoc(context: ResolvedWorkspaceContext): string {
  const { config } = context;

  return `# Architecture Decision Records (ADRs) — ${config.project.name}

This directory logs key architectural decisions made during the project lifecycle.

## Decision Log
- [ADR 0001: Initial AI Workspace Setup](../.ai/decisions/0001-project-init.md) — *Accepted*

## ADR Format Guidelines
New decisions should be added under \`.ai/decisions/\` following the format:
1. **Title & Date**
2. **Status:** Proposed / Accepted / Deprecated / Superseded
3. **Context & Problem Statement**
4. **Decision Outcome**
5. **Consequences & Trade-offs**
`;
}
