import path from 'node:path';

/**
 * Normalizes relative paths to POSIX format (forward slashes).
 * Ensures cross-platform consistency across Windows, macOS, and Linux.
 */
export function normalizeRelativePath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

/**
 * Safely resolves target file path within target directory.
 * Throws an error if target path traverses outside target directory.
 */
export function resolveSafePath(baseDir: string, relativePath: string): string {
  const resolvedBase = path.resolve(baseDir);
  const resolvedTarget = path.resolve(resolvedBase, relativePath);

  if (!resolvedTarget.startsWith(resolvedBase)) {
    throw new Error(`Security Exception: Target path '${relativePath}' traverses outside base directory.`);
  }

  return resolvedTarget;
}
