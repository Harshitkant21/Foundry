import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class GenericAdapter implements WorkspaceAdapter {
  readonly id = 'generic';
  readonly name = 'Generic (AI_INSTRUCTIONS.md)';
  readonly description = 'Tool-agnostic instruction file for any AI development environment';
  readonly defaultSelected = false;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    const { config, commands, baseGuardrails, languageRules, appTypeRules } = context;

    const content = `# AI Development Instructions — ${config.project.name}

## Project Profile
- Application: ${config.project.name}
- Type: ${config.project.type}
- Language: ${config.project.language}
- Guardrails Tier: ${config.strictness}

## Standard Commands
- Build: \`${commands.build}\`
- Test:  \`${commands.test}\`
- Dev:   \`${commands.dev}\`
- Lint:  \`${commands.lint}\`

## Architecture
${appTypeRules}

## Language Conventions
${languageRules}

## Guardrails
${baseGuardrails}
`;

    return [{ relativePath: 'AI_INSTRUCTIONS.md', content }];
  }
}
