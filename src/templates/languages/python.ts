import { CommandSet } from '../../config/schema.js';

export const pythonCommands: CommandSet = {
  build: 'python -m build',
  test: 'pytest',
  dev: 'python -m app.main',
  lint: 'ruff check .',
};

export const pythonRules = `### Python Conventions
- Follow PEP 8 style guidelines.
- Use explicit type annotations on all function signatures.
- Prefer Python standard library modules over third-party packages where possible.`;
