import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import astroI18next from "./ersatz/astro-i18next-fluent";
import sitemap from "@astrojs/sitemap";
import htmlMinifier from "astro-html-minifier";

// https://astro.build/config
export default defineConfig({
	site: "https://quiltmc.org",
	integrations: [
		mdx(),
		astroI18next({
			baseLocale: "en",
			supportedLocales: ["en", "zh"],
			i18next: {
				debug: true, // convenient during development to check for missing keys
			},
			i18nextPlugins: {
				fluent: "i18next-fluent",
			},
		}),
		sitemap(),
		htmlMinifier(),
	],
	markdown: {
		syntaxHighlight: "prism",
	},
	vite: {
		build: {
			assetsInlineLimit: 0,
		},
	},
});
