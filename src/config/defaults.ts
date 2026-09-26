import { AppType, Language, Strictness } from './schema.js';

export const DEFAULT_APP_TYPE: AppType = 'fullstack';
export const DEFAULT_LANGUAGE: Language = 'typescript';
export const DEFAULT_STRICTNESS: Strictness = 'standard';
export const DEFAULT_ADAPTERS: string[] = ['agents', 'cursor', 'claude', 'copilot'];

export const SPEC_VERSION = '1';
export const GENERATOR_NAME = 'create-ai-workspace';
