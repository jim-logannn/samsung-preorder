/**
 * util/ArrayUtils
 **/
/*
export function contentEquals(array1, array2){
	const b1 = Array.isArray(array1);
	const b2 = Array.isArray(array2);

	if(b1 && b2) {
		// compare content
		if(array1.length != array2.length){
			return false;
		}
		for(var i=0 ; i < array1.length ; i++){
			if(array1[i] !== array2[i]){
				return false;
			}
		}
		return true;
	}

	if( (!b1) && (!b2) ) {
		return true;
	}
	return false;
}*/
export function arrayEquals(a:any, b:any): boolean {
	return Array.isArray(a) &&
	  Array.isArray(b) &&
	  (a as Array<any>).length === (b as Array<any>).length &&
	  (a as Array<any>).every((val: any, index: number) => val === (b as Array<any>)[index]);
}
export function isEmpty(array: any): boolean {
	return !isNotEmpty(array);
}
export function isNotEmpty(array: any):boolean  {
	return array && Array.isArray(array) && ((array as Array<any>).length > 0);
}
export function getElement<T>(array: T[] | undefined, index: number): T | undefined {
	return (array && (array.length > index)) ? array[index] : undefined ;
}
interface HasId {
	id: string
}
export function compareHasId(a: HasId, b: HasId) {
	if (a.id < b.id) {
		return -1;
	}
	if (a.id > b.id) {
		return 1;
	}
	return 0;
}
export function findElementBy<T extends Record<string, any>>(items: T[], key: string, value: any): T | undefined {
	let result: T | undefined = undefined;
	items.some((element) => {
		if(key in element) {
			if(element[key] === value) {
				result = element;
				return true;
			}
		}
		return false;
	});
	return result;
}
export function findElementById<T extends { id: string; }>(items: T[], id: string): T | undefined {
	return findElementBy(items, "id", id);
	/*
	let result: T | undefined = undefined;
	items.some((element) => {
		if(element.id == id) {
			result = element;
			return true;
		}
		return false;
	});
	return result;
	*/
}
export default {
	isEmpty,
	isNotEmpty,
	arrayEquals,
	getElement
};