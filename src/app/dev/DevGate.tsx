"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { DEFAULT_LOCALE } from "@/lib/locale";
import { Button } from "../components/ui/Button";
import { fieldClasses } from "./ui";

// Soft, client-side gate. The password lives in the bundle, so this keeps the
// editor out of sight — it is not real security. Anything sensitive would need
// a server check.
const DEV_PASSWORD = "autobus";

export function DevGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white/95 p-8 text-center shadow-2xl ring-1 ring-black/5 backdrop-blur motion-safe:animate-fade-up"
      >
        <Image
          src="/pics/logo-black-footer.png"
          alt="Autodoprava Kopeček"
          width={160}
          height={160}
          className="mx-auto mb-6 h-10 w-auto object-contain"
          priority
        />

        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 ring-1 ring-yellow-200">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold text-gray-900">Editor obsahu</h1>
        <p className="mb-6 mt-1 text-sm text-gray-500">
          Zadejte heslo pro úpravu webu.
        </p>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            autoFocus
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError(false);
            }}
            aria-label="Heslo"
            aria-invalid={error}
            className={`${fieldClasses} pr-11 text-center ${
              error ? "border-red-400 focus:border-red-400" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShow((value) => !value)}
            aria-label={show ? "Skrýt heslo" : "Zobrazit heslo"}
            className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-gray-600 focus-ring"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 motion-safe:animate-fade-in" role="alert">
            Nesprávné heslo.
          </p>
        )}

        <div className="mt-6">
          <Button type="submit" className="w-full">
            Odemknout
          </Button>
        </div>

        <Link
          href={`/${DEFAULT_LOCALE}`}
          className="mt-5 inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm text-gray-400 transition-colors hover:text-gray-600 focus-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zpět na web
        </Link>
      </form>
    </main>
  );
}
