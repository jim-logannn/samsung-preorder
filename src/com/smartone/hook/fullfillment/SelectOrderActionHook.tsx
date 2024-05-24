import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAjax, ResponseProcessor, AjaxResult, AjaxResultStatus } from '../xhr/AjaxHook';
import { RequestMethod } from '../xhr/XMLHttpRequestHook';
import { getLangFromLocale } from '@smt/lang/Lang';
import ApplicationContext, { getUrlValue } from '@smt/context/ApplicationContext';

export interface SelectOrderActionRequestData {
	caseid: string;
}
export interface SelectOrderActionResponse {
	status: AjaxResultStatus;
    err_code?: string;
	error?: string;
}

export interface SelectOrderActionResult {
	status: AjaxResultStatus;
    err_code?: string;
	error?: string;
}

export function useSelectOrderAction() {
    //in
    const responseProcessor: ResponseProcessor<SelectOrderActionResult | undefined> = useCallback((response) => {
        const result:SelectOrderActionResult = {
			status: AjaxResultStatus.FAILED
        };
        if(response == undefined) {
			result.error  = "response text undefined"; // not likely
		} else {
			try {
				const json: SelectOrderActionResponse = JSON.parse(response);
				if(json) {
					if(json.status == AjaxResultStatus.OK) {
						result.status = AjaxResultStatus.OK;		
					} else {
						result.err_code = json.err_code as string;
					}
				} else {
					result.error =  "JSON.parse response text returned null";
				}
			} catch (exception) {
				console.log(exception);
				result.error = exception as string;
			}
		}
        return result;
    },[]);

    const { ajaxResult, runAjax, abortAjax } = useAjax(responseProcessor);

    const intl= useIntl();
    const lang = getLangFromLocale(intl.locale);
    const applicationContext = useContext(ApplicationContext);

    const selectOrderAction = useCallback((caseid:string) => {
        if(applicationContext?.api?.selectOrderAction){
            const url = getUrlValue(applicationContext?.api?.selectOrderAction, lang);
            console.log("call runFetch " + url);
			const method = RequestMethod.POST;
            const data = {
				caseid : caseid
			}
            runAjax({ 
				url,
				method,
				data
			});
        } else {
			console.log("Missing api.selectOrderAction");
		}
    }, [ applicationContext?.api?.selectOrderAction, lang, responseProcessor ]);

    const aboutSelectOrderAction = useCallback(() => {
		console.log("aboutSelectOrderAction");
		abortAjax();
	}, []);

	return { aboutSelectOrderAction, selectOrderAction, SelectOrderActionResult: ajaxResult };
}
