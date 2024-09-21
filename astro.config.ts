import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { fromHtml } from 'hast-util-from-html';
import icon from "astro-icon"

import compress from "astro-compress";
import searchIndex from "./src/integration/search-index";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://quiltmc.org/",

  integrations: [
      mdx(),
	astroI18next(),
	sitemap(),
	purgecss({ safelist: ["has-background-info", "has-background-link"] }),
	compress({ SVG: false, }),
	searchIndex(),
	icon()
	],

  markdown: {
	syntaxHighlight: "prism",
	rehypePlugins: [[rehypeAutolinkHeadings, {
      behavior: "append"
	}]]
	},

  vite: {
	build: {
      assetsInlineLimit: 0
	},
	ssr: {
		// These are all Node.js APIs that don't work on Cloudflare. They are only used at build-time, but Astro doesn't understand that they won't be needed in the Cloudflare environment, so they have to be explicitly allowed.
		external: ["child_process", "crypto", "fs", "module", "node:buffer", "node:child_process", "node:events", "node:fs", "node:os", "node:process", "node:path", "node:stream", "node:stream/promises", "node:string_decoder", "node:timers/promises", "node:url", "node:util", "node:tty", "node:v8", "os", "path", "stream", "string_decoder", "tty", "url", "util", "worker_threads","process"]
	}
	},

  output: "hybrid",
  adapter: cloudflare({
	platformProxy: {
		enabled: true // Enables bindings, secrets, etc. in Astro's dev server
	}
  }),
});
