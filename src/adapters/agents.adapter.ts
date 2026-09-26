import { ResolvedWorkspaceContext } from '../config/schema.js';
import { renderAgentsDocument } from '../templates/agents.js';
import { GeneratedFile, WorkspaceAdapter } from './adapter.interface.js';

export class AgentsAdapter implements WorkspaceAdapter {
  readonly id = 'agents';
  readonly name = 'AGENTS.md';
  readonly description = 'Open-standard root instructions for AI agents';
  readonly defaultSelected = true;

  render(context: ResolvedWorkspaceContext): GeneratedFile[] {
    return [
      {
        relativePath: 'AGENTS.md',
        content: renderAgentsDocument(context),
      },
    ];
  }
}
