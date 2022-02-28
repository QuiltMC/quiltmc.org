import { Controller } from "stimulus"

export default class extends Controller {
    static targets = [ "menu" ]

    private menuTargets: HTMLElement[];

    toggle () {
        this.menuTargets.forEach((elem) => {
            elem.classList.toggle("is-active")
        })
    }
}
