import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class CursorAdapter implements WorkspaceAdapter {
  readonly id = 'cursor';
  readonly name = 'Cursor (.cursor/rules/)';
  readonly description = 'Modular MDC rules with frontmatter for Cursor IDE';
  readonly defaultSelected = true;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    const { config, commands, baseGuardrails, languageRules, appTypeRules } = context;

    const content = `---
description: Core Architecture Rules for ${config.project.name}
globs: *
alwaysApply: true
---
# Cursor Core Rules — ${config.project.name}

## Project Profile
- Application: ${config.project.name} (${config.project.type})
- Language: ${config.project.language}
- Strictness: ${config.strictness}

## Standard Commands
- Build: \`${commands.build}\`
- Test:  \`${commands.test}\`

## Architectural Guidelines
${appTypeRules}

## Language Conventions
${languageRules}

## Guardrails
${baseGuardrails}
`;

    return [
      {
        relativePath: '.cursor/rules/00-core-rules.mdc',
        content,
      },
    ];
  }
}
