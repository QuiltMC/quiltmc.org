export {};

const lowContrast = document.getElementById("low_contrast") as HTMLInputElement;
const lowContrastState = localStorage.getItem("low_contrast");
if (lowContrastState) {
	lowContrast.checked = lowContrastState == "true";
}

if (lowContrast) {
	lowContrast.onchange = () => {
		localStorage.setItem("low-contrast", lowContrast.checked.toString());
	};
}
