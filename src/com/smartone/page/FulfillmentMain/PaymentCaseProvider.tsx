import ApplicationContext, { Channel } from '@smt/context/ApplicationContext';
import { Language } from '@smt/lang/Lang';
import { SPECIAL_ITEM_NAME, SpecialItemData } from '@smt/type/handsetPreOrder2023/fulfillment';
import React, { createContext, useContext, useState } from 'react'
import { useIntl } from 'react-intl';

export enum COUPON_OPTION {
	NOT_USE = 'not-use'
}

export enum OPT_TERMS {
	TWO_HUNDRED_COUPON = '200coupon',
	PREPAID = 'prepaid'
}

const PaymentCaseContext = createContext({
	getPaymentCaseByCoupon: (v: string): ReturnType<ReturnType<typeof getPaymentCase>> => ({
		online: true,
		offline: {
			normal: true,
			iPhone4Life: false
		}
	}),
	getCouponOption: (v: Array<{title:React.ReactNode; value:string}>): Array<{title:React.ReactNode; value:string}> => ([]),
	setIsDelivery: (v: boolean) => {},
	setHasIPhone4Life: (v: boolean) => {},
	setExtraTerm: (k: OPT_TERMS, v: boolean) => {},
	extraTermList: undefined as {[key in OPT_TERMS]: boolean}|undefined,
	isDelivery: false,
	roamingDataPack: {
		get: undefined as SpecialItemData[Language] | undefined,
		set: (v: SpecialItemData[Language]) => {}
	}
})

const PaymentCaseProvider: React.FC<{}> = ({children}) => {
	const [isDelivery, setIsDelivery] = useState(false);
	const [hasIPhone4Life, setHasIPhone4Life] = useState(false);
	const [extraTermList, setExtraTermList] = useState<{[key in OPT_TERMS]: boolean}|undefined>();
	const [roamingDataPack, setRoamingDataPack] = useState<SpecialItemData[Language]|undefined>();
	const getPaymentCaseByCoupon = getPaymentCase([isDelivery, hasIPhone4Life]);
	const getCouponOption = filterCouponOptions([isDelivery, hasIPhone4Life]);
	const setExtraTerm = (k: OPT_TERMS, v: boolean) => {
		setExtraTermList(prev => {
			if (prev === undefined) {
				return {
					[k]: v
				}
			}
			return {
				...prev,
				[k]: v
			}
		})
	}

	const providerFn = {
		getPaymentCaseByCoupon,
		getCouponOption,
		setIsDelivery,
		setHasIPhone4Life,
		setExtraTerm,
		extraTermList,
		isDelivery,
		roamingDataPack: {
			get: roamingDataPack,
			set: setRoamingDataPack
		}
	}

	return <PaymentCaseContext.Provider value={providerFn}>
		{children}
	</PaymentCaseContext.Provider> 
}

export {
	PaymentCaseProvider,
	PaymentCaseContext
}

const getPaymentCase = (orderCase: [boolean, boolean]) => (couponValue: string|COUPON_OPTION.NOT_USE) => {
	const application = useContext(ApplicationContext);
	const isDelivery = orderCase[0];
	const hasIPhone4Life = orderCase[1];
	if (isDelivery) {
		return {
			online: true,
			offline: {
				normal: false,
				iPhone4Life: false
			}
		}
	}
	if (couponValue === COUPON_OPTION.NOT_USE) {
		return {
			online: true,
			offline: {
				normal: true,
				iPhone4Life: false
			}
		}
	} else {
		if (application?.channel !== Channel.ONLINE //offline channel
			&& hasIPhone4Life
			&& couponValue !== COUPON_OPTION.NOT_USE
			&& !isDelivery
		) {
			return {
				online: true,
				offline: {
					normal: true,
					iPhone4Life: false
				}
			}
		}
		return {
			online: !hasIPhone4Life,
			offline: {
				normal: !hasIPhone4Life,
				iPhone4Life: hasIPhone4Life
			}
		}
	}
}

const filterCouponOptions = (orderCase: [boolean, boolean]) => (options: Array<{title:React.ReactNode; value:string}>) => {
	const intl = useIntl();
	const isDelivery = orderCase[0];
	const hasIPhone4Life = orderCase[1];
	const notUseOption = {
		title: intl.formatMessage({id:"dont-use"}),
		value: COUPON_OPTION.NOT_USE
	}
	if (!isDelivery && hasIPhone4Life) {
		return options
	}
	if (isDelivery && hasIPhone4Life) {
		return [notUseOption]
	}
	return [...options, notUseOption]
}