import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderDevelopmentDoc(context: ResolvedWorkspaceContext): string {
  const { config, commands } = context;

  return `# Development Guide — ${config.project.name}

## 1. Setup & Requirements
- Target Language: \`${config.project.language}\`
- Repository Hosting: \`${config.repository}\`

## 2. Standard Commands
- **Compile / Build:** \`${commands.build}\`
- **Execute Test Suite:** \`${commands.test}\`
- **Local Dev Server / Runner:** \`${commands.dev}\`
- **Linter & Code Format:** \`${commands.lint}\`

## 3. Pull Request & Verification Checklist
1. Ensure all tests pass locally: \`${commands.test}\`.
2. Confirm code passes static analysis with zero errors: \`${commands.lint}\`.
3. Adhere to guardrails declared in [\`PROJECT_GUARDRAILS.md\`](../PROJECT_GUARDRAILS.md).
`;
}
