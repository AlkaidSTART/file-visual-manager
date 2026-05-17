---
mode: agent
description: Unified entry point. Routes any task to the right workflow (single agent / multi agent / handoff pickup) before doing anything else.
---

## Task

${input:Describe what you want to do}

## Step 1 — Detect PICKUP (cheap signal only)

Before anything else, check for unfinished work. Use ONE of these signals — do not read `task-context.md` in full:

- User phrasing references prior work: "继续 / 接着上次 / handoff / pickup / current task".
- Otherwise, read ONLY the `## Status` line of `.github/task-context.md`. If it is `in-progress` or `blocked` → PICKUP.

If neither signal fires, treat this as a fresh task and continue. Do not load the rest of `task-context.md`.

## Step 2 — Decide what other context you need

Do NOT preload every md file. Pick from this list only what the task plausibly needs:

- `.github/project.md` → only if the task touches architecture, stack, dependencies, or directory layout. Skip if it's still a template (mostly placeholders).
- `chatmodes/architect.chatmode.md` → only if the user invoked architect mode or the task is greenfield design.
- Other `prompts/*.md` → only the one you decide to chain into below. Don't read them speculatively.

State in one line which files you chose and why. If none are needed, say so and move on.

## Step 3 — Route

Apply Phase 0 from [orchestrate.prompt.md](orchestrate.prompt.md). That file is the single source of truth for the routing criteria — re-read it if you need to refresh; do not paraphrase the rules here.

Output exactly one of:

> **SINGLE AGENT** — [reason]. Proceeding to implement.

> **MULTI AGENT** — [reason]. Chaining to `/task-breakdown` then `/orchestrate`.

> **PICKUP** — Status was `[in-progress|blocked]`. Chaining to `/handoff` Mode B.

## Step 4 — Execute

- SINGLE → implement directly. Ask one clarifying question only if scope is ambiguous. **Do not write to `task-context.md`** — that file is for multi-agent coordination and explicit handoffs only. If the user later asks for a handoff, run `/handoff` Mode A.
- MULTI → run `/task-breakdown`, get user approval, then `/orchestrate`.
- PICKUP → run `/handoff` Mode B.

## Rules

- Never dump multiple md files into context "just in case". Re-read on demand when a specific question arises.
- If you read a file and it turns out irrelevant, say so — don't pad responses with its content.
