const MAVEN = "https://maven.quiltmc.org/repository/release"

const UNIVERSAL_ARCH = "java-universal"
const UNIVERSAL_PATH = MAVEN + "/org/quiltmc/quilt-installer/"

const NATIVE_PATH = MAVEN + "/org/quiltmc/quilt-installer-native-bootstrap/"

const METADATA = "maven-metadata.xml"
const LATEST_REGEX = /<latest>([0-9.]+)<\/latest>/

export async function onRequest(context) {
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
		default: return new Response("Internal server error", { status: 500 })
	}

	const metadata = await metadataRequest.text()
	const latest = metadata.match(LATEST_REGEX)[1]

	let artifactUrl
	if (context.params.arch === UNIVERSAL_ARCH) {
		artifactUrl = base + latest + "/" + "quilt-installer-" + latest + ".jar"
	} else {
		const extension = context.params.arch.startsWith("windows") ? ".exe" : ""

		artifactUrl = base + latest + "/" + context.params.arch + "-" + latest + extension
	}

	return new Response(artifactUrl, { status: 307, headers: { "Location": artifactUrl } })
}
