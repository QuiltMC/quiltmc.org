const INSTALLER_URL_BASE = "https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer/"
const MAVEN_METADATA_URL = INSTALLER_URL_BASE + "maven-metadata.xml"

// Get the latest installer version from the Maven
export async function getLatestInstallerVersion(): Promise<string | null | undefined> {
	const fetched = await fetch(MAVEN_METADATA_URL);
	const text = await fetched.text();
	const parsed = new DOMParser().parseFromString(text, "application/xml")
	
	return parsed.querySelector("metadata > versioning > latest")?.textContent;
}