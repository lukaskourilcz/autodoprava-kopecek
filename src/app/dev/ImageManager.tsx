"use client";

/* eslint-disable @next/next/no-img-element -- raw <img> so uploaded data URLs and external links preview without next/image config */

import { useState, type ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, Trash2, Plus, Upload } from "lucide-react";
import { GALLERY_IMAGES } from "@/content/gallery";
import { useDev } from "./DevContext";
import { ToolButton } from "./ui";

export function ImageManager({ vehicleId }: { vehicleId: string }) {
  const { content, update } = useDev();
  const [url, setUrl] = useState("");
  const [showGallery, setShowGallery] = useState(false);

  const vehicle = content.vehicles.find((item) => item.id === vehicleId);
  if (!vehicle) return null;
  const images = vehicle.images;

  const withImages = (mutator: (images: string[]) => void) =>
    update((draft) => {
      const target = draft.vehicles.find((item) => item.id === vehicleId);
      if (target) mutator(target.images);
    });

  const addImage = (src: string) => {
    const trimmed = src.trim();
    if (trimmed) withImages((list) => list.push(trimmed));
  };

  const removeImage = (index: number) => withImages((list) => list.splice(index, 1));

  const moveImage = (index: number, direction: -1 | 1) =>
    withImages((list) => {
      const target = index + direction;
      if (target < 0 || target >= list.length) return;
      [list[index], list[target]] = [list[target], list[index]];
    });

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
          {images.map((src, index) => (
            <li
              key={`${src}-${index}`}
              className="relative w-28 rounded-md border border-gray-200 p-1"
            >
              <img src={src} alt="" className="h-20 w-full rounded object-cover" />
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-semibold text-gray-900">
                  Hlavní
                </span>
              )}
              <div className="mt-1 flex items-center justify-between">
                <ToolButton
                  tone="ghost"
                  onClick={() => moveImage(index, -1)}
                  disabled={index === 0}
                  title="Doleva"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </ToolButton>
                <ToolButton
                  tone="ghost"
                  onClick={() => moveImage(index, 1)}
                  disabled={index === images.length - 1}
                  title="Doprava"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </ToolButton>
                <ToolButton tone="danger" onClick={() => removeImage(index)} title="Odebrat">
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
              <img src={src} alt="" className="h-16 w-full object-cover transition-transform hover:scale-105" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
