import { WorkspaceConfig } from '../config/schema.js';

export function renderManifest(config: WorkspaceConfig): string {
  const adaptersYaml = config.adapters.map((a) => `  - ${a}`).join('\n');

  return `version: "1"

project:
  name: "${config.project.name}"
  type: "${config.project.type}"
  language: "${config.project.language}"

repository: "${config.repository}"
strictness: "${config.strictness}"

adapters:
${adaptersYaml}
`;
}
