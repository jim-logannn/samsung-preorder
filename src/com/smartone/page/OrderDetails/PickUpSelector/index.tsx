import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import { Paper } from '@smt/component/card';
import { MainControllerProps } from '@smt/page/Main/MainController';
import FootNote from './FootNote';
import { isBlank } from '@smt/util/StringUtils';
import { findElementOffsetTop, windowScrollTo } from '@smt/util/WindowUtils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import DateSelector from './DateSelector';
import LocationSelector from './LocationSelector';
import TimeSelector from './TimeSelector';

const useStyles = makeStyles({
	subFormRoot: {
		'&::before': {
			display: 'none'
		}
	}
})
export interface PickUpInfoState {
	location?: string;
	date?: string;
	timeslotCode?: string;
	displayTimeslot?:string;
}
export interface SelectorProps {
	selected?: string;
	onSelectHandler: (v: string | null) => void;
	pickUpInfo: PickUpInfoState;
}
export const StyledSelectorHeading = styled.div<{mt?: number; mb?: number}>`
	margin-top: ${p => p.theme.spacing(p.mt ?? 0)}px ;
	margin-bottom: ${p => p.theme.spacing(p.mb ?? 3.5)}px ;
	font-family: "titling-gothic-fb-condensed", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif;
	font-size: 1.8rem;
	font-weight: 400;
	line-height: normal;
	${(p) => p.theme.breakpoints.up('md')} {
		font-size: 2.4rem;
	}
`
const updateValue = (key: string) => (value: string) => ({
	[key]: value
});
const setLocation = updateValue('location');
const setDate = updateValue('date');
const setTimeslotCode = updateValue('timeslotCode');
const setDisplayTimeslot = updateValue('displayTimeslot');
const onExpandAccordion = (ref: React.RefObject<HTMLDivElement>, scroll: {needScroll: boolean, scrollCallback: (v: boolean) => void}) => (expanded: boolean) => {
	const {needScroll, scrollCallback} = scroll;
	if (ref && expanded && needScroll){
		const offsetTop = findElementOffsetTop(ref.current as HTMLDivElement);		
		setTimeout(() => {
			windowScrollTo(offsetTop);
		}, 500)
		scrollCallback(false);
	}
	return expanded
};
const PickUpSelector = ({storeData, onChangePickupInformationData}: {storeData: MainControllerProps['storeData']; onChangePickupInformationData: (v: PickUpInfoState | undefined) => void}) => {
	const intl = useIntl();
  const classes = useStyles();
	const [info, setInfo] = useState<PickUpInfoState>({location: undefined, date: undefined, timeslotCode: undefined, displayTimeslot: undefined});
	const [ranCallback, setRanCallback] = useState<boolean>(false);
	const refLocation = useRef<HTMLDivElement>(null);
	const refTimeslot = useRef<HTMLDivElement>(null);
	const onChangeInfo = (getValueFn: (s: string) => Record<string, string>) => (v: string) => {
		setInfo(prev => ({
			...prev,
			...getValueFn(v)
		}))
		setRanCallback(true);
	}
	const onChangeTimeSlot = (c: string, t: string) => {
		onChangeInfo(setTimeslotCode)(c); 
		onChangeInfo(setDisplayTimeslot)(t);
	}
	
	const onLocationExpanded = useCallback(onExpandAccordion(refLocation, {needScroll: ranCallback, scrollCallback: setRanCallback}), [ranCallback, refLocation]);
	const onTimeSlotExpanded = useCallback(onExpandAccordion(refTimeslot, {needScroll: ranCallback, scrollCallback: setRanCallback}), [ranCallback, refTimeslot]);
	
	useEffect(() => {
		if (
			isBlank(info.date) === false
			&& isBlank(info.location) === false
			&& isBlank(info.timeslotCode) === false
			&& isBlank(info.displayTimeslot) === false
		) {
			onChangePickupInformationData(info);
		} else {
			onChangePickupInformationData(undefined);
		}
	}, [info])
	

	return <Paper>
		<Accordion className={classes.subFormRoot} elevation={0} expanded={true}>
			<StyledSelectorHeading>{intl.formatMessage({id:"review.select-location"})}</StyledSelectorHeading>
			<LocationSelector selected={info.location} pickUpInfo={info} onSelectHandler={onChangeInfo(setLocation )} storeData={storeData} />
		</Accordion>
		<Accordion className={classes.subFormRoot} elevation={0} expanded={onLocationExpanded(isBlank(info.location) === false )}>
			<div ref={refLocation}>
				{isBlank(info.location) === false && <>
					<StyledSelectorHeading>{intl.formatMessage({id:"review.select-date"})}</StyledSelectorHeading>
					<DateSelector selected={info.date} pickUpInfo={info} onSelectHandler={onChangeInfo(setDate)} />
				</>}
			</div>
		</Accordion>
		<Accordion className={classes.subFormRoot} elevation={0} expanded={onTimeSlotExpanded(isBlank(info.date) === false )}>
			<div ref={refTimeslot}>
				{isBlank(info.date) === false && <>
					<StyledSelectorHeading>{intl.formatMessage({id:"review.select-timeslot"})}</StyledSelectorHeading>
					<TimeSelector selected={info.timeslotCode} pickUpInfo={info} onSelectHandler={onChangeTimeSlot} />
				</>}
			</div>
		</Accordion>
		<FootNote />
	</Paper>
}

export default PickUpSelector;