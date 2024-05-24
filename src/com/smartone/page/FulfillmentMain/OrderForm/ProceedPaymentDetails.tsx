import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { PlainButton } from "@smt/component/button";
import { Box, BoxProps, Typography, TypographyProps, useMediaQuery, useTheme } from "@material-ui/core";
import { StarInCircle } from "@smt/component/icon";
import { COUPON_OPTION, PaymentCaseContext } from "../PaymentCaseProvider";
import { FulfillmentMainState } from "@smt/type/handsetPreOrder2023/fulfillment";
import { PostAPI } from "@smt/page/OfferAndCollection";
import { SubmitPayment, SubmitPaymentResponse } from "@smt/type/handsetPreOrder2023/api";
import { getLangFromLocale } from "@smt/lang/Lang";
import { ModalContext } from "@/context/ModalContext";
import { StyledConfirmBtn } from "./FootNote";
import { useOfflinePayload } from "..";
import ReminderContent from "../RichTextContent/PayLater";
import { Locale, LocaleEN } from "@smt/type/common";
import ApplicationContext, { Channel } from "@smt/context/ApplicationContext";

export const ProceedPaymentDetails: React.FC<{ value?: FulfillmentMainState; disabledPayButton: boolean; }> = ({ value, disabledPayButton }) => {
	const intl = useIntl();
	const lang = getLangFromLocale(intl.locale);
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const { showLoading, showAlert, hideLoading, showConfirm } = useContext(ModalContext);
	const { getPaymentCaseByCoupon, roamingDataPack } = useContext(PaymentCaseContext);
	const { online, offline } = getPaymentCaseByCoupon(value?.discount ?? '');
	const offlinePayload = useOfflinePayload();
	const style = {
		color: '#333'
	};
	const applicationContext = useContext(ApplicationContext);
	const channel = applicationContext?.channel;
	const isOnlineChannel = channel === Channel.ONLINE;
	const submitOrder = (payOnline: 'online' | 'later' | 'store') => {

		const _voucher = value?.discount ?? COUPON_OPTION.NOT_USE;
		const PAYLATER_URL = "fulfill_thankyou.jsp";

		const body: SubmitPayment = {
			fup: '',
			page_lang: lang,
			pay_online: payOnline,
			voucher: _voucher === COUPON_OPTION.NOT_USE ? '' : _voucher,
			...offlinePayload
		};

		const submitPayment = PostAPI<any, SubmitPaymentResponse>({
			url: '/jsp/Internal/Fulfill2023/API_submit_action.jsp',
			body: JSON.stringify(body),
			onStart: () => {
				showLoading({
					id: 'submitOrder'
				});
			},
			onSuccess: (res) => {
				let url = payOnline=='later'?PAYLATER_URL+"?st="+res.submission_token:res.url_payment;
				window.location.replace(url);
			},
			onError: ({ err_code, err_msg }) => {
				hideLoading('submitOrder');
				showAlert({
					message: `${err_code} ${err_msg}`
				});
			}
		});

		submitPayment();
	};

	const payOnlineHandler = () => {
		submitOrder(!isOnlineChannel ?'store':'online');
	};

	const payiPhone4LifeHandler = () => {
		submitOrder('later');
	};

	const payLaterHandler = () => {
		const message = <Typography variant="body1" component="div" align="left">
			<ReminderContent code={isOnlineChannel && roamingDataPack.get ? 'G' : 'O'} isEng={isEng} />
		</Typography>
		showConfirm({
			title: intl.formatMessage({ id: "reminder" }),
			message: message,
			onClose: () => { },
			onYes: () => {
				submitOrder(!isOnlineChannel ?'store':'online');
			},
			onNo: () => {
				submitOrder('later');
			},
		});
	};

	return <Box display="flex" flexDirection="column" alignItems={isDesktop ? "flex-end" : "flex-start"}  width="100%">
		{roamingDataPack.get && <PaymentBox mb={1} typo={{ variant: 'subtitle1', style: {fontSize: isDesktop ? '2.4rem' : '2rem', ...style} }} show={online}>{intl.formatMessage({ id: "pay-online-to-enjoy-more" })}</PaymentBox>}
		{isOnlineChannel && roamingDataPack.get && <PaymentBox mb={1} typo={{ align: 'center', style }} show={online}>
			<IconText icon={<StarInCircle />} message={roamingDataPack.get.title} />
		</PaymentBox>}
		<PaymentBox mb={isDesktop ? 2 : 4} typo={{ align: 'center', style }} show={online}>
			<IconText icon={<StarInCircle />} message={roamingDataPack.get?intl.formatMessage({ id: "smooth-pickup" }):intl.formatMessage({ id: "smooth-pickup-orange" })} />
		</PaymentBox>
		<PaymentBox mb={1} display={isDesktop ? "flex" : "block"} show={online}>
			<StyledConfirmBtn onClick={payOnlineHandler} disabled={disabledPayButton}>{intl.formatMessage({ id: "proceed-to-payment" })}</StyledConfirmBtn>
		</PaymentBox>
		<PaymentBox mb={1} width="100%" justifyContent={isDesktop ? "flex-end" : "center"}  show={offline.iPhone4Life} textAlign={"right"}>
			<StyledConfirmBtn style={{"marginBottom":"10px"}} onClick={payiPhone4LifeHandler} disabled={disabledPayButton}>{intl.formatMessage({ id: "confirm" })}</StyledConfirmBtn>
			<Typography variant="body1" component="div">
				{intl.formatMessage({ id: "you-have-selected-iphone-for-life-please-visit-our-stores-to-proceed-with-the-payment" })}
			</Typography>
		</PaymentBox>
		<PaymentBox mb={1} width="100%" justifyContent={isDesktop ? "flex-end" : "center"} show={offline.normal}>
			<PlainButton onClick={payLaterHandler} disabled={disabledPayButton}>{intl.formatMessage({ id: "sales-assisted-payment" })}</PlainButton>
		</PaymentBox>
	</Box>;
};

interface PaymentBoxPros extends BoxProps {
	show?: boolean;
	typo?: TypographyProps;
}

const PaymentBox: React.FC<PaymentBoxPros> = ({ children, typo, show=true, ...BoxProps }) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	return show ? <Box width="100%" display="flex" justifyContent={isDesktop ? "flex-end" : "flex-start"} {...BoxProps}>
		<Typography {...typo}>
			{children}
		</Typography>
	</Box> : <></>;
};

const IconText: React.FC<{icon: React.ReactNode, message: React.ReactNode}> = ({icon, message}) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	return <Box display="flex" justifyContent="flex-start">
	{icon}
	<Box pl={1} textAlign="left">
		<Typography component="div" style={{fontSize: isDesktop ? '2rem' : '1.4rem'}}>
			{message}
		</Typography>
	</Box>
</Box>
}