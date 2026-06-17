"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/content/types";
import {
  useSiteContent,
  saveContent,
  resetContent,
  importContent,
} from "@/content/store";

type DevApi = {
  /** The working copy being edited (not yet saved to the live site). */
  content: SiteContent;
  /** True when the draft has unsaved changes. */
  dirty: boolean;
  lastError: string | null;
  /** Apply an immutable edit by mutating a fresh copy of the draft. */
  update: (mutator: (draft: SiteContent) => void) => void;
  save: () => void;
  discard: () => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (json: string) => void;
};

const DevContext = createContext<DevApi | null>(null);

function downloadJson(json: string) {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "autodoprava-content.json";
  link.click();
  URL.revokeObjectURL(url);
}

export function DevProvider({ children }: { children: ReactNode }) {
  const stored = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(stored);
  const [dirty, setDirty] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  // Adopt the live content (first localStorage read, reset, import) until the
  // owner starts editing; once dirty, keep their in-progress draft.
  useEffect(() => {
    if (!dirty) setDraft(stored);
  }, [stored, dirty]);

  const update: DevApi["update"] = (mutator) => {
    setDraft((previous) => {
      const next = structuredClone(previous);
      mutator(next);
      return next;
    });
    setDirty(true);
  };

  const save = () => {
    const result = saveContent(draft);
    setLastError(result.ok ? null : result.error ?? "Uložení se nezdařilo.");
    setDirty(false);
  };

  const discard = () => {
    setDraft(stored);
    setDirty(false);
    setLastError(null);
  };

  const resetToDefaults = () => {
    resetContent();
    setDirty(false);
    setLastError(null);
  };

  const importJson = (json: string) => {
    if (importContent(json)) {
      setDirty(false);
      setLastError(null);
    } else {
      setLastError("Soubor se nepodařilo načíst – zkontrolujte, že je to platný export.");
    }
  };

  return (
    <DevContext.Provider
      value={{
        content: draft,
        dirty,
        lastError,
        update,
        save,
        discard,
        resetToDefaults,
        exportJson: () => downloadJson(JSON.stringify(draft, null, 2)),
        importJson,
      }}
    >
      {children}
    </DevContext.Provider>
  );
}

export function useDev(): DevApi {
  const context = useContext(DevContext);
  if (!context) throw new Error("useDev must be used inside <DevProvider>.");
  return context;
}
