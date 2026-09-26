import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderAiDirRules(context: ResolvedWorkspaceContext): string {
  const { config, baseGuardrails, languageRules } = context;

  return `# Core Workspace Rules — ${config.project.name}

## Strictness Level: ${config.strictness}

${baseGuardrails}

${languageRules}
`;
}
