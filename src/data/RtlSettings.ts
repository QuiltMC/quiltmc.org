import i18next, { t } from "i18next";

export type TextDirection = 'rtl' | 'ltr';
export type Direction = 'left' | 'right';

export interface RtlSettings {
    textDirection: TextDirection;
    rtl: boolean;
    left: Direction;
    right: Direction;
}

export default (): RtlSettings => {
    const textDirection = i18next.dir();
    const rtl = textDirection == 'rtl';
    return {
        textDirection,
        rtl,
        left: rtl ? 'right' : 'left',
        right: rtl ? 'left' : 'right'
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
