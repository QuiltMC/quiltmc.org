import type { AstroI18nextConfig } from "astro-i18next";

export default {
	defaultLocale: "en",
	locales: ["en"],
	i18nextServer: {
		// debug: true, // convenient during development to check for missing keys
		defaultNS: "common",
		ns: ["common", "footer", "home", "install", "team"],
	},
	i18nextServerPlugins: {
		Backend: "i18next-fs-fluent-backend",
		fluent: "i18next-fluent",
	},
} as AstroI18nextConfig;
