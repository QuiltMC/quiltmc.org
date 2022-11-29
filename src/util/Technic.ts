import { loadGameVersions, GameVersion } from "./Meta";

const loaderTarget = document.getElementById(
	"loader-select"
) as HTMLSelectElement;
const minecraftTarget = document.getElementById(
	"minecraft-select"
) as HTMLSelectElement;
const buttonTarget = document.getElementById(
	"button-target"
) as HTMLAnchorElement;

let gameVersions: GameVersion[] = [];

async function populateMinecraftVersions() {
	const vsns = await loadGameVersions();
	gameVersions = vsns;
	const select = minecraftTarget;
	select.innerHTML = "";

	let sel = -1;
	let idx = 0;
	for (const v of vsns) {
		const opt = document.createElement("option");
		opt.value = v.name;
		opt.textContent = v.name;
		select.appendChild(opt);
		if (sel === -1 && v.stable) {
			sel = idx;
		}
		idx++;
	}
	select.selectedIndex = sel;

	await populateLoaderVersions();
	minecraftTarget.removeAttribute("disabled");
}

async function populateLoaderVersions() {
	loaderTarget.setAttribute("disabled", "");
	buttonTarget.setAttribute("disabled", "");
	buttonTarget.removeAttribute("download");
	buttonTarget.classList.remove("is-primary");

	const mcSel = minecraftTarget;
	const mcVer = gameVersions[mcSel.selectedIndex];

	const vsns = await mcVer.getLoaderVersions();

	const select = loaderTarget;
	select.innerHTML = "";

	for (const v of vsns) {
		const opt = document.createElement("option");
		opt.value = v.version;
		opt.textContent = v.version;
		select.appendChild(opt);
	}

	select.selectedIndex = 0;

	loaderTarget.removeAttribute("disabled");

	await populateButton();
}

async function populateButton() {
	const mcVersion = minecraftTarget.selectedOptions[0];
	const loaderVersion = loaderTarget.selectedOptions[0];

	buttonTarget.href = `https://meta.quiltmc.org/v3/versions/loader/${mcVersion.text}/${loaderVersion.text}/profile/json`;
	buttonTarget.setAttribute("download", "version.json");

	buttonTarget.removeAttribute("disabled");
	buttonTarget.classList.add("is-primary");
}

populateMinecraftVersions();
