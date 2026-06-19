"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Pencil,
  Check,
  Image as ImageIcon,
  Settings,
  Bus,
} from "lucide-react";
import { SUPPORTED_LOCALES } from "@/lib/locale";
import type { LocalizedText, Vehicle } from "@/content/types";
import { useDev } from "./DevContext";
import { ToolButton } from "./ui";
import { VehicleForm } from "./VehicleForm";

function emptyLocalizedText(): LocalizedText {
  return Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, ""])) as LocalizedText;
}

function createVehicle(): Vehicle {
  return {
    id: `vehicle-${Date.now()}`,
    name: emptyLocalizedText(),
    description: emptyLocalizedText(),
    images: [],
    features: [],
  };
}

export function VehiclesEditor() {
  const { content, update } = useDev();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const moveVehicle = (index: number, direction: -1 | 1) =>
    update((draft) => {
      const target = index + direction;
      if (target < 0 || target >= draft.vehicles.length) return;
      [draft.vehicles[index], draft.vehicles[target]] = [
        draft.vehicles[target],
        draft.vehicles[index],
      ];
    });

  const removeVehicle = (vehicle: Vehicle) => {
    const label = vehicle.name.cs || "vozidlo";
    if (window.confirm(`Opravdu smazat „${label}“?`)) {
      update((draft) => {
        draft.vehicles = draft.vehicles.filter((item) => item.id !== vehicle.id);
      });
    }
  };

  const addVehicle = () => {
    const vehicle = createVehicle();
    update((draft) => {
      draft.vehicles.push(vehicle);
    });
    setExpandedId(vehicle.id);
  };

  return (
    <div className="space-y-3">
      {content.vehicles.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Bus className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-sm text-gray-500">Zatím žádná vozidla. Přidejte první.</p>
        </div>
      )}

      {content.vehicles.map((vehicle, index) => {
        const isExpanded = expandedId === vehicle.id;
        return (
          <div
            key={vehicle.id}
            className={`overflow-hidden rounded-xl bg-white shadow-sm ring-1 transition-shadow hover:shadow-md ${
              isExpanded ? "ring-yellow-300" : "ring-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- supports uploaded data URLs */}
              <img
                src={vehicle.images[0] || "/favicon.png"}
                alt=""
                className="h-14 w-14 flex-shrink-0 rounded-lg object-cover ring-1 ring-gray-200"
              />
              <div className="mr-auto min-w-0">
                <span className="block truncate font-semibold text-gray-900">
                  {vehicle.name.cs || "Nové vozidlo"}
                </span>
                <span className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" /> {vehicle.images.length}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Settings className="h-3.5 w-3.5" aria-hidden="true" /> {vehicle.features.length}
                  </span>
                </span>
              </div>

              <ToolButton
                tone="ghost"
                onClick={() => moveVehicle(index, -1)}
                disabled={index === 0}
                title="Posunout nahoru"
                aria-label="Posunout nahoru"
              >
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
              <ToolButton
                tone="ghost"
                onClick={() => moveVehicle(index, 1)}
                disabled={index === content.vehicles.length - 1}
                title="Posunout dolů"
                aria-label="Posunout dolů"
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
              <ToolButton
                tone={isExpanded ? "primary" : "default"}
                onClick={() => setExpandedId(isExpanded ? null : vehicle.id)}
                title="Upravit"
              >
                {isExpanded ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">{isExpanded ? "Hotovo" : "Upravit"}</span>
              </ToolButton>
              <ToolButton
                tone="danger"
                onClick={() => removeVehicle(vehicle)}
                title="Smazat"
                aria-label="Smazat"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
            </div>
            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50/60 p-4 sm:p-5 motion-safe:animate-fade-in">
                <VehicleForm vehicleId={vehicle.id} />
              </div>
            )}
          </div>
        );
      })}

      <ToolButton tone="primary" onClick={addVehicle}>
        <Plus className="h-4 w-4" aria-hidden="true" /> Přidat vozidlo
      </ToolButton>
    </div>
  );
}
