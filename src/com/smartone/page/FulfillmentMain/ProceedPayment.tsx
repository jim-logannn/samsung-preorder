import { Box, BoxProps, Paper, Typography, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import Pin from '@smt/component/icon/Pin';
import Van from '@smt/component/icon/Van';
import { Locale, LocaleEN } from '@smt/type/common';
import { formatDefaultCurrencyPrice, isNotBlank } from '@smt/util/StringUtils';
import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { localizeStore } from '../OfferAndCollection/CollectionMethod';
import { createPreOrderHandset } from '../OfferAndCollection/ProductInfo';
import { createStoreCard } from '../OfferAndCollection/StoreCard';
import { StyledSelectorHeading } from '../OrderDetails/PickUpSelector';
import TermCheckbox from '../OrderDetails/TermCheckbox';
import { OrderFormProps, StyledPaper } from './OrderForm';
import { DUMMY } from './OrderForm/DUMMY';
import { FulfillmentMainState, FulfillmentRawHandsetData, FulfillmentRawOfferData, FulfillmentRawVoucher, SHOP_ID, SpecialItemData } from "@smt/type/handsetPreOrder2023/fulfillment";
import { Img, getAppleCarePlusOffer, getSelectedHandset, StyledFulfillmentHeader } from '.';
import { GetStoreAPIResponse } from '@smt/type/handsetPreOrder2023/api';
import { dayjs } from '@smt/util/DayUtils';
import CtaButton from '@smt/button/CtaButton';
import { StyledConfirmBtn } from './OrderForm/FootNote';
import { Variant } from '@material-ui/core/styles/createTypography';
import ApplicationContext from '@smt/context/ApplicationContext';
import { PaymentCaseContext } from './PaymentCaseProvider';
import { Language } from '@smt/lang/Lang';
import { Style } from 'util';

const StyledTotalPaper = withStyles((theme) => ({
	root: {
		background: '#F6F6F6',
		boxShadow: 'none',
		borderRadius: 12
	}
}))(Paper)

interface ProceedPaymentProps {
	value: FulfillmentMainState;
	handset: ReturnType<typeof getSelectedHandset>;
	stores: GetStoreAPIResponse
	voucher: FulfillmentRawVoucher;
	gift: FulfillmentRawOfferData['offer_data']['gift'];
	premium?: Array<SpecialItemData[Language]>;
	appleCarePlusOffer: ReturnType<typeof getAppleCarePlusOffer>['offer'] | null;
	prepaid: {
		need: boolean,
		content: SpecialItemData[Language]
	}
	onChangeTermsConsent: (v: boolean) => void;
}
export const ProceedPayment = (p: ProceedPaymentProps) => {
	const { value, handset, stores, voucher, appleCarePlusOffer, gift, prepaid, premium, onChangeTermsConsent } = p;
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const applicationContext = useContext(ApplicationContext);
	const handsetInfo = createPreOrderHandset(isEng, handset, 0, applicationContext?.domain);
	const prepaidAmount = prepaid.need ? handset.prepay_amount : 0;
	const purchaseItems = [
		createHandsetItem(handsetInfo),
		createDiscountItem(handset, value.discount),
		prepaidAmount > 0 ? createItem(intl.formatMessage({id:"prepayment"}), prepaidAmount, undefined, prepaid.content.title ?? '') : null,
		createAppleCarePlusItem(value.appleCarePlus, appleCarePlusOffer),
		...createGiftItem(gift),
		...premium?.map(item => createItem(item.title, 0, item.img))??[]
	];
	const totalOfAmount = formatDefaultCurrencyPrice(purchaseItems.reduce((acc, item) => acc + (item?.amount ?? 0), 0), 'array');

	const space = isDesktop 
		? [[2],
				[3, 1],
				[4]
			]
		: [[1],
			[1, 1],
			[2]
		]

	return <>
		<StyledFulfillmentHeader>
			{intl.formatMessage({ id: "proceed-payment" })}
		</StyledFulfillmentHeader>
		<StyledPaper>
			<Box p={space[0][0]}>
				<Box px={space[1][0]} pt={space[1][0]} mx={space[1][1]}>
					{purchaseItems.length > 0 && purchaseItems.map((item, index) => (
						<>
							{item !== null && <PurchaseItems key={index} theLast={index >= purchaseItems.length - 1} {...item} />}
						</>
					))}
				</Box>
				<Box px={space[1][0]} py={3} mx={space[1][1]}>
					<Delivery formData={value} stores={stores} />
				</Box>
				<StyledTotalPaper>
					<Box px={space[2][0]} py={2.5} textAlign="right">
						<Box display="inline-block" pr={2}>
							<Typography variant="h6" component="span">
								{intl.formatMessage({ id: 'fulfill.review-total' })}
							</Typography>
						</Box>
						<Box display="inline-block" style={{color: 'red'}}>
							<Typography variant="h6" component="span">
								{totalOfAmount[1]}&nbsp;
							</Typography>
							<Typography variant="h5" component="span">
								{totalOfAmount[2]}
							</Typography>
						</Box>
					</Box>
				</StyledTotalPaper>
			</Box>
		</StyledPaper>
		<TermCheckbox onSelectedTermCheckbox={onChangeTermsConsent}/>
	</>;
};

const createItem = (title: string, amount: number, image?: string, description?: string | ReturnType<typeof FormattedMessage>) => {
	return {
		image: image ?? null,
		title: title,
		description: description ?? null,
		amount: amount
	};
};
const createHandsetItem = (handset: ReturnType<typeof createPreOrderHandset>) => {
	const { image, title, model, price } = handset;
	return createItem(title, price.origin, image, model);
};
const createDiscountItem = (handset: ReturnType<typeof getSelectedHandset>, selectedDiscount?: FulfillmentMainState['discount']) => {
	if (selectedDiscount === undefined) {
		return null
	}
	const intl = useIntl();
	const _data = getSelectedDiscount(handset, selectedDiscount).discounted
	return _data ? createItem(intl.formatMessage({ id: `coupons.${selectedDiscount}` }), _data * -1) : null;
};
const createAppleCarePlusItem = (appleCarePlus: FulfillmentMainState['appleCarePlus'], offer: ReturnType<typeof getAppleCarePlusOffer>['offer'] | null ) => {
	if (offer === null) {
		return null
	}
	return appleCarePlus?.selected ? createItem(offer.title, offer.offer_price, offer.img, appleCarePlus.email) : null;
};
const createGiftItem = (giftList: FulfillmentRawOfferData['offer_data']['gift']) => {
	const items = Object.values(giftList).map(gift => createItem(gift.title, 0, gift.img, <FormattedMessage id="free"/>))
	return items
}
/*
		PurchaseItems
*/
const PurchaseItems = (p: ReturnType<typeof createItem> & {theLast?: boolean}) => {
	const { image, title, description, amount, theLast=false } = p;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const [symbol, unit, price] = formatDefaultCurrencyPrice(amount, 'array') as string[]
	const color = {color: amount < 0 ? 'red' : 'inherit'}
	return <Box display="flex" pb={theLast ? 0 : 3} alignItems="center">
		<Box minWidth={isDesktop ? 80 : 60}>
			{isNotBlank(image) && <Img path={image ?? ''} width={isDesktop ? 80 : 60} height={isDesktop ? 80 : 60} title={title} />}
		</Box>
		<Box flexGrow={1} px={isDesktop ? 4 : 1}>
			<Typography variant="body2" component="div" style={{fontWeight: 400}}>{title}</Typography>
			{isNotBlank(description) && <Typography variant="body1" component="div" style={{color: '#999'}}>{description}</Typography>}
		</Box>
		<Box display="flex" flexWrap="nowrap" alignItems="center" justifyContent="flex-end" minWidth={isDesktop ? 100 : 'auto'} textAlign="right">
			<PriceLabel style ={{...color, fontSize: '1.4rem' }}>
				{symbol}
			</PriceLabel>
			<PriceLabel style ={{...color, fontSize: '1.4rem' }}>
				{unit}
			</PriceLabel>
			<PriceLabel style ={{...color }}>
				{price}
			</PriceLabel>
		</Box>
	</Box>;
};
const PriceLabel: React.FC<{style?: React.CSSProperties;}> = ({style, children}) => {
	const _style = style ?? {};
	return <Typography variant="body2" component="span" noWrap={true} style={{ fontWeight: 400, marginRight: '.5rem', ..._style }}>{children}</Typography>
}
export const getSelectedDiscount = (handset: ReturnType<typeof getSelectedHandset>, selectedDiscount?: FulfillmentMainState['discount']) => {
	const { voucher, price } = handset;
	const _data = Object.entries(voucher).find(c => c[0] === selectedDiscount);
	const discounted = _data?.[1];
	return {
		actualPrice: price - (discounted ?? 0),
		discounted
	}
}
/*
		Delivery
*/
const StyledDeliveryPaper = withStyles((theme) => ({
	root: {
		borderRadius: '12px'
	}
}))(Paper);
interface DeliveryProps {
	formData: FulfillmentMainState;
	stores: OrderFormProps['stores'];
}
const Delivery = (p: DeliveryProps) => {
	const { formData, stores } = p;
	const { deliveryInfo, pickupInfo } = formData;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const isDelivery = !(isNotBlank(pickupInfo?.id) && pickupInfo?.id !== SHOP_ID.WAREHOUSE);
	const pickupStore = isDelivery ? null : pickupInfo?.id && createStoreCard(localizeStore(isEng, stores[pickupInfo.id])) || null;
	const label = isDelivery
		? <FormattedMessage id="formControl.option.delivery" />
		: <FormattedMessage id="formControl.option.pickup" />;
	const description = pickupStore === null
		? <>
			<Box mt={1}>
				<Typography component="span">{deliveryInfo.recipient} {deliveryInfo.contactNo}</Typography>
			</Box>
			<Box>
				<Typography component="span">{deliveryInfo.address[0]} {deliveryInfo.address[1]}</Typography>
			</Box>
			<Box>
				<Typography component="span">{<FormattedMessage id="formControl.option.delivery_date" />} {dayjs(deliveryInfo.date, 'YYYYMMDD').format('YYYY-MM-DD (ddd)')}</Typography>
			</Box>
		</>
		: <>
			<Box mt={1}>
				<Typography component="span">{pickupStore?.district ?? ''}</Typography> - <Typography component="span">{pickupStore?.address ?? ''}</Typography>
			</Box>
			<Box>
				<Typography component="span">{<FormattedMessage id="formControl.option.pickup_datetime" />} {dayjs(pickupInfo.date, 'YYYYMMDD').format('YYYY-MM-DD (ddd)')} {intl.formatMessage({id: pickupInfo.time})}</Typography>
			</Box>
		</>;
	const icon = isDelivery ? <Van /> : <Pin />;
	return <StyledDeliveryPaper variant="outlined" elevation={0}>
		<Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" py={isDesktop ? 5 : 2} pr={isDesktop ? 0 : 2}>
			<Box px={isDesktop ? 3 : 2}>
				<Typography variant="body1" component="div" align="center">
					{icon}
				</Typography>
			</Box>
			<Box>
				<Typography variant="h5">{label}</Typography>
				<Typography variant="body1" component="div" color="textSecondary">
					{description}
				</Typography>
			</Box>
		</Box>
	</StyledDeliveryPaper>;
};
