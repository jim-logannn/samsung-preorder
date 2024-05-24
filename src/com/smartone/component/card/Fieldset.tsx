import { Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	position: relative;
	margin-top: ${p=>p.theme.spacing(4)}px;
`
const StyledOutline = styled.div`
	padding: ${p=>p.theme.spacing(3)}px;
	border: 1px solid ${p=>p.theme.palette.divider};
	border-radius: 10px;
`
const StyledTitle = styled(Typography)`
	display: flex;
	position: absolute;
	top: -${p=>p.theme.spacing(2)}px;
	left: 0;
	right: 0;
	align-items: center;
	justify-content: center;
	color: ${p=>p.theme.palette.divider};
	text-align: center;
	& span{
		display: inline-block;
		padding: 0 ${p=>p.theme.spacing(2)}px;
		background: white;
	}
`

const Fieldset: React.FC<{title: string}>= ({children, title}) => {
	return <StyledWrapper>
		<StyledOutline>
			<StyledTitle variant="h5"><span>{title}</span></StyledTitle>
			{children}
		</StyledOutline>
	</StyledWrapper>
}

export default Fieldset;