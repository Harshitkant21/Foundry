import { CommandSet } from '../../config/schema.js';

export const otherCommands: CommandSet = {
  build: '# Run project build command',
  test: '# Run project test command',
  dev: '# Run local development command',
  lint: '# Run project linting command',
};

export const otherRules = `### General Language Conventions
- Adhere to the established idiomatic style of the language.
- Run project build, test, and lint commands before pushing code.
- Keep dependencies lean and maintain explicit error handling.`;
