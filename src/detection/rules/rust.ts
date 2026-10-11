import { ProjectFileSystem } from '../../io/scanner.js';
import { DetectionCandidate } from './node.js';

export async function detectRust(fs: ProjectFileSystem): Promise<DetectionCandidate | null> {
  try {
    const raw = await fs.readFile('Cargo.toml');
    const nameMatch = raw.match(/name\s*=\s*["']([^"']+)["']/);
    const projName = nameMatch && nameMatch[1] ? nameMatch[1] : undefined;

    return {
      name: projName,
      language: 'rust',
      type: 'cli',
    };
  } catch {
    return null;
  }
}
