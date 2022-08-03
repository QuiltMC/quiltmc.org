export type TextDirection = 'rtl' | 'ltr';
export type Direction = 'left' | 'right';

export class Settings {
    textDirection: TextDirection;
    rtl: boolean;
    left: Direction;
    right: Direction;

    constructor(textDirection: TextDirection) {
        this.textDirection = textDirection;
        this.rtl = this.textDirection == 'rtl';
        this.left = this.rtl ? 'right' : 'left';
        this.right = this.rtl ? 'left' : 'right';
    } 
}

// TODO temporary
export const settings: Settings = new Settings('ltr');

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
