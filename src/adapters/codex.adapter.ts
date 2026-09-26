import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class CodexAdapter implements WorkspaceAdapter {
  readonly id = 'codex';
  readonly name = 'Codex (CODEX.md)';
  readonly description = 'Instruction context for OpenAI Codex and IDE integrations';
  readonly defaultSelected = false;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    const { config, commands, baseGuardrails, languageRules, appTypeRules } = context;

    const content = `# OpenAI Codex Guidelines — ${config.project.name}

## Project Profile
- Application: ${config.project.name} (${config.project.type})
- Language: ${config.project.language}
- Strictness: ${config.strictness}

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

    return [{ relativePath: 'CODEX.md', content }];
  }
}
