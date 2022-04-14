// This implements classes for accessing the Quilt meta API.

const META_URL_BASE = "https://meta.quiltmc.org/v3/"
const META_GAME_VSNS = META_URL_BASE + "versions/game"
const META_LOADER = META_URL_BASE + "versions/loader/"
const META_YARN = META_URL_BASE + "versions/yarn/"

export async function load_game_versions(): Promise<GameVersion[]> {
    const response = await fetch(META_GAME_VSNS)
    const data = await response.json()

    const vsns: GameVersion[] = []

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
    loaderVsns: LoaderVersion[]
    vsnList: GameVersion[]

    constructor(name: string, stable: boolean, vlist: GameVersion[]) {
        this.name = name
        this.stable = stable
        this.vsnList = vlist
    }

    // This does lazy loading of the data for this game version. Will load once
    // from the meta server and then cache for subsequent calls.
    async get_data(needYarn = false): Promise<VersionData> {
        if (this.versionData != null) {
            return this.versionData
        } else {
            await this.load_data(needYarn)

            return this.versionData
        }
    }

    // Lazy loading of loader versions compatible with this game version.
    async get_loader_versions(): Promise<LoaderVersion[]> {
        if (this.loaderVsns != null) { return this.loaderVsns; }

        const result = await fetch(META_LOADER + this.name)
        const loaders = await result.json()

        const list = []

        for (let data of loaders) {
            data = data.loader

            list.push(new LoaderVersion(data.version, data.build, data.maven))
        }

        this.loaderVsns = list

        return this.loaderVsns
    }

    // Does the actual loading of data from the server.
    async load_data(needYarn = false): Promise<void> {
        let yarn

        if (needYarn) {
            const result = await fetch(META_YARN + this.name)

            if (result.status === 404) { throw Error("No yarn for this version.") }

            const yarnJson = await result.json()

            if (yarnJson.length < 1) { throw Error("No yarn for this version.") }

            yarn = yarnJson[0]
        } else {
            yarn = { version: "No yarn for this version." }
        }

        const loaderResult = await this.get_loader_versions()
        const loader = loaderResult[0]

        let mavenStr = "net.fabricmc:fabric:"

        for (const vi of this.vsnList) {
            if (vi.name === "1.14") {
                mavenStr = "net.fabricmc.fabric-api:fabric-api:"
                break
            } else if (vi.name === this.name) {
                break
            }
        }

        this.versionData = {
            minecraft_version: `${this.name}`,
            yarn_version: yarn.version,
            yarn_version_urlenc: encodeURIComponent(yarn.version),
            loader_version: loader.version,
            loader_version_urlenc: encodeURIComponent(loader.version),

            // TODO: Load API version
            api_version: `&ltapi version todo&gt;`,
            maven: mavenStr,
        } as VersionData
    }
}

export class LoaderVersion {
    readonly version: string
    readonly build: string
    readonly maven: string

    constructor(version: string, build: string, maven: string) {
        this.version = version
        this.build = build
        this.maven = maven
    }
}

// JSON object that can be passed directly to the snippet controller to replace parts of the page.
export type VersionData = {
    minecraft_version: string
    yarn_version: string
    loader_version: string
    api_version: string
    maven: string
}

