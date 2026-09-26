import { ResolvedWorkspaceContext } from '../config/schema.js';

export function renderContributing(context: ResolvedWorkspaceContext): string {
  const { config, commands } = context;

  return `# Contributing to ${config.project.name}

Thank you for contributing! Please follow the established development workflow and AI guidelines.

## Development Workflow
1. Fork or branch from \`main\`.
2. Make modular, focused changes.
3. Verify formatting and linting: \`${commands.lint}\`.
4. Run the full test suite: \`${commands.test}\`.
5. Ensure build succeeds: \`${commands.build}\`.

## AI-Assisted Contributions
- When using AI coding assistants (Cursor, Claude, Copilot, etc.), ensure they respect [\`PROJECT_GUARDRAILS.md\`](./PROJECT_GUARDRAILS.md).
- AI-generated code must be fully understood, tested, and reviewed by a human contributor.
`;
}
