import { Typography } from '@material-ui/core';
import { Pin } from '@smt/component/icon';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

interface Props {
	name: string;
	address: string;
	mapLink: string;
	isDesktop: boolean;
}

const StyledContent = styled.div<{showWithColumn: boolean}>`
	display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 8px 8px;
	grid-auto-flow: row;
	flex-direction: column;
	align-items: flex-start;
`
const StyledAddress = styled.div`
	grid-column-start: 1;
	grid-column-end: 5;
`
const StyledLink = styled.a`
	display: flex;
	flex-flow: row nowrap;
	grid-column-start: 5;
	grid-column-end: 6;
	text-decoration: none;
	font-size: ${p => p.theme.typography.body1};
	color: ${p=>p.theme.palette.text.primary};
	& > *{
		vertical-align: middle;
	}
	&:visited{
		color: ${p=>p.theme.palette.text.primary};
	}
`
const StyledViewMap = styled.span`
	white-space: nowrap;
	margin-left: ${p => p.theme.spacing(1)}px;
`

const LocationInfo: React.FC<Props> = (p) => {
	const {name, address, mapLink, isDesktop} = p;
	const intl = useIntl();
	return <>
		<Typography variant='body1' align='left' style={{fontWeight: 500}}>
			{name}
		</Typography>
		<StyledContent showWithColumn={!isDesktop}>
			<Typography component={StyledAddress} variant='body1' align='left'>
				{address}
			</Typography>
			<StyledLink href={mapLink} target="_blank">
				<Pin />
				<StyledViewMap>
					{intl.formatMessage({id:"location.view-map"})}
				</StyledViewMap>
			</StyledLink>
		</StyledContent>
	</>
} 

export default LocationInfo;