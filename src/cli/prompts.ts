import * as p from '@clack/prompts';
import { defaultRegistry } from '../adapters/registry.js';
import { AppType, Language, Repository, Strictness, WorkspaceConfig } from '../config/schema.js';
import { DetectedEnvironment } from '../detection/detector.js';

export async function runInteractivePrompts(
  detected: DetectedEnvironment,
  defaults: {
    name?: string;
    type?: AppType;
    language?: Language;
    repository?: Repository;
    strictness?: Strictness;
    adapters?: string[];
  }
): Promise<WorkspaceConfig> {
  // Guard against headless/non-interactive terminals
  if (!process.stdout.isTTY) {
    return {
      version: '1',
      project: {
        name: defaults.name || detected.name,
        type: defaults.type || detected.type,
        language: defaults.language || detected.language,
      },
      repository: defaults.repository || 'github',
      strictness: defaults.strictness || 'standard',
      adapters: defaults.adapters || defaultRegistry.getDefaultIds(),
    };
  }

  p.intro('Foundry (create-foundry-workspace) v1.0.0');

  // Step 1: Project Name
  const initialName = defaults.name || (detected.name !== 'my-workspace' && detected.name !== 'Extentions' ? detected.name : 'my-app');
  const nameInput = await p.text({
    message: 'Project name:',
    defaultValue: initialName,
    placeholder: initialName,
    validate: (val) => {
      if (!val || !/^[a-zA-Z0-9_\-.]+$/.test(val)) {
        return 'Project name must be alphanumeric with dashes/underscores/dots.';
      }
    },
  });

  if (p.isCancel(nameInput)) {
    p.cancel('Initialization cancelled.');
    process.exit(0);
  }

  // Step 2: Project type
  const selectedType = await p.select({
    message: 'Project type:',
    options: [
      { value: 'web', label: 'Web App', hint: 'Frontend / SPA' },
      { value: 'api', label: 'Backend/API', hint: 'REST / GraphQL / RPC services' },
      { value: 'fullstack', label: 'Full Stack', hint: 'Client + Server application' },
      { value: 'cli', label: 'CLI', hint: 'Command-line tool or terminal binary' },
      { value: 'library', label: 'Library/Package', hint: 'Reusable package' },
      { value: 'data-ml', label: 'Data/ML', hint: 'Data pipelines & machine learning' },
      { value: 'mobile', label: 'Mobile', hint: 'Native or cross-platform mobile app' },
      { value: 'custom', label: 'Custom', hint: 'Custom architecture' },
    ],
    initialValue: defaults.type || detected.type,
  });

  if (p.isCancel(selectedType)) {
    p.cancel('Initialization cancelled.');
    process.exit(0);
  }

  // Step 3: Language
  const selectedLang = await p.select({
    message: 'Language:',
    options: [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
      { value: 'other', label: 'Other' },
    ],
    initialValue: defaults.language || detected.language,
  });

  if (p.isCancel(selectedLang)) {
    p.cancel('Initialization cancelled.');
    process.exit(0);
  }

  // Step 4: AI workflow
  const selectedAdapters = await p.multiselect({
    message: 'AI workflow (Press Enter to default to Multi-agent / Generic):',
    options: [
      { value: 'agents', label: 'Multi-agent', hint: 'AGENTS.md open standard' },
      { value: 'claude', label: 'Claude', hint: 'CLAUDE.md for Claude Code' },
      { value: 'cursor', label: 'Cursor', hint: '.cursor/rules/ for Cursor IDE' },
      { value: 'copilot', label: 'Copilot', hint: '.github/copilot-instructions.md for GitHub Copilot' },
      { value: 'codex', label: 'Codex', hint: 'CODEX.md for OpenAI Codex' },
      { value: 'gemini', label: 'Gemini', hint: 'GEMINI.md for Google Gemini CLI' },
      { value: 'generic', label: 'Generic', hint: 'AI_INSTRUCTIONS.md for any tool' },
    ],
    required: false,
  });

  if (p.isCancel(selectedAdapters)) {
    p.cancel('Initialization cancelled.');
    process.exit(0);
  }

  const finalAdapters =
    Array.isArray(selectedAdapters) && selectedAdapters.length > 0
      ? (selectedAdapters as string[])
      : ['agents'];

  // Step 5: Repository
  const selectedRepo = await p.select({
    message: 'Repository:',
    options: [
      { value: 'github', label: 'GitHub', hint: '.github/ configuration' },
      { value: 'gitlab', label: 'GitLab', hint: '.gitlab/ configuration' },
      { value: 'none', label: 'None', hint: 'No remote repository config' },
    ],
    initialValue: defaults.repository || 'github',
  });

  if (p.isCancel(selectedRepo)) {
    p.cancel('Initialization cancelled.');
    process.exit(0);
  }

  // Step 6: Guardrail Strictness
  const selectedStrictness = await p.select({
    message: 'Guardrail Strictness:',
    options: [
      {
        value: 'standard',
        label: 'Standard',
        hint: 'Modular architecture, build/test guidelines, basic security',
      },
      {
        value: 'strict',
        label: 'Strict',
        hint: 'Mandatory tests, strict typing, destructive command restriction',
      },
    ],
    initialValue: defaults.strictness || 'standard',
  });

  if (p.isCancel(selectedStrictness)) {
    p.cancel('Initialization cancelled.');
    process.exit(0);
  }

  return {
    version: '1',
    project: {
      name: nameInput as string,
      type: selectedType as AppType,
      language: selectedLang as Language,
    },
    repository: selectedRepo as Repository,
    strictness: selectedStrictness as Strictness,
    adapters: finalAdapters,
  };
}
