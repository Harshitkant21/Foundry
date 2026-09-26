import { z } from 'zod';

export const AppTypeSchema = z.enum([
  'web',
  'api',
  'fullstack',
  'cli',
  'library',
  'data-ml',
  'mobile',
  'custom',
]);
export type AppType = z.infer<typeof AppTypeSchema>;

export const LanguageSchema = z.enum([
  'typescript',
  'javascript',
  'python',
  'java',
  'go',
  'rust',
  'other',
]);
export type Language = z.infer<typeof LanguageSchema>;

export const RepositorySchema = z.enum(['github', 'gitlab', 'none']);
export type Repository = z.infer<typeof RepositorySchema>;

export const StrictnessSchema = z.enum(['standard', 'strict']);
export type Strictness = z.infer<typeof StrictnessSchema>;

export const WorkspaceConfigSchema = z.object({
  version: z.literal('1'),
  project: z.object({
    name: z
      .string()
      .min(1, 'Project name is required')
      .regex(/^[a-zA-Z0-9_\-.]+$/, 'Project name must be alphanumeric with dashes/underscores/dots'),
    type: AppTypeSchema,
    language: LanguageSchema,
  }),
  repository: RepositorySchema.default('github'),
  strictness: StrictnessSchema.default('standard'),
  adapters: z
    .array(z.string().min(1))
    .default(['agents'])
    .transform((val) => (val.length === 0 ? ['agents'] : val)),
});

export type WorkspaceConfig = z.infer<typeof WorkspaceConfigSchema>;

export interface CommandSet {
  readonly build: string;
  readonly test: string;
  readonly dev: string;
  readonly lint: string;
}

export interface ResolvedWorkspaceContext {
  readonly config: WorkspaceConfig;
  readonly commands: CommandSet;
  readonly languageRules: string;
  readonly appTypeRules: string;
  readonly baseGuardrails: string;
}

export const CliOptionsSchema = z.object({
  name: z.string().optional(),
  type: AppTypeSchema.optional(),
  lang: LanguageSchema.optional(),
  repo: RepositorySchema.optional(),
  strictness: StrictnessSchema.optional(),
  ai: z.string().optional(),
  dryRun: z.boolean().default(false),
  force: z.boolean().default(false),
  yes: z.boolean().default(false),
});

export type CliOptions = z.infer<typeof CliOptionsSchema>;
