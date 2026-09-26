import fs from 'node:fs/promises';
import path from 'node:path';
import { DetectionCandidate } from './node.js';

export async function detectRust(targetDir: string): Promise<DetectionCandidate | null> {
  const cargoToml = path.join(targetDir, 'Cargo.toml');
  try {
    const raw = await fs.readFile(cargoToml, 'utf-8');
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
