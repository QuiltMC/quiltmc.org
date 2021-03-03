import { Controller } from "stimulus"

const LOADANI_HTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'

// Base "snippet" controller used for controllers that read metadata and update
// some strings on a page.
//
// A "snippet" is a part of the page containing `{tag_name}` tags, which can be
// filled in by calling the `set_snippets` or `set_all` functions.
export default abstract class SnippetController extends Controller {
    static targets = [ "snippet" ]
    declare readonly snippetTargets: SnippetElem[]

    // Override in subclass. Should return a list of all tags supported by this
    // controller.
    abstract get_all_tags(): string[]

    // Sets up the snippet controller. This must be called if you override
    // `connect`.
    connect() {
        for (const snip of this.snippetTargets) {
            snip.originalHTML = snip.innerHTML
        }
    }

    // Replaces the entire content of all snippet elements with some HTML.
    replace_content(content: string) {
        for (const snip of this.snippetTargets) {
            const width = snip.offsetWidth
            const height = snip.offsetHeight
            snip.innerHTML = `<div class="loading-container"
            style="width: ${width}px; height: ${height}px;">${content}</div>`
        }
    }

    // Replaces all snippet elements with a loading animation.
    set_loading() {
        this.replace_content(LOADANI_HTML)
    }

    // Replaces all snippet elements with an error message.
    set_error(msg: string) {
        this.replace_content(msg)
    }

    // Replaces all tags with the given text.
    set_all(str: string) {
        for (const snip of this.snippetTargets) {
            let html = snip.originalHTML
            for (const key of this.get_all_tags()) {
                html = replace_tags(html, key, str)
            }
            snip.innerHTML = html
        }
    }

    // Updates the tags corresponding to each key in `strs` with the string
    // associated with that key.
    set_snippets(strs: {[key: string]: string}) {
        for (const snip of this.snippetTargets) {
            let html = snip.originalHTML
            for (const key of Object.keys(strs)) {
                html = replace_tags(html, key, strs[key] as string)
            }
            snip.innerHTML = html
        }
    }

    // Checks if the given tag name is actually present in any snippet element.
    has_tag(tag: string): boolean {
        for (const snip of this.snippetTargets) {
            if (snip.originalHTML.includes(`{${tag}}`)) {
                return true
            }
        }
        return false
    }
}

interface SnippetElem extends Element {
    originalHTML: string
    offsetWidth: number
    offsetHeight: number
}

function replace_tags(str: string, tag: string, content: string): string {
    return str.replace(new RegExp(`{${tag}}`, 'g'), content)
}

