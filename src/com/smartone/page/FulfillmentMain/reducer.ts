import { Reducer } from "react";
import { FulfillmentMainState, FulfillmentMainAction, FULFILLMENT_ACTION } from "@smt/type/handsetPreOrder2023/fulfillment";

export const fulfillmentMainReducer:Reducer<FulfillmentMainState, FulfillmentMainAction> = (prevState, action) => {
	switch (action.type) {
		case FULFILLMENT_ACTION.UPDATE_ORDER:
			return { 
				...prevState,
				selectedOrder: action.payload
			}
		case FULFILLMENT_ACTION.UPDATE_HANDSET:
			return { 
				...prevState,
				handsetId: action.payload
			}		
		case FULFILLMENT_ACTION.UPDATE_CASE:
			return { 
				...prevState,
				caseId: action.payload
			}
		case FULFILLMENT_ACTION.UPDATE_DISCOUNT:
			return { 
				...prevState,
				discount: action.payload
			}
		case FULFILLMENT_ACTION.UPDATE_APPLE_CARE_PLUS:
			return { 
				...prevState,
				appleCarePlus: action.payload
			}
		case FULFILLMENT_ACTION.UPDATE_PICKUP_INFO:
			return { 
				...prevState,
				pickupInfo: action.payload
			}
		case FULFILLMENT_ACTION.UPDATE_DELIVERY_INFO:
			return { 
				...prevState,
				deliveryInfo: action.payload
			}
	}
}