import path from 'node:path';
import { Command } from 'commander';
import { defaultRegistry } from '../adapters/registry.js';
import { AppType, CliOptionsSchema, Language, Repository, Strictness, WorkspaceConfigSchema } from '../config/schema.js';
import { buildResolvedContext } from '../core/context.js';
import { generateWorkspace } from '../core/generator.js';
import { detectProjectEnvironment } from '../detection/detector.js';
import { writeWorkspace } from '../io/writer.js';
import { formatDryRunBanner, formatSuccessSummary } from './formatters.js';
import { runInteractivePrompts } from './prompts.js';

export async function runCli(argv: string[] = process.argv): Promise<void> {
  const program = new Command();

  program
    .name('create-foundry-workspace')
    .description('Deterministic, zero-LLM CLI for initializing AI-ready software development workspaces')
    .version('1.0.0')
    .argument('[directory]', 'Target directory to initialize')
    .option('-n, --name <string>', 'Project name')
    .option(
      '-t, --type <type>',
      'Application type (web | api | fullstack | cli | library | data-ml | mobile | custom)'
    )
    .option(
      '-l, --lang <language>',
      'Primary language (typescript | javascript | python | java | go | rust | other)'
    )
    .option('-r, --repo <repository>', 'Repository hosting (github | gitlab | none)', 'github')
    .option('-s, --strictness <level>', 'Guardrail level (standard | strict)', 'standard')
    .option(
      '-a, --ai <adapters>',
      'Comma-separated adapter IDs (e.g. claude,cursor,codex,gemini,agents,generic)'
    )
    .option('--dry-run', 'Preview generated files in memory without writing to disk', false)
    .option('-f, --force', 'Overwrite existing files in target directory', false)
    .option('-y, --yes', 'Accept defaults non-interactively', false);

  program.parse(argv);

  const rawOpts = program.opts();
  const opts = CliOptionsSchema.parse(rawOpts);

  // Check if directory argument was explicitly provided by the user
  const explicitDirArg = program.args[0];
  const initialTargetDir = explicitDirArg ? path.resolve(explicitDirArg) : process.cwd();

  // 1. Detect project environment from filesystem markers
  const detected = await detectProjectEnvironment(initialTargetDir);

  const defaultAdapters = opts.ai
    ? opts.ai
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter((s) => defaultRegistry.has(s))
    : ['claude', 'cursor', 'agents'];

  let config;

  // 2. Determine interactive vs. non-interactive flow
  const isNonInteractive = opts.yes || !process.stdout.isTTY || !!opts.name || !!opts.type || !!opts.lang;

  if (isNonInteractive) {
    const rawConfig = {
      version: '1' as const,
      project: {
        name: opts.name || detected.name,
        type: (opts.type || detected.type) as AppType,
        language: (opts.lang || detected.language) as Language,
      },
      repository: (opts.repo || 'github') as Repository,
      strictness: (opts.strictness || 'standard') as Strictness,
      adapters: defaultAdapters.length > 0 ? defaultAdapters : ['claude', 'cursor', 'agents'],
    };
    config = WorkspaceConfigSchema.parse(rawConfig);
  } else {
    config = await runInteractivePrompts(detected, {
      name: opts.name,
      type: opts.type as AppType,
      language: opts.lang as Language,
      repository: opts.repo as Repository,
      strictness: opts.strictness as Strictness,
      adapters: defaultAdapters,
    });
  }

  // 3. Resolve target directory:
  // - If an explicit directory argument was passed (e.g. `create-foundry-workspace .` or `create-foundry-workspace my-dir`), resolve that.
  // - If detected in an existing project (e.g. package.json exists in cwd) or project name matches current directory name, initialize in cwd (`.`).
  // - Otherwise, create a new subfolder named after the project in cwd.
  let targetDir: string;
  if (explicitDirArg) {
    targetDir = path.resolve(explicitDirArg);
  } else if (detected.isDetected || config.project.name === path.basename(process.cwd())) {
    targetDir = process.cwd();
  } else {
    targetDir = path.resolve(process.cwd(), config.project.name);
  }

  // 4. Resolve context and generate files (PURE IN-MEMORY)
  const context = buildResolvedContext(config);
  const generatedFiles = generateWorkspace(context, defaultRegistry);

  // 5. Handle dry-run or write to disk (I/O BOUNDARY)
  if (opts.dryRun) {
    formatDryRunBanner(config.project.name, targetDir, generatedFiles);
    return;
  }

  const writeResult = await writeWorkspace(targetDir, generatedFiles, {
    dryRun: false,
    force: opts.force,
  });

  formatSuccessSummary(targetDir, writeResult);
}
