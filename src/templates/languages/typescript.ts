import { CommandSet } from '../../config/schema.js';

export const typescriptCommands: CommandSet = {
  build: 'npm run build',
  test: 'npm test',
  dev: 'npm run dev',
  lint: 'npm run lint',
};

export const typescriptRules = `### TypeScript Conventions
- Enforce strict null checks and explicit function return types on public APIs.
- Prefer interfaces for object contracts and type aliases for unions/intersections.
- Avoid type assertions (\`as UnknownType\`); use proper type guards.`;
