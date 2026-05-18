# debug_demo — Debugger workshop

Minimal Nx monorepo (NestJS + Angular) demonstrating hexagonal architecture and IDE breakpoint debugging, aligned with the [vente-hlm](https://github.com/) conventions.

## Prerequisites

- Node.js 22+
- npm
- Chrome (for front-end debugging)

The API listens on **port 3001** by default so it can run alongside vente-hlm on port 3000.

## Quick start

```bash
npm install
npx nx serve api    # http://localhost:3001/api
npx nx serve web    # http://localhost:4200 (proxies /api → API)
```

Open http://localhost:4200, create a few tasks, then change a task priority to reproduce the workshop bug.

## Debugging

Use the **Run and Debug** panel:

| Configuration | Purpose |
|---------------|---------|
| **debug_demo — Debug API + Web** | Compound: API inspector on port **9230** + Chrome on **http://localhost:4201** |
| **debug_demo — Debug API (NestJS)** | Backend only |
| **debug_demo — Debug Web (Angular)** | Front-end only |

Open the repo via `debug_demo.code-workspace` or the `debug_demo` folder so these entries appear in Run and Debug (ports **9230** / **4201** avoid clashing with vente-hlm on 9229 / 4200).

Recommended breakpoints:

- `libs/api/task/src/lib/update-task-priority.uc.ts` — inner renumbering loop (main bug)
- `apps/web/src/app/task-list/task-list.component.ts` — `changePriority()` / `refresh()`

Workshop script: [docs/DEBUG_WORKSHOP.md](docs/DEBUG_WORKSHOP.md)

Trainer solution: [docs/SOLUTION.md](docs/SOLUTION.md)

## Structure

```
apps/api          NestJS HTTP adapter
apps/web          Angular UI
libs/api/task     Query / Command / UC (hexagonal)
libs/api/api-model Sequelize + SQLite
libs/shared/interfaces  DTOs
```

## Tests

```bash
npx nx run task:test
```
