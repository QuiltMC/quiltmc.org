import * as fs from "fs";

const location = process.env.CSS_LOCATION || "./node_modules/quilt-bulma/dist";
const finalLocation = "./public/assets/css";
const files = fs.readdirSync(location);
if (!fs.existsSync(finalLocation)) {
	fs.mkdirSync(finalLocation);
}
files.forEach((file) => {
	if (file.endsWith(".min.css")) {
		fs.copyFileSync(`${location}/${file}`, `${finalLocation}/${file}`);
	}
});
