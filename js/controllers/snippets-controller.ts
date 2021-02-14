import { Controller } from "stimulus"

const META_URL_BASE = "https://meta.fabricmc.net/v1/"
// const META_GAME_VSNS = META_URL_BASE + "versions/game"
const META_GAME_VSNS = "/test-data/game-versions.json"
// const META_LOADER = META_URL_BASE + "versions/loader/"
const META_LOADER = "/test-data/"
const REPLACEMENTS = [
    "minecraft_version", "yarn_version", "loader_version", "api_version", "maven"
]

interface SnippetElem extends Element {
    originalHTML: string
}

export default class VsnController extends Controller {
    static targets = [ "mcvlabel", "vselect", "snippet" ]
    declare readonly mcvlabelTarget: Element
    declare readonly vselectTarget: HTMLSelectElement
    declare readonly snippetTargets: SnippetElem[]

    gameVersions = []

    connect() {
        this.display_loading_text()
        this.load_game_versions()
    }

    display_loading_text() {
        for (const snip of this.snippetTargets) {
            if (snip.originalHTML === undefined || snip.originalHTML === null) {
                snip.originalHTML = snip.innerHTML
            }
            for (const r of REPLACEMENTS) {
                snip.innerHTML = replace_tags(snip.innerHTML, r, "(loading...)")
            }
        }
    }

    async selected_version() {
        this.display_loading_text()
        const sel = this.vselectTarget
        const vsn = this.gameVersions[sel.selectedIndex]

        this.mcvlabelTarget.textContent = vsn.name

        const vdata = await vsn.get_data()
        for (const snip of this.snippetTargets) {
            snip.innerHTML = snip.originalHTML
            snip.innerHTML = replace_tags(snip.innerHTML, "minecraft_version", vdata.mcVersion)
            snip.innerHTML = replace_tags(snip.innerHTML, "yarn_version", vdata.yarnVersion)
            snip.innerHTML = replace_tags(snip.innerHTML, "loader_version", vdata.loaderVersion)
            snip.innerHTML = replace_tags(snip.innerHTML, "api_version", vdata.apiVersion)
            snip.innerHTML = replace_tags(snip.innerHTML, "maven", vdata.maven)
        }
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
    ctrl: VsnController

    constructor(name: string, controller: VsnController) {
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
            mcVersion: `${this.name}`,
            yarnVersion: meta.mappings.version,
            loaderVersion: meta.loader.version,
            // TODO: Load API version
            apiVersion: `&ltapi version todo&gt;`,
            maven: mavenStr,
        } as VersionData
    }
}

// Data that is lazy loaded
interface VersionData {
    readonly mcVersion: string
    readonly yarnVersion: string
    readonly loaderVersion: string
    readonly apiVersion: string
    readonly maven: string
}


function replace_tags(str: string, tag: string, content: string): string {
    return str.replace(new RegExp(`{${tag}}`, 'g'), content)
}

