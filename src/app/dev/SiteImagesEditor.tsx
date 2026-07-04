"use client";

import type { ReactNode } from "react";
import type { SiteImages } from "@/content/types";
import { useDev } from "./DevContext";
import { ImageListEditor } from "./ImageManager";

function Group({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <details open className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
      <summary className="cursor-pointer px-4 py-3 font-semibold text-gray-900">
        {title}
      </summary>
      <div className="space-y-4 border-t border-gray-100 p-4">
        <p className="text-sm text-gray-500">{hint}</p>
        {children}
      </div>
    </details>
  );
}

/** Editor for the photos of the fixed page sections (hero, services, about). */
export function SiteImagesEditor() {
  const { content, update } = useDev();

  const editList = (key: "hero" | "about") => (mutator: (list: string[]) => void) =>
    update((draft) => mutator(draft.images[key]));

  const editTile =
    (key: keyof SiteImages["services"]) => (mutator: (list: string[]) => void) =>
      update((draft) => {
        const list = [draft.images.services[key]];
        mutator(list);
        draft.images.services[key] = list[0] ?? "";
      });

  const tileLabels: Record<keyof SiteImages["services"], string> = {
    schoolTransport: content.texts.cs.services.irregularBusTransport.schoolTransport.title,
    airportTransfers: content.texts.cs.services.irregularBusTransport.airportTransfers.title,
    cargoTransport: content.texts.cs.services.cargoTransport.title,
  };

  return (
    <div className="space-y-3">
      <Group
        title="Úvodní slideshow (hero)"
        hint="Velké fotografie, které se střídají na úvodní obrazovce webu. První fotka se návštěvníkovi zobrazí jako první — dejte sem tu nejlepší. Doporučujeme 4–6 fotek na šířku (ideálně stejný poměr stran)."
      >
        <ImageListEditor images={content.images.hero} onEdit={editList("hero")} />
      </Group>

      <Group
        title="Dlaždice v sekci Služby"
        hint="Tři velké fotky s textem, které v sekci Služby představují dopravu pro školy, letištní transfery a nákladní dopravu. Každá dlaždice má právě jednu fotografii — nová fotka nahradí stávající."
      >
        <div className="space-y-5">
          {(Object.keys(tileLabels) as (keyof SiteImages["services"])[]).map((key) => (
            <div key={key}>
              <span className="mb-2 block text-sm font-medium text-gray-700">
                {tileLabels[key]}
              </span>
              <ImageListEditor
                single
                images={content.images.services[key] ? [content.images.services[key]] : []}
                onEdit={editTile(key)}
              />
            </div>
          ))}
        </div>
      </Group>

      <Group
        title="Fotografie v sekci O nás"
        hint="Menší fotky pod textem o firmě (zobrazují se dvě vedle sebe). Doporučujeme sudý počet, ideálně 2."
      >
        <ImageListEditor images={content.images.about} onEdit={editList("about")} />
      </Group>
    </div>
  );
}
