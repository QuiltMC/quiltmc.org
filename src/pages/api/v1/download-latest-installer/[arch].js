export const prerender = false

import semverSort from "semver-sort"

const MAVEN = "https://maven.quiltmc.org/repository/release"

const UNIVERSAL_ARCH = "java-universal"
const UNIVERSAL_PATH = MAVEN + "/org/quiltmc/quilt-installer/"

const NATIVE_PATH = MAVEN + "/org/quiltmc/quilt-installer-native-bootstrap/"

const METADATA = "maven-metadata.xml"
const VERSION_REGEX = /<version>(.+?)<\/version>/g

export async function GET(context) {
	let base

	if (context.params.arch === UNIVERSAL_ARCH) {
		base = UNIVERSAL_PATH
	} else {
		base = NATIVE_PATH + context.params.arch + "/"
	}

	const metadataUrl = base + METADATA
	const metadataRequest = await fetch(metadataUrl, { headers: { "User-Agent": "QuiltMC Website API" } })

	switch (metadataRequest.status) {
		case 200: break
		case 404: return new Response("Not found", { status: 404 })
		default: return new Response(`Internal server error: service returned ${metadataRequest.status}`, { status: 500 })
	}

	const metadata = await metadataRequest.text()
	const allVersion = Array.from(metadata.matchAll(VERSION_REGEX)).map(match => match[1])
	const latest = semverSort.desc(allVersion)[0]

	let artifactUrl
	if (context.params.arch === UNIVERSAL_ARCH) {
		artifactUrl = base + latest + "/" + "quilt-installer-" + latest + ".jar"
	} else {
		const extension = context.params.arch.startsWith("windows") ? ".exe" : ""

		artifactUrl = base + latest + "/" + context.params.arch + "-" + latest + extension
	}

	return new Response(artifactUrl, { status: 307, headers: { "Location": artifactUrl } })
}
