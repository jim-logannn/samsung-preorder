import { ModalContext } from '@/context/ModalContext';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { OutlineButton } from '@smt/component/button';
import ApplicationContext, { ApplicationContextValue } from '@smt/context/ApplicationContext';
import { AjaxResult, AjaxResultStatus, useAjax } from '@smt/hook/xhr/AjaxHook';
import { CONTENT_TYPE_X_WWW_FORM_URLENCODED, RequestMethod } from '@smt/hook/xhr/XMLHttpRequestHook';
import { timeLog } from 'console';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { SelectorProps } from '.';
import { StyledButton, StyledItem, StyledWrapper } from './grid.style';

type Timeslot = {
	available: boolean;
	time: `${number}-${number}`;
	code: string;
}

type TimeslotSelectorProps = Omit<SelectorProps, 'onSelectHandler'> & {
	onSelectHandler: (c: string | null, t: string | null) => void;
}

interface AjaxTimeslotResult {
	availableTimeslots: Array<Timeslot>;
	error_msg?: string;
}

const ajaxDateListSuccessHandler = (response: string): AjaxTimeslotResult => {
	try {
		const json = JSON.parse(response);
		if(json.data) {
			return json.data
		}
	} catch (err) {
		console.log(err);
	}
	return {
		availableTimeslots: [],
		error_msg: 'Get date error. Please select another option.'
	} 
}

const StyleTimeSlotWrapper = styled(StyledWrapper)`
	grid-template-columns: 1fr 1fr 1fr 1fr; 
	${(p) => p.theme.breakpoints.up('md')} {		
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 
	}
	${(p) => p.theme.breakpoints.up('lg')} {		
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
	}
`
const DateButton = styled(StyledButton)`
	padding-left: 0;
	padding-right: 0;
`
const TimeSelector: React.FC<TimeslotSelectorProps> = ({selected, onSelectHandler, pickUpInfo}) => {
	  
	const { api } = useContext(ApplicationContext) as ApplicationContextValue;
	const { ajaxResult: timeslotResult, runAjax, abortAjax } = useAjax<AjaxTimeslotResult>(ajaxDateListSuccessHandler);
	const [timeslotOptions, setTimeslotOptions] = useState<AjaxTimeslotResult['availableTimeslots']>([])
	const [timeslotReady, setTimeslotReady] = useState<boolean>(false);
	const { showAlert } = useContext(ModalContext);
	const intl = useIntl();
	
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { 
		defaultMatches: window.matchMedia("(min-width:" + theme.breakpoints.values.md + "px)").matches 
	});
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"), { 
		defaultMatches: window.matchMedia("(min-width:" + theme.breakpoints.values.lg + "px)").matches 
	});


	const onChangePayloadValue = () => {
		onSelectHandler(null, null);
		setTimeslotReady(false)
	}
	const onDateListReady = (getTimeslotResult: AjaxResult<AjaxTimeslotResult>) => {
		setTimeslotReady(true);
		setTimeslotOptions(getTimeslotResult.result?.availableTimeslots || []);
	}
	// run once
	useEffect(() => {
		onChangePayloadValue();
		if (
				typeof pickUpInfo.location === 'string' 
				&& typeof pickUpInfo.date === 'string'
				&& typeof api?.getAvailableTimeslot === 'string'
		) {
			const url = api.getAvailableTimeslot;
			const method = RequestMethod.GET;
			const contentType = CONTENT_TYPE_X_WWW_FORM_URLENCODED;
			const searchParams = new URLSearchParams();
			searchParams.set("l", pickUpInfo.location);
			searchParams.set("d", pickUpInfo.date);
			runAjax({
				url,
				method,
				contentType,
				searchParams
			});
		}
	}, [pickUpInfo.location, pickUpInfo.date, api]);

	useEffect(()=>{
		if(timeslotResult) {
			console.log("status", timeslotResult.status);
			console.log("error", timeslotResult.error);
			if(timeslotResult.status == AjaxResultStatus.OK) {
				console.log("result", timeslotResult.result); // undefined or type MyResult 
				onDateListReady(timeslotResult);
			} else if (timeslotResult.status === AjaxResultStatus.FAILED) {
				showAlert({
					message: timeslotResult.error
				})
			}
			if (timeslotResult.result?.error_msg) {
				showAlert({
					message: timeslotResult.result?.error_msg
				})
			}
		}
	}, [timeslotResult]);

	const hasAvailable = useMemo(() => {
		for (const timeslot of timeslotOptions) {
			if (timeslot.available) {
				return true;
			}
		}
		return false
	}, [timeslotOptions]);

	const onClickHandler = useCallback((code: string, time: string) => (e: React.MouseEvent) => {
		onSelectHandler(code, time)
	}, []);

	const row: {item: number, max: number} = useMemo(() => {
		const rowItems = isDesktop ? (isLargeScreen ? 13 : 6) : 4 ;
		return {
			item: rowItems,
			max: Math.ceil(timeslotOptions.length / rowItems)
		}
	}, [timeslotOptions, isDesktop, isLargeScreen]);

	const getItemPosition: (i: number) => {x: number, y: number} = useCallback((index: number) => {
		return { 
			x: (index % row.item) + 1,
			y: Math.floor(index / row.item) + 1
		}
	}, [timeslotOptions, row]);
	
	return <>
		<StyleTimeSlotWrapper>
			{timeslotOptions.map((option, index) => (
				<StyledItem key={index} rowEnd={getItemPosition(index).x === row.item} colEnd={getItemPosition(index).y === row.max} disabled={!option.available || !timeslotReady}><DateButton disabled={!option.available || !timeslotReady} selected={option.code === selected} onClick={onClickHandler(option.code, option.time.replace('-', ':'))}>
					{option.time.replace('-', ':')}
				</DateButton></StyledItem>
			))}
		</StyleTimeSlotWrapper>
		{(hasAvailable === false && timeslotReady) && <Typography variant='body1' style={{color: '#F00', marginTop: '8px'}}>{intl.formatMessage({id:"review.all-timeslot-of-that-data-is-full-please-select-another-date"})}</Typography>}
	</>
}

export default TimeSelector;