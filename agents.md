# Codex 5.2 Agent Instructions

## Tech Stack
- Languages: JavaScript (ESM), TypeScript/TSX (present in src), Prisma schema
- Frontend: React 19, Vite, Tailwind CSS, React Router, Framer Motion
- Backend: Node.js, Express, Prisma ORM
- Tooling: ESLint (flat config), Vite build
- Package manager: npm

## Speed & Execution Rules
- Reasoning level: Medium. Do not overthink or loop on deep analysis.
- Avoid recursive file searches. Prefer direct file reads and targeted globs.
- Favor one-shot code generation over long planning. Keep plans to 3 bullets max.
- If blocked, ask one focused question and proceed.

## Coding Standards
- React: functional components, hooks only, avoid class components.
- Type safety: use explicit types in TS/TSX for exports and complex objects.
- Routing: keep route components thin; move logic to hooks/services.
- Styling: use Tailwind utility classes; avoid inline styles unless necessary.
- Backend: async/await, centralized error handling, validate inputs.
- Prisma: avoid N+1 by using include/select; keep queries in services.

## Boundaries
- Do not refactor unrelated code.
- Do not create, edit, or delete .env files.

## Common Commands
- Frontend dev: npm run dev
- Frontend build: npm run build
- Frontend lint: npm run lint
- Backend dev: npm run backend:dev
- Backend start: npm run backend:start
- DB push: npm run db:push
- DB seed: npm run db:seed
- Prisma generate: npm run prisma:generate
- API tests: npm run test:api
- Points tests: npm run test:points
- 300 points test: npm run test:300
- Dismiss test: npm run test:dismiss
