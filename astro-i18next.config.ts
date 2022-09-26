import type { AstroI18nextConfig } from "astro-i18next";

export default {
	defaultLanguage: "en",
	supportedLanguages: ["en"],
	i18next: {
		//debug: true, // convenient during development to check for missing keys
		defaultNS: "common",
		ns: ["common", "footer", "home", "install", "team"],
	},
	i18nextPlugins: {
		backend: "src/ersatz/i18next-fs-fluent-backend.mjs",
		fluent: "i18next-fluent",
	},
} as AstroI18nextConfig;
