// This Cloudflare Function is used to redirect to the right language path
// Sorry for the horrible code, but we have to keep it as small as possible

export function onRequest(c) {
	const l = (c.request
		.headers
		.get("Accept-Language") || "")
		.split(",")
		.map(e => e.trim().split(";")[0].slice(0, 2))  // Remove all the junk like weight
		.find(e => al.includes(e)) || "en"

	return new Response("", { headers: { "Location": "/" + l + (new URL(c.request.url).pathname) }, status: 307 })
}
