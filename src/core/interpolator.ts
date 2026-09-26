/**
 * Pure, deterministic string substitution engine.
 * Replaces {{KEY}} occurrences with string data values.
 */
export function interpolate(template: string, data: Record<string, string>): string {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return data[key];
    }
    return match;
  });
}
