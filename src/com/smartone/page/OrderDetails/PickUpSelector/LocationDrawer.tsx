import { DialogContent, DialogTitle, IconButton, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { DefaultDrawer } from '@smt/component/drawer';
import { MdClose } from '@smt/component/icon';
import LocationInfo from './LocationInfo';
import styled from 'styled-components';
import { LocationSelectorBase } from './LocationSelector';
import { OutlineButton } from '@smt/component/button';
import { useIntl } from 'react-intl';

interface Props {
	open: boolean;
	closeHandler: () => void;
	list: LocationSelectorBase['list'];
	checked: string;
	isDesktop: boolean;
	selectHandler: (e: React.MouseEvent) => void;
	setChecked: (v: string) => void;
}

const StyleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const StyledContinueButton = styled(OutlineButton)`
	width: auto;
	border-radius: 30px;
	padding: ${p=>p.theme.spacing(1)}px ${p=>p.theme.spacing(2)}px;
	border: none;
	background: ${({theme, disabled}) => disabled ? theme.palette.primary.divider : theme.palette.primary.main};
	color: white;
`
const StyledSelection = styled.button<{grayBg: boolean}>`
	display: grid;
	width: 100%;
  grid-template-columns: 24px 1fr; 
  gap: 8px 8px; 
	padding: ${p=>p.theme.spacing(2)}px ${p=>p.theme.spacing(2)}px;
	background: ${p=>p.grayBg ? '#eeeeee' : '#ffffff'};
	border: none;
`
const StyledFooter = styled(StyleWrapper)`
	padding: ${p=>p.theme.spacing(1)}px ${p=>p.theme.spacing(2)}px;
`
const StyledBulletBorder = styled.div<{size: number}>`
	position: relative;
	display: flex;
	width: ${({size}) => size}px;
	height: ${({size}) => size}px;
	align-items: center;
	justify-content: center;
	padding: 0;
	border-radius: ${({size}) => size*0.5}px;
	border: 1px solid ${({theme}) => theme.palette.divider};
	background: none;
	cursor: pointer;
`
const StyleBullet = styled.div<{size: number}>`
	display: block;
	width: ${p=>p.size}px;
	height: ${p=>p.size}px;
	border-radius: ${p=>p.size/2}px;
	background: ${p=>p.theme.palette.primary.main};
`
const StyledDialogTitle = withStyles((theme) => ({
	root: {
		position: 'relative',
		padding: `${theme.spacing(3)}px`
	}
}))(DialogTitle);
const StyledDialogContent = withStyles((theme) => ({
	root: {
		padding: 0
	}
}))(DialogContent);
const StyledIconButton = withStyles((theme) => ({
	root: {
		position: 'absolute',
		top: `${theme.spacing(1)}px`,
		right: `${theme.spacing(2)}px`,
		padding: 0
	}
}))(IconButton);
const LocationDrawer = ({open, closeHandler, list, checked, isDesktop, selectHandler, setChecked}: Props) => {
	const intl = useIntl();
	return <DefaultDrawer open={open}>
		<StyledDialogTitle disableTypography >
			<Typography variant='h5' align='center'>{intl.formatMessage({id:"location.select-location"})}</Typography>
			<StyledIconButton aria-label="close" onClick={closeHandler}>
				<MdClose />
			</StyledIconButton>
		</StyledDialogTitle>
		<StyledDialogContent dividers={true}>
			{list.map((location, index) => <StyledSelection key={index} onClick={(e) => setChecked(location.id)} grayBg={index % 2 === 0}>
				<StyledBulletBorder size={16}> 
					{checked === location.id && <StyleBullet size={10} />}
				</StyledBulletBorder>
				<div>
					<LocationInfo {...location} isDesktop={isDesktop} />
				</div>
			</StyledSelection>)}
		</StyledDialogContent>
		<StyledFooter>
			<Typography variant='body2'>{intl.formatMessage({id:"location.select-your-pick-up-location"})}</Typography>
			<StyledContinueButton onClick={selectHandler} disabled={checked === ''}>
				<Typography variant='body1'>{intl.formatMessage({id:"location.continue"})}</Typography>
			</StyledContinueButton>
		</StyledFooter>
	</DefaultDrawer>
}

export default LocationDrawer;