export {};

window.addEventListener("load", () => {
	const lowContrast = document.getElementById(
		"low-contrast"
	) as HTMLInputElement;
	const lowContrastState = localStorage.getItem("lowContrast");

	if (lowContrastState) {
		lowContrast.checked = lowContrastState == "true";
	}

	lowContrast.onchange = () => {
		localStorage.setItem("lowContrast", lowContrast.checked.toString());
	};
});
