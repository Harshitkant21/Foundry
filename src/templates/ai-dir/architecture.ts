import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderAiDirArchitecture(context: ResolvedWorkspaceContext): string {
  const { config, appTypeRules } = context;

  return `# AI Architecture Overview — ${config.project.name}

## Application Classification: ${config.project.type}

${appTypeRules}

## System Boundaries
AI coding assistants should consult this file before creating new modules, services, or structural changes to verify they fit within the planned architecture.
`;
}
