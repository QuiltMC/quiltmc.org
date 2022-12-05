import { loadGameVersions, GameVersion, LoaderVersion } from "./Meta";

const loaderTarget = document.getElementById(
	"loader-select"
) as HTMLSelectElement;
const minecraftTarget = document.getElementById(
	"minecraft-select"
) as HTMLSelectElement;
const buttonTarget = document.getElementById(
	"button-target"
) as HTMLAnchorElement;

async function populateMinecraftVersions() {
	const vsns = await loadGameVersions();
	const select = minecraftTarget;
	select.innerHTML = "";

	let options = vsns.map((v) => {
		const opt = document.createElement("option");
		opt.value = v.name;
		opt.textContent = v.name;
		return opt;
	});
	select.append(...options);
	select.oninput = () => {
		populateLoaderVersions(vsns[select.selectedIndex]);
	};
	select.selectedIndex = vsns.findIndex((v) => v.stable);
	await populateLoaderVersions(vsns[select.selectedIndex]);

	minecraftTarget.removeAttribute("disabled");
}

async function populateLoaderVersions(gameVersion: GameVersion) {
	loaderTarget.setAttribute("disabled", "");
	buttonTarget.setAttribute("disabled", "");
	buttonTarget.removeAttribute("download");

	const vsns = await gameVersion.getLoaderVersions();

	const select = loaderTarget;
	select.innerHTML = "";

	let options = vsns.map((v) => {
		const opt = document.createElement("option");
		opt.value = v.version;
		opt.textContent = v.version;
		return opt;
	});
	select.append(...options);

	select.selectedIndex = 0;
	select.oninput = () => {
		populateButton(gameVersion, vsns[select.selectedIndex]);
	};
	await populateButton(gameVersion, vsns[select.selectedIndex]);
	loaderTarget.removeAttribute("disabled");
}

async function populateButton(
	gameVersion: GameVersion,
	loaderVersion: LoaderVersion
) {
	buttonTarget.href = `https://meta.quiltmc.org/v3/versions/loader/${gameVersion.name}/${loaderVersion.version}/profile/json`;

	buttonTarget.setAttribute("download", "version.json");

	buttonTarget.removeAttribute("disabled");
	buttonTarget.classList.add("is-primary");
}

populateMinecraftVersions();
