// thanks JS, way to go
export function sortByKey<T, K>(arr: Array<T>, getter: (elem: T) => K) {
    arr.sort((a, b) => {
        const aKey = getter(a);
        const bKey = getter(b);
        if (aKey < bKey) return -1;
        if (aKey > bKey) return 1;
        return 0;
    })
}