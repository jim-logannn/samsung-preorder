import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAjax, ResponseProcessor, AjaxResult, AjaxResultStatus } from '../xhr/AjaxHook';
import { RequestMethod } from '../xhr/XMLHttpRequestHook';
import { getLangFromLocale } from '@smt/lang/Lang';
import ApplicationContext, { getUrlValue, Channel, ChannelData, PreorderRecord } from '@smt/context/ApplicationContext';
import { SubmitPreOrderAPIResponse } from '@smt/type/handsetPreOrder2023/api';

export interface PreorderSubmitRequestData {
	channel:Channel;
	lang?:String;
	channelData?:ChannelData;
	models_pickup_delivery: PreorderModels[];
}
export interface PreorderModels {
	modelCode:string;
	storeCode:string;
	district: string;
}
interface PreorderSubmitResponse {
	status: AjaxResultStatus;
    err_code?: string;
    err_msg?: string;
	error?: string;
	url?: string;
	orderRefNum: string;
	smartpass_id_consumed: string;
	orderDetail?: PreorderRecord;
}

export interface PreorderSubmitResult {
	status: AjaxResultStatus;
    err_code?: string;
    err_msg?: string;
	error?: string;
	url?: string;
	orderRefNum: string;
	smartpass_id_consumed: string;
	orderDetail?: PreorderRecord
}

export function usePreorderSubmit() {
    //in
    const responseProcessor: ResponseProcessor<PreorderSubmitResult> = useCallback((response) => {
        const result:PreorderSubmitResult = {
			status: AjaxResultStatus.FAILED,
			orderRefNum:"",
			smartpass_id_consumed:""
        };
        if(response == undefined) {
			result.error  = "response text undefined"; // not likely
		} else {
			try {
				const json: PreorderSubmitResponse = JSON.parse(response);
				if(json) {
					if(json.status == AjaxResultStatus.OK) {
						result.status = AjaxResultStatus.OK;				
						result.orderRefNum = json.orderRefNum
						result.smartpass_id_consumed = json.smartpass_id_consumed	
						result.orderDetail = json.orderDetail
					} else {
						result.err_code = json.err_code as string;
						result.err_msg = json.err_msg as string;
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

    const preorderSubmit = useCallback(({channel, channelData, models_pickup_delivery }:PreorderSubmitRequestData) => {
        if(applicationContext?.api?.preorderSubmit){
            const url = getUrlValue(applicationContext?.api?.preorderSubmit, lang);
            console.log("call runFetch " + url);
			const method = RequestMethod.POST;
			const requestData = undefined;
			const data:PreorderSubmitRequestData = {
				lang: lang,
				channel: channel,
				models_pickup_delivery: models_pickup_delivery
			}
			if (channelData){
				data.channelData = channelData;
			}
            runAjax({ 
				url,
				method,
				data
			});
        } else {
			console.log("Missing api.preorderSubmit");
		}
    }, [ applicationContext?.api?.preorderSubmit, lang, responseProcessor ]);

    const abortPreorderSubmit = useCallback(() => {
		console.log("abortPreorderSubmit");
		abortAjax();
	}, []);

	return { abortPreorderSubmit, preorderSubmit, preOrderSubmitResult: ajaxResult };
}
