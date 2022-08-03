import { t } from "i18next";

export type TextDirection = 'rtl' | 'ltr';
export type Direction = 'left' | 'right';

export class LocaleSettings {
    textDirection: TextDirection;
    rtl: boolean;
    left: Direction;
    right: Direction;
    titleSeparator: string;

    constructor() {
        this.textDirection = t("settings.text-direction");
        this.rtl = this.textDirection == 'rtl';
        this.left = this.rtl ? 'right' : 'left';
        this.right = this.rtl ? 'left' : 'right';
        this.titleSeparator = t("settings.title-separator");
    } 
}

// TODO temporary
const localeSettings: LocaleSettings = new LocaleSettings();

export default localeSettings;
// {% capture text-direction %}{% t settings.text-direction %}{% endcapture %}
// {% capture title-separator %}{% t settings.title-separator %}{% endcapture %}
// {% capture format-date %}{% t settings.formats.date %}{% endcapture %}


// {% if text-direction == "rtl" %}
//     {% assign rtl = true %}
// {% endif %}

// {% if rtl %}
//     {% assign left = "right" %}
//     {% assign right = "left" %}
// {% else %}
//     {% assign left = "left" %}
//     {% assign right = "right" %}
// {% endif %}

// {% capture translated-title %}{% t page.title %}{% endcapture %}
// {% assign title-count = translated-title | size %}

// {% if title-count > 0 %}
//     {% assign title = translated-title %}
// {% elsif page.title %}
//     {% assign title = page.title %}
// {% else %}
//     {% assign title = site.description %}
// {% endif %}

// {% capture translated-description %}{% t page.description %}{% endcapture %}
// {% assign description-count = translated-description | size %}

// {% if description-count > 0 %}
//     {% assign description = translated-description %}
// {% elsif page.description %}
//     {% assign description = page.description %}
// {% else %}
//     {% assign description = site.description %}
// {% endif %}
