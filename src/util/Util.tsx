// thanks JS, way to go
export function sortBy<T, K>(arr: Array<T>, by: (elem: T) => K) {
    arr.sort((a, b) => {
        const aKey = by(a);
        const bKey = by(b);
        if (aKey < bKey) return -1;
        if (aKey > bKey) return 1;
        return 0;
    })
}