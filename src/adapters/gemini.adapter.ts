import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class GeminiAdapter implements WorkspaceAdapter {
  readonly id = 'gemini';
  readonly name = 'Gemini (GEMINI.md)';
  readonly description = 'Context guidelines for Google Antigravity & Gemini CLI';
  readonly defaultSelected = false;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    const { config, commands, baseGuardrails, languageRules, appTypeRules } = context;

    const content = `# Gemini Guidelines — ${config.project.name}

## Project Overview
- Name: ${config.project.name}
- Type: ${config.project.type}
- Language: ${config.project.language}
- Strictness: ${config.strictness}

## Build & Test Commands
- Build: \`${commands.build}\`
- Test:  \`${commands.test}\`
- Dev:   \`${commands.dev}\`
- Lint:  \`${commands.lint}\`

## Architecture Conventions
${appTypeRules}

## Language Conventions
${languageRules}

## Architectural Guardrails
${baseGuardrails}
`;

    return [{ relativePath: 'GEMINI.md', content }];
  }
}
