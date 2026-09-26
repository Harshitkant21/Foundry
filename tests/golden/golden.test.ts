import fs from 'node:fs/promises';
import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { defaultRegistry } from '../../src/adapters/registry.js';
import { WorkspaceConfig } from '../../src/config/schema.js';
import { buildResolvedContext } from '../../src/core/context.js';
import { generateWorkspace } from '../../src/core/generator.js';

describe('Golden Fixtures Byte-for-Byte Determinism', () => {
  const fixturesDir = path.resolve(__dirname, '../fixtures');

  const profiles: { id: string; config: WorkspaceConfig }[] = [
    {
      id: 'ts-fullstack-strict',
      config: {
        version: '1',
        project: {
          name: 'ts-fullstack-app',
          type: 'fullstack',
          language: 'typescript',
        },
        repository: 'github',
        strictness: 'strict',
        adapters: ['agents', 'cursor', 'claude', 'copilot'],
      },
    },
    {
      id: 'python-api-standard',
      config: {
        version: '1',
        project: {
          name: 'python-api-service',
          type: 'api',
          language: 'python',
        },
        repository: 'github',
        strictness: 'standard',
        adapters: ['agents', 'claude', 'copilot'],
      },
    },
    {
      id: 'go-cli-standard',
      config: {
        version: '1',
        project: {
          name: 'go-cli-tool',
          type: 'cli',
          language: 'go',
        },
        repository: 'github',
        strictness: 'standard',
        adapters: ['agents', 'cursor'],
      },
    },
  ];

  beforeAll(async () => {
    // Generate fresh fixtures
    for (const profile of profiles) {
      const profileDir = path.join(fixturesDir, profile.id);
      await fs.rm(profileDir, { recursive: true, force: true });
      const context = buildResolvedContext(profile.config);
      const files = generateWorkspace(context, defaultRegistry);

      for (const file of files) {
        const filePath = path.join(profileDir, file.relativePath);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file.content, 'utf-8');
      }
    }
  });

  for (const profile of profiles) {
    it(`matches golden directory fixture byte-for-byte: ${profile.id}`, async () => {
      const profileDir = path.join(fixturesDir, profile.id);
      const context = buildResolvedContext(profile.config);
      const generatedFiles = generateWorkspace(context, defaultRegistry);

      for (const generated of generatedFiles) {
        const goldenFilePath = path.join(profileDir, generated.relativePath);
        const goldenContent = await fs.readFile(goldenFilePath, 'utf-8');

        expect(generated.content).toBe(goldenContent);
      }
    });
  }
});
