import { Box, Divider, Paper, useMediaQuery, useTheme, withStyles } from '@material-ui/core'
import AppleCarePlus from '@smt/component/appleCarePlus'
import OfferSelector from '@smt/page/OfferAndCollection/OfferSelector'
import { createPreOrderHandset } from '@smt/page/OfferAndCollection/ProductInfo'
import { StyledSelectorHeading } from '@smt/page/OrderDetails/PickUpSelector'
import { Locale, LocaleEN } from '@smt/type/common'
import { GetStoreAPIResponse } from '@smt/type/handsetPreOrder2023/api'
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { useIntl } from 'react-intl'
import { fulfillmentMainReducer } from '../reducer'
import { FulfillmentMainState, FulfillmentRawHandsetData, FulfillmentRawOfferData, FulfillmentRawVoucher, FULFILLMENT_ACTION, FulfillmentRawOrderValue, SHOP_ID, HANDSET_MODAL, APPLE_CARE_PLUS_OFFER } from "@smt/type/handsetPreOrder2023/fulfillment"
import { DeliveryTo } from './DeliveryTo'
import { DUMMY } from './DUMMY'
import { FreeGift } from './FreeGift'
import { Handset } from './Handset'
import { PickupAtStore } from './PickupAtStore'
import { getAppleCarePlusOffer, getSelectedHandset, StyledFulfillmentHeader } from '..'
import { isNotBlank } from '@smt/util/StringUtils'
import { FormWatcherContext, FormWatcherProvider } from '@smt/hook/InputHook'
import styled from 'styled-components'
import { PaymentCaseContext } from '../PaymentCaseProvider'

export const StyledPaper = withStyles((theme) => ({
	root: {
		margin: theme.spacing(0, 2),
		borderRadius: '20px',
		boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.07)',
		[theme.breakpoints.up('md')]: {
			margin: 0
		}
	}
}))(Paper)

export const StyledInputHeading = styled(StyledSelectorHeading)`
	margin-bottom: ${p => p.theme.spacing(p.mb ?? 2.5)}px;
	font-size: 2rem;
`

export interface OrderFormProps {
	handsetInfo: ReturnType<typeof createPreOrderHandset>;
	stores: GetStoreAPIResponse;
	voucher: FulfillmentRawVoucher;
	offer: FulfillmentRawOfferData;
	value: FulfillmentMainState | null;
	appleCarePlusOffer: ReturnType<typeof getAppleCarePlusOffer>['offer'] | null
	onChangeOrderFormValues: (v: FulfillmentMainState) => void;
	onChangeOrderFormValid: (v: boolean) => void;
}

export default function OrderForm(p: OrderFormProps) {
	const {handsetInfo, stores, onChangeOrderFormValues, value, voucher, offer, appleCarePlusOffer, onChangeOrderFormValid} = p;
	if (value === null) {
		return <></>
	}
	const {gift} = offer.offer_data;
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const isDelivery = value.pickupInfo?.id === SHOP_ID.WAREHOUSE;
	const [state, dispatch] = useReducer(fulfillmentMainReducer, value);
	const [appleCarePlus, setAppleCarePlusValid] = useState(false);
	const {errorList} = useContext(FormWatcherContext); 

	const onChangeState = (type: FULFILLMENT_ACTION) => (payload: FulfillmentMainState[keyof FulfillmentMainState]) => {
		dispatch({
			type,
			payload
		})
	}

	useEffect(() => {
		onChangeOrderFormValues(state)
	}, [state])

	useEffect(() => {
		const formValid = !Object.values(errorList).includes(true);
		onChangeOrderFormValid(formValid && appleCarePlus);
	}, [errorList, appleCarePlus])
	
	// responsive space
	const rs = (d: number, m?: number) => {
		return isDesktop ? d : (m ?? Math.ceil(d * .5))
	}

	return <>
		{!isDesktop && <StyledFulfillmentHeader>
			{intl.formatMessage({id:"pre-ordered-summary"})}
		</StyledFulfillmentHeader>}
		<StyledPaper>
			<Box py={rs(6)} px={rs(6, 2)} mb={rs(2)} display="flex" flexDirection={isDesktop ? 'row' : 'column'} alignItems="stretch">
				<Box pr={isDesktop ? 4 : 0}>
					<Handset {...handsetInfo} referenceNo={value.refNumber} />
				</Box>
				<Box px={isDesktop ? 6 : 0} py={isDesktop ? 0 : 2}>
					<Divider orientation={isDesktop ? 'vertical' : 'horizontal'} />
				</Box>
				<Box display="flex" flexDirection="column" alignItems="flex-start">
					{state.discount !== undefined && <Box mb={rs(2)} width={isDesktop ? 360 : '100%'} >
						<OfferSelector 
							data={voucher} 
							value={state.discount} 
							onChangeValue={onChangeState(FULFILLMENT_ACTION.UPDATE_DISCOUNT)} 
						/>
					</Box>}
					<Box my={rs(2)} width="100%" ><FreeGift data={gift} /></Box>
					{appleCarePlusOffer !== null && <Box my={rs(2)}>
						<StyledInputHeading>{intl.formatMessage({id:"add-ons"})}</StyledInputHeading>
						<AppleCarePlus 
							data={appleCarePlusOffer}
							value={state.appleCarePlus} 
							onChangeValue={onChangeState(FULFILLMENT_ACTION.UPDATE_APPLE_CARE_PLUS)}
							onChangeValid={setAppleCarePlusValid}
						/>
					</Box>}
					<Box mt={rs(2, 3)} width="100%">
						{isDelivery
							? <DeliveryTo
									value={state.deliveryInfo}
									onChange={onChangeState(FULFILLMENT_ACTION.UPDATE_DELIVERY_INFO)}
									valid={Object.values(errorList).includes(false)}
								/>
							: <PickupAtStore 
									stores={stores} 
									caseId={value.caseId}
									value={state.pickupInfo}
									onChangeValue={onChangeState(FULFILLMENT_ACTION.UPDATE_PICKUP_INFO)} 
									valid={Object.values(errorList).includes(false)}
								/>
						}
					</Box>
				</Box>
			</Box>
		</StyledPaper>
	</>
}
