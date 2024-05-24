import React, { useContext, useMemo, useState, useCallback, useEffect, useReducer, createContext } from 'react';

import styled from 'styled-components';
import PhoneSelector from '@smt/page/PhoneSelector';
import { SelectedPhoneData, handsetGroupDataRecord } from '../PhoneSelector/SelectPhone';
import FooterSummary from './FooterSummary';
import { TextButton } from '../../component/button';
import { ModalContext } from '@/context/ModalContext';
import { AjaxResult, AjaxResultStatus } from '../../hook/xhr/AjaxHook';
import { useIntl } from 'react-intl';
import { PlanMeta, PlanReviewData } from '@smt/type/mobilePlan';
import { usePreorderSubmit, PreorderSubmitRequestData, PreorderModels, PreorderSubmitResult } from '@smt/hook/phone/preorderSubmitHook';
import ApplicationContext, { Channel } from '@smt/context/ApplicationContext';
import { Storelist } from '@smt/type/storelist';
import Steppers from '@smt/steppers/Steppers';
import { mainReducer, initalMainState, MainActionType } from './MainReducer';
import { createCallbackValue } from '@smt/util/Callback';
import { CALLBACK_CHANGE_STEP, CALLBACK_CLICK_NEXT_STEP_BUTTON, CALLBACK_CONFIRM_ORDER } from '@smt/type/callback';
import OfferAndCollection, { ReviewData } from '../OfferAndCollection';
import { createPreOrderHandset, ProductInfoProps } from '../OfferAndCollection/ProductInfo';
import { Locale, LocaleEN } from '@smt/type/common';
import { GetStoreAPIResponse } from '@smt/type/handsetPreOrder2023/api';
import Review from '../Review';
import { COLLECTION_METHOD_VALUE, localizeStore } from '../OfferAndCollection/CollectionMethod';
import { createStoreCard } from '../OfferAndCollection/StoreCard';
import { isNotBlank } from '@smt/util/StringUtils';
import ThankYou from '../ThankYou';
import { STATUS_CODES } from 'http';
import { stat } from 'fs';
import { VoucherData } from '@smt/component/voucher/Voucher';
import { ChannelData } from '../../context/ApplicationContext';
import { SHOP_ID } from '@smt/type/handsetPreOrder2023/fulfillment';


const StyledMainContainer = styled.div`
`;
export const StyledSteppersWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
`
const StyledTextButton = styled(TextButton)`
    width: 120px;
    height: 56px;
    ${(p) => p.theme.breakpoints.up('md')} {	
        width: 180px;
    }
`;
export enum OrderStep {
	STEP_SELECT_IPHONE  = 0,
	STEP_COLLECTION_METHOD = 1,
	STEP_REVIEW = 2,
    STEP_SUCCESS = 3
}
export interface MainControllerProps {
    quota: number;
    handsetGroupData: handsetGroupDataRecord;
    voucherData: VoucherData;
    storeData: GetStoreAPIResponse;
}

const getErrorId = (error?: string) => {
	switch (error) {
		case "HANDSET_NO_QUOTA":
			return "error.handset-no-quota";
		default:
			return "error.system-busy";
	}
}

const getPageviewStepLabel = (step?: OrderStep) => {
	switch (step) {
		case OrderStep.STEP_SELECT_IPHONE:
			return "step-select-iPhone";
		case OrderStep.STEP_COLLECTION_METHOD:
			return "step-collection-method";
		case OrderStep.STEP_REVIEW:
			return "step-order-details";
		default:
			return undefined;
	}
}
const MainController = ({quota, handsetGroupData, voucherData, storeData}:MainControllerProps ) => {
    const [ state, dispatch] = useReducer(mainReducer, initalMainState);
    //
    const { abortPreorderSubmit, preorderSubmit, preOrderSubmitResult } = usePreorderSubmit();
    const [ activeStep, setActiveStep ] = useState<number>(0);
    
    const intl = useIntl();
		const locale = intl.locale as Locale;
		const isEng = locale === LocaleEN;
    const { showLoading, hideLoading } = useContext(ModalContext);
    const { showAlert } = useContext(ModalContext);
    const applicationContext = useContext(ApplicationContext);
    const channel = applicationContext?.channel as Channel;
    const channelData = applicationContext?.channelData as ChannelData;
    const domain = applicationContext?.url?.domain;
    const isWhitelistUser = applicationContext?.isWhitelistUser;
    const preorderRecord = applicationContext?.preorderRecord;

    // set step data	
	const steps: string[] = [];
	const step1 = intl.formatMessage({ id: "step.select-model" });
	const step2 = intl.formatMessage({ id: "step.collenction-method" });
    const step3 = intl.formatMessage({ id: "step.review" });
    steps.push(step1);
	steps.push(step2);
	steps.push(step3);

 
    const getSelectedPhoneData = useCallback((data: SelectedPhoneData) => {
        dispatch({ type: MainActionType.SELECTED_PHONE, selectedPhoneData: data });
    },[])

    const handleCurrentStep = (currentStep?:OrderStep) => {
        const body = document.querySelector('body');
        const eventName = onSelectIphoneStep(currentStep)?"setSelectPhone":"setCurrentStep";
        const pvStepLabel = getPageviewStepLabel(currentStep);
        const customPageviewEvent =  new CustomEvent('init_GA_PageView' , {
            detail: {
                pvLabel: pvStepLabel            
            }
        });
        const customEvent =  new CustomEvent(eventName , {
            detail: {
                step: currentStep            
            }
        });
        if (body){
            body.dispatchEvent(customEvent);
            body.dispatchEvent(customPageviewEvent);
        }
        //
        if (window) {
            window.scroll(0,0);
        }
        if (applicationContext?.eventCallback) {
            applicationContext.eventCallback(createCallbackValue(CALLBACK_CHANGE_STEP, currentStep || OrderStep.STEP_SELECT_IPHONE, {"quota":quota,"selectedPhone":state.selectedPhoneData,"orderContent":orderContextValue} ));
        }
    }
    const onSelectIphoneStep = (currentStep?:OrderStep) => {
        return currentStep==OrderStep.STEP_SELECT_IPHONE;
    }

    useEffect(() => {
		if(preOrderSubmitResult){
			if(preOrderSubmitResult.status == AjaxResultStatus.OK) {
                if (preOrderSubmitResult.result?.status == AjaxResultStatus.OK){
                    //show thank you layout
                    hideLoading('submit');
                    dispatch({ 
                        type: MainActionType.SET_CURRENT_STEP, 
                        currentStep: OrderStep.STEP_SUCCESS
                    });
                } else {
                    hideLoading('submit');
					const errorMsg = preOrderSubmitResult.result?.err_code === 'CHGPLAN_VALIDATION_FAILURE' ? `: ${preOrderSubmitResult.result?.err_msg || ''}` : '';
                    showAlert({
                        message: intl.formatMessage({ id: getErrorId(preOrderSubmitResult.result?.err_code) }) + `${errorMsg}`
                    })
                }
			} else if(preOrderSubmitResult.status == AjaxResultStatus.FAILED) {
                hideLoading('submit');
                showAlert({
                    message: intl.formatMessage({ id: getErrorId() })
                })                
            }            
		}
    }, [preOrderSubmitResult]);
    
    // on current step
    useEffect(() => {
        //console.log("00 step|"+state.currentStep);
        if (state.currentStep !== undefined){
            setActiveStep(state.currentStep);
            handleCurrentStep(state.currentStep);
        }
    }, [state.currentStep]);    

    useEffect(()=>{
        if(preorderRecord !== undefined){
            //this length was filtered unless voucher all used
            if(preorderRecord.length > 0){
                dispatch({ 
                    type: MainActionType.SET_CURRENT_STEP, 
                    currentStep: OrderStep.STEP_SUCCESS
                });
            }
        }
    },[])

    function checkDisableButton (currentStep?:OrderStep, selectedPhoneData?:SelectedPhoneData):boolean {
        if (state.currentStep === OrderStep.STEP_SELECT_IPHONE){
            return selectedPhoneData && selectedPhoneData.length>0? false:true;
        }
				if (state.currentStep === OrderStep.STEP_COLLECTION_METHOD){
					if (selectedPhoneData === undefined) {
						return true
					}
					return orderContextValue.length < selectedPhoneData.length
				}
				if (state.currentStep === OrderStep.STEP_REVIEW){
					return false
				}
        return true;
    }
    function onClickNextButtonCallback(currentStep?:OrderStep) {
        if (applicationContext?.eventCallback) {
            applicationContext.eventCallback(createCallbackValue(CALLBACK_CLICK_NEXT_STEP_BUTTON, currentStep))
        }
    }
    function onClickNextButton(){
        // step 3
				switch (state.currentStep) {
					case OrderStep.STEP_SELECT_IPHONE:
            dispatch({ 
							type: MainActionType.SET_CURRENT_STEP, 
							currentStep: OrderStep.STEP_COLLECTION_METHOD
						});
						break;
					case OrderStep.STEP_COLLECTION_METHOD:
            dispatch({ 
							type: MainActionType.SET_CURRENT_STEP, 
							currentStep: OrderStep.STEP_REVIEW
						});
						break;
					case OrderStep.STEP_REVIEW:
                        onPreorderSubmit();
						break;
					case OrderStep.STEP_SUCCESS:
            dispatch({ 
							type: MainActionType.SET_CURRENT_STEP, 
							currentStep: OrderStep.STEP_COLLECTION_METHOD
						});
						break;
			
					default:
						break;
				}
				
        // callback
        onClickNextButtonCallback(state.currentStep);
    }

    function onClickBackButton(){
        if (state.currentStep){
            dispatch({ type: MainActionType.SET_CURRENT_STEP, currentStep: state.currentStep - 1});	 
        }    
    }

    function onPreorderSubmit(){
        if (state.selectedPhoneData){            
            const modelsPickupDelivery: PreorderModels[] = [];
            orderContextValue.map(data => {	
								const isDelivery = data.method === COLLECTION_METHOD_VALUE.DELIVERY;
                const model: PreorderModels = {
                    modelCode: data.id.split("|")[0],
                    storeCode: isDelivery ? SHOP_ID.WAREHOUSE : data.pickupStore?.label || '',
										district: isDelivery ? (data.district ?? '') : ''
                };
                modelsPickupDelivery.push(model);
            })
            const data:PreorderSubmitRequestData = {
                channel: channel,
                models_pickup_delivery: modelsPickupDelivery

            }
            if (channel!=Channel.ONLINE){
                data.channelData = channelData;
            }
            showLoading({id:'submit'});
            preorderSubmit(data);
        }
        if (applicationContext?.eventCallback) {
            applicationContext.eventCallback(createCallbackValue(CALLBACK_CONFIRM_ORDER))
        }        
    }
    
    // OfferAndCollection
    const [reviewData, setReviewData] = useState<ReviewData|null>(null);
    const reviewDataHandler = useCallback((v: ReviewData) => {
        setReviewData(prev => {
            const _list = prev === null ? {} : prev
            return {
                ..._list,
                ...v
            } 
        })
    }, []);
    const preOrderHandset = useMemo(() => {
        const _data = state.selectedPhoneData
        if (_data === undefined) {
            return []
        }
        
        return _data.map((data, index) => createPreOrderHandset(isEng, data, index, applicationContext?.domain))
    }, [state?.selectedPhoneData]);
    const orderContextValue: OrderContextValue[] = useMemo(() => {
			const _data = preOrderHandset
			if (_data === undefined || reviewData === null) {
					return []
			}
			return Object.values(_data).filter(data => {
				const collectionMethod = reviewData[data.id]
				const method = collectionMethod?.[0] ?? '';
				const pickup = collectionMethod?.[1] ?? '';
				const deliveryDistrict = collectionMethod?.[2] ?? '';
				return (method === COLLECTION_METHOD_VALUE.DELIVERY && isNotBlank(deliveryDistrict)) || (method === COLLECTION_METHOD_VALUE.PICKUP && isNotBlank(pickup));
			}).map(data => {
				const collectionMethod = reviewData[data.id]
				const method = collectionMethod?.[0] ?? '';
				const pickup = collectionMethod?.[1] ?? '';
				const district = collectionMethod?.[2] ?? '';
				const pickupStore = isNotBlank(pickup) ? createStoreCard(localizeStore(isEng, storeData[pickup])) : null
				return {
					...data,
					method,
					pickupStore,
					district
				}
			})
    }, [preOrderHandset, reviewData, storeData]);
                    
	const disableButton:boolean = checkDisableButton(state.currentStep, state.selectedPhoneData);

    return (
        <StyledMainContainer>
            <OrderContext.Provider value={orderContextValue}>
                {state.currentStep !== OrderStep.STEP_SUCCESS &&
                    <StyledSteppersWrapper>
                            <Steppers activeStep={activeStep} steps={steps}/>
                    </StyledSteppersWrapper>
                }
                {onSelectIphoneStep(state.currentStep) &&
                    <PhoneSelector quota={quota} handsetGroupData={handsetGroupData} voucherData={voucherData} onSelectedPhoneOption={getSelectedPhoneData} selected={state.selectedPhoneData}/>
                }       
                {state.currentStep === OrderStep.STEP_COLLECTION_METHOD && 
                    <OfferAndCollection handsets={preOrderHandset} storeData={storeData} getReviewData={reviewDataHandler} data={reviewData} quota={quota} voucherData={voucherData} onClickBackButton={onClickBackButton}/>}
                {state.currentStep === OrderStep.STEP_REVIEW && 
                    <Review onClickBackButton={onClickBackButton} onClickConfirm={onClickNextButton}/>}
                {state.currentStep === OrderStep.STEP_SUCCESS && 
                    <ThankYou submitResult={preOrderSubmitResult} preorderRecord={preorderRecord} handsetGroupData={handsetGroupData} isWhitelistUser={isWhitelistUser} />}
							{(state.currentStep !== OrderStep.STEP_SUCCESS && state.currentStep !== OrderStep.STEP_REVIEW) && 
                    <FooterSummary selectedPhoneData={state.selectedPhoneData}  currentStep={state.currentStep} voucherData={voucherData}>
                        <StyledTextButton disabled={disableButton} onClick={onClickNextButton}>{intl.formatMessage({ id: "footer.button.continue" })}</StyledTextButton>
                    </FooterSummary>}
            </OrderContext.Provider>  
        </StyledMainContainer>

    )
}

export default MainController;

export const OrderContext = createContext<OrderContextValue[]|null>(null);

export type OrderContextValue = ProductInfoProps & {
	method: COLLECTION_METHOD_VALUE;
	pickupStore: ReturnType<typeof createStoreCard> | null
	district: string | null
}
