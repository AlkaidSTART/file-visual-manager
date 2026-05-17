---
mode: agent
description: Break a large or vague task into bounded subtasks before implementation.
---

Read `.github/project.md` only if the task depends on existing architecture or stack choices. Skip otherwise.

## Task

${input:Describe the large task}

## Output Format

Produce a breakdown in this structure:

**Subtask N — [name]**

- Scope: [what files / layers are touched]
- Input: [what this subtask depends on]
- Output: [what it produces for the next subtask]
- Risk: [anything uncertain or requiring a decision]

## Rules

- Each subtask must have a clear boundary (no shared mutable state with siblings).
- Flag any subtask where a decision is needed before implementation can start.
- Do not start implementation until the user approves the breakdown.
