import { defineMiddleware } from "astro:middleware"
import i18next from "i18next"
import fluent from "i18next-fluent"
import backend from "i18next-fs-fluent-backend"
/*
i18next needs to be globally initialised before being used in pages, but
it can't be done in an integration because integrations sometimes run in
a different scope to the build process. Initialising it inside the middleware
file was recommended by an Astro maintainer and ensures the initialisation
always runs before pages start rendering.
*/
i18next.use(fluent)
i18next.use(backend)
await i18next.init({
		supportedLngs: ["en"],
		defaultNS: "common",
		ns: ["common", "footer", "home", "install", "team"],
		fallbackLng: "en",
	})

export const onRequest = defineMiddleware((_, next) => {
  return next()
})
