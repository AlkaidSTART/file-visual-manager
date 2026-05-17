# Copilot Instructions

## Project Reference

Read `.github/project.md` **only when** the task touches architecture, dependencies, or file structure — and the file has real content (not just template placeholders). For small edits, bug fixes, or self-contained changes, skip it.

Read `.github/task-context.md` **only when** continuing prior work or when the user references a previous session. Do not preload it for fresh tasks.

When in doubt, prefer entering `/start` first — it routes the task and decides which context to load.

## General Rules

- Ask before adding new dependencies, changing public APIs, or touching shared state.
- Prefer editing existing files over creating new ones unless the task clearly requires a new module.
- Never silently change behavior outside the stated task scope.
- When unsure about scope, ask one clarifying question before proceeding.

## Code Style

- Follow conventions already present in the file being edited.
- No commented-out code in final output.
- No TODO comments unless the user explicitly asks to leave one.

## Response Format

- For single-file changes: show the diff or the changed block only, not the whole file.
- For multi-file changes: list affected files first, then show changes file by file.
- For explanations: prose first, code after. Keep explanations under 5 sentences unless asked.
