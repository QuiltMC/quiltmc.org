import * as fs from "fs";
import { DateTime, Interval } from "luxon";
import teamData from "../src/data/TeamData.mjs";
import * as paths from "./paths.mjs";
import { sortBy, tryToRunPromiseWithTimeout } from "./util.mjs";

async function main() {
	prepareCacheDirectory();
	copyCSS();
	await queryPluralKit();

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

async function queryPluralKit() {
	const stat = fs.statSync(paths.PK_CACHE_FILE, {
		throwIfNoEntry: false,
	});

	if (stat) {
		const interval = Interval.fromDateTimes(
			DateTime.fromJSDate(stat.mtime),
			DateTime.now()
		);

		const length = interval.length("minutes");
		if (length < 10) {
			const roundedLength = Math.round(length * 100.0) / 100.0;
			console.log(
				`queryPluralKit: using cached PluralKit data; last refresh was ${roundedLength} minutes ago`
			);

			// it's been less than 10 minutes - don't refresh
			return;
		}
	}

	console.log("queryPluralKit: refreshing PluralKit data");

	const systems = [];
	for (const id in teamData) {
		const { systemMembers } = teamData[id];

		if (!systemMembers || !systemMembers.startsWith("pk:")) continue;

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
			const date = DateTime.fromISO(mem.created);
			return date.isValid ? date : DateTime.fromISO("0000-01-01T00:00:00+0000");
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

main();
