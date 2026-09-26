import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class CopilotAdapter implements WorkspaceAdapter {
  readonly id = 'copilot';
  readonly name = 'GitHub Copilot (.github/)';
  readonly description = 'Workspace prompt instruction block for GitHub Copilot';
  readonly defaultSelected = true;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    const { config, commands, baseGuardrails, languageRules, appTypeRules } = context;

    const content = `# GitHub Copilot Workspace Instructions — ${config.project.name}

This file provides system context for GitHub Copilot when assisting on this repository.

## Project Metadata
- Application Type: ${config.project.type}
- Language: ${config.project.language}
- Strictness Level: ${config.strictness}

## Primary Commands
- Build: \`${commands.build}\`
- Test:  \`${commands.test}\`
- Dev:   \`${commands.dev}\`
- Lint:  \`${commands.lint}\`

## Architecture
${appTypeRules}

## Language Conventions
${languageRules}

## Safety & Quality Guardrails
${baseGuardrails}
`;

    return [
      {
        relativePath: '.github/copilot-instructions.md',
        content,
      },
    ];
  }
}
