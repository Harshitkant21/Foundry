import { ResolvedWorkspaceContext } from '../config/schema.js';

export function renderProjectGuardrails(context: ResolvedWorkspaceContext): string {
  const { config, baseGuardrails } = context;

  return `# Project Guardrails — ${config.project.name}

> Non-negotiable architectural and behavioral boundaries for humans and AI agents.

${baseGuardrails}

### Verification Protocol
1. Run automated test suites before claiming tasks or PRs are ready.
2. Confirm static analysis / lint passes with zero warnings.
3. Verify that changes do not introduce unneeded external dependencies.
`;
}
