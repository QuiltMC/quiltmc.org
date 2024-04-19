export const NIL_DATE = new Date("0000-01-01T00:00:00Z");

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

export async function tryToRunPromiseWithTimeout(
	signalToPromise,
	timeout,
	retries,
	onTimeout,
	onFail
) {
	const controller = new AbortController();
	retries = retries || 3;

	onTimeout =
		onTimeout ||
		((retriesLeft) => {
			console.error(`promise has timed out: ${retriesLeft} retries left.`);
		});

	onFail =
		onFail ||
		((retries) => {
			throw new Error(`failed to fetch data after ${retries}`);
		});

	let retriesLeft = retries;

	while (true) {
		const timeoutHandle = setTimeout(() => {
			controller.abort();

			if (retriesLeft <= 0) {
				// no retries left!
				onFail(retries);
			} else {
				retriesLeft--;
				onTimeout(retriesLeft);
			}
		}, timeout);

		const responses = await signalToPromise(controller.signal);
		clearTimeout(timeoutHandle);
		return responses;
	}
}

export function linkIssues(text, repo) {
	return text.replaceAll(
		/\[#(\d+)]/g,
		(_, issueNumber) => `[#${issueNumber}](https://quiltmc.org/${repo}/issues/${issueNumber})`
	)
}
