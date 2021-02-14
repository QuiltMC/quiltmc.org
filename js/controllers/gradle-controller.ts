import SnippetController from "./snippet-controller.ts"

const META_URL_BASE = "https://meta.fabricmc.net/v1/"
// const META_GAME_VSNS = META_URL_BASE + "versions/game"
const META_GAME_VSNS = "/test-data/game-versions.json"
// const META_LOADER = META_URL_BASE + "versions/loader/"
const META_LOADER = "/test-data/"

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
        this.load_game_versions()
    }

    async selected_version() {
        super.set_all("(loading...)")
        const sel = this.vselectTarget
        const vsn = this.gameVersions[sel.selectedIndex]

        this.mcvlabelTarget.textContent = vsn.name

        const vdata = await vsn.get_data()
        super.set_snippets(vdata)
    }

    async load_game_versions() {
        const response = await fetch(META_GAME_VSNS)
        const vsns = await response.json()

        const select = this.vselectTarget
        select.innerHTML = "" // clear children

        let initial = -1
        let idx = 0
        vsns.forEach(v => {
            const opt = document.createElement("option")
            opt.value = v.version
            opt.textContent = v.version
            select.appendChild(opt)
            this.gameVersions.push(new GameVersion(v.version, this))

            if (v.stable && initial === -1) {
                initial = idx
            }
            idx += 1
        })
        select.selectedIndex = initial
        this.selected_version()
    }
}

// Class for deferred loading of game version data
class GameVersion {
    readonly name: string
    versionData: VersionData = null
    ctrl: GradleController

    constructor(name: string, controller: GradleController) {
        this.name = name
        this.ctrl = controller
    }

    // This does lazy loading of the data for this game version. Will load once
    // from the meta server and then cache for subsequent calls.
    async get_data(): Promise<VersionData> {
        if (this.versionData != null) {
            return this.versionData
        } else {
            await this.load_data()
            return this.versionData
        }
    }

    // Does the actual loading of data from the server.
    async load_data(): Promise<void> {
        const response = await fetch(META_LOADER + this.name + ".json")
        let meta = await response.json()
        meta = meta[0]

        let versionUrl = "https://maven.fabricmc.net/net/fabricmc/fabric/maven-metadata.xml"
        let mavenStr = "net.fabricmc:fabric:"

        let newApi = true

        for (const vi of this.ctrl.gameVersions) {
            if (vi.name === "1.14") {
                newApi = false
                break
            } else if (vi.name === this.name) {
                break
            }
        }

        if (newApi) {
            versionUrl = "https://maven.fabricmc.net/net/fabricmc/fabric-api/fabric-api/maven-metadata.xml"
            mavenStr = "net.fabricmc.fabric-api:fabric-api:"
        }

        this.versionData = {
            minecraft_version: `${this.name}`,
            yarn_version: meta.mappings.version,
            loader_version: meta.loader.version,
            // TODO: Load API version
            api_version: `&ltapi version todo&gt;`,
            maven: mavenStr,
        } as VersionData
    }
}

// Data that is lazy loaded.
// Keys are such that this can be passed directly to `set_snippets`
interface VersionData {
    readonly minecraft_version: string
    readonly yarn_version: string
    readonly loader_version: string
    readonly api_version: string
    readonly maven: string
}

