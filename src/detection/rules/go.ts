import fs from 'node:fs/promises';
import path from 'node:path';
import { DetectionCandidate } from './node.js';

export async function detectGo(targetDir: string): Promise<DetectionCandidate | null> {
  const goMod = path.join(targetDir, 'go.mod');
  try {
    const raw = await fs.readFile(goMod, 'utf-8');
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
