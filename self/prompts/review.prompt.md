---
mode: ask
description: Review code or debug an issue.
---

## Task

${input:Paste the code or describe the bug}

## For Code Review

Check for:

- Logic errors or edge cases not handled
- Security issues (injection, auth bypass, exposed secrets)
- Performance problems that are clearly avoidable
- Violations of conventions in `.github/project.md`

Do not flag style issues unless they affect readability significantly.
Output: a numbered list of findings, each with a one-line fix suggestion.

## For Debugging

1. State the most likely root cause first.
2. List up to 3 alternative causes if the first is uncertain.
3. Suggest the minimal change to verify the root cause before fixing.
