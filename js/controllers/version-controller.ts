import SnippetController from "./snippet-controller"
import { load_game_versions, GameVersion } from "../meta"

// Base class for controllers that allow selecting a game version, pulling data from meta,
// and then replacing snippets on the page.
export default class VersionController extends SnippetController {
    static targets = [ "mcLabel", "mcSelect", "loaderSelect" ]
    declare readonly mcLabelTarget: Element
    declare readonly mcSelectTarget: HTMLSelectElement
    declare readonly loaderSelectTarget: HTMLSelectElement

    get_all_tags(): string[] {
        return ["minecraft_version", "yarn_version", "loader_version", "api_version", "maven"]
    }

    gameVersions = []

    connect() {
        super.connect()
        this.set_loading()
        this.populate_versions()
    }

    async selected_mc_version() {
        this.set_loading()
        const sel = this.mcSelectTarget
        const vsn = this.gameVersions[sel.selectedIndex]

        if (this.mcLabelTarget) {
            this.mcLabelTarget.textContent = vsn.name
        }

        const needYarn = this.has_tag("yarn_version") || this.has_tag("yarn_version_urlenc")

        let vdata
        try {
            vdata = await vsn.get_data(needYarn)
        } catch (e) {
            this.set_error(e.message)
            throw e
        }
        this.set_snippets(vdata)
    }

    async populate_versions() {
        const vsns = await load_game_versions()
        this.gameVersions = vsns
        const select = this.mcSelectTarget
        select.innerHTML = ""

        let sel = -1
        let idx = 0
        for (const v of vsns) {
            const opt = document.createElement("option")
            opt.value = v.name
            opt.textContent = v.name
            select.appendChild(opt)
            if (sel === -1 && v.stable) {
                sel = idx
            }
            idx++
        }
        select.selectedIndex = sel
        this.selected_mc_version()
    }
}

