// This implements classes for accessing the Quilt meta API.

const META_URL_BASE = "https://meta.fabricmc.net/v2/"
const META_GAME_VSNS = META_URL_BASE + "versions/game"
const META_LOADER = META_URL_BASE + "versions/loader/"
const META_YARN = META_URL_BASE + "versions/yarn/"

export async function load_game_versions(): Promise<GameVersion[]> {
    const response = await fetch(META_GAME_VSNS)
    const data = await response.json()

    var vsns = []
    for (const v of data) {
        vsns.push(new GameVersion(v.version, v.stable, vsns))
    }
    return vsns
}

// Class for deferred loading of game version data
export class GameVersion {
    readonly name: string
    readonly stable: boolean
    versionData: VersionData = null
    vsnList: GameVersion[]

    constructor(name: string, stable: boolean, vlist: GameVersion[]) {
        this.name = name
        this.stable = stable
        this.vsnList = vlist
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
        let loader = await fetch(META_LOADER + this.name)
        loader = await loader.json()
        loader = loader[0]

        let yarn = await fetch(META_YARN + this.name)
        yarn = await yarn.json()
        yarn = yarn[0]

        let versionUrl = "https://maven.fabricmc.net/net/fabricmc/fabric/maven-metadata.xml"
        let mavenStr = "net.fabricmc:fabric:"

        let newApi = true

        for (const vi of this.vsnList) {
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
            yarn_version: yarn.version,
            loader_version: loader.loader.version,
            // TODO: Load API version
            api_version: `&ltapi version todo&gt;`,
            maven: mavenStr,
        } as VersionData
    }
}

// Data that is lazy loaded.
// Keys are such that this can be passed directly to `set_snippets`
export interface VersionData {
    readonly minecraft_version: string
    readonly yarn_version: string
    readonly loader_version: string
    readonly api_version: string
    readonly maven: string
}

