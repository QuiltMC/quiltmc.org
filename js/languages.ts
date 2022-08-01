export function showLanguages(event: Event = null) {
    event?.preventDefault()

    const modal = document.getElementById("language-modal")

    modal.classList.add("is-active")
}

export function hideLanguages(event: Event = null) {
    event?.preventDefault()

    const modal = document.getElementById("language-modal")

    modal.classList.remove("is-active")
}

export function setupLanguages() {
    const button = document.getElementById("language-switcher")
    const modal = document.getElementById("language-modal")
    const background = document.getElementById("language-modal-background")
    const closeButton = document.getElementById("language-modal-close-button")

    button.onclick = showLanguages
    background.onclick = hideLanguages
    closeButton.onclick = hideLanguages
}
