import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * File system scanner interface for project detection.
 * Enforces pure core isolation by keeping disk access inside src/io/.
 */
export interface ProjectFileSystem {
  readFile(relativePath: string): Promise<string>;
  exists(relativePath: string): Promise<boolean>;
}

/**
 * Default Node.js filesystem adapter for inspecting project directories.
 */
export class NodeProjectFileSystem implements ProjectFileSystem {
  private readonly rootDir: string;

  constructor(targetDir: string) {
    this.rootDir = path.resolve(targetDir);
  }

  async readFile(relativePath: string): Promise<string> {
    const filePath = path.join(this.rootDir, relativePath);
    return fs.readFile(filePath, 'utf-8');
  }

  async exists(relativePath: string): Promise<boolean> {
    const filePath = path.join(this.rootDir, relativePath);
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
