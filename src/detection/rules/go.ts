import path from 'node:path';
import { ProjectFileSystem } from '../../io/scanner.js';
import { DetectionCandidate } from './node.js';

export async function detectGo(fs: ProjectFileSystem): Promise<DetectionCandidate | null> {
  try {
    const raw = await fs.readFile('go.mod');
    const match = raw.match(/module\s+([^\s]+)/);
    const modName = match && match[1] ? path.basename(match[1]) : undefined;

    return {
      name: modName,
      language: 'go',
      type: 'api',
    };
  } catch {
    return null;
  }
}
