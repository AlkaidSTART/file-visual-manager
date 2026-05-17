## Phase 0 — Route Decision

Before decomposing anything, evaluate whether this task needs multiple agents at all.

Ask these questions in order:

1. **Can one agent finish this in a single session?**
   If yes → single agent. Stop here, implement directly.

2. **Does the task touch more than 3 independent file boundaries?**
   If no → single agent. Cross-file work with shared context is faster without coordination overhead.

3. **Are there at least 2 subtasks that are truly parallel?**
   (Parallel = neither depends on the other's output to start)
   If no → single agent with sequential steps. Coordination cost outweighs the benefit.

4. **Is the integration risk low enough?**
   If subtasks share data models, auth logic, or any shared state → single agent.
   Parallel agents on shared state produce conflicts that cost more to fix than the time saved.

**Decision output — pick one:**

> **SINGLE AGENT** — [one sentence reason]
> Proceed to implement directly without orchestration.

or

> **MULTI AGENT** — [one sentence reason]
> Proceed to Phase 1 decomposition.

---

**Rule**: if any question above is uncertain, default to single agent.
Orchestration is overhead. It only pays off when parallelism is real and boundaries are clean.

---

## Phase 1 — Decompose & Dispatch

If MULTI AGENT, do this once:

1. Run `/task-breakdown` to produce the subtask list. Get user approval before dispatch.
2. Write the approved subtasks into `.github/task-context.md` under `## Subtasks` (one row each, Status = `todo`).
3. For each subtask, populate `## Files Locked` with the files that sub-agent owns. Other sub-agents must not touch them.
4. Dispatch each sub-agent by invoking `/sub-agent` with the subtask ID, scope, input, and output spec from the table.

Do NOT have sub-agents read `task-context.md` in full. They only need: their own row, Files Locked, Do Not Touch. Pass the rest as parameters.

---

## Phase 2 — Integrate

When a sub-agent reports back (per the format in [sub-agent.prompt.md](sub-agent.prompt.md)), the orchestrator (not the sub-agent) does this:

1. Update the subtask's row in `## Subtasks`: Status → `done`, Output → one-line summary of what was produced.
2. If the report lists **Deviations** or **Needs integration**, add an entry under `## Integration Notes` with the file(s) and the action required.
3. If the report flags something needing human decision, add an entry under `## Human Review Checkpoints` and STOP. Wait for user before dispatching the next subtask.
4. Release the sub-agent's files from `## Files Locked` once integrated.
5. When all subtasks are `done` and Integration Notes are resolved, set top-level Status to `done` and run `/handoff` Mode A to finalize.

Rule: only the orchestrator writes to `task-context.md`. Sub-agents report; they do not edit shared state.
