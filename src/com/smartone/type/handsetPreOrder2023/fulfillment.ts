import { Language } from "@smt/lang/Lang";
import { handsetGroupDataRecord, iPhoneOrderData } from "@smt/page/PhoneSelector/SelectPhone"

export type FulfillOrderDataRecord = {
	bottomRemarks: string;
	orderSupInfo: string;
	caseIndex: number;
	caseId: number;
	availability: string;
	btnAction: string;
	btnActionStatus: string;
	productCode: string;
	handsetId: string;
}


export type FulfillmentRawOrderValue = {
	end_date: string,
	fup: string,
	plan_type: string,
	sAllow_extend: string,
	"remain_fee_receipt_not_empty_AND_store_code=WHS": boolean,
	deliveryInfo_delivery_date: string,
	channel: string,
	deliveryInfo_contact_number: string,
	deliveryInfo_contact_person: string,
	is_plan_code: string,
	selected_timeslot: string,
	extend_receipt: string,
	deliveryInfo_addr1: string,
	any_color: boolean,
	deliveryInfo_addr2: string,
	deliveryInfo_addr3: string,
	deliveryInfo_addr4: string,
	price: number,
	selected_date: string,
	case_id: string,
	start_date: string,
	store_code: string,
	deposit_amount: 500,
	deposit_receipt: string,
	delivery_district: string,
	screen_replace: string,
	case_status: string,
	original_store: boolean,
	err_msg: string,
	fup_type: string,
	remain_fee_receipt: string,
	nextStep: boolean,
	otp_number: string,
	online_order_number: string,
	status: string
}

type CouponId = "IP15_HS_5_Per_Dis_03" | "IP15_HS_9_Per_Dis" | "IP15_HS_$200_Dis" | "$500_HSPR23" | "IP15_HS_7_Per_Dis_03" | "IP15_HS_12_Per_Dis" | "IP15_HS_5_Per_Dis_01" | "IP15_HS_7_Per_Dis_02" | "IP15_HS_5_Per_Dis_02" | "IP15_HS_7_Per_Dis_01";

export type FulfillmentRawVoucher = Array<{masterCouponId: CouponId}>

export type FulfillmentRawOfferData = {
	offer_data: {
		"applecare": {
			[index in APPLE_CARE_PLUS_OFFER]: {
				img: string,
				price: number,
				details: Array<string>,
				id: string,
				title: string,
				product_code: string,
				desc: string,
				offer_price: number
			}
		}
		"gift": {
			[index: string]: {
				img: string,
				price: number, 
				id: string,
				title: string,
				product_code: string
			}
		}
	}
}

export type FulfillmentRawHandsetData = {
	handset_order: handsetGroupDataRecord['handset_order'],
	handset_data: {
		[index: string]: iPhoneOrderData & {
			voucher: {
				[index in CouponId]: number
			}
		}
	}
} & FulfillmentSpecialItemRawData

export enum FULFILLMENT_ACTION {
	UPDATE_ORDER = 'updateOrder',
	UPDATE_HANDSET = 'updateHandset',
	UPDATE_CASE = 'updateCase',
	UPDATE_DISCOUNT = 'updateDiscount',
	UPDATE_APPLE_CARE_PLUS = 'updateAppleCarePlus',
	UPDATE_PICKUP_INFO = 'updatePickupInfo',
	UPDATE_DELIVERY_INFO = 'updateDeliveryInfo'
}

export type AppleCarePlusInfo = {
	selected?: boolean;
	email?: string;
	lastName?: string;
	firstName?: string;
}	

export type OfferValue = CouponId;

export type DeliveryValue = {
	recipient: string;
	contactNo: string;
	date: string;
	district: string;
	address: [string, string];
};


export type PickupInfoValue = {
	id: string;
	startPickupDate: string;
	endPickupDate: string;
	date: string;
	time: string;
}

export type FulfillmentMainState = {
	caseId: string;
	handsetId: string;
	refNumber: string;
	selectedOrder: FulfillmentRawOrderValue;
	discount?: OfferValue;
	appleCarePlus?: AppleCarePlusInfo;
	pickupInfo: PickupInfoValue;
	deliveryInfo: DeliveryValue;
};

export type FulfillmentMainAction = UpdateHandsetIdAction | UpdateOrderAction | UpdateCaseAction | UpdateDiscountAction | UpdateAppleCarePlus | UpdatePickupInfo | UpdateDeliveryInfo;

type UpdateCaseAction = {
	type: FULFILLMENT_ACTION.UPDATE_CASE;
	payload: FulfillmentMainState['caseId'];
};

type UpdateOrderAction = {
	type: FULFILLMENT_ACTION.UPDATE_ORDER;
	payload: FulfillmentMainState['selectedOrder'];
};
type UpdateHandsetIdAction = {
	type: FULFILLMENT_ACTION.UPDATE_HANDSET;
	payload: FulfillmentMainState['handsetId'];
};
type UpdateDiscountAction = {
	type: FULFILLMENT_ACTION.UPDATE_DISCOUNT;
	payload: FulfillmentMainState['discount'];
};
type UpdateAppleCarePlus = {
	type: FULFILLMENT_ACTION.UPDATE_APPLE_CARE_PLUS;
	payload: FulfillmentMainState['appleCarePlus'];
};
type UpdatePickupInfo = {
	type: FULFILLMENT_ACTION.UPDATE_PICKUP_INFO;
	payload: FulfillmentMainState['pickupInfo'];
};
type UpdateDeliveryInfo = {
	type: FULFILLMENT_ACTION.UPDATE_DELIVERY_INFO;
	payload: FulfillmentMainState['deliveryInfo'];
};

export enum HANDSET_MODAL {
	PRO_MAX = 'pro max',
	PRO = 'pro',
	PLUS = 'plus'
}

export enum APPLE_CARE_PLUS_OFFER {
	PRO_MAX = 'iphone_pro_max',
	PLUS = 'iphone_plus',
	PRO = 'iphone_pro',
	NORMAL = 'iphone'
}

export enum SHOP_ID {
	WAREHOUSE = 'WHS'
}

export type SpecialItemData = {
	[k in Language]: {
		img: string;
		title: string;
	}
}

export enum SPECIAL_ITEM_TYPE {
	SERVICE = 'service',
	PREPAID = 'prepay_by_product',
	PREMIUM = 'premium'
}

export enum SPECIAL_ITEM_NAME {
	IPHONE_FOR_LIFE = 'iPhone_for_life',
	PREPAY_BY_PRODUCT = 'prepay_by_product',
	ROAMING_DATA_PACK = 'roaming_data_pack',
	TYPE_C_CABLE = 'type_c_cable',
	VERBATIN_CHARGER = 'verbatin_charger'
}

export type FulfillmentSpecialItemRawData = {
	special_items_by_mkt_code?: {
		[SPECIAL_ITEM_NAME.IPHONE_FOR_LIFE]?: {
			type: SPECIAL_ITEM_TYPE.SERVICE,
		} & SpecialItemData,
		[SPECIAL_ITEM_NAME.PREPAY_BY_PRODUCT]?: {
			type: SPECIAL_ITEM_TYPE.PREPAID,
		} & SpecialItemData,
		[SPECIAL_ITEM_NAME.ROAMING_DATA_PACK]?: {
			type: SPECIAL_ITEM_TYPE.PREMIUM,
		} & SpecialItemData,
		[SPECIAL_ITEM_NAME.TYPE_C_CABLE]?: {
			type: SPECIAL_ITEM_TYPE.PREMIUM,
		} & SpecialItemData,
		[SPECIAL_ITEM_NAME.VERBATIN_CHARGER]?: {
			type: SPECIAL_ITEM_TYPE.PREMIUM
		} & SpecialItemData
	}
}

export type FulfillmentSpecialItem = Record<SPECIAL_ITEM_NAME, boolean> & {
	[SPECIAL_ITEM_NAME.ROAMING_DATA_PACK]: string[]
	[SPECIAL_ITEM_NAME.VERBATIN_CHARGER]: string[]
}