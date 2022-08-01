import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import { setupInstallPage } from "./install-page"
import { setupThemeSwitcher } from "./theme"
import { setupLanguages } from "./languages";

setupLanguages()
setupThemeSwitcher()

const application = Application.start()
const context = require.context("./controllers", true, /\.(ts)$/)

application.load(definitionsFromContext(context))

// @ts-ignore
if (window.pageHasDownloads) {
    setupInstallPage().then()
}
