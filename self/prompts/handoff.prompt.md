---
mode: agent
description: Hand off current task state to the next agent, or pick up from a previous handoff.
---

## Mode A — Write Handoff (current agent finishing)

Update `.github/task-context.md` with the following, be specific:

1. **What was done**: list every file modified, every function added or changed, every decision made during this session.
2. **What's next**: write the exact first step the next agent should take. Include file names and function names if known.
3. **Blockers**: anything unresolved that requires user input before proceeding.
4. **Do Not Touch**: any files that are stable and should not be modified in the next session.

Rules:

- Use concrete names, not vague descriptions ("updated auth.ts login() to return userId" not "fixed auth").
- Do not summarize decisions that were already in the file — only add new ones.
- If the task is done, reset `.github/task-context.md` back to its empty template form (Status = `idle`, Current Task empty, Subtasks/Decisions/Integration Notes/Files Locked cleared). Do not leave finished task data behind — that's what git history is for.

## Mode B — Pick Up From Handoff (new agent starting)

Read `.github/task-context.md` in full. Read `.github/project.md` **only if** What's Next touches architecture, stack, or directory layout — and the file has real content, not template placeholders. Skip otherwise.

Then confirm:

1. Restate the current task goal in one sentence.
2. List the files you will touch based on What's Next.
3. State any blocker that must be resolved before you can start.

Do not write any code until the user confirms your understanding is correct.
