import * as fs from "fs";
import * as paths from "./paths.mjs";
import { tryToRunPromiseWithTimeout, linkIssues } from "./util.mjs";

async function main() {
	prepareCacheDirectory();
	copyCSS();
	await Promise.all([queryChangelogs()]);

	console.log("preprocess: done\n");
}

function prepareCacheDirectory() {
	if (!fs.existsSync(paths.CACHE_DIR)) {
		console.log(
			"prepareCacheDirectory: cache directory does not exist; creating"
		);

		fs.mkdirSync(paths.CACHE_DIR);
	}
}

function copyCSS() {
	const files = fs.readdirSync(paths.CSS_LOCATION);

	if (!fs.existsSync(paths.CSS_FINAL_LOCATION)) {
		fs.mkdirSync(paths.CSS_FINAL_LOCATION);
	}

	files.forEach((file) => {
		if (file.endsWith(".min.css")) {
			console.log(`copyCSS: copying ${file}`);

			fs.copyFileSync(
				`${paths.CSS_LOCATION}/${file}`,
				`${paths.CSS_FINAL_LOCATION}/${file}`
			);
		}
	});
}
async function queryChangelogs() {
	if (fs.existsSync(paths.CHANGELOG_DIR)) {
		console.log("queryChangelogs: using existing changelog data");
		return;
	}

	console.log("queryChangelogs: refreshing changelog data");
	fs.mkdirSync(paths.CHANGELOG_DIR);

	// We're supposed to query the GitHub API for repositories with a changelog, through custom properties,
	// although it appears to be broken right now. This will have to be hardcoded for now.
	//
	// Query : https://api.github.com/search/repositories?q=org:quiltmc+props.has-changelog:true
	// Report : https://github.com/orgs/community/discussions/111042
	const projects = {
		"enigma": "SINGLE",
		"launchermeta-parser": "SINGLE",
		"quilt-config": "SINGLE",
		"quilt-installer": "SINGLE",
		"quilt-loader": "SPLIT"
	};

	for (const [project, strategy] of Object.entries(projects)) {
		switch (strategy) {
			case "SINGLE":
				const response = await tryToRunPromiseWithTimeout(
					(signal) =>
						fetch(`https://api.github.com/repos/quiltmc/${project}/contents/CHANGELOG.md`, {
							headers: {
								"Accept": "application/vnd.github.v3.raw",
							},
							signal,
						}),
					3 * 1000,
					(retriesLeft) => {
						console.error(
							`queryChangelogs: failed to download changelog for ${project}; ${retriesLeft} retries left`
						);
					},
					(retries) => {
						throw new Error(
							`queryChangelogs: failed to download changelog for ${project} after ${retries} retries`
						);
					}
				);

				console.log(`queryChangelogs: writing to changelog cache for ${project}`);
				fs.mkdirSync(`${paths.CHANGELOG_DIR}/${project}`);

				const versionRegex = /^# (?<version>.+?)\n(?<body>(.|\n)+?)(?=^# |$(?![\r\n]))/gm;
				const fullChangelog = await response.text();
				let match;

				while ((match = versionRegex.exec(fullChangelog)) !== null) {
					const { version, body } = match.groups;

					fs.writeFileSync(`${paths.CHANGELOG_DIR}/${project}/${version}.md`, linkIssues(body, project));
				}
				break;
			case "SPLIT":
				const index = await tryToRunPromiseWithTimeout(
					(signal) =>
						fetch(`https://api.github.com/repos/quiltmc/${project}/contents/src/main/resources/changelog`, {
							headers: {
								"Accept": "application/vnd.github.v3.raw",
							},
							signal,
						}),
					3 * 1000,
					(retriesLeft) => {
						console.error(
							`queryChangelogs: failed to download changelog index for ${project}; ${retriesLeft} retries left`
						);
					},
					(retries) => {
						throw new Error(
							`queryChangelogs: failed to download changelog index for ${project} after ${retries} retries`
						);
					}
				);

				const changelogIndex = await index.json();

				fs.mkdirSync(`${paths.CHANGELOG_DIR}/${project}`, { recursive: true });

				const promises = []

				for (const entry of changelogIndex) {
					const version = entry.name.replace(/\.[^/.]+$/, "");

					promises.push(tryToRunPromiseWithTimeout(
						(signal) =>
							fetch(entry.download_url, {
								headers: {
									"Accept": "application/vnd.github.v3.raw",
								},
								signal,
							}),
						3 * 1000,
						(retriesLeft) => {
							console.error(
								`queryChangelogs: failed to download changelog for ${project}; ${retriesLeft} retries left`
							);
						},
						(retries) => {
							throw new Error(
								`queryChangelogs: failed to download changelog for ${project} after ${retries} retries`
							);
						}
					).then(r => r.text())
						.then(body => fs.writeFileSync(`${paths.CHANGELOG_DIR}/${project}/${version}.md`, linkIssues(body, project))));
				}

				console.log(`queryChangelogs: writing to changelog cache for ${project}`);
				await Promise.all(promises);
		}
	}
}

main();
