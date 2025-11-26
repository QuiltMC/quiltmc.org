import rss, { RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { render } from "studiocms:markdown-remark";

let posts = await getCollection("blog");
posts.sort((a, b) => { // I don't know why they don't come pre-sorted, but here we are.
	 return a.data.date.getTime() - b.data.date.getTime()
})

export async function GET() {
	const rssItems: RSSFeedItem[] = await Promise.all(posts.map(async (post) => ({
		link: `/en/blog/${post.id}`,
		title: post.data.title,
		pubDate: post.data.date,
		description: await htmlString(post.data.excerpt ?? ""),
		content: await htmlString(post.body ?? "")
	})))
	return rss({
		// `<title>` field in output xml
		title: "The Quilt Project",
		// `<description>` field in output xml
		description: "The mod-loader that cares.",
		// base URL for RSS <item> links
		site: import.meta.env.SITE,
		// list of `<item>`s in output xml
		items: rssItems,
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}

async function htmlString(markdown: string): Promise<string> {
	return (await render(markdown)).html.toString()
}
