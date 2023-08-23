import rss from "@astrojs/rss";

const postImportResult = import.meta.glob("./en/blog/**/*.md", { eager: true });
const posts = Object.values(postImportResult);

// TODO(apple): Multiple feeds, one per language (RSS doesn't support multi-language feeds).
// That would be too easy.
export const get = () =>
	rss({
		// `<title>` field in output xml
		title: "The Quilt Project",
		// `<description>` field in output xml
		description: "The mod-loader that cares.",
		// base URL for RSS <item> links
		site: import.meta.env.SITE,
		// list of `<item>`s in output xml
		items: posts.map((post) => ({
			link: post.url,
			title: post.frontmatter.title,
			pubDate: post.frontmatter.date,
			description: post.compiledContent(),
		})),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
