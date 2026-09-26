import { ResolvedWorkspaceContext } from '../config/schema.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class ClaudeAdapter implements WorkspaceAdapter {
  readonly id = 'claude';
  readonly name = 'Claude Code (CLAUDE.md)';
  readonly description = 'Compact CLI guidance and shell commands for Claude Code';
  readonly defaultSelected = true;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    const { config, commands, baseGuardrails, languageRules } = context;

    const content = `# Claude Code Guidelines — ${config.project.name}

## Key Commands
- Build: \`${commands.build}\`
- Test:  \`${commands.test}\`
- Dev:   \`${commands.dev}\`
- Lint:  \`${commands.lint}\`

## Project Guardrails
${baseGuardrails}

## Language Conventions
${languageRules}
`;

    return [
      {
        relativePath: 'CLAUDE.md',
        content,
      },
    ];
  }
}
