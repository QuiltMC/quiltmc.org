import SnippetController from "./snippet-controller"
import { load_game_versions, GameVersion } from "../meta"

export default class GradleController extends SnippetController {
    static targets = [ "mcvlabel", "vselect", "snippet" ]
    declare readonly mcvlabelTarget: Element
    declare readonly vselectTarget: HTMLSelectElement

    get_all_tags(): string[] {
        return ["minecraft_version", "yarn_version", "loader_version", "api_version", "maven"]
    }

    gameVersions = []

    connect() {
        super.connect()
        super.set_all("(loading game versions...)")
        this.populate_versions()
    }

    async selected_version() {
        super.set_all("(loading...)")
        const sel = this.vselectTarget
        const vsn = this.gameVersions[sel.selectedIndex]

        this.mcvlabelTarget.textContent = vsn.name

        const vdata = await vsn.get_data()
        super.set_snippets(vdata)
    }

    async populate_versions() {
        const vsns = await load_game_versions()
        this.gameVersions = vsns
        const select = this.vselectTarget
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
        this.selected_version()
    }
}

