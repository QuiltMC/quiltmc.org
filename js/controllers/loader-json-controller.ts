import SnippetController from "./snippet-controller"
import {load_game_versions, GameVersion, LoaderVersion} from "../meta"

// Base class for controllers that allow selecting a game version, pulling data from meta,
// and then replacing snippets on the page.
export default class VersionController extends SnippetController {
    static targets = [ "loader", "minecraft", "button" ]
    declare readonly loaderTarget: HTMLSelectElement
    declare readonly minecraftTarget: HTMLSelectElement
    declare readonly buttonTarget: HTMLAnchorElement

    get_all_tags(): string[] {
        return ["minecraft_version", "yarn_version", "loader_version", "api_version", "maven"]
    }

    gameVersions: GameVersion[] = []

    connect() {
        super.connect()

        this.populateMinecraftVersions()
    }

    async populateMinecraftVersions() {
        const vsns = await load_game_versions()
        this.gameVersions = vsns
        const select = this.minecraftTarget
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

        await this.populateLoaderVersions()
        this.minecraftTarget.removeAttribute("disabled")
    }

    async populateLoaderVersions() {
        this.loaderTarget.setAttribute("disabled", "")
        this.buttonTarget.setAttribute("disabled", "")
        this.buttonTarget.removeAttribute("download")
        this.buttonTarget.classList.add("is-disabled")
        this.buttonTarget.classList.remove("is-primary")

        const mcSel = this.minecraftTarget
        const mcVer = this.gameVersions[mcSel.selectedIndex]

        const vsns = await mcVer.get_loader_versions()

        const select = this.loaderTarget
        select.innerHTML = ""

        for (const v of vsns) {
            const opt = document.createElement("option")
            opt.value = v.version
            opt.textContent = v.version
            select.appendChild(opt)
        }

        select.selectedIndex = 0

        this.loaderTarget.removeAttribute("disabled")

        await this.populateButton()
    }

    async populateButton() {
        const mcVersion = this.minecraftTarget.selectedOptions[0]
        const loaderVersion = this.loaderTarget.selectedOptions[0]

        this.buttonTarget.href = `https://meta.quiltmc.org/v3/versions/loader/${mcVersion.text}/${loaderVersion.text}/profile/json`
        this.buttonTarget.setAttribute("download", "version.json")

        this.buttonTarget.removeAttribute("disabled")
        this.buttonTarget.classList.remove("is-disabled")
        this.buttonTarget.classList.add("is-primary")
    }
}

