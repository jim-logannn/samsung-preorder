/*
com/smartone/hook/xhr/AjaxHook
*/
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useXHR, FetchStatus } from "./XMLHttpRequestHook";


export enum AjaxResultStatus {
	OK       = "ok",
	FAILED   = "failed",
	FETCHING = "fetching",
	ABORTED  = "aborted"
}
export interface AjaxResult<T> {
	status: AjaxResultStatus;
	result?: T;
	error?: any;
}
export type ResponseProcessor<T> = (response: string | undefined) => T;

export function useAjax<T>(responseProcessor: ResponseProcessor<T>) {

	const { fetchResponse, runFetch, abortFetch } = useXHR();

	const [ ajaxResult, setAjaxResult ] = useState<AjaxResult<T> | undefined>(undefined);
	
	useLayoutEffect(() => {
		if(!fetchResponse) {
			return;
		}
		
		if(fetchResponse.status != FetchStatus.IDLE) {
			console.log("fetchResponse.status = "+fetchResponse.status);
		}

		if(fetchResponse.status == FetchStatus.IDLE) {
			
		} else if(fetchResponse.status == FetchStatus.FETCHING) {
			setAjaxResult({ status: AjaxResultStatus.FETCHING });
		} else if(fetchResponse.status == FetchStatus.FAILED) {
			setAjaxResult({
				status: AjaxResultStatus.FAILED,
				error : fetchResponse.error
			});
		} else if(fetchResponse.status == FetchStatus.FETCHED) {
			setAjaxResult({
				status: AjaxResultStatus.OK,
				result: responseProcessor ? responseProcessor(fetchResponse.responseText) : undefined
			});	
		} else if(fetchResponse.status == FetchStatus.ABORTED) {
			setAjaxResult({ status: AjaxResultStatus.ABORTED });
		} else {
			console.log("unknown fetchResponse = " + fetchResponse.status);
		}
	}, [ fetchResponse, responseProcessor ]);

	return { ajaxResult, runAjax: runFetch, abortAjax: abortFetch };
}