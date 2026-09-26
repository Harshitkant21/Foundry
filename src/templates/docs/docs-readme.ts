import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderDocsReadme(context: ResolvedWorkspaceContext): string {
  const { config } = context;

  return `# Documentation — ${config.project.name}

Welcome to the documentation directory for **${config.project.name}**.

## Directory Index
- [\`ARCHITECTURE.md\`](./ARCHITECTURE.md): System design, component boundaries, and high-level architecture.
- [\`DEVELOPMENT.md\`](./DEVELOPMENT.md): Local development setup, testing, and debugging.
- [\`DECISIONS.md\`](./DECISIONS.md): Architectural Decision Records (ADRs) log.

For AI workspace rules and context, see \`.ai/\` and [\`AGENTS.md\`](../AGENTS.md).
`;
}
