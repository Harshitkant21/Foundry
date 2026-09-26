import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderAiDirContext(context: ResolvedWorkspaceContext): string {
  const { config } = context;

  return `# Project Context — ${config.project.name}

## 1. Domain & Purpose
- Project: ${config.project.name}
- Type: ${config.project.type}
- Language: ${config.project.language}

## 2. Key Concepts & Terminology
Document project-specific business concepts and domain models here so that AI assistants maintain consistent naming conventions across files.
`;
}
