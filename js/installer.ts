const INSTALLER_URL_BASE = "https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer/"
const MAVEN_METADATA_URL = INSTALLER_URL_BASE + "maven-metadata.xml"

const NATIVE_INSTALLER_URL_BASE = "https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer-native-bootstrap/"

const JAR_DOWNLOAD_TEMPLATE = INSTALLER_URL_BASE + "{VERSION}/quilt-installer-{VERSION}.jar"
const NATIVE_DOWNLOAD_TEMPLATE = NATIVE_INSTALLER_URL_BASE + "{PLATFORM}-{ARCH}/{VERSION}/{PLATFORM}-{ARCH}-{VERSION}.{EXT}"

// Get all possible installer versions from the Maven
export async function getVersions(): Promise<string []> {
    return fetch(MAVEN_METADATA_URL)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => data.querySelectorAll("metadata > versioning > versions > version"))
        .then(versions => Array.from(versions).map(
            item => item.textContent
        ))
}

// Get the latest installer version from the Maven
export async function getLatestVersion(): Promise<string> {
    return fetch(MAVEN_METADATA_URL)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => data.querySelector("metadata > versioning > latest"))
        .then(version => version.textContent)
}

// Given a specific version, platform and architecture, construct the corresponding direct download URL
export function getDownloadUrl(
    version: string,
    platform: PLATFORM,
    arch: ARCH = ARCH.NONE
): string {
    if (platform === PLATFORM.JAR) {
        return JAR_DOWNLOAD_TEMPLATE.replace("{VERSION}", version)
    }

    let ext: EXT

    switch (platform) {
        case PLATFORM.WINDOWS:
            ext = EXT.WINDOWS
            break

        default:
            throw Error("Platform not configured: " + platform)
    }

    return NATIVE_DOWNLOAD_TEMPLATE
        .replace("{PLATFORM}", platform)
        .replace("{ARCH}", arch)
        .replace("{VERSION}", version)
        .replace("{EXT}", ext)
}

export enum PLATFORM {
    JAR = "jar",
    WINDOWS = "windows",
}

export enum ARCH {
    NONE = "",
    AARCH64 = "aarch64",
    I686 = "i686",
    X86_64 = "x86_64"
}

export enum EXT {
    JAR = "jar",
    WINDOWS = "exe"
}
