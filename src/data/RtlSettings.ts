import i18next from "i18next";

export type TextDirection = "rtl" | "ltr";
export type Direction = "left" | "right";

export interface RtlSettings {
	textDirection: TextDirection;
	rtl: boolean;
	left: Direction;
	right: Direction;
}

export default (): RtlSettings => {
	const textDirection = i18next.dir();
	const rtl = textDirection == "rtl";
	return {
		textDirection,
		rtl,
		left: rtl ? "right" : "left",
		right: rtl ? "left" : "right",
	};
};
