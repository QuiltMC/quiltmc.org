import i18next, { t } from "i18next";
import { execa } from "execa";

// thanks JS, way to go
export function sortBy<T, K>(arr: T[], by: (elem: T) => K): T[] {
	arr.sort((a, b) => {
		const aKey = by(a);
		const bKey = by(b);
		if (aKey < bKey) return -1;
		if (aKey > bKey) return 1;
		return 0;
	});
	return arr;
}

export function sortByDescending<T, K>(arr: T[], by: (elem: T) => K): T[] {
	arr.sort((a, b) => {
		const aKey = by(a);
		const bKey = by(b);
		if (aKey < bKey) return 1;
		if (aKey > bKey) return -1;
		return 0;
	});
	return arr;
}

export function localizePath(path?: string, locale?: string | null): string {
	return "/" + (locale || i18next.language) + path;
}

export function localizeList(list: string[]): string {
	return list.reduce((prev, next) => t("serial-comma", { prev, next }));
}

export async function getModifyDate(file: string): Promise<Date> {
	const output = await execa("git", ["log", "-1", '--pretty="%ct"', file]);
	const timestamp = parseInt(output.stdout.replaceAll('"', ""));

	// JS expects the time to be in milliseconds and not seconds
	return new Date(timestamp * 1000);
}
