import React, { useState, useCallback, useEffect } from 'react';
import { useAjax, AjaxResultStatus } from '../hook/xhr/AjaxHook';
import { RequestMethod, CONTENT_TYPE_X_WWW_FORM_URLENCODED } from '../hook/xhr/XMLHttpRequestHook';

interface MyResult {
	id: string;
	enable: boolean;	
}

function processor(response: string): MyResult {
	try {
		const json = JSON.parse(response);
		if(json.status == "ok") {
			if(json.data) {
				return {
					id: json.data.id as string,
					enable: json.data.enable as boolean
				};
			}
		}
		
	} catch (err) {
		console.log(err);
	}
	return {
		id: "",
		enable: false
	};
}
interface Props {
	className?: string;
}
function TestAjaxHook({ className }: Props) {
	const { ajaxResult, runAjax, abortAjax } = useAjax(processor);

	// run once
	useEffect(() => {
		const url = "https://webstage7a.smartone.com/jsp/test/test_ajaxhook.jsp";
		const method = RequestMethod.GET;
		const contentType = CONTENT_TYPE_X_WWW_FORM_URLENCODED;

		runAjax({
			url,
			method,
			contentType
		});
	}, []);

	useEffect(()=>{
		if(ajaxResult) {
			console.log("status", ajaxResult.status);
			console.log("error", ajaxResult.error);
			if(ajaxResult.status == AjaxResultStatus.OK) {
				console.log("result", ajaxResult.result); // undefined or type MyResult 
			}
		}
	}, [ajaxResult]);

	return (
		<div>
			{ ajaxResult && <div>ajax.status = {ajaxResult.status}</div>}
		</div>
		
	);
}
/*
		<div>
			<div>ajax status = { ajaxResult ? ajaxResult.status : undefined }</div>
			<div>ajax error = { ajaxResult ? ajaxResult.error : undefined }</div>
			<div>ajax result = { ajaxResult ? ajaxResult.result : undefined }</div>
	</div>*/
export default TestAjaxHook;