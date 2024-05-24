import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAjax, ResponseProcessor, AjaxResult, AjaxResultStatus } from '../xhr/AjaxHook';
import { RequestMethod } from '../xhr/XMLHttpRequestHook';
import { getLangFromLocale } from '@smt/lang/Lang';
import ApplicationContext, { getUrlValue } from '@smt/context/ApplicationContext';

export interface CheckDeliveryPeriodResponseData{
	quota:boolean;
	canDelivery:boolean;
	deliveryPeriod:boolean;
	errMsg?: string;
	status: AjaxResultStatus;
}

export interface CheckDeliveryPeriodResult {
	status: AjaxResultStatus;
    data?: CheckDeliveryPeriodResponseData;
    err_code?: string;
	error?: string;
}

export function useCheckDeliveryPeriodHook() {
    //in
    const responseProcessor: ResponseProcessor<CheckDeliveryPeriodResult | undefined> = useCallback((response) => {
        const result:CheckDeliveryPeriodResult = {
			status: AjaxResultStatus.FAILED
        };
        if(response == undefined) {
			result.error  = "response text undefined"; // not likely
		} else {
			try {
				const json: CheckDeliveryPeriodResult = JSON.parse(response);
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

    const checkDeliveryPeriod = useCallback((numOfDeviceSelected : number) => {
        if(applicationContext?.api?.getDeliveryPeriod){
            const url = getUrlValue(applicationContext?.api?.getDeliveryPeriod, lang);
			const method = RequestMethod.POST;
            const requestData = undefined;
			const data = {
				n : numOfDeviceSelected
			}
            runAjax({ 
				url,
				method,
				data
			});
        } else {
			console.log("Missing api.getDeliveryPeriod");
		}
    }, [ applicationContext?.api?.getDeliveryPeriod, lang, responseProcessor ]);

    const abortCheckDeliveryPeriod = useCallback(() => {
		console.log("abortCheckDeliveryPeriod");
		abortAjax();
	}, []);

	return { abortCheckDeliveryPeriod, checkDeliveryPeriod, checkDeliveryPeriodResult: ajaxResult };
}
