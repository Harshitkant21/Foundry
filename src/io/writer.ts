import fs from 'node:fs/promises';
import path from 'node:path';
import { GeneratedFile } from '../adapters/adapter.interface.js';
import { normalizeRelativePath, resolveSafePath } from './paths.js';

export interface WriteOptions {
  dryRun?: boolean;
  force?: boolean;
  abortOnCollision?: boolean;
}

export interface WriteResult {
  files: GeneratedFile[];
  written: string[];
  skipped: string[];
  collisions: string[];
  dryRun: boolean;
}

/**
 * Checks for existing files in target directory.
 */
export async function detectCollisions(
  targetDir: string,
  files: GeneratedFile[]
): Promise<string[]> {
  const collisions: string[] = [];

  for (const file of files) {
    const fullPath = resolveSafePath(targetDir, file.relativePath);
    try {
      await fs.access(fullPath);
      collisions.push(normalizeRelativePath(file.relativePath));
    } catch {
      // File does not exist, no collision
    }
  }

  return collisions;
}

/**
 * The ONLY function in the codebase permitted to perform filesystem writes.
 * Implements safe-merge, force overwrite, dry-run, and collision handling.
 */
export async function writeWorkspace(
  targetDir: string,
  files: GeneratedFile[],
  options: WriteOptions = {}
): Promise<WriteResult> {
  const { dryRun = false, force = false, abortOnCollision = false } = options;

  const collisions = await detectCollisions(targetDir, files);

  if (collisions.length > 0 && abortOnCollision && !force) {
    throw new Error(
      `Aborted: Found ${collisions.length} existing files in '${targetDir}'. Use --force to overwrite.`
    );
  }

  const written: string[] = [];
  const skipped: string[] = [];

  for (const file of files) {
    const normPath = normalizeRelativePath(file.relativePath);
    const fullPath = resolveSafePath(targetDir, file.relativePath);
    const isCollision = collisions.includes(normPath);

    if (isCollision && !force) {
      skipped.push(normPath);
      continue;
    }

    if (!dryRun) {
      const parentDir = path.dirname(fullPath);
      await fs.mkdir(parentDir, { recursive: true });
      await fs.writeFile(fullPath, file.content, 'utf-8');
    }

    written.push(normPath);
  }

  return {
    files,
    written,
    skipped,
    collisions,
    dryRun,
  };
}
