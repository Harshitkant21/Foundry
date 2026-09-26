import { describe, expect, it } from 'vitest';
import { interpolate } from '../../src/core/interpolator.js';

describe('Zero-Dependency Interpolator', () => {
  it('correctly replaces uppercase template tokens', () => {
    const template = 'Hello, {{NAME}}! Welcome to {{PROJECT}}.';
    const data = { NAME: 'Developer', PROJECT: 'Foundry' };

    const result = interpolate(template, data);
    expect(result).toBe('Hello, Developer! Welcome to Foundry.');
  });

  it('leaves unmatched tokens unchanged', () => {
    const template = '{{MATCHED}} and {{UNMATCHED}}';
    const data = { MATCHED: 'Found' };

    const result = interpolate(template, data);
    expect(result).toBe('Found and {{UNMATCHED}}');
  });

  it('handles multiple occurrences of the same token', () => {
    const template = '{{FOO}} - {{FOO}} - {{FOO}}';
    const data = { FOO: 'bar' };

    const result = interpolate(template, data);
    expect(result).toBe('bar - bar - bar');
  });
});
