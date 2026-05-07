---
name: accessibility-check
description: Audit the autodoprava-kopecek site against WCAG 2.1 AA. Checks semantics, keyboard navigation, focus management, color contrast, alt text, ARIA usage, and form labelling. Use when the user asks about "accessibility", "a11y", "WCAG", "screen reader", or "keyboard navigation".
---

# Accessibility check

Targeted accessibility review — narrower than the full UX audit, deeper on a11y specifics.

## Checklist

1. **Semantics**
   - One `<h1>` per page, headings descend without skipping levels.
   - `<nav>`, `<main>`, `<footer>`, `<header>` landmarks present.
   - Buttons used for actions, anchors for navigation; no `<div onClick>`.
2. **Images**
   - Every `<Image>` / `<img>` has meaningful `alt`, decorative images use `alt=""`.
   - SVG icons have `aria-hidden="true"` when decorative or `<title>` when meaningful.
3. **Keyboard**
   - All interactive elements reachable via Tab in a logical order.
   - Visible focus indicator (Tailwind `focus-visible:ring-*`).
   - Skip-to-content link if the nav is long.
   - Mobile menu can be opened, navigated, and dismissed with keyboard (Esc).
4. **Forms** (if any)
   - Every input has an associated `<label>` or `aria-label`.
   - Error messages linked via `aria-describedby` and announced.
   - `autocomplete` attributes for name/tel/email.
5. **Color & contrast**
   - Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI components).
   - Information not conveyed by color alone.
6. **Motion & timing**
   - `prefers-reduced-motion` respected for any animations/transitions.
7. **Language**
   - `<html lang>` reflects the active locale; `lang` attribute on inline language switches.
8. **Live regions**
   - Toasts/alerts use `role="status"` or `role="alert"` as appropriate.

## Process

1. Read `src/app/layout.tsx` and each `page.tsx` to map landmarks and headings.
2. Read `src/app/components/Navbar.tsx` carefully — it's the most a11y-sensitive component.
3. Inspect Tailwind classes for focus styles and contrast.
4. Check `src/lib/i18n.tsx` and `src/app/middleware.ts` to confirm `<html lang>` is set per locale.

## Output

```
## A11y summary
<overall pass/fail per WCAG SC bucket>

## Blockers (WCAG A failures)
- [file:line] <issue> — <SC reference> — <fix>

## High (WCAG AA failures)
...

## Recommended (AAA / best practice)
...
```

After delivering, ask if the user wants `ui-improver` to address specific items.
