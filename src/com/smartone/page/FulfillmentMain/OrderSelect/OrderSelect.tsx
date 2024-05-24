import React, { useContext, useMemo, useState, useCallback, Children, useEffect, useRef, useLayoutEffect, useReducer } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import ApplicationContext from '@smt/context/ApplicationContext';
import { handsetGroupDataRecord, IMAGE_PATH } from '@smt/page/PhoneSelector/SelectPhone';
import { getLangFromLocale } from '@smt/lang/Lang';
import { formatPrice, formatTB, strip_html_tags } from '@smt/util/StringUtils';
import { TextButton } from '@smt/component/button';
import {  FulfillmentMainState, FulfillmentRawHandsetData, FulfillmentRawOrderValue, FULFILLMENT_ACTION, FulfillOrderDataRecord } from '@smt/type/handsetPreOrder2023/fulfillment';
import { fulfillmentMainReducer } from '../reducer';
import { AjaxResultStatus } from '@smt/hook/xhr/AjaxHook'
import { ModalContext } from '@/context/ModalContext';
import { SelectOrderActionRequestData, useSelectOrderAction } from '@smt/hook/fullfillment/SelectOrderActionHook';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { OrderLabel } from '@smt/page/ThankYou';

interface OrderSelectProps {
    caseInfo: FulfillmentRawOrderValue[];
    orderData: FulfillOrderDataRecord[];
    handsets: FulfillmentRawHandsetData;
	onChangeOrderFormValues: (v: FulfillOrderDataRecord) => void;
}

const StyledOrderSelectWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom:${p => p.theme.spacing(5)}px; 
    ${(p) => p.theme.breakpoints.down('md')} {	
        flex-wrap: wrap;
				& > :last-child {
					margin-bottom: ${p => p.theme.spacing(2)}px;
				}
    }
`;

const StyledOrderSelectContainer = styled.div`
	display: flex;
	justify-content: flex-start;
    align-items: center;
    flex-flow: wrap;
	width: 100%;
	padding: ${p => p.theme.spacing(3)}px ${p => p.theme.spacing(2)}px;	
    flex-basis: 100%;
	box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
	background: #fff;
	box-sizing: border-box;
	border-radius: 15px; 
    flex-direction: column;
    margin: 0 ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(2)}px;
	${(p) => p.theme.breakpoints.up('md')} {	
		flex-basis: calc((100% / 3 ) - (24px * 2));
		margin: 0 ${p => p.theme.spacing(2)}px;
        padding: ${p => p.theme.spacing(5)}px ${p => p.theme.spacing(6)}px;	
	}
`
const StyledPhoneContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;
const StyledPhoneInfoContainer  = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    ${(p) => p.theme.breakpoints.up('md')} {
        flex-direction: column;
        justify-content: center;
    }
`;
const StyledPhoneInfoCell  = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    ${(p) => p.theme.breakpoints.up('md')} {
        justify-content: center;
        align-items: center;
    }
`;
const StyledOrderHeader = styled.div`
    text-align: center;
    ${p => p.theme.typography.h3};
    margin: ${p => p.theme.spacing(6)}px 0 ${p => p.theme.spacing(2)}px;
`;
const StyledOrderDesc = styled.div`
    text-align: center;
    margin: ${p => p.theme.spacing(2)}px 0 ${p => p.theme.spacing(4)}px;
    ${p => p.theme.typography.body1};
`;
const StyledPhoneImage = styled.img`
	margin: 0 ${p => p.theme.spacing(2)}px 0 0;
	width: 100%;
    max-width: 120px;
    min-width: 120px;
	${(p) => p.theme.breakpoints.up('md')} {		
		margin: ${p => p.theme.spacing(1)}px 0;
		width: 100%;
		max-width: 200px;
    	min-width: auto;
	}
`;
const StyledPhoneImageCell = styled.div`
`;
const StyledPhoneName = styled.div`
    ${p => p.theme.typography.h5};
    margin: 0 0 4px;
    ${(p) => p.theme.breakpoints.up('md')} {
        margin: ${p => p.theme.spacing(2)}px 0 4px;
    }
`;
const StyledPhoneDesc = styled.div`
    color: #9C9C9C;
    margin-bottom: ${p => p.theme.spacing(2)}px;
    ${p => p.theme.typography.body1};
`;
const StyledPhoneRefno = styled.div`
    color: #9C9C9C;
    ${p => p.theme.typography.body1};
`;
const StyledStatusContainer = styled.div`
    border-radius: 6px;
    border: 1px solid #d3d3d3;
    display: flex;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
		padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(2)}px;
		margin: ${p => p.theme.spacing(2)}px 0 0;
		${(p) => p.theme.breakpoints.up('md')} {
			padding: ${p => p.theme.spacing(1)}px ${p => p.theme.spacing(2)}px;
			margin: ${p => p.theme.spacing(1)}px 0 0;
		}
`;
const StyledStatusText = styled.div`
    color: #9C9C9C;
		font-size: 1.2rem;
`;
const StyledStatusValue = styled.div<{colorCode:string;}>`
    text-align:center;
    margin-top: 5px;
    color: ${(p) => p.colorCode};
    ${p => p.theme.typography.h5};
		font-size: 1.6rem;
		${(p) => p.theme.breakpoints.up('md')} {
			font-size: 1.6rem;
		}
`;
const StyledTextButton = styled(TextButton)`
    width: 100%;
    height: 56px;
`;
const StyledButtonContainer = styled.div`
    width: 100%;
    margin: ${p => p.theme.spacing(4)}px 0 0;
`;
//
const getStatusColor = (btnStatus:String) =>{
    let colorCode = "#9C9C9C";
    switch (btnStatus) {
        case "PF":
        case "PRF":
            colorCode = "#4CAF50";
            break;
        case "PA":
        case "PRA":
            colorCode = "#FF0000";
            break;
    }
    return colorCode;
}
const isShowButton = (status:String, btnStatus:String) =>{
    return status.includes("caseid=") && !btnStatus.includes("PAID") ? true : false;
}
const getErrorId = (error?: string) => {
	switch (error) {
		case "XXX":
			return "error.XXX";
		default:
			return "error.system-busy";
	}
}

const OrderSelect = (p:OrderSelectProps) => {
    const {handsets, caseInfo, orderData, onChangeOrderFormValues} = p;
	if (caseInfo.length == 0 || orderData.length == 0) {
		return <></>
	}
    const intl = useIntl();
	const lang = getLangFromLocale(intl.locale);
    const applicationContext = useContext(ApplicationContext);
    const { showLoading, hideLoading } = useContext(ModalContext);
    const { showAlert } = useContext(ModalContext);
    const theme = useTheme();
    const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);

    const domain = applicationContext?.url?.domain;
    const title = intl.formatMessage({id: "fulfill.order-select.title"});
    const desc = intl.formatMessage({id: "fulfill.order-select.desc"});
    const refno = intl.formatMessage({id: "fulfill.order-select.reference-no"});
    const status = intl.formatMessage({id: "fulfill.order-select.collection-status"});
    
    const handset_data: handsetGroupDataRecord["handset_data"] = handsets.handset_data;

    const { aboutSelectOrderAction, selectOrderAction, SelectOrderActionResult } = useSelectOrderAction();
    const [ selectedOrder, selectOrder ] = useState<FulfillmentRawOrderValue>();
    const [ selectedCase, selectCase ] = useState<FulfillOrderDataRecord>();

    useEffect(() => {
		if(SelectOrderActionResult){
			if(SelectOrderActionResult.status == AjaxResultStatus.OK ) {	
                if (SelectOrderActionResult.result?.status == AjaxResultStatus.OK){
                    if (selectedOrder && selectedCase){
						onChangeOrderFormValues(selectedCase);
                        hideLoading('orderSelect');
                    }                                  
                    
                } else {
                    hideLoading('orderSelect');
                    const errorMsg = SelectOrderActionResult.result?.err_code;
                    showAlert({
                        message: intl.formatMessage({ id: getErrorId(SelectOrderActionResult.result?.err_code) }) + `${errorMsg}`
                    })
                }
			} else if(SelectOrderActionResult.status == AjaxResultStatus.FAILED) {
                hideLoading('orderSelect');                
                showAlert({
                    message: intl.formatMessage({ id: getErrorId() })
                })             
            }            
		}
    }, [SelectOrderActionResult]);

    //const onChangeState = (type: FULFILLMENT_ACTION) => (payload: FulfillmentMainState[keyof FulfillmentMainState]) => {
    const handleClick = (selectedCase:FulfillOrderDataRecord) => {
        const selectedOrder = caseInfo.find((element) => element.case_id === selectedCase.caseId.toString());
        if (selectedOrder){
            showLoading({id:'orderSelect'});
            selectCase(selectedCase);
            selectOrder(selectedOrder);  
            selectOrderAction(selectedOrder.case_id);
        }
    }

    return(
        <>
            <StyledOrderHeader>{title}</StyledOrderHeader>
            <StyledOrderDesc>{desc}</StyledOrderDesc>
            <StyledOrderSelectWrapper>
            {  
                orderData && orderData.map((order, index) => {	
                    const handsetData = Object.values(handset_data).find(handset => handset.product_code === order.productCode);
                    const handsetImage = domain+IMAGE_PATH+handsetData?.img_prefix+".png";
                    const handsetName = (lang=="english")?handsetData?.name_eng:handsetData?.name_chi;
                    const handsetColor = (lang=="english")?handsetData?.color_eng:handsetData?.color_chi;
                    const handsetCapacity = handsetData?formatTB(handsetData.capacity):"";
                    const handsetDesc = handsetCapacity + " " + handsetColor;
                    const selectedOrder = caseInfo.find((element) => element.case_id === order.caseId.toString());
                    const referenceNo = selectedOrder?selectedOrder.online_order_number:"";
                    const collectionStatus = strip_html_tags(order.availability);
                    const btnActionStatus = order.btnActionStatus;
                    const showButton = isShowButton(order.btnAction, btnActionStatus);
                    const statusColorCode = getStatusColor(btnActionStatus);

                    return (	
                        handsetData && index < 3 && 
                        <StyledOrderSelectContainer key={index}>
                            <StyledPhoneContainer>
																{/* {orderData.length > 1 && <Box pb={2}>
																	<OrderLabel index={index} align={isDesktop ? 'center' : 'left'} />
																</Box>} */}
                                <StyledPhoneInfoContainer>
                                    <StyledPhoneImageCell>
                                        <StyledPhoneImage src={handsetImage} />
                                    </StyledPhoneImageCell>
                                    <StyledPhoneInfoCell>
                                        <StyledPhoneName>{handsetName}</StyledPhoneName>
                                        <StyledPhoneDesc dangerouslySetInnerHTML={{__html: handsetDesc}}></StyledPhoneDesc>
                                        <StyledPhoneRefno>{refno}</StyledPhoneRefno>
                                        <StyledPhoneRefno>{referenceNo}</StyledPhoneRefno>
                                    </StyledPhoneInfoCell>
                                </StyledPhoneInfoContainer>
                                <StyledStatusContainer>
                                    <StyledStatusText>{status}</StyledStatusText>
                                    <StyledStatusValue colorCode={statusColorCode}>{collectionStatus}</StyledStatusValue>
                                </StyledStatusContainer>
                                {showButton && 
                                <StyledButtonContainer>
                                    <StyledTextButton onClick={()=>handleClick(order)}>{intl.formatMessage({ id: "footer.button.continue" })}</StyledTextButton>
                                </StyledButtonContainer>
                                }
                            </StyledPhoneContainer>
                        </StyledOrderSelectContainer>
                    )
                })
            }
            </StyledOrderSelectWrapper>
        </>
    )
}
export default OrderSelect;
