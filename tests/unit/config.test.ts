import { describe, expect, it } from 'vitest';
import { WorkspaceConfigSchema } from '../../src/config/schema.js';

describe('Configuration Schema Validation', () => {
  it('successfully validates a standard workspace configuration', () => {
    const config = {
      version: '1' as const,
      project: {
        name: 'my-service',
        type: 'api' as const,
        language: 'python' as const,
      },
      repository: 'github' as const,
      strictness: 'standard' as const,
      adapters: ['agents', 'claude', 'cursor'],
    };

    const parsed = WorkspaceConfigSchema.parse(config);
    expect(parsed).toEqual(config);
  });

  it('rejects invalid project names containing illegal characters', () => {
    const invalidConfig = {
      version: '1',
      project: {
        name: 'my service with spaces!',
        type: 'web',
        language: 'typescript',
      },
      repository: 'github',
      strictness: 'standard',
      adapters: ['agents'],
    };

    expect(() => WorkspaceConfigSchema.parse(invalidConfig)).toThrow();
  });

  it('rejects invalid languages or application types', () => {
    const invalid = {
      version: '1',
      project: {
        name: 'test-app',
        type: 'invalid-type',
        language: 'haskell',
      },
      repository: 'github',
      strictness: 'standard',
      adapters: ['agents'],
    };

    expect(() => WorkspaceConfigSchema.parse(invalid)).toThrow();
  });

  it('defaults empty adapter arrays to ["agents"]', () => {
    const emptyAdapters = {
      version: '1',
      project: {
        name: 'test-app',
        type: 'cli',
        language: 'rust',
      },
      repository: 'github',
      strictness: 'strict',
      adapters: [],
    };

    const parsed = WorkspaceConfigSchema.parse(emptyAdapters);
    expect(parsed.adapters).toEqual(['agents']);
  });
});
