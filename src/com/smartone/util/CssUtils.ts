/**
 * util/CssUtils
 **/
import StringUtils from '@smt/util/StringUtils';
import ObjectUtils from '@smt/util/ObjectUtils';
/**
 * @public
 */
export interface CssStyles {
	[key: string]: any;
}
export function optCss(property: string, value: string|number|null|undefined): string{
	if(typeof(value) == "undefined") {
		return "";
	}
	if(value == null) {
		return "";
	}
	if(typeof(property) !== "string"){
		return "";
	}
	if(StringUtils.isBlank(property)){
		return "";
	}

	if(typeof(value) === "string"){
		if(StringUtils.isBlank(value)){
			return "";
		}
	}else if(typeof(value) === "object"){
		return "";
	}

	return `${property}:${value};`;
}
export function optCssFromStylesProp(property: string, styles: CssStyles, stylesProp: string): string {
	const value: string = ObjectUtils.optString(styles, stylesProp);
	return optCss(property, value);
}
// border
function borderCss(property: string, borderStyles: CssStyles): string {
	if(ObjectUtils.isNotObject(borderStyles)){
		return "";
	}
	const value: string = `${ObjectUtils.optString(borderStyles, "width")} ${ObjectUtils.optString(borderStyles, "color")} ${ObjectUtils.optString(borderStyles, "style")}`;
	return optCss(property, value);
}
export function border(borderStyles: CssStyles): string {
	return borderCss("border", borderStyles);
}
export function borderLeft(borderStyles: CssStyles): string {
	return borderCss("border-left", borderStyles);
}
export function borderTop(borderStyles: CssStyles): string {
	return borderCss("border-top", borderStyles);
}
export function borderRight(borderStyles: CssStyles): string {
	return borderCss("border-right", borderStyles);
}
export function borderBottom(borderStyles: CssStyles): string {
	return borderCss("border-bottom", borderStyles);
}
// button
export function buttonCss(styles: CssStyles): string {
	return ObjectUtils.isNotObject(styles) ? "" : `
		${optCss("border-radius"   , styles['border-radius'])}
		${optCss('background-color', styles['background-color'])}
		${optCss('color'           , styles['color'])}
		${border(styles['border'])}
	`;
}
// size
export type SizeVariation = "smaller" | "larger";
export interface Size {
	width? : string;
	height?: string;
}
export function sizeCss(sizeStyles: Size | null | undefined): string {
	if(!sizeStyles) {
		return "";
	}
	return ObjectUtils.isNotObject(sizeStyles) ? "" : `
		${optCss("width" , sizeStyles.width)}
		${optCss("height", sizeStyles.height)}
	`;
}
export function isRem(s: string | undefined): boolean {
	const r = new RegExp("^([0-9]+[.])?[0-9]+rem$");
	return (s === undefined) ? false : r.test(s);
}
export default {
	optCss: optCss,
	optCssFromStylesProp: optCssFromStylesProp,

	// single rule
	border      : border,
	borderTop   : borderTop,
	borderLeft  : borderLeft,
	borderBottom: borderBottom,
	borderRight : borderRight,

	// multiple rules
	buttonCss: buttonCss
};