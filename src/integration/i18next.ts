import type { AstroIntegration } from "astro"
import i18next, {InitOptions} from "i18next"
import fluent from "i18next-fluent"
import backend from "i18next-fs-fluent-backend"

export default function i18nextIntegration(options: InitOptions<unknown>): AstroIntegration {
	return {
		name: "i18next",
		hooks: {
			"astro:config:done": async () => {
				console.log("Initiating i18next...")
				i18next.use(fluent)
				i18next.use(backend)
				await i18next.init(options)
			}
		}
	}
}
