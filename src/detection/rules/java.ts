import fs from 'node:fs/promises';
import path from 'node:path';
import { DetectionCandidate } from './node.js';

export async function detectJava(targetDir: string): Promise<DetectionCandidate | null> {
  const pomXml = path.join(targetDir, 'pom.xml');
  const gradle = path.join(targetDir, 'build.gradle');
  const gradleKts = path.join(targetDir, 'build.gradle.kts');

  let hasJava = false;

  try {
    await fs.access(pomXml);
    hasJava = true;
  } catch {}

  try {
    await fs.access(gradle);
    hasJava = true;
  } catch {}

  try {
    await fs.access(gradleKts);
    hasJava = true;
  } catch {}

  if (!hasJava) return null;

  return {
    language: 'java',
    type: 'api',
  };
}
