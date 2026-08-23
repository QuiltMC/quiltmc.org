import i18next from "i18next"
import fluent from "i18next-fluent"
import backend from "i18next-fs-fluent-backend"

let initialised = false

export default async function initi18next(): Promise<void> {
	if (initialised) { return }
	console.log("Initialising i18next...")
	i18next.use(fluent)
	i18next.use(backend)
	await i18next.init({
			supportedLngs: ["en"],
			defaultNS: "common",
			ns: ["common", "footer", "home", "install", "team"],
			fallbackLng: "en",
		})
	initialised = true
}
