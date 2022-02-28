import { Controller } from "stimulus"

export default class extends Controller {
    static targets = [ "sidebar" ]
    private sidebarTarget: HTMLElement;

    toggle () {
        this.sidebarTarget.classList.toggle("is-hidden-mobile")

        if (this.sidebarTarget.dataset["scroll-to-top"] === "true") {
            window.scroll(0, 0)
        }
    }
}
