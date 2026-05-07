// One-shot script to re-encode large PNG photos in /public/pics
// to optimized JPEGs (small, broadly supported) at max 1920w.
// Logos and small graphics under SKIP_BYTES are left untouched.
// next/image handles AVIF/WebP at request time.

import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const PICS_DIR = new URL("../public/pics/", import.meta.url);
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const SKIP_BYTES = 200 * 1024;
const SKIP_NAMES = new Set([
  "logo-black-footer.png",
  "logo-white-nav.png",
  "logo-whiteyellow-nav.png",
]);

const files = await readdir(PICS_DIR);

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for (const file of files) {
  if (!file.toLowerCase().endsWith(".png")) {
    skipped++;
    continue;
  }
  if (SKIP_NAMES.has(file)) {
    skipped++;
    continue;
  }
  const fullPath = join(PICS_DIR.pathname, file);
  const before = (await stat(fullPath)).size;
  if (before < SKIP_BYTES) {
    skipped++;
    continue;
  }
  totalBefore += before;

  const tmp = join(PICS_DIR.pathname, `.${file}.tmp.jpg`);
  await sharp(fullPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  if (after >= before) {
    await unlink(tmp);
    skipped++;
    continue;
  }

  const targetPath = join(PICS_DIR.pathname, `${parse(file).name}.jpg`);
  await rename(tmp, targetPath);
  await unlink(fullPath);

  totalAfter += after;
  processed++;
  console.log(
    `${file} -> ${parse(file).name}.jpg  ${(before / 1024).toFixed(0)} kB -> ${(
      after / 1024
    ).toFixed(0)} kB`
  );
}

console.log(
  `\nDone. Processed: ${processed}, skipped: ${skipped}.  ` +
    `${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(
      totalAfter /
      1024 /
      1024
    ).toFixed(1)} MB`
);
