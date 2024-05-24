/**
 * util/StringUtils
 **/

/**
 * @public
 */
export function isBlank(s: any): boolean{
	if((s == null)||(s == undefined)){
		return true;
	}
	if(typeof(s) !== "string"){
		return false;
		//throw Error(s + " is not string");
	}
	return ((s as string)||"").trim() == "";
}
export function isNotBlank(s: any): boolean {
	return !isBlank(s);
}
export function isDigitOnly(s: any): boolean {
	if(typeof(s) != 'string') {
		return false;
	}
	const reg = /^\d+$/;
	return reg.test(s);
}
export function isPassportFourCharacters(s: any): boolean {
	if(typeof(s) != 'string') {
		return false;
	}
	const reg = /^[a-zA-Z0-9]{1}[0-9]{3}$/i;
	return reg.test(s);
}
export function randomId(length: number):string {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
export function formatPrice(x: number): string {
	if (isBlank(x)){
		return "";
	}
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
export function formatCurrencyPrice(currency: string, x: number, format: 'string' | 'array' = 'string'): string | string[] {
	const neg: string = (x < 0) ? "-" : "" ;
	const output = [neg, currency, formatPrice(Math.abs(x))];
	if (format === 'array') {
		return output
	}
	return output.join(' ');
}
export function formatDefaultCurrencyPrice(x: number, format: 'string' | 'array' = 'string'): ReturnType<typeof formatCurrencyPrice> {
	return formatCurrencyPrice('HK$', x, format)
}
export function noUndefined(s: string | undefined): string {
	return (s == undefined) ? "" : s;
}
export function isChineseCharacter(s:string){
	var pattern = /[^\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g;
	return (s != null) && (typeof s === 'string')  && (s != '') && !s.match(pattern);
}
export function parseCapacity(s: string): number | undefined {
	const k = 1024;
	const sizes = ['BYTES', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	for (let i=0;i<sizes.length;i++){
		const pattern = new RegExp("^\\d+( *)("+sizes[i]+")$");
		if(pattern.test(s.toUpperCase())){			
			return parseInt(s.split(sizes[i])[0]) * Math.pow(k, i);
		}
	}	
	return undefined;
}
export function formatTB(c: number, decimals:number = 1) {
	if (!c || c<1024) {
		return c+'GB';
	}	
	const gb:number = 1024 * 1024 * 1024 * c;
    return formatBytes(gb, decimals);
}
export function formatBytes(bytes: number, decimals:number = 2) {
    if (!+bytes) return '0 BYTES';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['BYTES', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}

export function strip_html_tags(str:string) {
	if ((str === null) || (str === '')){
		return str;
	} else {
		str = str.toString();
		return str.replace(/(<([^>]+)>)(.)(<([^>]+)>)|(<([^>]+)>)/ig, '');
	}	    
}

export default {
	isBlank,
	isNotBlank,
	randomId,
	isDigitOnly,
	isPassportFourCharacters,
	formatPrice,
	formatCurrencyPrice,
	formatDefaultCurrencyPrice,
	isChineseCharacter,
	parseCapacity,
	formatTB,
	formatBytes,
	strip_html_tags
};