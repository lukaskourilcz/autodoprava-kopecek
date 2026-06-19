"use client";

import { Check } from "lucide-react";
import { FEATURE_KEYS, type FeatureKey } from "@/content/types";
import { FEATURE_ICONS } from "../components/icons";
import { useDev } from "./DevContext";
import { LocaleFields } from "./ui";
import { ImageManager } from "./ImageManager";

export function VehicleForm({ vehicleId }: { vehicleId: string }) {
  const { content, update } = useDev();
  const vehicle = content.vehicles.find((item) => item.id === vehicleId);
  if (!vehicle) return null;

  const featureLabels = content.texts.cs.fleet.features;

  const toggleFeature = (feature: FeatureKey) =>
    update((draft) => {
      const target = draft.vehicles.find((item) => item.id === vehicleId);
      if (!target) return;
      const selected = new Set(target.features);
      if (selected.has(feature)) selected.delete(feature);
      else selected.add(feature);
      // Keep the canonical order so badges always render consistently.
      target.features = FEATURE_KEYS.filter((key) => selected.has(key));
    });

  return (
    <div className="space-y-6">
      <LocaleFields
        label="Název"
        getValue={(locale) => vehicle.name[locale]}
        onChange={(locale, value) =>
          update((draft) => {
            const target = draft.vehicles.find((item) => item.id === vehicleId);
            if (target) target.name[locale] = value;
          })
        }
      />

      <LocaleFields
        label="Popis"
        multiline
        getValue={(locale) => vehicle.description[locale]}
        onChange={(locale, value) =>
          update((draft) => {
            const target = draft.vehicles.find((item) => item.id === vehicleId);
            if (target) target.description[locale] = value;
          })
        }
      />

      <div>
        <span className="mb-2 block text-sm font-semibold text-gray-700">Vybavení</span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_KEYS.map((feature) => {
            const Icon = FEATURE_ICONS[feature];
            const checked = vehicle.features.includes(feature);
            return (
              <label
                key={feature}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all focus-within:ring-2 focus-within:ring-yellow-400 ${
                  checked
                    ? "border-yellow-400 bg-yellow-50 text-gray-900 ring-1 ring-yellow-300"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFeature(feature)}
                  className="sr-only"
                />
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md transition-colors ${
                    checked ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="mr-auto">{featureLabels[feature]}</span>
                {checked && <Check className="h-4 w-4 flex-shrink-0 text-yellow-600" aria-hidden="true" />}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm font-semibold text-gray-700">Fotografie</span>
        <ImageManager vehicleId={vehicleId} />
      </div>
    </div>
  );
}
