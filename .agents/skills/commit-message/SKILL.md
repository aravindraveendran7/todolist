---
name: commit-message
description: >
  Generate a commit message from staged git changes following Conventional
  Commits. Use whenever the user asks to write, generate, or improve a commit
  message, or mentions "commit msg", staged changes, or `git commit`. Reads the
  staged diff, infers type and scope, and writes a subject plus body. Do NOT use
  for writing PR descriptions or changelogs.
---
# Commit Message
## Overview
Turn staged changes into a well-formed Conventional Commits message.
## Steps
1. Run `git diff --staged` to read the staged changes. If nothing is staged,
   tell the user to stage files first (or offer to run `git add`).
2. Infer the **type**: feat, fix, docs, style, refactor, perf, test, build,
   ci, chore, revert.
3. Infer an optional **scope** from the touched paths/module.
4. Write the message in this format:
   <type>(<scope>): <subject>
   <body>
   <footer>
## Rules
- Subject: imperative mood ("add", not "added"), <= 50 chars, no trailing period.
- Separate subject and body with one blank line.
- Body: wrap at 72 chars. Explain *what* and *why*, not *how*. Omit if the
  change is trivial and self-explanatory.
- Breaking changes: add `!` after type/scope AND a `BREAKING CHANGE:` footer.
- Reference issues in the footer (`Closes #123`) only if the diff or user
  mentions one — never invent issue numbers.
- If the diff spans unrelated concerns, warn the user it should be split into
  multiple commits rather than forcing one message.
## Output
Present the final message in a code block ready to paste. Do not run
`git commit` unless the user explicitly asks.
## Example
Input: staged change adding retry logic to the API client.
feat(api-client): add exponential backoff on 5xx responses
Transient upstream errors were failing requests immediately. Retry up to
3 times with exponential backoff to improve resilience.
Closes #214