import { CallbackString, CallbackValue } from "@smt/type/callback";

//if value === 0 will become null
export const createCallbackValue = (event: CallbackString, value?: any, extraParam?: any): CallbackValue => {
	return {
		event,
		value: value != undefined ? value : null,
		extraParam
	}
}