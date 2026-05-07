# Claude Code config — autodoprava-kopecek

Project-scoped agents and skills for improving and auditing this Next.js 15 marketing site.

## Agents (`.claude/agents/`)

| Agent | Purpose | Writes code? |
| --- | --- | --- |
| `ux-auditor` | Finds UX, navigation, copy, i18n, and content issues | No |
| `security-auditor` | Headers, CSP, secrets, deps, middleware review | No |
| `performance-auditor` | Images, fonts, bundle size, Core Web Vitals | No |
| `ui-improver` | Implements specific UX/a11y fixes | Yes |

## Skills (`.claude/skills/`)

| Skill | When to use |
| --- | --- |
| `audit-app` | "audit the app" — runs all three auditors in parallel and consolidates |
| `improve-ux` | "improve the UX of page X" — drives `ui-improver` against a concrete target |
| `accessibility-check` | "check a11y / WCAG compliance" — targeted accessibility review |

## Typical flow

1. Run the `audit-app` skill to get a prioritized punch list.
2. Pick the findings to fix.
3. Run `improve-ux` (or invoke `ui-improver` directly) for each fix.
4. Re-run individual auditors to confirm the regression is gone.
