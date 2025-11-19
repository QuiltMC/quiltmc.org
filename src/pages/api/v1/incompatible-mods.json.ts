import type { APIRoute } from "astro"
import { getCollection } from "astro:content"


export const GET: APIRoute = async () => {
	const incompatibleMods = await getCollection("incomatibleMods")
	return new Response(JSON.stringify(incompatibleMods))
}

