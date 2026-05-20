# Trainer solution — priority renumbering bug

## Location

`libs/api/task/src/lib/update-task-priority.uc.ts`

## What to inspect in the debugger

Set a breakpoint inside `UpdateTaskPriorityUC.handle()` on the assignment line in the final loop.

Use this sequence during the demo:

1. **Before the loop**
   - Inspect `working.map(t => ({ id: t.id, p: t.priority }))`.
   - Confirm priorities are expected to remain human-friendly (start at `1`).
2. **Inside the loop (`i = 0`)**
   - Inspect `i` and `working[i]`.
   - Step over the assignment and verify that `working[0].priority` becomes `0`.
3. **After a few iterations**
   - Watch the array evolve to `0, 1, 2`.
   - This proves the bug is introduced in this loop, not in transport/front-end.
4. **Call stack check**
   - Confirm execution path `TaskController` -> `UpdateTaskPriorityUC`.
   - Use this to explain where to fix the bug (domain use case layer).

## Cause

The final loop assigns 0-based indices:

```typescript
for (let i = 0; i < working.length; i++) {
  working[i].priority = i; // produces 0, 1, 2 instead of 1, 2, 3
}
```

## Fix

Use 1-based renumbering in the final loop:

```typescript
for (let i = 0; i < working.length; i++) {
  working[i].priority = i + 1;
}
```

## Verify

1. UI: move Bravo to priority 1 — result is **Bravo(1), Alpha(2), Charlie(3)**.
2. Priorities remain consecutive and 1-based (`1, 2, 3`, then `1..n`).
3. `npx nx run task:test` — assertions green.

## Teaching takeaway

This exercise is intentionally simple: the value is the method.

- breakpoint at the suspect line,
- observe runtime state (not assumptions),
- validate hypothesis with step-by-step execution,
- patch only after proof of cause.
