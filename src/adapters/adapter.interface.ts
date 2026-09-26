import { ResolvedWorkspaceContext } from '../config/schema.js';

export interface GeneratedFile {
  readonly relativePath: string;
  readonly content: string;
}

export interface WorkspaceAdapter {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly defaultSelected: boolean;
  render(context: ResolvedWorkspaceContext): GeneratedFile[];
}
