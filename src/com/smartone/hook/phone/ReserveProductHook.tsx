import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAjax, ResponseProcessor, AjaxResult, AjaxResultStatus } from '../xhr/AjaxHook';
import { RequestMethod } from '../xhr/XMLHttpRequestHook';
import { getLangFromLocale } from '@smt/lang/Lang';
import ApplicationContext, { getUrlValue } from '@smt/context/ApplicationContext';


export interface CheckReserveProductProps {
	modelCode?: string;
	mageSafe?: string;
}
interface ReserveProductResponse {
	status: AjaxResultStatus;
    err_code?: string;
	error?: string;
}
export interface ReserveProductResult {
	status: AjaxResultStatus;
    err_code?: string;
	error?: string;
}

export function useCheckReserveProduct() {
    //in
    const responseProcessor: ResponseProcessor<ReserveProductResult | undefined> = useCallback((response) => {
        const result:ReserveProductResult = {
			status: AjaxResultStatus.FAILED
        };
        if(response == undefined) {
			result.error  = "response text undefined"; // not likely
		} else {
			try {
				const json: ReserveProductResponse = JSON.parse(response);
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

    const checkReserveProduct = useCallback(({modelCode, mageSafe}:CheckReserveProductProps) => {
        if(applicationContext?.api?.reserveProduct){
            const url = getUrlValue(applicationContext?.api?.reserveProduct, lang);
            console.log("call runFetch " + url);
			const method = RequestMethod.POST;
            const data = {
				modelCode: modelCode,
				mageSafe: mageSafe
            };
            runAjax({ 
				url,
				method,
				data
			});
        } else {
			console.log("Missing api.reserveProduct");
		}
    }, [ applicationContext?.api?.reserveProduct, lang, responseProcessor ]);

    const abortReserveProduct = useCallback(() => {
		console.log("abortReserveProduct");
		abortAjax();
	}, []);

	return { abortReserveProduct, checkReserveProduct, ReserveProductResult: ajaxResult };
}
