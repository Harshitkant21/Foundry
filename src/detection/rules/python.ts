import { ProjectFileSystem } from '../../io/scanner.js';
import { DetectionCandidate } from './node.js';

export async function detectPython(fs: ProjectFileSystem): Promise<DetectionCandidate | null> {
  const hasPyproject = await fs.exists('pyproject.toml');
  const hasReqs = await fs.exists('requirements.txt');
  const hasSetup = await fs.exists('setup.py');

  if (!hasPyproject && !hasReqs && !hasSetup) {
    return null;
  }

  return {
    language: 'python',
    type: 'api',
  };
}
