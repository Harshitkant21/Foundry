import { WorkspaceAdapter } from './adapter.interface.js';
import { AgentsAdapter } from './agents.adapter.js';
import { ClaudeAdapter } from './claude.adapter.js';
import { CodexAdapter } from './codex.adapter.js';
import { CopilotAdapter } from './copilot.adapter.js';
import { CursorAdapter } from './cursor.adapter.js';
import { GeminiAdapter } from './gemini.adapter.js';
import { GenericAdapter } from './generic.adapter.js';

export class AdapterRegistry {
  private adapters = new Map<string, WorkspaceAdapter>();

  constructor() {
    this.register(new AgentsAdapter());
    this.register(new CursorAdapter());
    this.register(new ClaudeAdapter());
    this.register(new CopilotAdapter());
    this.register(new CodexAdapter());
    this.register(new GeminiAdapter());
    this.register(new GenericAdapter());
  }

  register(adapter: WorkspaceAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  get(id: string): WorkspaceAdapter | undefined {
    return this.adapters.get(id);
  }

  getAll(): WorkspaceAdapter[] {
    return Array.from(this.adapters.values());
  }

  getDefaultIds(): string[] {
    return this.getAll()
      .filter((a) => a.defaultSelected)
      .map((a) => a.id);
  }

  has(id: string): boolean {
    return this.adapters.has(id);
  }
}

export const defaultRegistry = new AdapterRegistry();
