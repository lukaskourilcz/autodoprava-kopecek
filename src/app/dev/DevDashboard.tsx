"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import {
  Save,
  Undo2,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  LogOut,
  Type,
  Bus,
  Info,
  X,
  Check,
} from "lucide-react";
import { DEFAULT_LOCALE } from "@/lib/locale";
import { useDev } from "./DevContext";
import { ToolButton } from "./ui";
import { TextsEditor } from "./TextsEditor";
import { VehiclesEditor } from "./VehiclesEditor";

type Tab = "texts" | "vehicles";

const TIP_KEY = "autodoprava:dev-tip-dismissed";

function Divider() {
  return <span className="mx-1 hidden h-7 w-px bg-gray-200 sm:block" aria-hidden="true" />;
}

export function DevDashboard({ onLock }: { onLock: () => void }) {
  const { content, dirty, lastError, save, discard, resetToDefaults, exportJson, importJson } =
    useDev();
  const [tab, setTab] = useState<Tab>("texts");
  const [justSaved, setJustSaved] = useState(false);
  const [tipHidden, setTipHidden] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(TIP_KEY) === "1"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const result = save();
    if (result.ok) {
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 2500);
    }
  };

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

  const dismissTip = () => {
    setTipHidden(true);
    try {
      sessionStorage.setItem(TIP_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const tabs: { value: Tab; label: string; Icon: typeof Type; count?: number }[] = [
    { value: "texts", label: "Texty", Icon: Type },
    { value: "vehicles", label: "Vozový park", Icon: Bus, count: content.vehicles.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3 py-3">
            <div className="mr-auto flex items-center gap-2.5">
              <Image
                src="/pics/logo-black-footer.png"
                alt=""
                width={120}
                height={120}
                className="h-7 w-auto object-contain"
              />
              <div className="leading-tight">
                <h1 className="text-base font-bold text-gray-900">Editor obsahu</h1>
                <span className="flex items-center gap-1.5 text-xs font-medium">
                  {dirty ? (
                    <span className="flex items-center gap-1.5 text-amber-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Neuložené změny
                    </span>
                  ) : justSaved ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" /> Uloženo
                    </span>
                  ) : (
                    <span className="text-gray-400">Vše uloženo</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <ToolButton tone="primary" onClick={handleSave} disabled={!dirty} title="Uložit změny">
                <Save className="h-4 w-4" aria-hidden="true" /> Uložit
              </ToolButton>
              <ToolButton onClick={discard} disabled={!dirty} title="Zahodit neuložené změny">
                <Undo2 className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Zahodit</span>
              </ToolButton>

              <Divider />

              <ToolButton onClick={exportJson} title="Stáhnout obsah jako soubor">
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Export</span>
              </ToolButton>
              <ToolButton onClick={() => fileInputRef.current?.click()} title="Načíst obsah ze souboru">
                <Upload className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Import</span>
              </ToolButton>

              <Divider />

              <ToolButton tone="danger" onClick={handleReset} title="Obnovit původní obsah">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Obnovit</span>
              </ToolButton>
              <a
                href={`/${DEFAULT_LOCALE}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Otevřít web v novém panelu"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-ring"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Web</span>
              </a>
              <ToolButton tone="ghost" onClick={onLock} title="Zamknout editor">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Zamknout</span>
              </ToolButton>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleImportFile}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex gap-1.5 pb-3">
            <div className="inline-flex rounded-xl bg-gray-100 p-1">
              {tabs.map(({ value, label, Icon, count }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  aria-current={tab === value}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all focus-ring ${
                    tab === value
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                  {count !== undefined && (
                    <span
                      className={`rounded-full px-1.5 text-xs font-semibold ${
                        tab === value
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {lastError && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            {lastError}
          </p>
        )}

        {!tipHidden && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm ring-1 ring-gray-200">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 ring-1 ring-yellow-200">
              <Info className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="flex-1 leading-relaxed">
              Změny se po uložení projeví na webu v tomto prohlížeči. Tlačítkem{" "}
              <strong className="font-semibold text-gray-800">Export</strong> stáhnete
              soubor, který lze uložit do kódu webu a zveřejnit změny pro všechny
              návštěvníky.
            </p>
            <button
              type="button"
              onClick={dismissTip}
              aria-label="Skrýt tip"
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-ring"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <div key={tab} className="motion-safe:animate-fade-in">
          {tab === "texts" ? <TextsEditor /> : <VehiclesEditor />}
        </div>
      </main>
    </div>
  );
}
