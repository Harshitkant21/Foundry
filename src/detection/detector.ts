import path from 'node:path';
import { DEFAULT_APP_TYPE, DEFAULT_LANGUAGE } from '../config/defaults.js';
import { AppType, Language } from '../config/schema.js';
import { detectGo } from './rules/go.js';
import { detectJava } from './rules/java.js';
import { detectNode } from './rules/node.js';
import { detectPython } from './rules/python.js';
import { detectRust } from './rules/rust.js';

export interface DetectedEnvironment {
  readonly name: string;
  readonly language: Language;
  readonly type: AppType;
  readonly isDetected: boolean;
}

/**
 * Deterministically inspects target directory markers to infer project defaults.
 * Completely decoupled from CLI prompt parsing.
 */
export async function detectProjectEnvironment(targetDir: string): Promise<DetectedEnvironment> {
  const fallbackName = path.basename(path.resolve(targetDir)) || 'my-workspace';

  // Run detectors in priority order
  const node = await detectNode(targetDir);
  if (node) {
    return {
      name: node.name || fallbackName,
      language: node.language || DEFAULT_LANGUAGE,
      type: node.type || DEFAULT_APP_TYPE,
      isDetected: true,
    };
  }

  const rust = await detectRust(targetDir);
  if (rust) {
    return {
      name: rust.name || fallbackName,
      language: 'rust',
      type: rust.type || 'cli',
      isDetected: true,
    };
  }

  const go = await detectGo(targetDir);
  if (go) {
    return {
      name: go.name || fallbackName,
      language: 'go',
      type: go.type || 'api',
      isDetected: true,
    };
  }

  const python = await detectPython(targetDir);
  if (python) {
    return {
      name: fallbackName,
      language: 'python',
      type: python.type || 'api',
      isDetected: true,
    };
  }

  const java = await detectJava(targetDir);
  if (java) {
    return {
      name: fallbackName,
      language: 'java',
      type: java.type || 'api',
      isDetected: true,
    };
  }

  return {
    name: fallbackName,
    language: DEFAULT_LANGUAGE,
    type: DEFAULT_APP_TYPE,
    isDetected: false,
  };
}
