import { ResolvedWorkspaceContext } from '../config/schema.js';

export function renderContributing(context: ResolvedWorkspaceContext): string {
  const { config, commands } = context;

  return `# Contributing to ${config.project.name}

Thank you for contributing! Please adhere to our standardized engineering standards, branch conventions, and AI guardrails.

---

## 1. Development & Quality Workflow

Before submitting changes, ensure your working tree passes all verification gates:

1. **Install dependencies & build:**
   \`\`\`bash
   ${commands.build}
   \`\`\`
2. **Format and lint:**
   \`\`\`bash
   ${commands.lint}
   \`\`\`
3. **Execute automated tests:**
   \`\`\`bash
   ${commands.test}
   \`\`\`

---

## 2. Branching & Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for structured, machine-parseable commit history:

### Commit Format
\`\`\`text
<type>(<scope>): <short description>
\`\`\`

### Allowed Types
- **\`feat\`**: A new feature or capability.
- **\`fix\`**: A bug or regression fix.
- **\`docs\`**: Documentation additions or corrections.
- **\`refactor\`**: Code change that neither fixes a bug nor adds a feature.
- **\`test\`**: Adding or modifying test suites.
- **\`chore\`**: Tooling, dependencies, or repository maintenance.

### Branch Naming Patterns
- \`feature/<short-topic>\` (e.g. \`feature/langgraph-adapter\`)
- \`bugfix/<issue-number>-<short-topic>\` (e.g. \`bugfix/102-path-traversal\`)
- \`docs/<topic>\` (e.g. \`docs/contributing-guide\`)

---

## 3. Pull Request Standards

- **Atomic Scope:** PRs must focus on a single conceptual change. Avoid bundling unrelated refactorings.
- **Zero Broken Tests:** All tests must pass before opening a PR.
- **Commit History:** Keep history clean and avoid merge commits where squashing or rebasing is requested.

---

## 4. AI-Assisted Contributions

- When using AI coding assistants (Cursor, Claude, Copilot, Antigravity, etc.), verify they strictly adhere to [\`PROJECT_GUARDRAILS.md\`](./PROJECT_GUARDRAILS.md).
- AI agents operate in **read-only Git mode by default**. Never allow an agent to stage or commit code without manual human inspection.
- All AI-generated code must be fully understood, tested, and reviewed by a human maintainer.
`;
}
