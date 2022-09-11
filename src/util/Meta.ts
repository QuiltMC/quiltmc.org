// This implements classes for accessing the Quilt meta API.

const META_URL_BASE = "https://meta.quiltmc.org/v3/";
const META_GAME_VSNS = META_URL_BASE + "versions/game";
const META_LOADER = META_URL_BASE + "versions/loader/";
const META_YARN = META_URL_BASE + "versions/yarn/";

export async function loadGameVersions(): Promise<GameVersion[]> {
	const response = await fetch(META_GAME_VSNS);
	const data = await response.json();

	const vsns: GameVersion[] = [];

	for (const v of data) {
		vsns.push(new GameVersion(v.version, v.stable, vsns));
	}

	return vsns;
}

// Class for deferred loading of game version data
export class GameVersion {
	readonly name: string;
	readonly stable: boolean;
	versionData?: VersionData;
	loaderVersions?: LoaderVersion[];
	versionList: GameVersion[];

	constructor(name: string, stable: boolean, versionList: GameVersion[]) {
		this.name = name;
		this.stable = stable;
		this.versionList = versionList;
	}

	// This does lazy loading of the data for this game version. Will load once
	// from the meta server and then cache for subsequent calls.
	async getData(needYarn = false): Promise<VersionData> {
		if (!this.versionData) {
			this.versionData = await this.loadData(needYarn);
		}
		return this.versionData;
	}

	// Lazy loading of loader versions compatible with this game version.
	async getLoaderVersions(): Promise<LoaderVersion[]> {
		if (!this.loaderVersions) {
			const result = await fetch(META_LOADER + this.name);
			const loaders: { loader: LoaderVersion }[] = await result.json();

			this.loaderVersions = loaders.map((loader) => loader.loader);
		}
		return this.loaderVersions;
	}

	// Does the actual loading of data from the server.
	async loadData(needYarn = false): Promise<VersionData> {
		let yarn;

		if (needYarn) {
			const result = await fetch(META_YARN + this.name);

			if (result.status === 404) {
				throw Error("No yarn for this version.");
			}

			const yarnJson = await result.json();

			if (yarnJson.length < 1) {
				throw Error("No yarn for this version.");
			}

			yarn = yarnJson[0];
		} else {
			yarn = { version: "No yarn for this version." };
		}

		const loaderResult = await this.getLoaderVersions();
		const loader = loaderResult[0];

		let mavenStr = "net.fabricmc:fabric:";

		for (const vi of this.versionList) {
			if (vi.name === "1.14") {
				mavenStr = "net.fabricmc.fabric-api:fabric-api:";
				break;
			} else if (vi.name === this.name) {
				break;
			}
		}

		return {
			minecraftVersion: this.name,
			yarnVersion: yarn.version,
			yarnVersionUrlenc: encodeURIComponent(yarn.version),
			loaderVersion: loader.version,
			loaderVersionUrlenc: encodeURIComponent(loader.version),

			// TODO: Load API version
			apiVersion: `&ltapi version todo&gt;`,
			maven: mavenStr,
		};
	}
}

export interface LoaderVersion {
	readonly version: string;
	readonly build: string;
	readonly maven: string;
}

// JSON object that can be passed directly to the snippet controller to replace parts of the page.
export type VersionData = {
	minecraftVersion: string;
	yarnVersion: string;
	yarnVersionUrlenc: string;
	loaderVersion: string;
	loaderVersionUrlenc: string;
	apiVersion: string;
	maven: string;
};
