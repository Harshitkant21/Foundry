# Architecture & System Design — ts-fullstack-app

## 1. High-Level Overview
- **Project Name:** ts-fullstack-app
- **Application Classification:** fullstack
- **Primary Language:** typescript
- **Strictness Tier:** strict

## 2. Architectural Guidelines
### Full-Stack Architecture
- Enforce clean separation between client-side presentation and server-side domain logic.
- Share data contracts or type definitions across client and server boundaries to eliminate schema drift.
- Ensure all mutation operations are fully validated on the server regardless of client validation.

## 3. Language & Implementation Standards
### TypeScript Conventions
- Enforce strict null checks and explicit function return types on public APIs.
- Prefer interfaces for object contracts and type aliases for unions/intersections.
- Avoid type assertions (`as UnknownType`); use proper type guards.

## 4. Component Boundaries
- Maintain high cohesion within modules and loose coupling between domains.
- Isolate external dependencies behind well-defined interface contracts.
