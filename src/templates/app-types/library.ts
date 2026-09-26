export const libraryRules = `### Library Architecture
- Expose a minimal, carefully versioned public API surface through a dedicated entry point.
- Keep internal implementation details in private modules inaccessible to consumers.
- Maintain zero or minimal external dependencies to avoid dependency conflicts for downstream consumers.`;
