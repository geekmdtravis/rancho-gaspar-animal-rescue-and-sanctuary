// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Update to your production domain before deploying (used for canonical
  // URLs, sitemaps, og:image, etc.).
  site: 'https://ranchogaspar.org',

  // Internationalization: English is primary (served at the root), Brazilian
  // Portuguese is secondary (served under /pt-br/). `prefixDefaultLocale: false`
  // keeps EN URLs clean (e.g. `/adopt`) while PT lives at `/pt-br/...`.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // Astro's built-in asset pipeline (sharp) handles heavy source images:
  // responsive widths and modern formats (avif/webp) at build time. Keep
  // originals in src/assets/** so <Image>/<Picture> and the content
  // `image()` schema can optimize them. `responsiveStyles: true` opts into
  // Astro 6's responsive CSS for <Image>.
  //
  // Note: Astro does NOT emit blur-up / LQIP placeholders. We generate those
  // ourselves in src/lib/lqip.ts and render them via src/components/BlurImage
  // — use <BlurImage> instead of <Image> wherever a real photo loads.
  image: {
    responsiveStyles: true,
  },
});
