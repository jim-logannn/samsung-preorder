/**
 * util/WindowUtils
 **/
/**
 * @public
 */
export function windowHasScrollbar(): boolean {
	try{
		if (typeof window.innerWidth === 'number') {
			return window.innerWidth > document.documentElement.clientWidth;
		}
	}catch(err){}
	return false;
}
export function findElementOffsetHeight(el: HTMLElement): number {
	return el.offsetHeight;
}
export function findElementOffsetTop(el: HTMLElement): number {
	return el.getBoundingClientRect().top + (document.body.scrollTop || document.documentElement.scrollTop);
}
export function findElementOffsetFloor(el: HTMLElement): number {
	return findElementOffsetTop(el) + findElementOffsetHeight(el);
}
export function getViewportWidth(): number{
	return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
};
export function windowScrollTo(top: number): void{
	window.scrollTo({
		top: top,
		behavior: "smooth"
	});
};
/*
export default {
	windowHasScrollbar: windowHasScrollbar
};*/