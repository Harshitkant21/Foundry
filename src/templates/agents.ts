import { ResolvedWorkspaceContext } from '../config/schema.js';

export function renderAgentsDocument(context: ResolvedWorkspaceContext): string {
  const { config, commands, languageRules, appTypeRules, baseGuardrails } = context;

  return `# ${config.project.name} — AI Development Contract (AGENTS.md)

Welcome to **${config.project.name}**. This file defines the core context, commands, and non-negotiable architectural boundaries for human engineers and AI coding assistants collaborating on this project.

---

## 1. Application Profile & Scope
- **Project Name:** ${config.project.name}
- **Application Type:** ${config.project.type}
- **Primary Language:** ${config.project.language}
- **Strictness Level:** ${config.strictness}

---

## 2. Standard Development Commands
- **Build:** \`${commands.build}\`
- **Test:** \`${commands.test}\`
- **Development Server / Entry:** \`${commands.dev}\`
- **Lint / Static Analysis:** \`${commands.lint}\`

Always run and verify tests and linting before marking tasks or issues as resolved.

---

## 3. Project Architecture & Standards
${appTypeRules}

---

## 4. Language & Code Style Conventions
${languageRules}

---

## 5. Architectural Guardrails
${baseGuardrails}
`;
}
