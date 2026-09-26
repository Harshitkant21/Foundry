import { CommandSet, Language } from '../../config/schema.js';
import { goCommands, goRules } from './go.js';
import { javaCommands, javaRules } from './java.js';
import { javascriptCommands, javascriptRules } from './javascript.js';
import { otherCommands, otherRules } from './other.js';
import { pythonCommands, pythonRules } from './python.js';
import { rustCommands, rustRules } from './rust.js';
import { typescriptCommands, typescriptRules } from './typescript.js';

export interface LanguageTemplate {
  commands: CommandSet;
  rules: string;
}

export function getLanguageTemplate(lang: Language): LanguageTemplate {
  switch (lang) {
    case 'typescript':
      return { commands: typescriptCommands, rules: typescriptRules };
    case 'javascript':
      return { commands: javascriptCommands, rules: javascriptRules };
    case 'python':
      return { commands: pythonCommands, rules: pythonRules };
    case 'java':
      return { commands: javaCommands, rules: javaRules };
    case 'go':
      return { commands: goCommands, rules: goRules };
    case 'rust':
      return { commands: rustCommands, rules: rustRules };
    case 'other':
    default:
      return { commands: otherCommands, rules: otherRules };
  }
}
