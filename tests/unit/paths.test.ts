import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { normalizeRelativePath, resolveSafePath } from '../../src/io/paths.js';

describe('Paths and Security Containment', () => {
  it('normalizes relative paths to POSIX format', () => {
    const input = ['foo', 'bar', 'baz'].join(path.sep);
    expect(normalizeRelativePath(input)).toBe('foo/bar/baz');
  });

  it('resolves safe relative paths inside base directory', () => {
    const baseDir = path.resolve('tmp/workspace');
    const safeTarget = resolveSafePath(baseDir, 'src/index.ts');
    expect(safeTarget).toBe(path.resolve(baseDir, 'src/index.ts'));
  });

  it('throws security exception on parent directory traversal', () => {
    const baseDir = path.resolve('tmp/workspace');
    expect(() => {
      resolveSafePath(baseDir, '../../outside.txt');
    }).toThrow(/Security Exception/);
  });

  it('throws security exception on sibling directory prefix collision', () => {
    const baseDir = path.resolve('tmp/app');
    expect(() => {
      resolveSafePath(baseDir, '../app-secret/file.txt');
    }).toThrow(/Security Exception/);
  });
});
