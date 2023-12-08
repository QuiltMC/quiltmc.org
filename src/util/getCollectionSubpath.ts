import { getCollection, type ContentCollectionKey, CollectionEntry} from "astro:content";

export async function getCollectionSubpath(searchCollection: ContentCollectionKey, path: string) {
	var collectionsInPath: CollectionEntry<typeof searchCollection>[] = []
	const collection = await getCollection(searchCollection)
	for (var entry of collection) {
		if (entry.slug.startsWith(path)) {
			collectionsInPath.push(entry)
		}
		return collectionsInPath
	}
	getCollection('blog')
}