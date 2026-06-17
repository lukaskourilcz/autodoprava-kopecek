"use client";

import { useEffect, useState } from "react";
import { DevProvider } from "./DevContext";
import { DevGate } from "./DevGate";
import { DevDashboard } from "./DevDashboard";

const SESSION_KEY = "autodoprava:dev-unlocked";

export default function DevApp() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  // Read the unlock flag after mount so the server and first client render match.
  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!unlocked) {
    return (
      <DevGate
        onUnlock={() => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setUnlocked(true);
        }}
      />
    );
  }

  return (
    <DevProvider>
      <DevDashboard
        onLock={() => {
          sessionStorage.removeItem(SESSION_KEY);
          setUnlocked(false);
        }}
      />
    </DevProvider>
  );
}
