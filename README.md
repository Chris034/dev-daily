# Dev Daily

Dev Daily is a focused micro-learning app for developers. It turns practical programming, system design, and AI engineering concepts into lessons that take about ten minutes.

## What works

- Personalized recommendations based on selected focus topics
- Ten complete lessons with concepts, examples, challenges, and quizzes
- Adaptive learning preferences and configurable daily goals
- Persistent lesson history, quiz accuracy, streaks, and topic progress
- Responsive dashboard, lesson reader, library, and settings experience
- Local-first guest usage with no account or service dependency
- Optional Hono API for lesson discovery and recommendation

## Run locally

Requirements: Node.js 20 or newer and npm 10 or newer.

```bash
npm install
npm run dev
```

The web app runs at `http://localhost:3000` and the API at `http://localhost:8787`.

To run only one workspace:

```bash
npm run dev --workspace=apps/web
npm run dev --workspace=apps/api
```

## Quality checks

```bash
npm run typecheck
npm run build
```

Production web assets are written to `apps/web/dist`; compiled API files are written to `apps/api/dist`.

## Architecture

- `apps/web`: React, TypeScript, React Router, Vite
- `apps/api`: Hono and Zod on Node.js
- `packages/types`: shared domain types reserved for server-backed expansion

Learning progress is stored under the browser key `dev-daily-state-v1`. This makes the product fully usable without infrastructure while leaving the API boundary available for a future authenticated sync service and AI-backed lesson generation.
