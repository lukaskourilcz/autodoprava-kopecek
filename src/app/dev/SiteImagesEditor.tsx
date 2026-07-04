"use client";

/* eslint-disable @next/next/no-img-element -- raw <img> so uploaded data URLs and external links preview without next/image config */

import { useState, type ChangeEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Trash2, Plus, Upload } from "lucide-react";
import { GALLERY_IMAGES } from "@/content/gallery";
import type { HeroImage, MobileFocus, SiteImages } from "@/content/types";
import { useDev } from "./DevContext";
import { ImageListEditor } from "./ImageManager";
import { ToolButton } from "./ui";

const FOCUS_OPTIONS: { value: MobileFocus; label: string }[] = [
  { value: "left", label: "Zleva" },
  { value: "center", label: "Střed" },
  { value: "right", label: "Zprava" },
];

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

/** Hero photo editor: list management plus a per-photo mobile crop focus. */
function HeroImagesEditor() {
  const { content, update } = useDev();
  const [url, setUrl] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const images = content.images.hero;

  const edit = (mutator: (list: HeroImage[]) => void) =>
    update((draft) => mutator(draft.images.hero));

  const addImage = (src: string) => {
    const trimmed = src.trim();
    if (trimmed) edit((list) => list.push({ src: trimmed, focus: "center" }));
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    Array.from(event.target.files ?? []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") addImage(reader.result);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = "";
  };

  return (
    <div className="space-y-3">
      {images.length === 0 ? (
        <p className="text-sm text-gray-400">Zatím žádné fotografie.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className="relative w-36 rounded-md border border-gray-200 p-1.5"
            >
              <img src={image.src} alt="" className="h-24 w-full rounded object-cover" />
              {index === 0 && (
                <span className="absolute left-2.5 top-2.5 rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-semibold text-gray-900">
                  První
                </span>
              )}
              <label className="mt-1.5 block">
                <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Výřez na mobilu
                </span>
                <select
                  value={image.focus}
                  onChange={(event) =>
                    edit((list) => {
                      list[index] = {
                        ...list[index],
                        focus: event.target.value as MobileFocus,
                      };
                    })
                  }
                  className="w-full rounded-md border border-gray-300 px-1.5 py-1 text-xs text-gray-900 focus-ring"
                >
                  {FOCUS_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="mt-1 flex items-center justify-between">
                <ToolButton
                  tone="ghost"
                  onClick={() =>
                    edit((list) => {
                      if (index > 0)
                        [list[index - 1], list[index]] = [list[index], list[index - 1]];
                    })
                  }
                  disabled={index === 0}
                  title="Doleva"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </ToolButton>
                <ToolButton
                  tone="ghost"
                  onClick={() =>
                    edit((list) => {
                      if (index < list.length - 1)
                        [list[index], list[index + 1]] = [list[index + 1], list[index]];
                    })
                  }
                  disabled={index === images.length - 1}
                  title="Doprava"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </ToolButton>
                <ToolButton
                  tone="danger"
                  onClick={() => edit((list) => void list.splice(index, 1))}
                  title="Odebrat"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </ToolButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Odkaz na obrázek (https://…)"
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus-ring"
        />
        <ToolButton
          onClick={() => {
            addImage(url);
            setUrl("");
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Přidat odkaz
        </ToolButton>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-400">
          <Upload className="h-4 w-4" aria-hidden="true" /> Nahrát
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
        <ToolButton tone="ghost" onClick={() => setShowGallery((open) => !open)}>
          {showGallery ? "Skrýt galerii" : "Vybrat z galerie"}
        </ToolButton>
      </div>

      {showGallery && (
        <div className="grid grid-cols-4 gap-2 rounded-md bg-gray-50 p-2 sm:grid-cols-6">
          {GALLERY_IMAGES.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => addImage(src)}
              title="Přidat tuto fotografii"
              className="overflow-hidden rounded focus-ring"
            >
              <img
                src={src}
                alt=""
                className="h-16 w-full object-cover transition-transform hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Editor for the photos of the fixed page sections (hero, services, about). */
export function SiteImagesEditor() {
  const { content, update } = useDev();

  const editAbout = (mutator: (list: string[]) => void) =>
    update((draft) => mutator(draft.images.about));

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
        hint="Velké fotografie, které se střídají na úvodní obrazovce webu. První fotka se návštěvníkovi zobrazí jako první — dejte sem tu nejlepší. „Výřez na mobilu“ určuje, která část fotky zůstane vidět na úzkých displejích: Zleva / Střed / Zprava (vyberte stranu, kde je autobus)."
      >
        <HeroImagesEditor />
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
        <ImageListEditor images={content.images.about} onEdit={editAbout} />
      </Group>
    </div>
  );
}
