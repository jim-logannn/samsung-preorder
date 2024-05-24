import React, { useState, useEffect, useCallback } from "react";
import { deepMergeObject } from "@smt/util/ObjectUtils";
import { Language } from "../lang/Lang";
import { CallbackLocale, CallbackString, CallbackValue } from "@smt/type/callback";

function getSLangSEO(lang: Language): "en" | "tc" {
  return lang == "english" ? "en" : "tc";
}
export function getDefaultApplicationContext(): ApplicationContextValue {
  return {
    mobileDevice: false,
    domain: "",
    api: {
      getDeliveryMethod: "/jsp/priority/ajax/get_plan.jsp",
      getDeliveryPeriod: "/jsp/Internal/IPPO2023/API_checkUserEligibleForDelivery.jsp",
      selectOrderAction: "/jsp/Internal/Fulfill2023/API_select_model_action.jsp",
      preorderSubmit: "/jsp/Internal/IPPO2023/preorder_submit_action_2023.jsp"
    }
  };
}
export function extendDefaultApplicationContext(
  value?: Partial<ApplicationContextValue>
): ApplicationContextValue {
  return deepMergeObject(getDefaultApplicationContext(), value);
}

export function getUrlValue(url: URL_GETTER | undefined, lang: Language): string {
	if(url == undefined) {
		return "";
	}
	return (typeof(url) == "string") ? url : url(lang);
}

type URL_GETTER = string | ((lang:Language)=>string);
interface API {
  getDeliveryMethod?: URL_GETTER;
  getDeliveryPeriod?: URL_GETTER;
  preorderSubmit?: URL_GETTER;
  selectOrderAction?: URL_GETTER;
}

export enum Channel {
  ONLINE = "online",
	SELF_HELP = "self_help",
  RBD    = "rbd",
  OB     = "ob"
}
export interface ChannelData {
  sale?: string;	
  storeCode?: string;
  machineCode?: string;
}
interface UrlList {
  preorder?: string;	
  domain?: string;
}
interface EventCallbackValue {
	event: CallbackString;
	value: string;
	lang: CallbackLocale;
}

export interface PreorderRecord {
  "model":string;
  "orderNumber":string;
  "orderCaseNumber":string;
  "store":string;
}
export interface ApplicationContextValue {
  mobileDevice?: boolean;
  domain?: string;
  quota?: number;
  isWhitelistUser?:boolean;
  preorderRecord?: PreorderRecord[];
  api?: API;
  url?: UrlList;
  channel?: Channel;
  channelData?: ChannelData;
	eventCallback?: (v: CallbackValue) => void;
	subrNum?: string;
}
export default React.createContext<ApplicationContextValue | undefined>(
  getDefaultApplicationContext()
);
