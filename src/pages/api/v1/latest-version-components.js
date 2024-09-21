export const prerendered = false

import { xml2js } from "xml-js";
import semverSort from "semver-sort";

const META_GAME_VERSIONS = "https://meta.quiltmc.org/v3/versions/game"
const MAVEN = "https://maven.quiltmc.org/repository/release/org/quiltmc/"

async function fetchMetadata(path) {
	const metadataUrl = MAVEN + path + "/maven-metadata.xml";
	const metadataRequest = await fetch(metadataUrl, { headers: { "User-Agent": "QuiltMC Website API" } });

	if (metadataRequest.ok) {
		return await metadataRequest.text();
	}

	throw new Error(`Failed to fetch metadata from ${metadataUrl}`);
}

function getLatestVersion(versions) {
	// handle null, undefined, empty array
	if (!versions) return null;

	return semverSort.asc(versions).toReversed()[0];
}

function getLatestVersionFromMavenMetadataXML(metaXML, latestVersionSelector) {
	const json = xml2js(metaXML, { compact: true, ignoreAttributes: true });

	const allVersions = json.metadata.versioning.versions.version.map((version) => version._text);

	return latestVersionSelector(allVersions);
}

export async function GET(context) {
	try {
		const gameVersionsRequest = await fetch(META_GAME_VERSIONS, { headers: { "User-Agent": "QuiltMC Website API" } })
		const gameVersions = await gameVersionsRequest.json()

		const output = {}

		const loomVersion = await fetchMetadata("loom").then(meta => getLatestVersionFromMavenMetadataXML(meta, getLatestVersion));
		const loaderVersion = await fetchMetadata("quilt-loader").then(meta => getLatestVersionFromMavenMetadataXML(meta, getLatestVersion));

		const mappingsVersions = await fetchMetadata("quilt-mappings").then(meta => getLatestVersionFromMavenMetadataXML(meta, versions => {
			return versions.sort((a, b) => b.split(".").slice(-1) - a.split(".").slice(-1));
		}));

		const qfapiVersions = await fetchMetadata("quilted-fabric-api/quilted-fabric-api").then(meta => getLatestVersionFromMavenMetadataXML(meta, versions => semverSort.asc(versions).toReversed()));

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

		return new Response(JSON.stringify(output), { status: 200, headers: { "Content-Type": "application/json" } });
	}
	catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
	}
}
