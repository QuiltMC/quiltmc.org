import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
    site: "https://leocth.github.io",
    integrations: [
        mdx(),
        astroI18next({
            baseLanguage: "en",
            i18next: {
              debug: true, // convenient during development to check for missing keys
              supportedLngs: ["en"],
            },
        }),
    ],
});

