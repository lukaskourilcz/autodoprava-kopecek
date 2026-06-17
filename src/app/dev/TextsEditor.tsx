"use client";

import { Plus, Trash2 } from "lucide-react";
import { SUPPORTED_LOCALES } from "@/lib/locale";
import type { SiteTexts } from "@/content/types";
import {
  getAtPath,
  setAtPath,
  blankLike,
  humanizeKey,
  type PathSegment,
} from "@/content/text-paths";
import { useDev } from "./DevContext";
import { LocaleFields, ToolButton } from "./ui";

// `sample` is the Czech value at this path; it defines the shape (string,
// list, or group) while the actual values are read/written per language.
function TextNode({
  sample,
  path,
  label,
}: {
  sample: unknown;
  path: PathSegment[];
  label: string;
}) {
  const { content, update } = useDev();

  if (typeof sample === "string") {
    return (
      <LocaleFields
        label={label}
        multiline={sample.length > 60}
        getValue={(locale) => String(getAtPath(content.texts[locale], path) ?? "")}
        onChange={(locale, value) =>
          update((draft) => setAtPath(draft.texts[locale], path, value))
        }
      />
    );
  }

  if (Array.isArray(sample)) {
    const addItem = () =>
      update((draft) => {
        for (const locale of SUPPORTED_LOCALES) {
          const list = getAtPath(draft.texts[locale], path) as unknown[];
          list.push(blankLike(list[0] ?? ""));
        }
      });
    const removeItem = (index: number) =>
      update((draft) => {
        for (const locale of SUPPORTED_LOCALES) {
          (getAtPath(draft.texts[locale], path) as unknown[]).splice(index, 1);
        }
      });

    return (
      <fieldset className="space-y-3 rounded-lg border border-gray-200 p-3">
        <legend className="px-1 text-sm font-semibold text-gray-700">{label}</legend>
        {sample.map((item, index) => (
          <div key={index} className="space-y-2 rounded-md bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                {label} {index + 1}
              </span>
              <ToolButton tone="danger" onClick={() => removeItem(index)} title="Odebrat">
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
            </div>
            <TextNode sample={item} path={[...path, index]} label={`${label} ${index + 1}`} />
          </div>
        ))}
        <ToolButton onClick={addItem}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Přidat
        </ToolButton>
      </fieldset>
    );
  }

  if (sample && typeof sample === "object") {
    return (
      <fieldset className="space-y-4 rounded-lg border border-gray-200 p-3">
        <legend className="px-1 text-sm font-semibold text-gray-700">{label}</legend>
        {Object.entries(sample)
          .filter(([key]) => key !== "icon")
          .map(([key, value]) => (
            <TextNode
              key={key}
              sample={value}
              path={[...path, key]}
              label={humanizeKey(key)}
            />
          ))}
      </fieldset>
    );
  }

  return null;
}

export function TextsEditor() {
  const { content } = useDev();
  const sections = Object.keys(content.texts.cs) as (keyof SiteTexts)[];

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <details key={section} className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
          <summary className="cursor-pointer px-4 py-3 font-semibold text-gray-900">
            {humanizeKey(section)}
          </summary>
          <div className="space-y-4 border-t border-gray-100 p-4">
            {Object.entries(content.texts.cs[section])
              .filter(([key]) => key !== "icon")
              .map(([key, value]) => (
                <TextNode
                  key={key}
                  sample={value}
                  path={[section, key]}
                  label={humanizeKey(key)}
                />
              ))}
          </div>
        </details>
      ))}
    </div>
  );
}
