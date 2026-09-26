import { ResolvedWorkspaceContext, WorkspaceConfig } from '../config/schema.js';
import { getAppTypeRules } from '../templates/app-types/index.js';
import { BASE_GUARDRAILS } from '../templates/base/guardrails.js';
import { getLanguageTemplate } from '../templates/languages/index.js';

export function buildResolvedContext(config: WorkspaceConfig): ResolvedWorkspaceContext {
  const langTemplate = getLanguageTemplate(config.project.language);
  const appRules = getAppTypeRules(config.project.type);
  const guardrails = BASE_GUARDRAILS[config.strictness];

  return {
    config,
    commands: langTemplate.commands,
    languageRules: langTemplate.rules,
    appTypeRules: appRules,
    baseGuardrails: guardrails,
  };
}
