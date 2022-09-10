import * as fs from "fs";

const location = process.env.CSS_LOCATION || "./node_modules/quilt-bulma/dist";
const files = fs.readdirSync(location);
files.forEach((file) => {
	if (file.endsWith(".min.css")) {
		fs.copyFileSync(`${location}/${file}`, `./public/assets/css/${file}`);
	}
});
