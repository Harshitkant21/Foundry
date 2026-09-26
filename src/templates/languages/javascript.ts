import { CommandSet } from '../../config/schema.js';

export const javascriptCommands: CommandSet = {
  build: 'npm run build',
  test: 'npm test',
  dev: 'npm start',
  lint: 'npm run lint',
};

export const javascriptRules = `### JavaScript Conventions
- Target modern ECMAScript (ESM) syntax using \`import\` and \`export\`.
- Document non-trivial data structures and function parameters using JSDoc.
- Always handle asynchronous Promise rejections explicitly with \`try/catch\`.`;
