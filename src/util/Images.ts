const crypto = await import("crypto")
const path = await import("path")
const fs = await import("fs")
const https = await import("https")

const EXTERNAL_PATH = "./dist/assets/img/external/"

// Download the image and return a local path if the image
// is external
export function image(src: string) {
	if (!fs.existsSync(EXTERNAL_PATH)) {
		fs.mkdirSync(EXTERNAL_PATH)
	}

	const url = new URL(src, "http://placeholder")

	// It is already a relative path
	if (url.origin === "http://placeholder") {
		return src
	}

	const ext = path.extname(url.pathname)
	const key = crypto.createHash('sha256').update(src).digest('hex').slice(0, 12) + ext
	const filePath = EXTERNAL_PATH + key

	if (!fs.existsSync(filePath)) {
		const file = fs.createWriteStream(filePath)

		https.get(src, function(response) {
			response.pipe(file)

			file.on('finish', () => file.close())
		})
	}

	return "/assets/img/external/" + key
}
