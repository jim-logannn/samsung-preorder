import { ModalContext } from '@/context/ModalContext';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Pin } from '@smt/component/icon';
import { fetchAPI, PostAPI } from '@smt/page/OfferAndCollection';
import { localizeStore } from '@smt/page/OfferAndCollection/CollectionMethod';
import { createStoreCard } from '@smt/page/OfferAndCollection/StoreCard';
import { StyledSelectorHeading } from '@smt/page/OrderDetails/PickUpSelector';
import { Locale, LocaleEN } from '@smt/type/common';
import { GetAvailableTimeSlot, GetStoreAPIResponse } from '@smt/type/handsetPreOrder2023/api';
import { FulfillmentMainState, PickupInfoValue } from '@smt/type/handsetPreOrder2023/fulfillment';
import { isAfterSecondDate, isSameOrAfterSecondDate } from '@smt/util/DayUtils';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { StyledInputHeading } from '.';
import { DateSelectInput, TimeSelectInput } from './StyledInput';
import { useOfflinePayload } from '..';
import PickupRemark from '../RichTextContent/PickupRemark';

export interface PickupAtStoreProps {
	stores: GetStoreAPIResponse;
	value: PickupInfoValue;
	onChangeValue?: (v: FulfillmentMainState['pickupInfo']) => void;
	caseId: string;
	valid: boolean;
}

export const PickupAtStore = (p: PickupAtStoreProps) => {
	const { stores: storeData, value, onChangeValue, caseId } = p;
	const pickupStore = value.id;
	const startDate = value.startPickupDate;
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const [dates, setDates] = useState<Array<string>>([]);
	const [timeSlot, setTimeSlot] = useState<GetAvailableTimeSlot['result']>({});
	const { showLoading, hideLoading, showAlert } = useContext(ModalContext);
	const offlinePayload = useOfflinePayload()

	const SelectedStoreData = useCallback(() => {
		if ((storeData === undefined || pickupStore === null)) {
			return null;
		}
		const _data = createStoreCard(localizeStore(locale === LocaleEN, storeData[pickupStore]));
		return <Box flexGrow={1}>
			<Typography variant="h6" component="div">{_data.district}</Typography>
			<Box pt={1} display="flex" alignItems="center" justifyContent="flex-start">
				<Box pr={1}>
					<Pin width={12} height={16} />
				</Box>
				<Box>
					<Typography variant="body1">{_data.address}</Typography>
				</Box>
			</Box>
		</Box>;
	}, [pickupStore]);

	const onChange = (key: 'date' | 'time') => (v: string) => {
		if (onChangeValue === undefined) {
			return;
		}
		if (key === 'date') {
			onChangeValue({
				...value,
				time: '',
				[key]: v
			});
			return
		}
		onChangeValue({
			...value,
			[key]: v
		});
	};

	const fetchPickupData = PostAPI<any, GetAvailableTimeSlot>({
		url: `/jsp/Internal/Fulfill2023/API_get_available_timeslot.jsp`,
		body: JSON.stringify({
			caseID: caseId,
			storeID: pickupStore,
			startDate: startDate,
			...offlinePayload
		}),
		onStart: () => {
			showLoading({
				id: 'fetchPickupData'
			})
		},
		onSuccess: (res) => {
			hideLoading('fetchPickupData');
			setTimeSlot(res.result)
			const resultKeys = Object.keys(res.result);
			const dateRange = getDateRange({
				s: value.startPickupDate, 
				e: value.endPickupDate, 
				ary: resultKeys
			})
			setDates(dateRange);
		},
		onError: ({err_code, err_msg}) => {
			hideLoading('fetchPickupData');
			showAlert({
				message: `${err_code}: ${err_msg}`
			})
		}
	})

	const times = useMemo(() => {
		if (value?.date === undefined || timeSlot === undefined) {
			return []
		}
		// timeSlot = :[{"20230907":[]},{"20230908":[]}]
		// t = {"20230907":[]}
		return timeSlot[value.date]
	}, [value.date, timeSlot])

	useEffect(() => {
		fetchPickupData()
	}, [])

	return <>
		<StyledInputHeading>{intl.formatMessage({ id: "formControl.option.pickup" })}</StyledInputHeading>
		<SelectedStoreData />
		<Box display="flex" py={2} flexDirection={isDesktop ? 'row' : 'column'} justifyContent="space-between">
			<Box width="100%" pr={isDesktop ? 2 : 0} pb={isDesktop ? 0 : 2}>
				<Box pb={1}>
					<Typography variant="body1" component="div">
						{intl.formatMessage({ id: "pickup-date" })}
					</Typography>
				</Box>
				<DateSelectInput data={dates} value={value?.date} onChangeValue={onChange('date')} field='date' />
			</Box>
			<Box width="100%">
				<Box pb={1}>
					<Typography variant="body1" component="div">
						{intl.formatMessage({ id: "pickup-time" })}
					</Typography>
				</Box>
				<TimeSelectInput data={times} value={value?.time} onChangeValue={onChange('time')} field='time' />
			</Box>
		</Box>
		<Typography variant="body1" component="div" style={{fontSize: '1.2rem'}}>
			<PickupRemark isEng={isEng} />
		</Typography>
	</>;
};

const getDateRange = ({s: startPickupDate, e: endPickupDate, ary: resultKeys}: {s: string, e: string, ary: string[]}) => {
	const dateRange = [];
	if(isAfterSecondDate(startPickupDate, endPickupDate)) {
		console.log('Pickup dates issue: start date should not be later than end date.')
	}
	let inRange = false;
	for (const key of resultKeys) {
		if (isSameOrAfterSecondDate(key, startPickupDate)) {
			inRange = true;
		}
		if (isAfterSecondDate(key, endPickupDate)) {
			inRange = false;
		}
		if (inRange) {
			dateRange.push(key);
		}
	}
	return dateRange
}