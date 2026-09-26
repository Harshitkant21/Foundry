import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { writeWorkspace } from '../../src/io/writer.js';

describe('Filesystem Writer Safety and Collision Handling', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'foundry-writer-test-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('performs atomic writes to clean directories', async () => {
    const files = [
      { relativePath: 'README.md', content: '# Hello World' },
      { relativePath: 'nested/config.yaml', content: 'key: value' },
    ];

    const result = await writeWorkspace(tmpDir, files);
    expect(result.written.length).toBe(2);
    expect(result.skipped.length).toBe(0);

    const readme = await fs.readFile(path.join(tmpDir, 'README.md'), 'utf-8');
    expect(readme).toBe('# Hello World');

    const nested = await fs.readFile(path.join(tmpDir, 'nested/config.yaml'), 'utf-8');
    expect(nested).toBe('key: value');
  });

  it('preserves existing files by default (safe merge)', async () => {
    await fs.writeFile(path.join(tmpDir, 'README.md'), '# Original Content', 'utf-8');

    const files = [{ relativePath: 'README.md', content: '# Overwritten Content' }];

    const result = await writeWorkspace(tmpDir, files, { force: false });
    expect(result.skipped).toContain('README.md');
    expect(result.written.length).toBe(0);

    const content = await fs.readFile(path.join(tmpDir, 'README.md'), 'utf-8');
    expect(content).toBe('# Original Content');
  });

  it('overwrites existing files when force is true', async () => {
    await fs.writeFile(path.join(tmpDir, 'README.md'), '# Original Content', 'utf-8');

    const files = [{ relativePath: 'README.md', content: '# Overwritten Content' }];

    const result = await writeWorkspace(tmpDir, files, { force: true });
    expect(result.written).toContain('README.md');

    const content = await fs.readFile(path.join(tmpDir, 'README.md'), 'utf-8');
    expect(content).toBe('# Overwritten Content');
  });

  it('prevents any disk writes when dryRun is true', async () => {
    const files = [{ relativePath: 'ai-workspace.yaml', content: 'version: "1"' }];

    const result = await writeWorkspace(tmpDir, files, { dryRun: true });
    expect(result.dryRun).toBe(true);

    let exists = false;
    try {
      await fs.access(path.join(tmpDir, 'ai-workspace.yaml'));
      exists = true;
    } catch {
      exists = false;
    }
    expect(exists).toBe(false);
  });
});
