import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import htmlMinifier from "astro-html-minifier";

// https://astro.build/config
export default defineConfig({
	site: "https://quiltmc.org",
	integrations: [mdx(), astroI18next(), sitemap(), htmlMinifier()],
	markdown: {
		syntaxHighlight: "prism",
	},
	vite: {
		build: {
			assetsInlineLimit: 0,
		},
		ssr: {
			// FIXME(leah@pluie): this is used to mitigate some weird issues with CJS deps.
			// For some reason, we need to 'externalize' them first...
			external: [
				"@proload/core",
				"@proload/plugin-tsm",
				"deepmerge",
				"locale-emoji",
			],
		},
	},
});
