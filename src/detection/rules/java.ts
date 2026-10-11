import { ProjectFileSystem } from '../../io/scanner.js';
import { DetectionCandidate } from './node.js';

export async function detectJava(fs: ProjectFileSystem): Promise<DetectionCandidate | null> {
  const hasPom = await fs.exists('pom.xml');
  const hasGradle = await fs.exists('build.gradle');
  const hasGradleKts = await fs.exists('build.gradle.kts');

  if (!hasPom && !hasGradle && !hasGradleKts) {
    return null;
  }

  return {
    language: 'java',
    type: 'api',
  };
}
