/**
 * com/smartone/theme/BreakpointUtils
 * This helper is to avoid calling @bootstrap-styled's function with undefined breakpoints, which cause it to use its default breakpoints
 **/
import { Breakpoint, Breakpoints, BreakpointValues } from "@material-ui/core/styles/createBreakpoints";
import bp from '@bootstrap-styled/css-mixins/lib/breakpoints';

/*
input for @bootstrap-styled 
var defaultProps = {
  '$grid-breakpoints': {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
};
*/
const transformBP = function(key: Breakpoint, breakpoints: Breakpoints): any {
	const keys  : Breakpoint[] | undefined     = breakpoints ? breakpoints.keys : undefined ;
	const values: BreakpointValues | undefined = breakpoints ? breakpoints.values : undefined ;
	if(keys && values) {
		const bp: any = {};
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = values[key];
			if(typeof(value) != 'undefined') {
				bp[key] = `${value}px`;
			}
		}
		return bp;
	}
	return null;
};
const up = function(key: Breakpoint, breakpoints: Breakpoints, styles: string): string {
	return factory("up", key, breakpoints, styles);
};
const down = function(key: Breakpoint, breakpoints: Breakpoints, styles: string): string {
	return factory("down", key, breakpoints, styles);
};
const only = function(key: Breakpoint, breakpoints: Breakpoints, styles: string): string {
	return factory("only", key, breakpoints, styles);
};
const factory = function(funcName: "up"|"down"|"only", key: Breakpoint, breakpoints: Breakpoints | undefined, styles: string): string {
	if(!breakpoints) {
		console.error("values is " + breakpoints);
		return "";
	}
	const styledBreakpoints = transformBP(key, breakpoints);
	if(styledBreakpoints) {
		if(funcName == "up") {
			return bp.up(key, styledBreakpoints, styles);
		}
		if(funcName == "down") {
			return bp.down(key, styledBreakpoints, styles);
		}
		if(funcName == "only") {
			return bp.only(key, styledBreakpoints, styles);
		}
	}
	return "";
};
export default {
	up,
	down,
	only
};