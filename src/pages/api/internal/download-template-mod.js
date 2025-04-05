// This should eventually be migrated to an Astro Action or made public.
export const prerendered = false

export async function GET() {
    const defaultBranch = await fetch(`https://api.github.com/repos/quiltmc/quilt-template-mod`, {
        headers: {
            "User-Agent": "QuiltMC Website API"
        }
    })
        .then(res => res.json())
        .then(data => data.default_branch);

    return fetch(`https://github.com/QuiltMC/quilt-template-mod/archive/refs/heads/${defaultBranch}.zip`, {
        headers: {
            "User-Agent": "QuiltMC Website API"
        }
    })
}
