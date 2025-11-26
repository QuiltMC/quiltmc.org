// Markdown renderer with a stripped-down configuration for rendering RSS posts

import { type MarkdownProcessorRenderOptions, createMarkdownProcessor } from '@studiocms/markdown-remark-processor';

const processor = await createMarkdownProcessor({
	studiocms: {
		autolink: false
	}
})

export async function render(content: string, options?: MarkdownProcessorRenderOptions) {
	const result = await processor.render(content, options)

	return {
		html: result.astroHTML,
		meta: result.metadata
	}
}
