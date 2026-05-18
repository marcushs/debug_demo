# Debugger workshop script

## Setup (5 min)

1. Clone/open this repo in Cursor or VS Code.
2. Run `npm install`.
3. Start **debug_demo — Debug API + Web** from the Run panel (compound configuration).
4. Open http://localhost:4201 (API on port 3001).

## Seed data (2 min)

Create three tasks, for example:

| Title | Priority (auto) |
|-------|-----------------|
| Alpha | 1 |
| Bravo | 2 |
| Charlie | 3 |

## Reproduce the bug (3 min)

1. Set a breakpoint in `UpdateTaskPriorityUC.handle()` on the line `working[i].priority = i` (inside the final `for` loop).
2. In the UI, move **Bravo** to priority **1** (Apply on the priority input).
3. When execution stops, inspect:
   - **Locals**: `working`, `i`, `newPriority` / `priority`
   - **Watch**: `working.map(t => ({ id: t.id, p: t.priority }))`
   - **Call stack**: `TaskController` → `UpdateTaskPriorityUC` → …

Expected symptom: priorities become `0, 1, 2` instead of `1, 2, 3`, and the table order looks wrong.

## Debugger features (10 min)

| Feature | Try |
|---------|-----|
| Step over / into | Step through the nested `for` loops |
| Conditional breakpoint | `working[i].id === id` |
| Logpoint | `{i} id={working[i].id} priority={working[i].priority}` |
| Front-end | Breakpoint in `TaskListComponent.changePriority()` after HTTP returns |

## Fix live (5 min)

In the final renumbering loop, assign **1-based** priorities, for example:

```typescript
working[i].priority = i + 1;
```

Continue (F5) and retry the same UI action. The list should stay consistent.

## Optional: unit test

```bash
npx nx run task:test
```

The `(unit) UpdateTaskPriorityUC` spec fails until the loop is fixed.
