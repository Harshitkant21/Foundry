import fs from 'node:fs/promises';
import path from 'node:path';
import { DetectionCandidate } from './node.js';

export async function detectPython(targetDir: string): Promise<DetectionCandidate | null> {
  const pyproject = path.join(targetDir, 'pyproject.toml');
  const requirements = path.join(targetDir, 'requirements.txt');
  const setupPy = path.join(targetDir, 'setup.py');

  let hasPython = false;

  try {
    await fs.access(pyproject);
    hasPython = true;
  } catch {}

  try {
    await fs.access(requirements);
    hasPython = true;
  } catch {}

  try {
    await fs.access(setupPy);
    hasPython = true;
  } catch {}

  if (!hasPython) return null;

  return {
    language: 'python',
    type: 'api',
  };
}
