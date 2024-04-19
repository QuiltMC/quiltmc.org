import { xml2js } from "xml-js";
import * as semverSort from "semver-sort";

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

	const mappingsVersions = (await fetchMetadata("quilt-mappings"))
		.versioning.versions.version.map((versioning) => versioning._text)
		.sort((a, b) => b.split(".").slice(-1) - a.split(".").slice(-1))

	const qfapiVersions = semverSort.asc((await fetchMetadata("quilted-fabric-api/quilted-fabric-api"))
		.versioning.versions.version.map((versioning) => versioning._text))
		.toReversed()  // semverSort.desc chokes on those inputs

	for (const { version } of gameVersions) {
		const mappingsVersion = mappingsVersions.find((versioning) => versioning.split("+")[0] === version) || null
		const qfapiVersion = qfapiVersions.find((versioning) => versioning.split("-").at(-1) === version) || null

		output[version] = {
			"quilt_loader": loaderVersion,
			"loom": loomVersion,
			"quilt_mappings": mappingsVersion,
			"quilted_fabric_api": qfapiVersion
		}
	}

	return new Response(JSON.stringify(output), { status: 200, headers: { "Content-Type": "text/json" } })
}
