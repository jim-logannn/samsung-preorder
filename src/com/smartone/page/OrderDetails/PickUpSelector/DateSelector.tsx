import { ModalContext } from '@/context/ModalContext';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { OutlineButton } from '@smt/component/button';
import ApplicationContext, { ApplicationContextValue } from '@smt/context/ApplicationContext';
import { AjaxResult, AjaxResultStatus, useAjax } from '@smt/hook/xhr/AjaxHook';
import { CONTENT_TYPE_X_WWW_FORM_URLENCODED, RequestMethod } from '@smt/hook/xhr/XMLHttpRequestHook';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { SelectorProps } from '.';
import { StyledButton, StyledItem, StyledWrapper } from './grid.style';

interface AjaxDateListResult {
	availableDates: Array<string>
	error_msg?: string;
}


const StyledDateWrapper = styled(StyledWrapper)`
  grid-auto-columns: 1fr; 
  grid-template-rows: 1fr 1fr; 
  ${(p) => p.theme.breakpoints.up("md")} {
		grid-template-columns: 1fr 1fr; 
		grid-template-rows: none;
	}
`

const ajaxDateListSuccessHandler = (response: string): AjaxDateListResult => {
	try {
		const json = JSON.parse(response);
		if(json.data) {
			return json.data
		}
	} catch (err) {
		console.log(err);
	}
	return {
		availableDates: [],
		error_msg: 'Get date error. Please select another option.'
	} 
}

const DateSelector: React.FC<SelectorProps> = ({selected, onSelectHandler, pickUpInfo}) => {

	const { api } = useContext(ApplicationContext) as ApplicationContextValue;
	const { ajaxResult: dateListResult, runAjax } = useAjax<AjaxDateListResult>(ajaxDateListSuccessHandler);
	const [dateOptions, setDateOptions] = useState<AjaxDateListResult['availableDates']>([])
	const [dateReady, setDateReady]= useState<boolean>(false);
	const { showAlert } = useContext(ModalContext);
	
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { 
		defaultMatches: window.matchMedia("(min-width:" + theme.breakpoints.values.md + "px)").matches 
	});

	const onChangePayloadValue = () => {
		onSelectHandler(null);
		setDateReady(false)
	}
	const onDateListReady = (getDateListResult: AjaxResult<AjaxDateListResult>) => {
		setDateReady(true);
		setDateOptions(getDateListResult.result?.availableDates || []);
	}
	// run once
	useEffect(() => {
		onChangePayloadValue()
		if (
			typeof pickUpInfo.location === 'string'
			&& typeof api?.getAvailableDate === 'string'
		) {
			const url = api?.getAvailableDate
			const method = RequestMethod.GET;
			const contentType = CONTENT_TYPE_X_WWW_FORM_URLENCODED;
			const searchParams = new URLSearchParams();
			searchParams.set("l", pickUpInfo.location);
			runAjax({
				url,
				method,
				contentType,
				searchParams
			});
		}
	}, [pickUpInfo.location, api]);

	useEffect(()=>{
		if(dateListResult) {
			console.log("status", dateListResult.status);
			console.log("error", dateListResult.error);
			if(dateListResult.status == AjaxResultStatus.OK) {
				console.log("result", dateListResult.result); // undefined or type MyResult 
				onDateListReady(dateListResult);
			} else if (dateListResult.status === AjaxResultStatus.FAILED) {
				showAlert({
					message: dateListResult.error
				})
			}
			if (dateListResult.result?.error_msg) {
				showAlert({
					message: dateListResult.result?.error_msg
				})
			}
		}
	}, [dateListResult]);

	const row: {item: number, max: number} = useMemo(() => {
		const rowItems = isDesktop ? 2 : 1;
		return {
			item: rowItems,
			max: Math.ceil(dateOptions.length / rowItems)
		}
	}, [dateOptions, isDesktop]);

	const getItemPosition: (i: number) => {x: number, y: number} = useCallback((index: number) => {
		return { 
			x: (index % row.item) + 1,
			y: Math.floor(index / row.item) + 1
		}
	}, [dateOptions, row]);
	
	const onClickHandler = useCallback((v: string) => (e: React.MouseEvent) => {
		onSelectHandler(v)
	}, []);
	return <StyledDateWrapper>
		{dateOptions.map((option, index) => <StyledItem key={index} rowEnd={getItemPosition(index).x === row.item} colEnd={getItemPosition(index).y === row.max}>
			<StyledButton selected={selected === option} disabled={!dateReady} onClick={onClickHandler(option)}>
			{option}
			</StyledButton>
		</StyledItem>)}
	</StyledDateWrapper>
}

export default DateSelector