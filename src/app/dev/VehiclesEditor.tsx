"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, Pencil } from "lucide-react";
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
    capacity: emptyLocalizedText(),
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
      {content.vehicles.map((vehicle, index) => {
        const isExpanded = expandedId === vehicle.id;
        return (
          <div key={vehicle.id} className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-3 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- supports uploaded data URLs */}
              <img
                src={vehicle.images[0] || "/favicon.png"}
                alt=""
                className="h-12 w-12 flex-shrink-0 rounded-md object-cover ring-1 ring-gray-200"
              />
              <span className="mr-auto font-medium text-gray-900">
                {vehicle.name.cs || "Nové vozidlo"}
              </span>
              <ToolButton
                tone="ghost"
                onClick={() => moveVehicle(index, -1)}
                disabled={index === 0}
                title="Posunout nahoru"
              >
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
              <ToolButton
                tone="ghost"
                onClick={() => moveVehicle(index, 1)}
                disabled={index === content.vehicles.length - 1}
                title="Posunout dolů"
              >
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
              <ToolButton
                onClick={() => setExpandedId(isExpanded ? null : vehicle.id)}
                title="Upravit"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
                {isExpanded ? "Hotovo" : "Upravit"}
              </ToolButton>
              <ToolButton tone="danger" onClick={() => removeVehicle(vehicle)} title="Smazat">
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </ToolButton>
            </div>
            {isExpanded && (
              <div className="border-t border-gray-100 p-4">
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
