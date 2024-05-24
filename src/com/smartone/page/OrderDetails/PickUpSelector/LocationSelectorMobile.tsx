import { Typography } from '@material-ui/core';
import { OutlineButton, PlainButton } from '@smt/component/button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import LocationDrawer from './LocationDrawer';
import LocationInfo from './LocationInfo';
import { LocationSelectorBase } from './LocationSelector';

interface LocationSelectorMobileProps extends LocationSelectorBase {
	isDesktop: false;
}
const StyledInitButton = styled(OutlineButton)`
	width: 100%;
	border-radius: 30px;
	border: 1px solid ${p=>p.theme.palette.primary.main};
	color: ${p=>p.theme.palette.primary.main};
` 
const StyledLocationWrapper = styled.div`
	border: 1px ${p=>p.theme.palette.divider} solid;
	padding: ${p=>p.theme.spacing(2)}px;
`
const StyledChangeButton = styled(PlainButton)`
	margin-top: ${p=>p.theme.spacing(3)}px;
`
const LocationSelectorMobile: React.FC<LocationSelectorMobileProps> = ({isDesktop, selected, onClickHandler, list}) => {
	const intl = useIntl();
	const [checked, setChecked] = useState(selected);
	const [open, setOpen] = useState<boolean>(false);
	const openHandler = useCallback(() => {
		setOpen(true);
	}, [setOpen]);
	const closeHandler = useCallback(() => {
		setOpen(false);
	}, [setOpen]);
	const selectHandler = useCallback((e: React.MouseEvent) => {
		onClickHandler(checked)(e);
		closeHandler();
	}, [checked, onClickHandler, closeHandler]);
	const LocationData = useMemo(() => {
		return list.filter(l => l.id === selected)[0]
	}, [selected]);
	return <>
		{selected 
			? <StyledLocationWrapper>
					<LocationInfo isDesktop={false} {...LocationData} />
					<StyledChangeButton style={{color: '#f00'}} onClick={openHandler}><Typography variant="body1">[{intl.formatMessage({id:"locartion.change"})}]</Typography></StyledChangeButton>
				</StyledLocationWrapper>
			: <StyledInitButton onClick={openHandler}>{intl.formatMessage({id:"location.select-location"})}</StyledInitButton>}
		<LocationDrawer open={open} closeHandler={closeHandler} list={list} checked={checked} isDesktop={isDesktop} selectHandler={selectHandler} setChecked={setChecked} />
	</>
}

export default LocationSelectorMobile; 