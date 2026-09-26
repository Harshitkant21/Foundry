import { ResolvedWorkspaceContext } from '../config/schema.js';

export function renderAiContext(context: ResolvedWorkspaceContext): string {
  const { config, commands } = context;

  return `# AI Context — ${config.project.name}

> High-priority system context for LLMs, coding agents, and developers.

## Project Summary
- **Name:** ${config.project.name}
- **Type:** ${config.project.type}
- **Language:** ${config.project.language}
- **Repository:** ${config.repository}
- **Strictness:** ${config.strictness}

## Critical Commands
- Build: \`${commands.build}\`
- Test:  \`${commands.test}\`
- Dev:   \`${commands.dev}\`
- Lint:  \`${commands.lint}\`

## Context Map
- Canonical rules: \`.ai/rules/00-core-rules.md\`
- Architecture: \`.ai/architecture/system-design.md\` and \`docs/ARCHITECTURE.md\`
- Decisions: \`.ai/decisions/\` and \`docs/DECISIONS.md\`
- Task tracking: \`.ai/tasks/task-backlog.md\`
- Guardrails: \`PROJECT_GUARDRAILS.md\`
`;
}
