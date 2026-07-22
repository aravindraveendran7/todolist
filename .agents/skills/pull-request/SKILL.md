---
name: pull-request
description: >
  Generate a pull request title and description from the commits and diff on the
  current branch. Use whenever the user asks to write, generate, or improve a PR
  (or MR) description, open a pull request, or mentions "PR body", "PR
  description", or "raise a PR". Reads the branch diff against the base branch,
  summarizes the change, fills the team PR template, and produces a self-review
  checklist. Do NOT use for writing individual commit messages or release notes.
---
 
# Pull Request
 
## Overview
Turn the changes on the current branch into a clear, reviewable pull request:
a concise title and a structured description that helps a reviewer understand
what changed, why, and how it was verified.
 
## Steps
1. Determine the base branch (default `main`; use `master` or the user-specified
   base if that's the convention). Confirm with the user if ambiguous.
2. Gather context:
   - `git log <base>..HEAD --oneline` for the commit list.
   - `git diff <base>...HEAD --stat` for the scope of files changed.
   - `git diff <base>...HEAD` for the actual changes (read enough to summarize
     accurately; sample large diffs rather than dumping everything).
3. If a PR template exists (`.github/PULL_REQUEST_TEMPLATE.md` or similar),
   read it and fill that structure instead of the default below.
4. Write the title and description.
5. Present the result; do NOT open the PR unless the user asks.
6. If the user asks to open the PR, run `git push -u origin feature-branch-name`.
## Title
- Prefer Conventional Commits style: `<type>(<scope>): <summary>`.
- Imperative mood, <= 70 chars, no trailing period.
- One line that captures the primary change, not a laundry list.
## Description (default structure)
Use this when no repo template is found:
 
### Summary
1–3 sentences on what this PR does and why it exists. Lead with the user- or
system-level outcome, not the implementation.
 
### Changes
Bulleted list of the meaningful changes, grouped logically. Describe behavior,
not a file-by-file restatement of the diff.
 
### Testing
How the change was verified: tests added/updated, manual steps, commands run.
If you cannot tell from the diff, say so and prompt the user to fill it in.
 
### Related
Link issues/tickets (`Closes #123`) only when referenced in commits, branch
name, or by the user. Never invent issue numbers.
 
### Notes for reviewers (optional)
Call out anything needing attention: risky areas, follow-ups, deliberate
trade-offs, or parts you want a closer look at.
 
## Rules
- Ground every claim in the actual diff. Do not describe changes that aren't
  present. If uncertain, mark it as an assumption for the user to confirm.
- Flag missing tests: if the diff changes logic but adds no tests, note it in
  the Testing section rather than glossing over it.
- Flag scope creep: if the branch mixes unrelated concerns, suggest splitting
  into separate PRs.
- Call out breaking changes, migrations, config/env changes, and new
  dependencies prominently — reviewers must not miss these.
- Keep it scannable: short paragraphs and tight bullets, not walls of text.
## Self-review checklist
Append a checklist the author can tick before requesting review:
 
- [ ] Changes are limited to the stated scope
- [ ] Tests added/updated and passing
- [ ] No debug code, secrets, or commented-out blocks left in
- [ ] Docs / comments updated where behavior changed
- [ ] Breaking changes and migrations documented above
## Output
Present the title and description in a single code block ready to paste into the
PR form. If the user asks to open it directly use `git push -u origin feature-branch-name`.
 
## Example
Title:
 
feat(auth): add rate limiting to login endpoint
 
Body:
 
### Summary
Protects the login endpoint from credential-stuffing by limiting attempts per
IP. Repeated failures now back off instead of hitting the auth service on every
try.
 
### Changes
- Add a sliding-window rate limiter (5 attempts / 15 min per IP)
- Return `429` with `Retry-After` when the limit is exceeded
- Emit a `login.rate_limited` metric for monitoring
### Testing
- Unit tests for the limiter window and reset behavior
- Manually verified `429` + `Retry-After` via repeated curl requests
### Related
Closes #482
 
### Notes for reviewers
The window is in-memory for now; a follow-up will move it to Redis for
multi-instance deployments.
 
- [ ] Changes are limited to the stated scope
- [ ] Tests added/updated and passing
- [ ] No debug code, secrets, or commented-out blocks left in
- [ ] Docs / comments updated where behavior changed
- [ ] Breaking changes and migrations documented above
 