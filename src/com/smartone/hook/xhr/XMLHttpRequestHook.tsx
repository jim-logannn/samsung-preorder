/**
 * com/smartone/hook/XMLHttpRequestHook
 **/
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { isNotBlank } from "com/smartone/util/StringUtils";


export enum FetchStatus {
	IDLE     = "idle",
	FETCHING = "fetching",
	FETCHED  = "fetched",
	FAILED   = "failed",
	ABORTED  = "aborted"
}
export enum RequestMethod {
	GET  = "GET",
	POST = "POST"
}

export const CONTENT_TYPE_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded";
export const CONTENT_TYPE_JSON = "application/json";

// local default values
const DEFAULT_CONTENT_TYPE = CONTENT_TYPE_JSON;
const DEFAULT_REQUEST_METHOD = RequestMethod.POST;

// local helper function
function getMethod(request: XMLHttpRequestProps): RequestMethod {
	return request.method ? request.method : DEFAULT_REQUEST_METHOD ;
}
function getHeaders(request: XMLHttpRequestProps) {
	const headers = new Headers();
	// only set Content-Type for POST and PUT
	if(request.method == RequestMethod.POST) {
		const contentType = (request.contentType && isNotBlank(request.contentType)) ? request.contentType : DEFAULT_CONTENT_TYPE;
		headers.append('Content-Type', contentType);
	}
	
	headers.append('X-Requested-With', 'XMLHttpRequest');
	return headers;
}
function getBody(request: XMLHttpRequestProps): Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string | undefined {
	if(request.method == RequestMethod.GET) {
		return undefined;
	}
	// POST
	if(!request.data) {
		return undefined;
	}
	if(request.contentType == CONTENT_TYPE_X_WWW_FORM_URLENCODED) {
		return new URLSearchParams(request.data);
	}
	// otherwise JSON
	return JSON.stringify(request.data);
}
function getUrl(request: XMLHttpRequestProps) {
	if(getMethod(request) == RequestMethod.POST) {
		return request.url;
	}
	// append searchParams
	const url = new URL(request.url, window.location.href);
	if(request.searchParams) {
		const searchParams = request.searchParams;
		searchParams.forEach(function(value, key) {
			url.searchParams.append(key, value);
		});
	}
	return url.toString();
}

export interface XMLHttpRequestProps {
	url: string;
	method: RequestMethod;
	contentType?: string;

	// data will be ignored if method is GET
	data?: any;
	searchParams?: URLSearchParams;
}
export interface FetchResponse {
	status: FetchStatus;
	responseText?: string;
	error?: any;
}
// when fetchStatus = "fetched", the fetchResponseText should have something
export function useXHR() {

	const [ request      , setRequest       ] = useState<XMLHttpRequestProps | undefined>(undefined);
	const [ fetchResponse, setFetchResponse ] = useState<FetchResponse>({ status: FetchStatus.IDLE });

	useLayoutEffect(() => {
		let isCancelled = false;
		let isLoading   = false;

		const abortController = new AbortController();

		//////////////////////////////////////////////////////////////////////////////
		const fetchData = async (url: string, requestInit: RequestInit) => {
			//console.log("start fetchData");
			let fetchStatus  : FetchStatus | undefined = undefined;
			let fetchResponseText: string | undefined   = undefined;
			let fetchError   : string | undefined       = undefined;

			isLoading = true;
			setFetchResponse({ status: FetchStatus.FETCHING });

			try {				
				const response = await fetch(url, requestInit);
				console.log(response);
				isLoading = false;
				if(response.ok) {
					const result = await response.text();
					fetchStatus = FetchStatus.FETCHED;
					fetchResponseText = result;
				} else {
					fetchError  = response.statusText + "(" + response.status + ")";
					fetchStatus = FetchStatus.FAILED;
				}
			} catch (error) {
				console.log("fetch error");
				console.error(error);
				fetchError  = error;
				fetchStatus = FetchStatus.FAILED;
			}
			
			if(isCancelled) {
				console.log("isCancelled");
				if(abortController.signal.aborted) {
					setFetchResponse({
						status: FetchStatus.ABORTED
					});
				} else {
					console.log("isCancelled but not aborted");
				}
			} else {
				setFetchResponse({
					status: fetchStatus,
					responseText: fetchResponseText,
					error: fetchError
				});
			}
			//console.log("finish fetchData");
		};
		//////////////////////////////////////////////////////////////////////////////

		if(request == undefined) {
			return;
		}

		const url     = getUrl(request);
		const headers = getHeaders(request);
		const method  = getMethod(request);
		const body    = getBody(request);
		const signal  = abortController.signal;
		const requestInit: RequestInit = {
			headers,
			method,
			body,
			signal
		};
		fetchData(url, requestInit);

		return () => {
			isCancelled = true;

			if(isLoading) {
				console.log("abort fetch")
				abortController.abort();
			}
		};
	}, [ request ]);

	const runFetch = useCallback((req: XMLHttpRequestProps) => {
		setRequest(req);
	}, []);

	const abortFetch = useCallback(() => {
		console.log("abortFetch");
		setRequest(undefined);
	}, []);

	// combine the response in 1 object makes consumer useEffect easier
	return { fetchResponse, runFetch, abortFetch };
}