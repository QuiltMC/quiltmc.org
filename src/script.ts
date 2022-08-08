export {};

const low_contrast = document.getElementById("low_contrast");
const low_contrast_state = localStorage.getItem("low_contrast");
if (low_contrast_state) {
	low_contrast.checked = low_contrast_state;
}

low_contrast.onchange = () => {
	localStorage.setItem("low-contrast", low_contrast.checked);
};
