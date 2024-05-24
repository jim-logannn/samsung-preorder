import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAjax, ResponseProcessor, AjaxResult, AjaxResultStatus } from '../xhr/AjaxHook';
import { RequestMethod } from '../xhr/XMLHttpRequestHook';
import { getLangFromLocale } from '@smt/lang/Lang';
import ApplicationContext, { getUrlValue } from '@smt/context/ApplicationContext';


export interface CheckProductAvailabilityProps {
	subrNum: string;
}
interface ProductAvailabilityResponse {
	status: AjaxResultStatus;
    data: ProductAvailabilityResponseData;
    err_code?: string;
	error?: string;
}

interface ProductAvailabilityList{
	reserved: boolean;
	available: boolean;
}
export interface ProductAvailabilityResponseData{
	handset: Record<string, ProductAvailabilityList>;
	gift: MagesafeAvailability;
}

interface MagesafeAvailability{
	magsafe_charger: ProductAvailabilityList;
}


export interface ProductAvailabilityResult {
	status: AjaxResultStatus;
    data?: ProductAvailabilityResponseData;
    err_code?: string;
	error?: string;
}

export function useCheckProductAvailability() {
    //in
    const responseProcessor: ResponseProcessor<ProductAvailabilityResult | undefined> = useCallback((response) => {
        const result:ProductAvailabilityResult = {
			status: AjaxResultStatus.FAILED
        };
        if(response == undefined) {
			result.error  = "response text undefined"; // not likely
		} else {
			try {
				const json: ProductAvailabilityResponse = JSON.parse(response);
				if(json) {
					if(json.status == AjaxResultStatus.OK) {
						result.status = AjaxResultStatus.OK;
						result.data = json.data;					
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

    const checkProductAvailability = useCallback(() => {
        if(applicationContext?.api?.checkProductAvailability){
            const url = getUrlValue(applicationContext?.api?.checkProductAvailability, lang);
            console.log("call runFetch " + url);
			const method = RequestMethod.POST;
            const requestData = undefined;
            runAjax({ 
				url,
				method
			});
        } else {
			console.log("Missing api.checkProductAvailability");
		}
    }, [ applicationContext?.api?.checkProductAvailability, lang, responseProcessor ]);

    const abortProductAvailability = useCallback(() => {
		console.log("abortProductAvailability");
		abortAjax();
	}, []);

	return { abortProductAvailability, checkProductAvailability, ProductAvailabilityResult: ajaxResult };
}
