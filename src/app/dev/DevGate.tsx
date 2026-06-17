"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { Button } from "../components/ui/Button";

// Soft, client-side gate. The password lives in the bundle, so this keeps the
// editor out of sight — it is not real security. Anything sensitive would need
// a server check.
const DEV_PASSWORD = "autobus";

export function DevGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value === DEV_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-8 text-center"
      >
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 ring-1 ring-yellow-200">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold text-gray-900">Editor obsahu</h1>
        <p className="mt-1 mb-6 text-sm text-gray-500">
          Zadejte heslo pro úpravu webu.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          aria-label="Heslo"
          aria-invalid={error}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-gray-900 focus-ring"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">Nesprávné heslo.</p>
        )}
        <div className="mt-6">
          <Button type="submit" className="w-full">
            Odemknout
          </Button>
        </div>
      </form>
    </main>
  );
}
