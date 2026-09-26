## Summary of Changes

<!-- Briefly describe the changes introduced by this pull request. -->

## Related Issues

<!-- Link related issues here (e.g. Closes #12, Fixes #34) -->

## Architectural Checklist

Before submitting this PR, confirm that it strictly adheres to Foundry's core principles:

- [ ] **Zero-LLM Boundary:** No generative model calls, OpenAI/Anthropic/Gemini SDKs, or network requests at runtime.
- [ ] **Bit-for-Bit Determinism:** Identical input produces identical byte output (no dynamic timestamps, random IDs, or machine-specific paths).
- [ ] **Pure Core:** No `node:fs` imports inside `src/core/`, `src/adapters/`, or `src/templates/`.
- [ ] **Type Safety:** Strict TypeScript adherence with zero `any` or `@ts-ignore`.
- [ ] **Tests Pass:** All automated unit, integration, and golden tests pass (`npm test`).
- [ ] **Build Clean:** TypeScript builds cleanly without errors (`npm run build`).
