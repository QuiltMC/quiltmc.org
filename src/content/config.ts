import { z, defineCollection } from "astro:content";

const blogPost = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.date(),
		extract: z.string().optional(),
		authors: z.array(z.string()),
		image: z.string().optional(),
		imageAlt: z.string().optional()
	})
})
const page = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string()
	})
})