import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import Page from '@smt/page/Base';
import { StyledSelectorHeading } from '@smt/page/OrderDetails/PickUpSelector'
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { APIResponse, API_STATUS, GetCouponAPIResponse, GetDeliveryData, GetStoreAPIResponse } from '@smt/type/handsetPreOrder2023/api';
import { ProductInfoProps } from './ProductInfo';
import { COLLECTION_METHOD_VALUE } from './CollectionMethod';
import { useAjax } from '@smt/hook/xhr/AjaxHook';
import { RequestMethod } from '@smt/hook/xhr/XMLHttpRequestHook';
import FootNote from '../PhoneSelector/FootNote';
import Voucher, { voucherData } from '@smt/component/voucher/Voucher';
import ApplicationContext from '@smt/context/ApplicationContext';

export const Styled2023PreOrderMain = styled.div`
	display: block;
	margin: ${p => p.theme.spacing(4)}px ${p => p.theme.spacing(2)}px;
	${(p) => p.theme.breakpoints.up('md')} {
		margin: ${p => p.theme.spacing(4)}px auto;
	}
`

export interface OfferAndCollectionProps {
	handsets: ProductInfoProps[];
	storeData: GetStoreAPIResponse;
	getReviewData: (v: ReviewData) => void;
	onClickBackButton:() => void;
	data: ReviewData|null;
	quota: number;
	voucherData: voucherData;
} 

export type ReviewData = ReturnType<typeof createReviewData>

export default function OfferAndCollection(p: OfferAndCollectionProps) {
	const { handsets, getReviewData, storeData, onClickBackButton, data, quota, voucherData  } = p;
	const intl = useIntl();
	const [couponData, setCouponData] = useState<GetCouponAPIResponse|undefined>();
	const [delivery, setDelivery] = useState<Pick<GetDeliveryData, 'canDelivery'|'quota'|'deliveryPeriod'>>({
		canDelivery: false,
		quota: false,
		deliveryPeriod:false
	});

	const couponProps = {
		data: couponData
	}

	const collectionMethodProps = {
		storeData: storeData,
		onChangeMethod: useCallback((pid: string, method: ReviewData[keyof ReviewData]) => {
			const state = createReviewData(pid, method)
			getReviewData(state)
		}, []),
		availableDelivery: delivery,
		data
	}

	const fetchDeliveryAPI = useCallback(fetchAPI<GetDeliveryData>({
		url: '/jsp/Internal/IPPO2023/API_checkUserEligibleForDelivery.jsp?n=' + handsets.length,
		setter: (res) => {
			return setDelivery({
				canDelivery: res.canDelivery,
				quota: res.quota,
				deliveryPeriod: res.deliveryPeriod
			})
		}
	}), [])

	useEffect(() => {
		fetchDeliveryAPI()
	}, [])

	return <Page>		
		<Page.Body>
			<Styled2023PreOrderMain>
				<StyledSelectorHeading>{intl.formatMessage({id:"pre-order.summary.heading"})}</StyledSelectorHeading>
				<Voucher quota={quota} voucherData={voucherData} />
				{handsets.map((handset, index) => <ProductCard productInfo={{...handset}} collectionMethod={collectionMethodProps} key={index} />)}
			</Styled2023PreOrderMain>
		</Page.Body>
		<Page.Footer>
			<FootNote onClickBackButton={onClickBackButton}/>
		</Page.Footer>	
	</Page>
}

type FetchAPIProps<R extends APIResponse> = {
	url: RequestInfo | URL;
	setter: (res: R) => void;
	onError?: (p: Pick<APIResponse, 'err_code'|'err_msg'>) => void;
}

export function fetchAPI<R extends APIResponse>({url, setter, onError}: FetchAPIProps<R>) {
	return async function() {
		let result: R | null = null;
		try {
			const response = await fetch(url);
			result = await response.json()
		} catch (error) {
			if (onError !== undefined) {
				onError({
					err_code: 'fetching ${url} fail',
					err_msg: error
				})
			} else {
				alert(error)
			}
		}
		if (result !== null) {
			if (result.status === API_STATUS.SUCCESS) {
				setter(result)
			} else {
				if (onError !== undefined) {
					const {err_code, err_msg} = result;
					onError({
						err_code,
						err_msg
					})
				}
			}
		}
	}
} 

type PostAPIProps<D extends RequestInit['body'], R extends APIResponse> = {
	url: string;
	body?: D;
	onStart?: () => void;
	onSuccess?: (res: R) => void;
	onError?: (p: Pick<APIResponse, 'err_code'|'err_msg'>) => void;
}

export function PostAPI<D extends RequestInit['body'], R extends APIResponse>({url, body, onStart, onSuccess, onError}: PostAPIProps<D, R>) {
	const request = new Request(url, {
		method: 'POST',
		body: body
	})
	return async function() {
		let result: R | null = null;
		if (onStart) {
			onStart()
		}
		try {
			const response = await fetch(request);
			result = await response.json()
		} catch (error) {
			if (onError !== undefined) {
				onError({
					err_code: 'fetching ${url} fail',
					err_msg: error
				})
			} else {
				alert(error)
			}
		}
		if (result !== null) {
			if (result.status === API_STATUS.SUCCESS) {
				if (onSuccess !== undefined) {
					onSuccess(result)
				}
			} else {
				if (onError !== undefined) {
					const {err_code, err_msg} = result;
					onError({
						err_code,
						err_msg
					})
				}
			}
		}
	}
}

function createReviewData(pid: string, method: [COLLECTION_METHOD_VALUE, string|null, string|null]) {
	return {
		[pid]: method
	}
}