"use client";

/* eslint-disable @next/next/no-img-element -- raw <img> so uploaded data URLs and external links preview without next/image config */

import { useState, type ChangeEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Upload,
  Star,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { GALLERY_IMAGES } from "@/content/gallery";
import { useDev } from "./DevContext";
import { ToolButton, fieldClasses } from "./ui";

const ctrlBtn =
  "flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 focus-ring";

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

  const makeCover = (index: number) =>
    withImages((list) => {
      const [img] = list.splice(index, 1);
      list.unshift(img);
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
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
          <ImageIcon className="h-8 w-8 text-gray-300" aria-hidden="true" />
          <p className="text-sm text-gray-400">Zatím žádné fotografie.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, index) => (
            <li
              key={`${src}-${index}`}
              className="overflow-hidden rounded-xl bg-white ring-1 ring-gray-200"
            >
              <div className="relative aspect-[4/3]">
                <img src={src} alt="" className="h-full w-full object-cover" />
                {index === 0 && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm">
                    <Star className="h-3 w-3" aria-hidden="true" /> Hlavní
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 px-1.5 py-1">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    title="Doleva"
                    aria-label="Posunout doleva"
                    className={ctrlBtn}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === images.length - 1}
                    title="Doprava"
                    aria-label="Posunout doprava"
                    className={ctrlBtn}
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-center">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => makeCover(index)}
                      title="Nastavit jako hlavní"
                      aria-label="Nastavit jako hlavní fotografii"
                      className={ctrlBtn}
                    >
                      <Star className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    title="Odebrat"
                    aria-label="Odebrat fotografii"
                    className={`${ctrlBtn} text-red-500 hover:bg-red-50 hover:text-red-600`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
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
          className={`${fieldClasses} min-w-0 flex-1`}
        />
        <ToolButton
          onClick={() => {
            addImage(url);
            setUrl("");
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Přidat odkaz
        </ToolButton>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-gray-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow-400">
          <Upload className="h-4 w-4" aria-hidden="true" /> Nahrát
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
        <ToolButton tone="ghost" onClick={() => setShowGallery((open) => !open)}>
          {showGallery ? "Skrýt galerii" : "Vybrat z galerie"}
        </ToolButton>
      </div>

      {showGallery && (
        <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-200 motion-safe:animate-fade-in">
          <p className="mb-2 text-xs font-medium text-gray-500">Vyberte z galerie webu</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
            {GALLERY_IMAGES.map((src) => {
              const added = images.includes(src);
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => addImage(src)}
                  disabled={added}
                  title={added ? "Už přidáno" : "Přidat tuto fotografii"}
                  className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-gray-200 focus-ring disabled:cursor-default"
                >
                  <img
                    src={src}
                    alt=""
                    className={`h-full w-full object-cover transition-transform ${
                      added ? "opacity-50" : "group-hover:scale-105"
                    }`}
                  />
                  {added && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
