import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { detectProjectEnvironment } from '../../src/detection/detector.js';

describe('Project Environment Detection', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'foundry-detect-test-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('detects Node.js TypeScript project from package.json and tsconfig.json', async () => {
    await fs.writeFile(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({ name: 'my-ts-lib', dependencies: { typescript: '^5.0.0' } }),
      'utf-8'
    );
    await fs.writeFile(path.join(tmpDir, 'tsconfig.json'), '{}', 'utf-8');

    const result = await detectProjectEnvironment(tmpDir);
    expect(result.isDetected).toBe(true);
    expect(result.name).toBe('my-ts-lib');
    expect(result.language).toBe('typescript');
  });

  it('detects Rust project from Cargo.toml', async () => {
    await fs.writeFile(
      path.join(tmpDir, 'Cargo.toml'),
      '[package]\nname = "my-cargo-bin"\nversion = "0.1.0"\n',
      'utf-8'
    );

    const result = await detectProjectEnvironment(tmpDir);
    expect(result.isDetected).toBe(true);
    expect(result.name).toBe('my-cargo-bin');
    expect(result.language).toBe('rust');
    expect(result.type).toBe('cli');
  });

  it('detects Go project from go.mod', async () => {
    await fs.writeFile(
      path.join(tmpDir, 'go.mod'),
      'module github.com/user/my-go-service\n\ngo 1.22\n',
      'utf-8'
    );

    const result = await detectProjectEnvironment(tmpDir);
    expect(result.isDetected).toBe(true);
    expect(result.name).toBe('my-go-service');
    expect(result.language).toBe('go');
  });

  it('detects Python project from pyproject.toml', async () => {
    await fs.writeFile(
      path.join(tmpDir, 'pyproject.toml'),
      '[project]\nname = "py-app"\n',
      'utf-8'
    );

    const result = await detectProjectEnvironment(tmpDir);
    expect(result.isDetected).toBe(true);
    expect(result.language).toBe('python');
  });

  it('falls back to default settings when no marker files exist', async () => {
    const result = await detectProjectEnvironment(tmpDir);
    expect(result.isDetected).toBe(false);
    expect(result.language).toBe('typescript');
    expect(result.type).toBe('fullstack');
  });
});
