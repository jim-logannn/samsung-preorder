import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Page from '../Base'
import OrderForm, { OrderFormProps } from './OrderForm'
import { ProceedPayment } from './ProceedPayment'
import { APPLE_CARE_PLUS_OFFER, FulfillOrderDataRecord, FulfillmentMainState, FulfillmentRawHandsetData, FulfillmentRawOfferData, FulfillmentRawOrderValue, HANDSET_MODAL, SHOP_ID, FulfillmentSpecialItemRawData, SPECIAL_ITEM_TYPE, OfferValue, FulfillmentSpecialItem, SPECIAL_ITEM_NAME, SpecialItemData } from "@smt/type/handsetPreOrder2023/fulfillment"
import ApplicationContext, { Channel } from '@smt/context/ApplicationContext'
import { IMAGE_PATH } from '../PhoneSelector/SelectPhone'
import { FormWatcherContext, FormWatcherProvider } from '@smt/hook/InputHook'
import OrderSelect from './OrderSelect/OrderSelect'
import FootNote, { StyledConfirmBtn } from './OrderForm/FootNote'
import FooterSummary from './FooterSummary'
import { getSelectedDiscount } from '@smt/page/FulfillmentMain/ProceedPayment'
import { FormattedMessage, useIntl } from 'react-intl'
import { Locale, LocaleEN } from '@smt/type/common'
import { createPreOrderHandset } from '@smt/page/OfferAndCollection/ProductInfo'
import { StyledSelectorHeading } from '../OrderDetails/PickUpSelector'
import styled from 'styled-components'
import { PostAPI } from '../OfferAndCollection'
import { APIResponse, PostDeliveryInfoAction } from '@smt/type/handsetPreOrder2023/api'
import { ModalContext } from '@/context/ModalContext'
import { districtList } from '@/constant/districts'
import { StyledSteppersWrapper } from '../Main/MainController'
import Steppers from '@smt/steppers/Steppers'
import { Box } from '@material-ui/core'
import { OPT_TERMS, PaymentCaseContext } from './PaymentCaseProvider'
import { iteratorSymbol } from 'immer/dist/internal'
import { getLangFromLocale } from '@smt/lang/Lang'
import { createCallbackValue } from '@smt/util/Callback'
import { CALLBACK_CHANGE_STEP, CallbackString } from '@smt/type/callback'

interface FulfillmentMainProps extends Omit<OrderFormProps, 'onChangeOrderFormValues'|'data'|'value'|'handsetInfo'|'appleCarePlusOffer'|'onChangeOrderFormValid'>{
	caseInfo: Readonly<FulfillmentRawOrderValue[]>;
	orderData: Readonly<FulfillOrderDataRecord[]>;
	handsets: Readonly<FulfillmentRawHandsetData>;
	specialItem?: Readonly<FulfillmentSpecialItem>;
}

const modalMap = {
	[HANDSET_MODAL.PRO_MAX]: APPLE_CARE_PLUS_OFFER.PRO_MAX,
	[HANDSET_MODAL.PRO]: APPLE_CARE_PLUS_OFFER.PRO,
	[HANDSET_MODAL.PLUS]: APPLE_CARE_PLUS_OFFER.PLUS,
}

export const StyledFulfillmentHeader = styled(StyledSelectorHeading)`
	text-align: center;
  ${(p) => p.theme.breakpoints.up('md')} {
		text-align: left;
	}
`

export default function FulfillmentMain(p: FulfillmentMainProps) {

	const {offer, caseInfo, orderData, handsets, stores, voucher, specialItem, ...rest} = p;

	// const selectedCase = caseInfo.find(_case => _case.case_id === order)
	// if (selectedCase === undefined) {
	// 	console.log('fail generate selectedCase due to mismatch case id')
	// 	return <></>
	// }
	// const initialState = preprocessFulfillmentData(selectedCase, handsets, order);
	// if (initialState === null) {
	// 	console.log('fail generate initialState due to mismatch handset id')
	// 	return <></>
	// }
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const lang = getLangFromLocale(intl.locale);
	const isEng = locale === LocaleEN;
	const { showAlert, showLoading, hideLoading } = useContext(ModalContext);
	const [order, setOrder] = useState<FulfillOrderDataRecord|undefined>();
	const [state, setState] = useState<FulfillmentMainState|undefined>();
	const {step, setStep, StepIndicator}= useStep();
	const [proceed, setProceed] = useState<boolean>(false);
	const applicationContext = useContext(ApplicationContext);
	const {resetErrorList} = useContext(FormWatcherContext);
	const {setIsDelivery, setHasIPhone4Life, setExtraTerm, roamingDataPack} = useContext(PaymentCaseContext);
	const [payButtonDisable, setPayButtonDisable] = useState(true);
	const offlinePayload = useOfflinePayload();

	const trackingHandler = (callbackStep: CallbackString, step : STEP, extraParam ?: any) => {
		if (applicationContext?.eventCallback) {
            applicationContext.eventCallback(createCallbackValue(callbackStep, step, extraParam));
        }
	}

	useEffect(() => {
		if (order !== undefined && step === STEP.ORDER){
			setStep(STEP.INPUT);

			let returnChecking = {
				"caseInfo" : caseInfo,
				"orderData" : orderData,
				"selectedPhone" : order
			}
			trackingHandler(CALLBACK_CHANGE_STEP,STEP.INPUT,returnChecking);
		}
	}, [order])

	useEffect(() => {
		if (order === undefined) {
			return 
		}
		const selectedCase = caseInfo.find(_case => _case.case_id === order.caseId.toString())
		if (selectedCase === undefined) {
			console.log('fail generate selectedCase due to mismatch case id')
			return
		}
		const initialState = preprocessFulfillmentData(selectedCase, handsets, order);
		if (initialState === null) {
			console.log('fail generate initialState due to mismatch handset id')
			return
		}

		setState(initialState);

		setIsDelivery(initialState.pickupInfo.id === SHOP_ID.WAREHOUSE);
		if (specialItem?.iPhone_for_life === true) {
			setHasIPhone4Life(handsets?.special_items_by_mkt_code?.hasOwnProperty('iPhone_for_life') ?? false);
		} else {
			setHasIPhone4Life(false);
		}
	}, [order, caseInfo, handsets, specialItem])

	const {handset, handsetActualPrice, handsetInfo} = useMemo(() => {
		if (handsets === undefined || state === undefined) {
			return {
				handset: null,
				handsetActualPrice: null,
				handsetInfo: null
			}
		}
		const handset = getSelectedHandset(handsets, state.handsetId);
		const {actualPrice: handsetActualPrice, discounted} = getSelectedDiscount(handset, state.discount);
		const handsetInfo = createPreOrderHandset(isEng, handset, 0, applicationContext?.domain);
		handsetInfo.price.discounted = discounted ? handsetActualPrice : null;
		return {
			handset,
			handsetActualPrice,
			handsetInfo
		}
	}, [handsets, state?.handsetId, state?.discount])

	const appleCarePlusOffer = useMemo(() => {
		if (handset === null) {
			return null
		}
		return getAppleCarePlusOffer(handset, offer.offer_data.applecare)
	}, [handset, offer]);

	const specialMktPremiumItem = useMemo(() => {

		const specialItemByMktCode = handsets?.special_items_by_mkt_code;
			// specialItem is a possession list of special items
		const specialItemAvailableMap = specialItem;

		if (specialItemByMktCode === undefined || specialItemAvailableMap === undefined) {
			return []
		} 
		const filterSpecialItem = (v: [SPECIAL_ITEM_NAME, SpecialItemData & {type: SPECIAL_ITEM_TYPE}]): boolean => {
			// v is node of specialItemByMktCode aka handsets.special_items_by_mkt_code
			// v[0] is special item name
			// v[1] is special item data which include: type, image, title 
			const [name, data] = v; 

			// escape if the item type not 'premium'
			if (data.type !== SPECIAL_ITEM_TYPE.PREMIUM) {
				return false;
			}

			// filter roaming data pack from display of premium 
			if (name === SPECIAL_ITEM_NAME.ROAMING_DATA_PACK) {
				return false;
			}

			// check the whether exists with true value
			if (typeof specialItemAvailableMap[name] === 'boolean') {
				return specialItemAvailableMap[name] ?? false;
			}

			// check caseId whether is included in roaming_data_pack array
			// if (name === SPECIAL_ITEM_NAME.ROAMING_DATA_PACK) {
			// 	return specialItemAvailableMap[name]?.includes(state?.caseId ?? '') ?? false;
			// }

			// gain the charger for certain voucher
			if (name === SPECIAL_ITEM_NAME.VERBATIN_CHARGER) {
				return specialItemAvailableMap[name]?.includes(state?.discount ?? '') ?? false;
			}

			return false;
		}

		return Object
			.entries(specialItemByMktCode)
			.filter(entry => filterSpecialItem(entry))
			.map(item => item[1][lang]) // item: SpecialItemData

	}, [handsets, specialItem, state])

	const prepaid = useMemo(() => {
		const need = specialItem?.prepay_by_product === true;
		setExtraTerm(OPT_TERMS.PREPAID, need && (handsets?.special_items_by_mkt_code?.hasOwnProperty(SPECIAL_ITEM_TYPE.PREPAID) ?? false))
		return {
			need,
			content: handsets?.special_items_by_mkt_code?.[SPECIAL_ITEM_TYPE.PREPAID]?.[lang] ?? {
				img: '',
				title: ''
			}
		}
	}, [handsets, specialItem])

	const proceedDeliveryReview = useCallback(() => {
		if (state === undefined) {
			return 
		}
		const { shopList, ...storesList } = stores;
		const data = {
			addr1: state.deliveryInfo.address[0],
			addr2: state.deliveryInfo.address[1],		
			addr3: state.deliveryInfo.district,
			addr4: districtList.find(district => district.value.includes(state.deliveryInfo.district))?.value.split('|')[1] ?? 'not-found',
			voucher: state.discount,
			contact_person: state.deliveryInfo.recipient,
			contact_number: state.deliveryInfo.contactNo,
			selected_date: state.deliveryInfo.date,
			applecare: {},
			...offlinePayload
		}
		if (state.appleCarePlus?.selected) {
			data.applecare = {
				model: appleCarePlusOffer?.type,
				apple_id: state.appleCarePlus.email,
				last_name: state.appleCarePlus.lastName,
				first_name: state.appleCarePlus.firstName
			}
		}
		const PostDeliveryInfo = PostAPI<any, APIResponse>({
			url: '/jsp/Internal/Fulfill2023/API_delivery_info_action.jsp',
			body: JSON.stringify(data),
			onStart: () => {
				showLoading({
					id: 'PostDeliveryInfo'
				})
			},
			onSuccess: (res) => {
				hideLoading('PostDeliveryInfo')
				setStep(STEP.REVIEW)
				let returnChecking = {
					"caseInfo" : caseInfo,
					"orderData" : orderData,
					"selectedPhone" : order,
					"offer" : offer,
					"state" : state
				}
				trackingHandler(CALLBACK_CHANGE_STEP,STEP.REVIEW,returnChecking);
			},
			onError({err_code, err_msg}) {
				hideLoading('PostDeliveryInfo')
				showAlert({
					message: `${err_code} ${err_msg}`
				})
			},
		})
		PostDeliveryInfo()
	}, [state, stores])

	const proceedPickupReview = useCallback(() => {
		if (state === undefined) {
			return 
		}
		const data = {
			caseid: state.caseId,
			storecode: state.pickupInfo.id,
			timeslot: state.pickupInfo.time,
			date: state.pickupInfo.date,
			voucher: state.discount,
			applecare: {},
			...offlinePayload
		}
		if (state.appleCarePlus?.selected) {
			data.applecare = {
				model: appleCarePlusOffer?.type,
				apple_id: state.appleCarePlus.email,
				last_name: state.appleCarePlus.lastName,
				first_name: state.appleCarePlus.firstName
			}
		}
		const PostPickupInfo = PostAPI<any, APIResponse>({
			url: '/jsp/Internal/Fulfill2023/API_time_slot_action.jsp',
			body: JSON.stringify(data),
			onStart: () => {
				showLoading({
					id: 'PostPickupInfo'
				})
			},
			onSuccess: (res) => {
				hideLoading('PostPickupInfo')
				setStep(STEP.REVIEW)
				let returnChecking = {
					"caseInfo" : caseInfo,
					"orderData" : orderData,
					"selectedPhone" : order,
					"offer" : offer,
					"state" : state
				}
				trackingHandler(CALLBACK_CHANGE_STEP,STEP.REVIEW,returnChecking);
			},
			onError({err_code, err_msg}) {
				hideLoading('PostPickupInfo')
				showAlert({
					message: `${err_code} ${err_msg}`
				})
			},
		})
		PostPickupInfo()
	}, [state, stores, appleCarePlusOffer])

	const proceedReview = useCallback(() => {
		if (state === undefined) {
			return 
		}
		return state.selectedOrder.store_code === SHOP_ID.WAREHOUSE ? proceedDeliveryReview() : proceedPickupReview()
	}, [proceedDeliveryReview, proceedPickupReview])

	const onBackHandler = () => {
		if (step === STEP.INPUT) {
			setOrder(undefined);
			setState(undefined);
			setStep(STEP.ORDER);
			let returnChecking = {
				"caseInfo" : caseInfo,
				"orderData" : orderData,
			}
			trackingHandler(CALLBACK_CHANGE_STEP,STEP.ORDER,returnChecking);
			resetErrorList();
		}
		if (step === STEP.REVIEW) {
			setStep(STEP.INPUT);
			trackingHandler(CALLBACK_CHANGE_STEP,STEP.INPUT,state);
		}
	}

	useEffect(()=>{
		let returnChecking = {
			"caseInfo" : caseInfo,
			"orderData" : orderData,
		}
		trackingHandler(CALLBACK_CHANGE_STEP,STEP.ORDER,returnChecking);
	},[])
	
	useEffect(() => {
		const ROAMING = SPECIAL_ITEM_NAME.ROAMING_DATA_PACK;
		const specialItemByMktCode = handsets?.special_items_by_mkt_code;
		const specialItemMap = specialItem;
		if (specialItemByMktCode === undefined || specialItemMap === undefined) {
			return 
		}
		if (specialItemMap[ROAMING] === undefined) {
			return 
		}
		if (specialItemMap[ROAMING].includes(state?.caseId ?? '')) {
			const data = Object.entries(specialItemByMktCode).find(([type, data]) => type === ROAMING)
			if (data === undefined) {
				return 
			}
			roamingDataPack.set(data[1][lang]);
		}
	}, [handsets.special_items_by_mkt_code, specialItem, state?.caseId, roamingDataPack.set])

	return <>
		<Page>
			<Page.Body>
				{step !== STEP.ORDER && <Box mb={4}>
					<StepIndicator />
				</Box>}
				{step === STEP.ORDER && <OrderSelect {...p} onChangeOrderFormValues={setOrder} />}
				{(step === STEP.INPUT && (state !== undefined && handsetInfo)) && <OrderForm {...p} onChangeOrderFormValues={setState} value={state} appleCarePlusOffer={appleCarePlusOffer?.offer ?? null} handsetInfo={handsetInfo} onChangeOrderFormValid={setProceed} />}
				{(step === STEP.REVIEW && (state !== undefined && handset)) && <ProceedPayment value={state} handset={handset} stores={stores} voucher={voucher} gift={offer.offer_data.gift} appleCarePlusOffer={appleCarePlusOffer?.offer ?? null} prepaid={prepaid} premium={specialMktPremiumItem} onChangeTermsConsent={setPayButtonDisable} />}
			</Page.Body>
			<Page.Footer>
				<FootNote 
					onClickBackButton={onBackHandler} 
					disabledProceed={!proceed} 
					disabledPayButton={payButtonDisable}
					step={step}
					value={state}
				/>
			</Page.Footer>	
		</Page>
		{(step === STEP.INPUT && handsetActualPrice) && <FooterSummary handsetPrice={handsetActualPrice} appleCarePlusPrice={state?.appleCarePlus?.selected ? appleCarePlusOffer?.offer?.price : undefined} currentStep={step}>
			<StyledConfirmBtn disabled={!proceed} onClick={proceedReview}>{intl.formatMessage({ id: "footer.button.continue" })}</StyledConfirmBtn> 
		</FooterSummary>}
	</>
}

export enum STEP {
	ORDER = '0',
	INPUT = '1',
	REVIEW = '2'
}



const useStep = (initialStep=STEP.ORDER) => {
	const intl = useIntl(); 
	const [step, setStep] = useState<STEP>(initialStep);
	const StepIndicatorText = [
		intl.formatMessage({id:"pre-ordered-summary"}),
		intl.formatMessage({id:"proceed-payment"})
	]
	const activeStep = [STEP.INPUT, STEP.REVIEW].indexOf(step);
	const StepIndicator: React.FC = () => (
		<StyledSteppersWrapper>
			<Steppers activeStep={activeStep} steps={StepIndicatorText}/>
		</StyledSteppersWrapper>
	)


	
	return {
 		step,
		setStep,
		StepIndicator
	}
}

const preprocessFulfillmentData = (v: FulfillmentRawOrderValue, h: FulfillmentRawHandsetData, o: FulfillOrderDataRecord) => {
	const {
	  store_code,
	  delivery_district,
	  start_date,
	  end_date,
		case_id,
	  online_order_number,
	} = v;
	const {
		productCode
	} = o;
	const handsetInfo = Object.values(h.handset_data).find(handset => handset.product_code === productCode);
	if (handsetInfo === undefined) {
		return null
	}
	return {
		caseId: case_id,
		refNumber: online_order_number,
		handsetId: handsetInfo.model_code,
		deliveryInfo: {
			recipient: '',
			district: delivery_district,
			contactNo: '',
			date: '',
			address: ['', ''] as [string, string]
		},
		pickupInfo: {
			id: store_code,
			startPickupDate: start_date ?? '',
			endPickupDate: end_date ?? '',
			date: '',
			time: ''
		},
		discount: '' as OfferValue,
		selectedOrder: v
	}
}

export const getAppleCarePlusOffer = (handset: ReturnType<typeof getSelectedHandset >, appleCare: FulfillmentRawOfferData['offer_data']['applecare']) => {
	const handsetName = handset.name_eng;
	let _appleCarePlus: APPLE_CARE_PLUS_OFFER | null = null;
	Object.entries(modalMap).forEach(modal => {
		if (handsetName.toLocaleLowerCase().indexOf(modal[0]) > 0 && _appleCarePlus === null) {
			_appleCarePlus = modal[1]
		}
	})
	if (_appleCarePlus === null) {
		_appleCarePlus = APPLE_CARE_PLUS_OFFER.NORMAL as APPLE_CARE_PLUS_OFFER
	}
	return {
		offer: appleCare[_appleCarePlus] ?? null,
		type: _appleCarePlus 
	}
}

export const getSelectedHandset = (handsets: FulfillmentRawHandsetData, handsetId: FulfillmentMainState['handsetId']) => {
	return handsets.handset_data[handsetId];
}

export const Img = React.forwardRef<HTMLImageElement, {path: string, title?: string, width?: number, height?: number}>((p, ref) => {
	const { path, title, width, height } = p;
	const applicationContext = useContext(ApplicationContext);
	const domain = applicationContext?.url?.domain ?? '';
	const src = path.includes(domain) ? path : domain + path;
	return <img src={src} title={title ?? ''} width={width ?? 'auto'} height={height ?? 'auto'} ref={ref} />
})

export const useOfflinePayload = () => {

	const applicationContext = useContext(ApplicationContext);
	const subrNum = applicationContext?.subrNum ?? '';
	const channel = applicationContext?.channel ?? '';

	const offlinePayload = useMemo(() => {
		if (subrNum.length > 0 && channel !== Channel.ONLINE) {
			return {
				m: subrNum
			}
		}
		return {}
	}, [subrNum, channel])
	return offlinePayload

}