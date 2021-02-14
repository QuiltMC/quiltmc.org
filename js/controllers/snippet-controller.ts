import { Controller } from "stimulus"

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

    // Replaces all tags with the given text.
    set_all(str: string) {
        for (const snip of this.snippetTargets) {
            snip.innerHTML = snip.originalHTML
            for (const key of this.get_all_tags()) {
                snip.innerHTML = replace_tags(snip.innerHTML, key, str)
            }
        }
    }

    // Updates the tags corresponding to each key in `strs` with the string
    // associated with that key.
    set_snippets(strs: Object) {
        for (const snip of this.snippetTargets) {
            snip.innerHTML = snip.originalHTML
            for (const key in strs) {
                snip.innerHTML = replace_tags(snip.innerHTML, key, strs[key])
            }
        }
    }
}

interface SnippetElem extends Element {
    originalHTML: string
}

function replace_tags(str: string, tag: string, content: string): string {
    return str.replace(new RegExp(`{${tag}}`, 'g'), content)
}

