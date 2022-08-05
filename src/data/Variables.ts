import i18next, { t } from "i18next";
import config from "./Site";

export type TextDirection = 'rtl' | 'ltr';
export type Direction = 'left' | 'right';

export default class Variables {
    textDirection: TextDirection;
    rtl: boolean;
    left: Direction;
    right: Direction;
    
    title: string;
    description: string;

    titleSeparator: string;

    constructor(title?: string, description?: string) {
        this.textDirection = t("setting-text-direction");
        this.rtl = this.textDirection == 'rtl';
        this.left = this.rtl ? 'right' : 'left';
        this.right = this.rtl ? 'left' : 'right';
        
        this.title = tryToTranslateOr(title, config.description)
        this.description = tryToTranslateOr(description, config.description)

        this.titleSeparator = t("setting-title-separator");
    }    
}

function tryToTranslateOr(key: string | undefined, or: string): string {
    if (i18next.exists(key)) {
        return t(key);
    } else if (key) {
        return key;
    } else {
        return or;
    }
}


// {% capture text-direction %}{% t settings.text-direction %}{% endcapture %}
// {% capture title-separator %}{% t settings.title-separator %}{% endcapture %}
// {% capture format-date %}{% t settings.formats.date %}{% endcapture %}


// {% capture translated-description %}{% t page.description %}{% endcapture %}
// {% assign description-count = translated-description | size %}

// {% if description-count > 0 %}
//     {% assign description = translated-description %}
// {% elsif page.description %}
//     {% assign description = page.description %}
// {% else %}
//     {% assign description = site.description %}
// {% endif %}
