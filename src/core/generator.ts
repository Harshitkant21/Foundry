import { AdapterRegistry, defaultRegistry } from '../adapters/registry.js';
import { GeneratedFile } from '../adapters/adapter.interface.js';
import { ResolvedWorkspaceContext } from '../config/schema.js';
import { renderAiContext } from '../templates/ai-context.js';
import { renderAiDirArchitecture } from '../templates/ai-dir/architecture.js';
import { renderAiDirContext } from '../templates/ai-dir/context.js';
import { renderAiDirDecisions } from '../templates/ai-dir/decisions.js';
import { renderAiDirRules } from '../templates/ai-dir/rules.js';
import { renderAiDirTasks } from '../templates/ai-dir/tasks.js';
import { renderContributing } from '../templates/contributing.js';
import { renderArchitectureDoc } from '../templates/docs/architecture-doc.js';
import { renderDecisionsDoc } from '../templates/docs/decisions-doc.js';
import { renderDevelopmentDoc } from '../templates/docs/development-doc.js';
import { renderDocsReadme } from '../templates/docs/docs-readme.js';
import { renderGitignore } from '../templates/gitignore.js';
import { renderProjectGuardrails } from '../templates/guardrails-doc.js';
import { renderManifest } from '../templates/manifest.js';
import { renderProjectReadme } from '../templates/readme.js';

export { GeneratedFile };

/**
 * Pure generator function: maps ResolvedWorkspaceContext to GeneratedFile[].
 * Does NOT execute any disk I/O, network requests, or model inferences.
 */
export function generateWorkspace(
  context: ResolvedWorkspaceContext,
  registry: AdapterRegistry = defaultRegistry
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // 1. Canonical machine contract
  files.push({
    relativePath: 'ai-workspace.yaml',
    content: renderManifest(context.config),
  });

  // 2. Root documentation and guardrails
  files.push({
    relativePath: 'README.md',
    content: renderProjectReadme(context),
  });

  files.push({
    relativePath: 'AI_CONTEXT.md',
    content: renderAiContext(context),
  });

  files.push({
    relativePath: 'PROJECT_GUARDRAILS.md',
    content: renderProjectGuardrails(context),
  });

  files.push({
    relativePath: 'CONTRIBUTING.md',
    content: renderContributing(context),
  });

  files.push({
    relativePath: '.gitignore',
    content: renderGitignore(context.config.project.language),
  });

  // 3. docs/ directory structure
  files.push({
    relativePath: 'docs/README.md',
    content: renderDocsReadme(context),
  });

  files.push({
    relativePath: 'docs/ARCHITECTURE.md',
    content: renderArchitectureDoc(context),
  });

  files.push({
    relativePath: 'docs/DEVELOPMENT.md',
    content: renderDevelopmentDoc(context),
  });

  files.push({
    relativePath: 'docs/DECISIONS.md',
    content: renderDecisionsDoc(context),
  });

  // 4. .ai/ directory structure (context, rules, architecture, decisions, tasks)
  files.push({
    relativePath: '.ai/context/project-context.md',
    content: renderAiDirContext(context),
  });

  files.push({
    relativePath: '.ai/rules/00-core-rules.md',
    content: renderAiDirRules(context),
  });

  files.push({
    relativePath: '.ai/architecture/system-design.md',
    content: renderAiDirArchitecture(context),
  });

  files.push({
    relativePath: '.ai/decisions/0001-project-init.md',
    content: renderAiDirDecisions(context),
  });

  files.push({
    relativePath: '.ai/tasks/task-backlog.md',
    content: renderAiDirTasks(context),
  });

  // 5. Render enabled AI tool adapters
  for (const adapterId of context.config.adapters) {
    const adapter = registry.get(adapterId);
    if (adapter) {
      const adapterFiles = adapter.render(context);
      files.push(...adapterFiles);
    }
  }

  return files;
}
