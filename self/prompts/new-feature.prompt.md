---
mode: agent
description: Plan and implement a new feature across multiple files.
---

Read `.github/project.md` only if the feature interacts with existing stack/architecture and that file has real content. Otherwise skip.

## Task

${input:Describe the feature}

## Before Writing Any Code

1. List the files you will create or modify.
2. Identify any new dependencies required.
3. State any assumptions about data shape or API contracts.
4. Ask for confirmation if any item above is unclear.

## Implementation Rules

- Implement only what is described. Do not extend scope.
- Keep new code consistent with existing patterns in the codebase.
- If a shared utility already exists, use it instead of duplicating.
- Write the implementation file-by-file in the order you listed above.

## After Implementation

- Summarize what changed and why.
- Flag any follow-up work the user should know about.
