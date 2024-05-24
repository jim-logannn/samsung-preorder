import { Language } from "@smt/lang/Lang";

export enum API_STATUS {
	SUCCESS = 'ok',
	FAIL = 'fail'
}

export interface APIResponse {
	status: API_STATUS;
	err_msg: string;
	err_code: string;
}

// getCoupon
export type GetCouponData = {
	endDate?: string;
	startDate?: string;
	masterCouponId: string;
}

export interface GetCouponAPIResponse extends APIResponse {
	voucher_available_list: Array<GetCouponData>
}

// getStore
export type StoreLabel = "ABD"|"CWB"|"CTL"|"IFC"|"CWS"|"CTK"|"TCP"|"WCS"|"PHW"|"HHS"|"JRD"|"KBT"|"APM"|"MPC"|"MGK"|"TSB"|"KMP"|"MOS"|"NTS"|"NTW"|"SSI"|"TPS"|"TKPx"|"TKS"|"TKP"|"TWN"|"TWS"|"TMP"|"TMV"|"YOS"|"YLP"|"YLPx"|"YLSx";

export type GetStoreListData = StoreLabel[];

export type GetStoreSingleData<T extends StoreLabel | string> = {
	disEng: string;
	addChi: string;
	disChi: string;
	regChi: string;
	addEng: string;
	timeChi: string;
	shopID: number;
	label: T;
	regEng: string;
	timeEng: string;
}

export type GetStoreAPIResponse = {
	[index: string]: GetStoreSingleData<string>;
} & {
	shopList: GetStoreListData;
};

//getDelivery

export interface GetDeliveryData extends APIResponse {
	canDelivery: boolean;
	numOfDeviceSelected: number;
	quotaLeft: number;
	quota: boolean;
	deliveryPeriod:boolean;
}

export interface SubmitPreOrderAPIResponse extends APIResponse {
	orderRefNum: string;
	smartpass_id_consumed: string;
}

export interface GetAvailableTimeSlot extends APIResponse {
	result: Record<string, string[]>
}

export interface GetAvailableDeliveryDate extends APIResponse {
	result: string[]
}

/**
 * @reference
 * addr3: District - Diamond Hill
 * addr4: Area - Kowloon
 * selected_date: yyyyMMdd
 */
export interface PostDeliveryInfoAction {
	addr1: string;
	addr2: string;
	addr3: string; //
	addr4: string;
	voucher: string;
	contact_person: string;
	contact_number: string;
	selected_date: string; //yyyyMMdd
}

export interface SubmitPayment {
	fup: '';
	page_lang: Language;
	pay_online: 'online' | 'later' | 'store';
	voucher: string;
}

export interface SubmitPaymentResponse extends APIResponse {
	url_payment: string;
	submission_token?: string;
}