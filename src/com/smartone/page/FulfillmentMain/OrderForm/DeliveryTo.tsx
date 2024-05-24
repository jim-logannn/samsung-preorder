import { districtList } from '@/constant/districts';
import { ModalContext } from '@/context/ModalContext';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import DeliveryTextInputField from '@smt/field/orderDetail/DeliveryTextInputField';
import { fetchAPI, PostAPI } from '@smt/page/OfferAndCollection';
import { DeliveryDistrictInput } from '@smt/page/OfferAndCollection/CollectionMethod';
import { StyledSelectorHeading } from '@smt/page/OrderDetails/PickUpSelector';
import { Locale, LocaleEN } from '@smt/type/common';
import { APIResponse, GetAvailableDeliveryDate } from '@smt/type/handsetPreOrder2023/api';
import { DeliveryValue } from '@smt/type/handsetPreOrder2023/fulfillment';
import { dayjs } from '@smt/util/DayUtils';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { StyledInputHeading } from '.';
import DeliveryTerms from '../RichTextContent/DeliveryTerms';
import { SelectInput } from './StyledInput';
import { useOfflinePayload } from '..';

interface DeliveryToProps {
	value: DeliveryValue;
	onChange: (v: DeliveryValue) => void;
	valid: boolean;
}
export const DeliveryTo = (p: DeliveryToProps) => {
	const { value, onChange, valid } = p;
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const { showLoading, hideLoading, showAlert } = useContext(ModalContext);
	const [deliveryOptions, setDeliveryOptions] = useState<{title: string; value: string;}[]>([]);
	const offlinePayload = useOfflinePayload();

	const onChangeValueByKey = function <T extends keyof DeliveryValue>(key: T) {
		return function (v: DeliveryValue[T]) {
			const _result = value ?? {
				recipient: '',
				contactNo: '',
				date: '',
				district: '',
				address: ['', '']
			};
			if (key === 'contactNo') {
				if (v.length > 8) {
					return false
				}
			}
			onChange({
				..._result,
				[key]: v
			});
		};
	};
	const onChangeAddress = function (index: number) {
		const _result = value?.address ?? ['', ''];
		return function (v: string) {
			_result[index] = v;
			onChangeValueByKey('address')(_result);
		};
	};
	
	const fetchPickupData = PostAPI<any, GetAvailableDeliveryDate>({
		url: `/jsp/Internal/Fulfill2023/API_get_available_delivery_date.jsp`,
		body: JSON.stringify({
			...offlinePayload
		}),
		onStart: () => {
			showLoading({
				id: 'fetchDeliveryData'
			})
		},
		onSuccess: (res) => {
			hideLoading('fetchDeliveryData');
			const options = res.result.map(date => ({
				title: dayjs(date, 'YYYYMMDD').format('YYYY-MM-DD (ddd)'),
				value: date
			}))
			setDeliveryOptions(options)
		},
		onError: ({err_code, err_msg}) => {
			hideLoading('fetchDeliveryData');
			showAlert({
				message: `${err_code}: ${err_msg}`
			})
		}
	})

	useEffect(() => {
		fetchPickupData();
	}, [])

	return <>
		<StyledInputHeading>{intl.formatMessage({ id: "delivery-to" })}</StyledInputHeading>
		<Grid container direction="column" spacing={isDesktop ? 3 : 1}>
			<Grid item>
				<Box display="flex" flexDirection={isDesktop ? 'row' : 'column'}>
					<Box width={isDesktop ? '50%' : '100%'} pr={isDesktop ? 2 : 0} mb={isDesktop ? 0 : 1}>
						<Label>
							{intl.formatMessage({id:"recipient"})}
						</Label>
						<DeliveryTextInputField required={true} value={value?.recipient ?? ''} onChange={onChangeValueByKey('recipient')} onChangeValid={() => { }} review={false} inputPropsOverrides={{placeholder: intl.formatMessage({id:"formControl.recipient.placeholder"}), helperText: intl.formatMessage({id:"formControl.recipient.helperText"})}} field="recipient" />
					</Box>
					<Box width={isDesktop ? '50%' : '100%'} mb={isDesktop ? 0 : 1}>
						<Label>
							{intl.formatMessage({id:"contact-number"})}
						</Label>
						<DeliveryTextInputField required={true} value={value?.contactNo ?? ''} onChange={onChangeValueByKey('contactNo')} onChangeValid={() => { }} review={false} inputPropsOverrides={{placeholder: intl.formatMessage({id:"formControl.contactNumber.placeholder"}), helperText: intl.formatMessage({id:"formControl.contactNumber.helperText"})}} field="contactNo" />
					</Box>
				</Box>
			</Grid>
			<Grid item>
				<Box display="flex" width="100%" flexDirection={isDesktop ? 'row' : 'column'}>
					<Box width={isDesktop ? '50%' : '100%'} pr={isDesktop ? 2 : 0} mb={isDesktop ? 0 : 1}>
						<Label>
							{intl.formatMessage({id:"delivery-date"})}
						</Label>
						<SelectInput options={deliveryOptions} value={value?.date ?? ''} onChangeValue={onChangeValueByKey('date')} field="date" />
					</Box>
					<Box width={isDesktop ? '50%' : '100%'} mb={isDesktop ? 0 : 1}>
						<Label>
							{intl.formatMessage({id:"district"})}
						</Label>
						<DeliveryDistrictInput data={districtList} value={value?.district ?? ''} onChangeValue={onChangeValueByKey('district')} fullWidth={true} />
					</Box>
				</Box>
				<Typography variant="body1" component="div">
					{intl.formatMessage({id:"step.select-delivery-date.remark1"})}
				</Typography>
			</Grid>
			<Grid item>
				<Label>
					{intl.formatMessage({id:"delivery-address"})}
				</Label>
				<DeliveryTextInputField required={true} value={value?.address[0] ?? ''} onChange={onChangeAddress(0)} onChangeValid={() => { }} review={false} inputPropsOverrides={{placeholder: intl.formatMessage({id:"formControl.addressLine1.placeholder"}), helperText: intl.formatMessage({id:"formControl.addressLine1.helperText"})}} field="address1"/>
				<Box pb={1}></Box>
				<DeliveryTextInputField required={true} value={value?.address[1] ?? ''} onChange={onChangeAddress(1)} onChangeValid={() => { }} review={false} inputPropsOverrides={{placeholder: intl.formatMessage({id:"formControl.addressLine2.placeholder"}), helperText: intl.formatMessage({id:"formControl.addressLine2.helperText"})}} field="address2"/>
				<Box mb={1}></Box>
				<Typography variant="body1" component="div" style={{fontSize: '1.2rem', color: '#9c9c9c'}}>
					<DeliveryTerms isEng={isEng} />				
				</Typography>
			</Grid>
		</Grid>
	</>;
};
const Label: React.FC<{}> = ({children}) => {
	return <Box pb={1}><Typography variant="body1" component="div">
		{children}
	</Typography></Box>
}