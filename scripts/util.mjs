export function sortBy(arr, by) {
	arr.sort((a, b) => {
		const aKey = by(a);
		const bKey = by(b);
		if (aKey < bKey) return -1;
		if (aKey > bKey) return 1;
		return 0;
	});
	return arr;
}
