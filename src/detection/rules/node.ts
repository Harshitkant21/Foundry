import fs from 'node:fs/promises';
import path from 'node:path';
import { AppType, Language } from '../../config/schema.js';

export interface DetectionCandidate {
  name?: string;
  language?: Language;
  type?: AppType;
}

export async function detectNode(targetDir: string): Promise<DetectionCandidate | null> {
  const pkgPath = path.join(targetDir, 'package.json');
  try {
    const raw = await fs.readFile(pkgPath, 'utf-8');
    const pkg = JSON.parse(raw);

    const name = typeof pkg.name === 'string' ? pkg.name.replace(/^@[^/]+\//, '') : undefined;
    let language: Language = 'javascript';

    // Check for TypeScript markers
    if (
      (pkg.devDependencies && pkg.devDependencies.typescript) ||
      (pkg.dependencies && pkg.dependencies.typescript)
    ) {
      language = 'typescript';
    }

    try {
      await fs.access(path.join(targetDir, 'tsconfig.json'));
      language = 'typescript';
    } catch {}

    let type: AppType = 'fullstack';
    if (pkg.bin) {
      type = 'cli';
    } else if (pkg.dependencies && (pkg.dependencies.react || pkg.dependencies.vue || pkg.dependencies.svelte)) {
      type = 'web';
    } else if (pkg.dependencies && (pkg.dependencies.express || pkg.dependencies.fastify || pkg.dependencies.hono)) {
      type = 'api';
    }

    return { name, language, type };
  } catch {
    return null;
  }
}
