"use client";

import { SUPPORTED_LOCALES } from "@/lib/locale";
import { FEATURE_KEYS, type FeatureKey, type LocalizedText } from "@/content/types";
import { useDev } from "./DevContext";
import { LocaleFields } from "./ui";
import { ImageManager } from "./ImageManager";

function emptyLocalizedText(): LocalizedText {
  return Object.fromEntries(SUPPORTED_LOCALES.map((locale) => [locale, ""])) as LocalizedText;
}

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

      <div>
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
        <p className="mt-1.5 text-xs text-gray-500">
          Tip: část textu zvýrazníte tučně pomocí značek &lt;b&gt;…&lt;/b&gt;, např.
          „autobus s &lt;b&gt;kapacitou 51 míst&lt;/b&gt;“.
        </p>
      </div>

      <div>
        <LocaleFields
          label="Kapacita (štítek na fotce)"
          getValue={(locale) => vehicle.capacity?.[locale] ?? ""}
          onChange={(locale, value) =>
            update((draft) => {
              const target = draft.vehicles.find((item) => item.id === vehicleId);
              if (!target) return;
              if (!target.capacity) target.capacity = emptyLocalizedText();
              target.capacity[locale] = value;
            })
          }
        />
        <p className="mt-1.5 text-xs text-gray-500">
          Krátký štítek zobrazený v rohu fotografie, např. „51 míst“. Necháte-li
          prázdné, štítek se nezobrazí.
        </p>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700">Vybavení</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {FEATURE_KEYS.map((feature) => (
            <label
              key={feature}
              className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={vehicle.features.includes(feature)}
                onChange={() => toggleFeature(feature)}
                className="h-4 w-4 accent-yellow-500"
              />
              {featureLabels[feature]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700">Fotografie</span>
        <ImageManager vehicleId={vehicleId} />
      </div>
    </div>
  );
}
