import { describe, expect, it } from 'vitest';
import { defaultRegistry } from '../../src/adapters/registry.js';
import { WorkspaceConfig } from '../../src/config/schema.js';
import { buildResolvedContext } from '../../src/core/context.js';
import { generateWorkspace } from '../../src/core/generator.js';

describe('Pure Workspace Generator Pipeline', () => {
  const baseConfig: WorkspaceConfig = {
    version: '1',
    project: {
      name: 'deterministic-app',
      type: 'fullstack',
      language: 'typescript',
    },
    repository: 'github',
    strictness: 'strict',
    adapters: ['agents', 'cursor', 'claude', 'copilot'],
  };

  it('guarantees 100% bit-for-bit determinism across multiple runs', () => {
    const context1 = buildResolvedContext(baseConfig);
    const run1 = generateWorkspace(context1, defaultRegistry);

    const context2 = buildResolvedContext(baseConfig);
    const run2 = generateWorkspace(context2, defaultRegistry);

    expect(run1).toEqual(run2);
  });

  it('generates the complete rich AI workspace structure (.ai/, docs/, root, adapters)', () => {
    const context = buildResolvedContext(baseConfig);
    const files = generateWorkspace(context, defaultRegistry);

    const relativePaths = files.map((f) => f.relativePath);

    // Verify root files
    expect(relativePaths).toContain('ai-workspace.yaml');
    expect(relativePaths).toContain('README.md');
    expect(relativePaths).toContain('AI_CONTEXT.md');
    expect(relativePaths).toContain('PROJECT_GUARDRAILS.md');
    expect(relativePaths).toContain('CONTRIBUTING.md');
    expect(relativePaths).toContain('.gitignore');

    // Verify docs/
    expect(relativePaths).toContain('docs/README.md');
    expect(relativePaths).toContain('docs/ARCHITECTURE.md');
    expect(relativePaths).toContain('docs/DEVELOPMENT.md');
    expect(relativePaths).toContain('docs/DECISIONS.md');

    // Verify .ai/ structure
    expect(relativePaths).toContain('.ai/context/project-context.md');
    expect(relativePaths).toContain('.ai/rules/00-core-rules.md');
    expect(relativePaths).toContain('.ai/architecture/system-design.md');
    expect(relativePaths).toContain('.ai/decisions/0001-project-init.md');
    expect(relativePaths).toContain('.ai/tasks/task-backlog.md');

    // Verify adapters
    expect(relativePaths).toContain('AGENTS.md');
    expect(relativePaths).toContain('CLAUDE.md');
    expect(relativePaths).toContain('.cursor/rules/00-core-rules.mdc');
    expect(relativePaths).toContain('.github/copilot-instructions.md');
  });

  it('filters adapter output based on user selection', () => {
    const customConfig: WorkspaceConfig = {
      version: '1',
      project: {
        name: 'claude-only-app',
        type: 'cli',
        language: 'rust',
      },
      repository: 'github',
      strictness: 'standard',
      adapters: ['claude'],
    };

    const context = buildResolvedContext(customConfig);
    const files = generateWorkspace(context, defaultRegistry);
    const paths = files.map((f) => f.relativePath);

    expect(paths).toContain('CLAUDE.md');
    expect(paths).not.toContain('AGENTS.md');
    expect(paths).not.toContain('.cursor/rules/00-core-rules.mdc');
  });
});
