const INSTALLER_URL_BASE = "https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer/"
const MAVEN_METADATA_URL = INSTALLER_URL_BASE + "maven-metadata.xml"

const NATIVE_INSTALLER_URL_BASE = "https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer-native-bootstrap/"

// Get all possible installer versions from the Maven
export async function getInstallerVersions(): Promise<string []> {
    return fetch(MAVEN_METADATA_URL)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => data.querySelectorAll("metadata > versioning > versions > version"))
        .then(versions => Array.from(versions).map(
            item => item.textContent
        ))
}

// Get the latest installer version from the Maven
export async function getLatestInstallerVersion(): Promise<string> {
    return fetch(MAVEN_METADATA_URL)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => data.querySelector("metadata > versioning > latest"))
        .then(version => version.textContent)
}

// Given a specific version, platform and architecture, construct the corresponding direct download URL
export function getInstallerDownloadUrl(
    version: string,
    platform: PLATFORM,
    arch: ARCH = ARCH.NONE
): string {
    if (platform === PLATFORM.JAR) {
        return INSTALLER_URL_BASE + `${version}/quilt-installer-${version}.jar`
    }

    let ext: EXT

    switch (platform) {
        case PLATFORM.WINDOWS:
            ext = EXT.WINDOWS
            break

        default:
            throw Error("Platform not configured: " + platform)
    }

    return NATIVE_INSTALLER_URL_BASE + `${platform}-${arch}/${version}/${platform}-${arch}-${version}.${ext}`
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
