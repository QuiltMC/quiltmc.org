import i18next, { t } from "i18next";

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
