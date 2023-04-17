import * as fs from "fs";
import teamData from "../src/data/TeamData.mjs";
import * as paths from "./paths.mjs";
import { sortBy, tryToRunPromiseWithTimeout, NIL_DATE } from "./util.mjs";
import fetch from "node-fetch";
import glob from "glob";

async function main() {
	prepareCacheDirectory();
	copyCSS();
	generateRedirectFunctions();
	await Promise.all([queryPluralKit(), queryTeamInfo()]);

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

function generateRedirectFunctions() {
	const functionSource = fs.readFileSync(paths.REDIRECT_FUNCTION_LOCATION).toString('utf8');

	const allLanguages = glob.sync(paths.SOURCE_LOCATION + "??/")
		.map((file) => file.slice(-3, -1));
	console.log(`Found ${allLanguages.length} languages`);

	const pathPrefix = paths.SOURCE_LOCATION + "en";

	glob(paths.SOURCE_LOCATION + "en/**/*.md?(x)", function (_, files) {
		files.forEach((file) => {
			file = file.slice(pathPrefix.length)
				.split(".")
				.slice(0, -1)
				.join(".");

			const availableLanguages = [];
			allLanguages.forEach((language) => {
				try {
					fs.statSync(paths.SOURCE_LOCATION + language + file + ".md")
					availableLanguages.push(language)
				} catch {
					try {
						fs.statSync(paths.SOURCE_LOCATION + language + file + ".mdx")
						availableLanguages.push(language)
					} catch {}
				}
			})

			const functionLocation = paths.FUNCTION_LOCATION + file + ".js";
			const parentFolder = functionLocation.split("/").slice(0, -1).join("/");

			fs.mkdirSync(parentFolder, { recursive: true });
			const content = `const al = [${availableLanguages.map(l => '"' + l + '"').join(", ")}]\n${functionSource}`;
			fs.writeFile(functionLocation, content, () => null);
		})
	})
}

async function queryPluralKit() {
	if (fs.existsSync(paths.PK_CACHE_FILE)) {
		console.log("queryPluralKit: using existing PluralKit data");
		return;
	}

	console.log("queryPluralKit: refreshing PluralKit data");

	const systems = [];
	for (const id in teamData) {
		const { systemMembers } = teamData[id];

		if (typeof systemMembers !== "string" || !systemMembers.startsWith("pk:")) continue;

		const pkId = systemMembers.slice("pk:".length);
		systems.push(pkId);
	}

	console.log(`queryPluralKit: loading system data for systems ${systems}`);

	const responses = await tryToRunPromiseWithTimeout(
		(signal) =>
			Promise.all(
				systems.map((id) =>
					fetch(`https://api.pluralkit.me/v2/systems/${id}/members`, {
						signal,
					}).then((r) => r.json().then((json) => [id, json]))
				)
			),
		15 * 1000,
		(retriesLeft) => {
			console.error(
				`queryPluralKit: failed to download PK data; ${retriesLeft} retries left`
			);
		},
		(retries) => {
			throw new Error(
				`queryPluralKit: failed to download PK data after ${retries} retries`
			);
		}
	);

	const data = {};
	for (const [id, response] of responses) {
		if (!Array.isArray(response)) {
			// This ensures that private lists are fine but actual errors aren't
			if (response.code !== 0) {
				data[id] = [];
				continue;
			} else {
				throw new Error(
					`queryPluralKit: an attempt to fetch a member list has returned a server error! ${response}`
				);
			}
		}

		// TODO add custom ordering
		const result = sortBy(response, (mem) => {
			const date = Date.parse(mem.created);
			return Number.isNaN(date) ? NIL_DATE : new Date(date);
		}).map((raw) => {
			return {
				name: raw.name,
				avatarUrl: raw.avatar_url,
			};
		});

		data[id] = result;
	}

	console.log("queryPluralKit: writing to PluralKit cache");
	fs.writeFileSync(paths.PK_CACHE_FILE, JSON.stringify(data));
}

async function queryTeamInfo() {
	if (fs.existsSync(paths.TEAM_INFO_CACHE_FILE)) {
		console.log("queryTeamInfo: using existing team data");
		return;
	}

	const response = await tryToRunPromiseWithTimeout(
		(signal) =>
			fetch("https://team-info.quiltmc.org/"),
		15 * 1000,
		(retriesLeft) => {
			console.error(
				`queryTeamInfo: failed to download team data; ${retriesLeft} retries left`
			);
		},
		(retries) => {
			throw new Error(
				`queryTeamInfo: failed to download team data after ${retries} retries`
			);
		}
	);

	console.log("queryTeamInfo: writing to team info cache");
	fs.writeFileSync(paths.TEAM_INFO_CACHE_FILE, await response.text());
}

main();
