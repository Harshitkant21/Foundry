import { ResolvedWorkspaceContext } from '../../config/schema.js';

export function renderAiDirTasks(context: ResolvedWorkspaceContext): string {
  const { config } = context;

  return `# AI Task Tracking — ${config.project.name}

Operational scratchpad for human engineers and AI coding assistants to queue, claim, verify, and complete discrete engineering tasks.

---

## Agent Task Execution Protocol
1. **Claiming:** Before executing non-trivial edits, move or record the task under **Active Task (WIP)** with a brief implementation plan.
2. **Verification:** Never move an item to **Completed Tasks** until all automated test suites, linting, and typechecks pass with zero errors.
3. **Traceability:** Document significant architectural decisions in \`.ai/decisions/\`.

---

## Active Task (WIP)
<!-- Record the currently active task, planned steps, and validation checklist here -->
*(No active task. Select or add a task from the backlog before beginning work.)*

---

## Task Backlog
<!-- Queue upcoming features, enhancements, refactors, or bugfixes below -->

---

## Completed Tasks
- [x] Initialized AI Workspace via Foundry (\`create-foundry-workspace\`)
`;
}
