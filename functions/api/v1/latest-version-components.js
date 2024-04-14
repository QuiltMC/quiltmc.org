import { xml2js } from "xml-js";

const META_GAME_VERSIONS = "https://meta.quiltmc.org/v3/versions/game"
const MAVEN = "https://maven.quiltmc.org/repository/release/org/quiltmc/"

async function fetchMetadata(path) {
	const metadataUrl = MAVEN + path + "/maven-metadata.xml"
	const metadataRequest = await fetch(metadataUrl, { headers: { "User-Agent": "QuiltMC Website API" } })

	return xml2js(await metadataRequest.text(), { compact: true, ignoreAttributes: true }).metadata
}

export async function onRequest(context) {
	const gameVersionsRequest = await fetch(META_GAME_VERSIONS, { headers: { "User-Agent": "QuiltMC Website API" } })
	const gameVersions = await gameVersionsRequest.json()

	const output = {}

	const loomVersion = (await fetchMetadata("loom")).versioning.latest._text
	const loaderVersion = (await fetchMetadata("quilt-loader")).versioning.latest._text

	const mappingsMetadata = await fetchMetadata("quilt-mappings")
	const qfapiMetadata = await fetchMetadata("quilted-fabric-api/quilted-fabric-api")

	for (const { version } of gameVersions) {
		let mappingsVersion = null
		let qfapiVersion = null

		for (const versioning of mappingsMetadata.versioning.versions.version) {
			if (versioning._text.split("+")[0] === version) {
				mappingsVersion = versioning._text
				break
			}
		}

		for (const versioning of qfapiMetadata.versioning.versions.version) {
			if (versioning._text.split("-").at(-1) === version) {
				qfapiVersion = versioning._text
				break
			}
		}

		output[version] = {
			"quilt_loader": loaderVersion,
			"loom": loomVersion,
			"quilt_mappings": mappingsVersion,
			"quilted_fabric_api": qfapiVersion
		}
	}

	return new Response(JSON.stringify(output), { status: 200, headers: { "Content-Type": "text/json" } })
}
