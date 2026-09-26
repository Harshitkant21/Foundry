import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { defaultRegistry } from '../../src/adapters/registry.js';
import { WorkspaceConfigSchema } from '../../src/config/schema.js';
import { buildResolvedContext } from '../../src/core/context.js';
import { generateWorkspace } from '../../src/core/generator.js';

describe('Foundry Self-Governing Dogfooding Contract', () => {
  it('validates Foundry root ai-workspace.yaml against schema and matches reference generation', async () => {
    const rootManifestPath = path.resolve(__dirname, '../../ai-workspace.yaml');
    const rawYaml = await fs.readFile(rootManifestPath, 'utf-8');

    // Parse simple YAML fields for Foundry's dogfood contract
    const matchName = rawYaml.match(/name:\s*["']?([^"'\n]+)["']?/);
    const matchType = rawYaml.match(/type:\s*["']?([^"'\n]+)["']?/);
    const matchLang = rawYaml.match(/language:\s*["']?([^"'\n]+)["']?/);
    const matchStrictness = rawYaml.match(/strictness:\s*["']?([^"'\n]+)["']?/);

    const config = WorkspaceConfigSchema.parse({
      version: '1',
      project: {
        name: matchName![1],
        type: matchType![1],
        language: matchLang![1],
      },
      repository: 'github',
      strictness: matchStrictness![1],
      adapters: ['agents', 'cursor', 'claude', 'copilot'],
    });

    expect(config.project.name).toBe('create-foundry-workspace');
    expect(config.project.type).toBe('cli');
    expect(config.project.language).toBe('typescript');
    expect(config.strictness).toBe('strict');

    // Execute pure generator
    const context = buildResolvedContext(config);
    const files = generateWorkspace(context, defaultRegistry);

    // Verify expected reference artifacts are present
    const filePaths = files.map((f) => f.relativePath);
    expect(filePaths).toContain('.cursor/rules/00-core-rules.mdc');
    expect(filePaths).toContain('.github/copilot-instructions.md');
    expect(filePaths).toContain('AGENTS.md');
    expect(filePaths).toContain('CLAUDE.md');
    expect(filePaths).toContain('README.md');
    expect(filePaths).toContain('ai-workspace.yaml');
    expect(filePaths).toContain('AI_CONTEXT.md');
    expect(filePaths).toContain('PROJECT_GUARDRAILS.md');

    // Verify strictness rules are applied to the dogfooding artifacts
    const agentsFile = files.find((f) => f.relativePath === 'AGENTS.md');
    expect(agentsFile?.content).toContain('Strict Guardrails (Non-Negotiable)');
    expect(agentsFile?.content).toContain('Strict static typing is enforced without exception');
  });
});
