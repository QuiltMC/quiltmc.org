import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
	site: "https://quiltmc.org",
	integrations: [mdx(), astroI18next(), sitemap(), compress(), purgecss()],
	markdown: {
		syntaxHighlight: "prism",
	},
	vite: {
		build: {
			assetsInlineLimit: 0,
		},
	},
});
