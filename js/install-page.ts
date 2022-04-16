import {ARCH, getInstallerDownloadUrl, getLatestInstallerVersion, PLATFORM} from "./installer";

// Set up the installation page. Sections commented as JS is no longer needed to fill them at the moment.
export async function setupInstallPage() {
    const version = await getLatestInstallerVersion()

    // const universalUrl = getInstallerDownloadUrl(version, PLATFORM.JAR)
    // const windowsUrl = getInstallerDownloadUrl(version, PLATFORM.WINDOWS, ARCH.X86_64)

    const versionElement = document.getElementById("launcher-version")

    if (version !== null) {
        versionElement.textContent = `v${version}`
    }

    // document.getElementById("universal-download")?.setAttribute("href", universalUrl)
    // document.getElementById("windows-download")?.setAttribute("href", windowsUrl)
}
