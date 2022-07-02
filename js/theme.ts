export function checkTheme() {
    const theme = window.localStorage.getItem("theme")

    if (theme === "low-contrast") {
        document.getElementsByTagName("body")[0].setAttribute("data-contrast", "low")
    } else {
        document.getElementsByTagName("body")[0].removeAttribute("data-contrast")
    }
}

export function getTheme(): string | null {
    return window.localStorage.getItem("theme")
}

export function setTheme(theme: string) {
    window.localStorage.setItem("theme", theme)
}

export function toggleContrast() {
    if (getTheme() === "low-contrast") {
        setTheme("default")
    } else {
        setTheme("low-contrast")
    }

    checkTheme()
}

export function setupThemeSwitcher() {
    checkTheme()

    const switcher = document.getElementById("theme-switcher")

    switcher.onclick = (event) => {
        event.preventDefault()

        toggleContrast()
    }
}
