---
name: self-workflow
description: Personal Copilot workflow for single-agent coding with lightweight prompts, local task routing, and minimal process overhead. Use when working alone or when a fast, low-friction coding template is preferred.
---

# Self Workflow

Use this skill for solo coding work that should stay lightweight.

## Scope

- `self/.github/copilot-instructions.md` for global instructions
- `self/.github/project.md` for project context
- `self/.github/task-context.md` for handoff state
- `self/chatmodes/architect.chatmode.md` for design-mode work
- `self/prompts/*.prompt.md` for prompt entry points

## Usage

1. Start from `prompts/start.prompt.md`.
2. Use `init-project`, `orchestrate`, `task-breakdown`, `sub-agent`, `new-feature`, `refactor`, `review`, and `handoff` as needed.
3. Keep the workflow minimal unless the task clearly needs more structure.

## When to choose this

- Single-person work
- Local experiments
- Fast iteration without PR or team gates
- Early-stage projects with unstable conventions
