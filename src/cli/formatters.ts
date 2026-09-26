import { GeneratedFile } from '../adapters/adapter.interface.js';
import { WriteResult } from '../io/writer.js';

export function formatDryRunBanner(name: string, targetDir: string, files: GeneratedFile[]): void {
  console.log(`\n============================================================`);
  console.log(`  Foundry (create-ai-workspace) — DRY RUN PREVIEW`);
  console.log(`============================================================`);
  console.log(`Project:          ${name}`);
  console.log(`Target Directory: ${targetDir}`);
  console.log(`Files to create:  ${files.length}`);
  console.log(`Mode:             No disk writes performed (--dry-run enabled)\n`);

  console.log(`Generated Workspace File Tree:`);
  for (const file of files) {
    console.log(`  + ${file.relativePath}`);
  }
  console.log(`============================================================\n`);
}

export function formatSuccessSummary(targetDir: string, result: WriteResult): void {
  console.log(`\n✔ AI Workspace initialized successfully in ${targetDir}`);
  console.log(`  Created: ${result.written.length} files`);
  if (result.skipped.length > 0) {
    console.log(`  Skipped (existing): ${result.skipped.length} files (use --force to overwrite)`);
  }
  console.log(`\nGenerated files:`);
  for (const path of result.written) {
    console.log(`  + ${path}`);
  }
  console.log(`\nNext steps:`);
  console.log(`  1. Open the project in Cursor, VS Code (Copilot), or Claude Code.`);
  console.log(`  2. Review AGENTS.md and README.md.`);
  console.log(`  3. Start developing!\n`);
}
