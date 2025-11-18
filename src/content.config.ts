import { defineCollection, z } from "astro:content";
import {file, glob} from "astro/loaders"
import { console } from "inspector";

const blog = defineCollection({
	loader: glob({pattern: "**/*.md", base: "src/data/blog"}),
	schema: z.object({
		title: z.string(),
		date: z.date(),
		authors: z.array(z.string()),
		excerpt: z.string(),
		includeExcerptInMainPost: z.boolean().default(false),
		language: z.enum(["en"]).default("en") // This will come in useful later
	})
})

const incomatibleMods = defineCollection({
	// A custom parser is necessary because Astro requires an id field which these entries don't have
	loader: file("src/data/incompatible-mods.json", {parser: (text) => {
		let parsedContent: any[] = JSON.parse(text)
		parsedContent.forEach((content, index) => content.id = index)
		return parsedContent
	}}),
	schema: z.object({
		ids: z.array(z.string()),
		name: z.string(),
		type: z.enum(["GAME", "OTHERS", "SELF", "WORKAROUND"]),
		status: z.enum(["BLOCKED", "IN_PROGRESS", "NO_ANSWER", "ON_HOLD", "UNKNOWN", "WONT_FIX"]),
		tracking: z.string().url().or(z.literal("UNKNOWN")),
		icon: z.string().url()
	})
})

export const collections = {blog, incomatibleMods}
