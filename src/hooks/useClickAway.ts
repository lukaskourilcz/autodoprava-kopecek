"use client";

import { useEffect, type RefObject } from "react";

/** Call `onAway` when a pointer press lands outside `ref`. Used to close popovers and menus. */
export function useClickAway<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onAway: () => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onAway();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [ref, onAway, active]);
}
