/** Replace `{{name}}` placeholders in a string, e.g. interpolate(footer, { year: 2026 }). */
export function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : ""
  );
}
