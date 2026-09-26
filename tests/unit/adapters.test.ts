import { describe, expect, it } from 'vitest';
import { defaultRegistry } from '../../src/adapters/registry.js';
import { buildResolvedContext } from '../../src/core/context.js';

describe('AI Tool Adapters', () => {
  const context = buildResolvedContext({
    version: '1',
    project: {
      name: 'adapter-test-app',
      type: 'fullstack',
      language: 'typescript',
    },
    repository: 'github',
    strictness: 'strict',
    adapters: ['agents', 'cursor', 'claude', 'copilot'],
  });

  it('renders AGENTS.md with complete project context', () => {
    const adapter = defaultRegistry.get('agents');
    expect(adapter).toBeDefined();

    const files = adapter!.render(context);
    expect(files.length).toBe(1);
    expect(files[0].relativePath).toBe('AGENTS.md');
    expect(files[0].content).toContain('# adapter-test-app — AI Development Contract');
    expect(files[0].content).toContain('Strict Guardrails (Non-Negotiable)');
    expect(files[0].content).toContain('npm test');
  });

  it('renders Cursor MDC with valid YAML frontmatter and globs', () => {
    const adapter = defaultRegistry.get('cursor');
    expect(adapter).toBeDefined();

    const files = adapter!.render(context);
    expect(files.length).toBe(1);
    expect(files[0].relativePath).toBe('.cursor/rules/00-core-rules.mdc');
    expect(files[0].content).toMatch(/^---\ndescription: .*\nglobs: \*\nalwaysApply: true\n---/);
    expect(files[0].content).toContain('Cursor Core Rules — adapter-test-app');
  });

  it('renders Claude Code instructions with shell commands and guardrails', () => {
    const adapter = defaultRegistry.get('claude');
    expect(adapter).toBeDefined();

    const files = adapter!.render(context);
    expect(files.length).toBe(1);
    expect(files[0].relativePath).toBe('CLAUDE.md');
    expect(files[0].content).toContain('# Claude Code Guidelines — adapter-test-app');
    expect(files[0].content).toContain('npm run build');
  });

  it('renders GitHub Copilot prompt instructions', () => {
    const adapter = defaultRegistry.get('copilot');
    expect(adapter).toBeDefined();

    const files = adapter!.render(context);
    expect(files.length).toBe(1);
    expect(files[0].relativePath).toBe('.github/copilot-instructions.md');
    expect(files[0].content).toContain('# GitHub Copilot Workspace Instructions — adapter-test-app');
  });
});
