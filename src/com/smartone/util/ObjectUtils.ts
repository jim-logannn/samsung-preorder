/**
 * util/ObjectUtils
 **/

import deepmerge from "deepmerge";

/**
 * @public
 */
export function isObject(obj: any): boolean {
	return (typeof obj === 'object') && (obj !== null) && (obj !== undefined);
}
export function isNotObject(obj: any): boolean {
	return !isObject(obj);
}
export function hasKey(obj: any, key: string): boolean {
	return isObject(obj) && (key in obj);
}
export function optValue(obj: any, key: string, defaultValue: any = undefined): any {
	if(isObject(obj)){
		if(hasKey(obj, key)){
			return obj[key];
		}
	}
	return defaultValue;
}
export function optBoolean(obj: any, key: string, defaultValue: boolean = false): boolean {
	const val = optValue(obj, key, defaultValue);
	return (val === true) || (val == 'true');
}
export function optString(obj: any, key: string, defaultValue: string = ""): string {
	return optValue(obj, key, defaultValue) + "";
}
export function optNumber(obj: any, key: string, defaultValue: number): number {
	const value = optValue(obj, key, defaultValue);
	return (typeof(value) == "number") ? value : defaultValue;
}
export function optArray(obj: any, key: string, defaultValue: any[]): any[] {
	const value = optValue(obj, key, defaultValue);
	return Array.isArray(value) ? value : defaultValue;
}
export function defaultProp<T, P>(props: T | undefined, property: keyof T, value: P): T {
	if(props) {
		if(property in props) {
			const propValue = props[property];
			if(propValue !== undefined) {
				return props;
			}
		}
	}
	let result = { ...props } as T;
	result[property] = value as any;
	return result;
}
export function getDefinedObject<T>(value: T | undefined): T {
	return (typeof(value) != 'undefined') ? value : {} as T;
}
export function mergeValue<T, V>({object, key, value}: { object?: T; key: keyof T; value: V; }): T {
	const clone: T = object ? JSON.parse(JSON.stringify(object)) : {} ;
	const merge: any = { [key]: value };
	const result = Object.assign(clone, merge);
	return result;
}
export function deepMergeObject<T> (source: Partial<T>, target: Partial<T> | undefined): T {
	return deepmerge(source, target ? target : {});
}
export default {
	isObject,
	isNotObject,
	hasKey,
	optValue,
	optBoolean,
	optString,
	getDefinedObject,
	mergeValue
};