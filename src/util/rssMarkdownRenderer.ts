// Markdown renderer with a stripped-down configuration for rendering RSS posts

import { createMarkdownProcessor } from '@studiocms/markdown-remark/core';

const processor = await createMarkdownProcessor({
	studiocms: {
		autolink: false
	}
})

export async function render(content: string) {
	const result = await processor.render(content)

	return {
		html: result.astroHTML,
		meta: result.metadata
	}
}
