# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The Foundry project and `create-foundry-workspace` CLI take the security and integrity of developer environments seriously.

Because Foundry generates code templates and configuration files that developers commit to their repositories:
- The CLI contains **zero runtime dependencies on external AI APIs or remote endpoints**.
- Generated configurations never prompt for or transmit credentials.

### How to Report

If you discover a security vulnerability or security-sensitive defect in Foundry or the generated templates:

1. **Do not open a public GitHub issue.**
2. Send a report via email or open a [GitHub Private Security Advisory](https://github.com/Harshitkant21/Foundry/security/advisories/new).
3. Include detailed steps to reproduce the vulnerability, sample configurations, and expected vs. actual impact.

We will acknowledge receipt within 48 hours and work with you to coordinate a responsible disclosure and patch release.
