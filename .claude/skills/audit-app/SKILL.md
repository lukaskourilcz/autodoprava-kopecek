---
name: audit-app
description: Run a full audit of the autodoprava-kopecek site — UX, security, and performance — by dispatching the three auditor agents in parallel and consolidating their findings. Use when the user asks to "audit the app", "review the site", "find issues", "check for problems", or similar broad sweeps.
---

# Full-app audit

This skill orchestrates the three auditor agents and merges their reports into a single prioritized punch list.

## Steps

1. **Sanity check the workspace.** Run `git status` and `yarn install --frozen-lockfile` (skip install if `node_modules/` is already present). If installs fail, surface the error and stop.
2. **Dispatch auditors in parallel.** Send a single message with three Agent calls:
   - `ux-auditor` — UX, navigation, content, i18n coverage
   - `security-auditor` — headers, secrets, CSP, dependency audit
   - `performance-auditor` — images, bundle, Core Web Vitals risks
   Each agent reads files and runs read-only commands; they do not modify code.
3. **Wait for all three to return**, then consolidate.

## Consolidation format

Produce one report with this structure:

```
# Audit report — <date>

## Top fixes (do these first)
1. <highest-leverage finding from any auditor> — <file:line>
2. ...
3. ...
(max 5)

## UX findings
<verbatim or compressed from ux-auditor, by severity>

## Security findings
<from security-auditor>

## Performance findings
<from performance-auditor>

## Cross-cutting themes
<2–4 bullets where multiple auditors flagged related issues>
```

## After delivering the report

Ask the user which findings to fix, then dispatch `ui-improver` (or apply edits directly) for the chosen items. Do not start fixing without confirmation — audits are advisory.

## Notes

- If `yarn build` fails during the perf audit, treat that as a Blocker in the report.
- Don't run `npm audit fix` or any auto-remediation as part of the audit; remediation is a separate step the user authorizes.
