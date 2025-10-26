import { defineCollection, z } from "astro:content";
import {glob} from "astro/loaders"

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

export const collections = {blog}
