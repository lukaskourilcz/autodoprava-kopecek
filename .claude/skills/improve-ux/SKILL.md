---
name: improve-ux
description: Implement UX/UI improvements in the autodoprava-kopecek site. Use when the user asks to "improve the UX", "polish the UI", "make page X nicer", "fix the mobile menu", or similar implementation requests. Drives the ui-improver agent against a concrete target.
---

# Improve UX

This skill turns a UX request into one or more focused code changes.

## Steps

1. **Clarify the target.** If the request is vague ("make it nicer"), use `AskUserQuestion` to pin down:
   - which page or component
   - what specifically feels off (copy, layout, mobile, contrast, navigation, …)
   - whether there are visual references
   Do not start editing until the target is concrete.
2. **Quick reconnaissance.** Read the affected page/component and any shared layout it depends on (`src/app/layout.tsx`, `src/app/components/Navbar.tsx`, `src/lib/i18n.tsx`). Note the existing patterns before changing anything.
3. **Plan the change** in 2–4 bullets and share it with the user before editing if the change spans multiple files or alters layout.
4. **Dispatch `ui-improver`** with a self-contained brief: file paths, the desired user-visible outcome, accessibility requirements, and any constraints (don't change Y, keep API Z stable).
5. **Verify.** After the agent returns, run:
   - `yarn lint`
   - `yarn build`
   Surface any failures back to the agent for a fix.
6. **Summarize** the changes in 3–6 bullets with `file:line` references and end-of-turn next steps.

## Guardrails

- All visible text must use `t('...')` and have entries in both `cs` and `en` translation bundles.
- Never replace `<a>` with `<button>` (or vice versa) without checking semantics.
- Don't introduce a new dependency unless the user explicitly approves it.
- Don't commit or push unless the user asks.
