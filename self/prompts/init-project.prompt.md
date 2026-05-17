---
mode: agent
description: Interactively fill in .github/project.md for a new or under-documented project.
---

## When to use

Run this when `.github/project.md` is mostly placeholders and the project has enough shape to document. Skip if the project is still pre-decision (use architect mode instead).

## Procedure

Ask the user one question at a time. Do not bulk-prompt. After each answer, write it into the corresponding section of [.github/project.md](../.github/project.md) and move on.

1. **What This Is** — one paragraph: what the product does, who uses it, what problem it solves.
2. **Stack** — ask for each line that applies: Frontend / Backend / Database / Auth / Hosting & CI. Skip lines the user says don't apply (delete the bullet rather than leaving it blank).
3. **Directory Layout** — ask the user to name the top 3–6 directories that matter. For each, one line on what lives there. Do not list every folder.

## Rules

- Do not invent stack choices or directories. If the user is unsure, leave that line blank with a `<!-- TBD -->` comment.
- Do not read the rest of the repo to "infer" — this prompt is for capturing what the user knows, not for reverse-engineering.
- When done, show the final `project.md` for the user to confirm before exiting.
