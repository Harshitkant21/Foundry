import { AppType, Language } from '../../config/schema.js';
import { ProjectFileSystem } from '../../io/scanner.js';

export interface DetectionCandidate {
  name?: string;
  language?: Language;
  type?: AppType;
}

export async function detectNode(fs: ProjectFileSystem): Promise<DetectionCandidate | null> {
  try {
    const raw = await fs.readFile('package.json');
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

    if (await fs.exists('tsconfig.json')) {
      language = 'typescript';
    }

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
