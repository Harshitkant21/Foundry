import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderArchitectureDoc(context: ResolvedWorkspaceContext): string {
  const { config, appTypeRules, languageRules } = context;

  return `# Architecture & System Design — ${config.project.name}

## 1. High-Level Overview
- **Project Name:** ${config.project.name}
- **Application Classification:** ${config.project.type}
- **Primary Language:** ${config.project.language}
- **Strictness Tier:** ${config.strictness}

## 2. Architectural Guidelines
${appTypeRules}

## 3. Language & Implementation Standards
${languageRules}

## 4. Component Boundaries
- Maintain high cohesion within modules and loose coupling between domains.
- Isolate external dependencies behind well-defined interface contracts.
`;
}
