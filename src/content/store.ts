"use client";

import { useSyncExternalStore } from "react";
import { defaultContent } from "./defaults";
import type { SiteContent } from "./types";

// A tiny global store for the site's editable content.
//
// - The server and the first client render always use `defaultContent`, so the
//   HTML is identical on both sides (no hydration mismatch, good for SEO).
// - After mount we read any saved edits from localStorage and notify React,
//   which re-renders with the owner's content.
// - The /dev editor writes through the same store, so edits show up live on
//   every open tab.

const STORAGE_KEY = "autodoprava:content";

let current: SiteContent = defaultContent;
let hydrated = false;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

/** Recursively overlay saved values onto the defaults, keeping the default shape. */
function mergeTexts<T>(base: T, override: unknown): T {
  if (
    base &&
    typeof base === "object" &&
    !Array.isArray(base) &&
    override &&
    typeof override === "object"
  ) {
    const result = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(result)) {
      result[key] = mergeTexts(
        result[key],
        (override as Record<string, unknown>)[key]
      );
    }
    return result as T;
  }
  // Arrays and primitives: a saved value wins outright.
  return override === undefined ? base : (override as T);
}

/** Build a valid SiteContent from whatever was saved, falling back to defaults. */
function fromSaved(saved: unknown): SiteContent {
  if (!saved || typeof saved !== "object") return defaultContent;
  const data = saved as Partial<SiteContent>;
  return {
    texts: mergeTexts(defaultContent.texts, data.texts),
    vehicles: Array.isArray(data.vehicles) ? data.vehicles : defaultContent.vehicles,
    images: mergeTexts(defaultContent.images, data.images),
  };
}

function readStorage(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? fromSaved(JSON.parse(raw)) : defaultContent;
  } catch {
    return defaultContent;
  }
}

function hydrateOnce() {
  if (hydrated) return;
  hydrated = true;
  current = readStorage();
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      current = readStorage();
      notify();
    }
  });
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  hydrateOnce();
  return () => listeners.delete(listener);
}

/** Read the active site content. Safe to call from server and client components. */
export function useSiteContent(): SiteContent {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => defaultContent
  );
}

/**
 * Persist new content and update every subscriber. The in-memory copy is always
 * updated so the live preview reflects the change; if writing to localStorage
 * fails (e.g. quota exceeded by large uploaded photos) the returned error lets
 * the editor warn the owner that the change won't survive a reload.
 */
export function saveContent(next: SiteContent): { ok: boolean; error?: string } {
  current = next;
  notify();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Změna se zobrazuje, ale nepodařilo se ji uložit do prohlížeče (úložiště je plné). Zmenšete fotografie nebo použijte odkazy na obrázky.",
    };
  }
}

/** Forget all saved edits and return to the content shipped with the site. */
export function resetContent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  current = defaultContent;
  notify();
}

/** Load content from an exported JSON string. Returns false if it can't be parsed. */
export function importContent(json: string): boolean {
  try {
    saveContent(fromSaved(JSON.parse(json)));
    return true;
  } catch {
    return false;
  }
}
