import { defineCollection, z } from "astro:content";
import {file, glob} from "astro/loaders"

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

const incompatibleMods = defineCollection({
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
		note: z.optional(z.string()),
		icon: z.string().url()
	})
})

const teamMembers = defineCollection({
	loader: file("src/data/teamMembers.json", {parser: (text) => {
		let data = JSON.parse(text) as any[]
		data.forEach((entry) => entry.id = entry.github)
		return data
	}}),
	schema: z.object({
			name: z.string(),
			discord: z.string(),
			github: z.string(),
			avatar: z.string().optional(),
			description: z.string().optional(),
			links: z.array(z.object({
				icon: z.string(),
				url: z.string().url()
			})).optional(),
			teams: z.array(z.enum([
				// I wish we could define this array elsewhere, but Zod doesn't like it.
				"admin-board",
				"build-tools",
				"community-managers",
				"community-tooling",
				"events",
				"infrastructure",
				"loader",
				"mappings",
				"moderators",
				"outreach",])).default([]),
			systemMembers: z.array(z.object({
				name: z.string(),
				icon: z.string().url()
			})).or(z.literal("---")).optional()
		})
})

export const collections = {blog, incompatibleMods, teamMembers}
