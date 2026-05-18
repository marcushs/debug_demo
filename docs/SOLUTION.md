# Trainer solution — priority renumbering bug

## Location

[`libs/api/task/src/lib/update-task-priority.uc.ts`](../libs/api/task/src/lib/update-task-priority.uc.ts)

## Cause

After moving a task, the final loop assigns **0-based** indices:

```typescript
for (let i = 0; i < working.length; i++) {
  working[i].priority = i; // bug
}
```

Priorities should be **1-based** and unique (`1 … n`).

## Fix

```typescript
for (let i = 0; i < working.length; i++) {
  working[i].priority = i + 1;
}
```

Alternatively, sort by current priority and reassign `priority = index + 1` in one pass after the move.

## Verify

1. UI: move middle task to priority 1 — order stays Alpha, Bravo, Charlie with priorities 1, 2, 3.
2. `npx nx run task:test` — all tests green.
