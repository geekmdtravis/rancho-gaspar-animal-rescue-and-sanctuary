// LQIP (low-quality image placeholder) helper. Generates a tiny blurred WebP
// for an ESM-imported / content-collection image and returns it as a base64
// data URL, so a <BlurImage> can paint a fuzzy preview while the responsive
// <Image> downloads.
//
// Why this exists: Astro 6's built-in <Image> ships responsive sizes and
// modern formats, but it does NOT emit a placeholder of any kind. The
// `image: { responsiveStyles: true }` flag in astro.config.mjs only enables
// responsive CSS — no LQIP. We add one ourselves.
//
// Sharp is a transitive dep of Astro's own image service. We load it the same
// way Astro does (dynamic import) so Vite SSR doesn't try to bundle a native
// module.
import type { ImageMetadata } from 'astro';

// Astro's public ImageMetadata type doesn't expose fsPath, but ESM-imported
// images and content-collection `image()` fields carry it at runtime. We
// gate on its presence and bail out cleanly otherwise.
interface ImageMetaWithPath extends ImageMetadata {
  fsPath?: string;
}

// Module-scoped cache. A single animal cover can appear in many places per
// build (adopt grid + residents grid + that animal's own profile hero + the
// "similar animals" row at the bottom of several other profiles). Without
// this, each appearance would re-run sharp on the same file.
const cache = new Map<string, Promise<string>>();

// Lazy sharp load matches astro/dist/assets/services/sharp.js — keeps native
// bindings out of Vite's dependency graph.
let sharpModule: typeof import('sharp') | null = null;
async function loadSharp(): Promise<typeof import('sharp')> {
  if (!sharpModule) {
    sharpModule = (await import('sharp')).default as unknown as typeof import('sharp');
  }
  return sharpModule;
}

async function generate(fsPath: string): Promise<string> {
  const sharp = await loadSharp();
  // 24px wide is the sweet spot: large enough that the eye reads "this is a
  // dog with brown fur on the left" once blurred + scaled to a real card,
  // small enough that the inlined base64 stays ~600–900 bytes per image.
  // The blur(0.5) is on the raw 24px buffer; the CSS layer adds the real
  // gaussian — this pre-blur just sands off WebP quantization grit.
  const buf = await sharp(fsPath)
    .resize({ width: 24, fit: 'inside', withoutEnlargement: true })
    .blur(0.5)
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

/**
 * Returns a base64 `data:` URL containing a 24px-wide blurred WebP preview of
 * the given image. Returns `null` when the source is not an ESM-imported
 * image (no fsPath) or when sharp throws — callers should treat null as
 * "skip the LQIP layer, just render the responsive image".
 */
export async function lqipDataUrl(image: ImageMetadata): Promise<string | null> {
  const fsPath = (image as ImageMetaWithPath).fsPath;
  if (!fsPath) return null;
  let pending = cache.get(fsPath);
  if (!pending) {
    pending = generate(fsPath).catch((err) => {
      // Don't fail the whole build over a placeholder — log and degrade to no
      // LQIP for this image. The visible result is a missing fuzzy preview;
      // the responsive <Image> still renders.
      console.warn(`[lqip] failed to generate preview for ${fsPath}:`, err);
      throw err;
    });
    cache.set(fsPath, pending);
  }
  try {
    return await pending;
  } catch {
    return null;
  }
}
