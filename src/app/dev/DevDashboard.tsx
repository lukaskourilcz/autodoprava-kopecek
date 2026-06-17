"use client";

import { useRef, useState, type ChangeEvent } from "react";
import {
  Save,
  Undo2,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { DEFAULT_LOCALE } from "@/lib/locale";
import { useDev } from "./DevContext";
import { ToolButton } from "./ui";
import { TextsEditor } from "./TextsEditor";
import { VehiclesEditor } from "./VehiclesEditor";

type Tab = "texts" | "vehicles";

export function DevDashboard({ onLock }: { onLock: () => void }) {
  const { dirty, lastError, save, discard, resetToDefaults, exportJson, importJson } =
    useDev();
  const [tab, setTab] = useState<Tab>("texts");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) file.text().then(importJson);
    event.target.value = "";
  };

  const handleReset = () => {
    if (window.confirm("Opravdu zahodit všechny úpravy a obnovit původní obsah?")) {
      resetToDefaults();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
          <h1 className="mr-auto text-lg font-bold text-gray-900">
            Editor obsahu
            {dirty && (
              <span className="ml-2 align-middle rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                neuložené změny
              </span>
            )}
          </h1>

          <ToolButton tone="primary" onClick={save} disabled={!dirty} title="Uložit změny">
            <Save className="h-4 w-4" aria-hidden="true" /> Uložit
          </ToolButton>
          <ToolButton onClick={discard} disabled={!dirty} title="Zahodit neuložené změny">
            <Undo2 className="h-4 w-4" aria-hidden="true" /> Zahodit
          </ToolButton>
          <ToolButton onClick={exportJson} title="Stáhnout obsah jako soubor">
            <Download className="h-4 w-4" aria-hidden="true" /> Export
          </ToolButton>
          <ToolButton onClick={() => fileInputRef.current?.click()} title="Načíst obsah ze souboru">
            <Upload className="h-4 w-4" aria-hidden="true" /> Import
          </ToolButton>
          <ToolButton tone="danger" onClick={handleReset} title="Obnovit původní obsah">
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Obnovit
          </ToolButton>
          <a
            href={`/${DEFAULT_LOCALE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 focus-ring"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Web
          </a>
          <ToolButton tone="ghost" onClick={onLock} title="Zamknout editor">
            <LogOut className="h-4 w-4" aria-hidden="true" /> Zamknout
          </ToolButton>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>

        <div className="mx-auto flex max-w-5xl gap-1 px-4">
          {(["texts", "vehicles"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors focus-ring ${
                tab === value
                  ? "border-yellow-500 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {value === "texts" ? "Texty" : "Vozový park"}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {lastError && (
          <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            {lastError}
          </p>
        )}
        <p className="mb-6 text-sm text-gray-500">
          Změny se po uložení projeví na webu v tomto prohlížeči. Tlačítkem
          „Export“ stáhnete soubor, který lze uložit do kódu webu a zveřejnit tak
          změny pro všechny návštěvníky.
        </p>
        {tab === "texts" ? <TextsEditor /> : <VehiclesEditor />}
      </main>
    </div>
  );
}
