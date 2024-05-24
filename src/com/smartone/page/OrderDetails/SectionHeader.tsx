import React, { useCallback } from 'react';
import { OrderStep } from '@smt/page/Main/MainController';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { PlainButton } from '@smt/component/button';
import { useIntl } from 'react-intl';

interface Props {
	title: string;
	editButtonFn?: (v: OrderStep) => void;
	editStep?: OrderStep;
}
const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${p=>p.theme.spacing(3)}px ${p=>p.theme.spacing(1)}px ${p=>p.theme.spacing(1)}px;
  ${(p) => p.theme.breakpoints.up("md")} {
		margin: ${p=>p.theme.spacing(3)}px 0 ${p=>p.theme.spacing(1)}px;
	}
`

const SectionHeader = ({title, editStep, editButtonFn}: Props) => {
	const intl = useIntl();
	const onClickHandler = () => {
		if (editButtonFn && editStep){
			editButtonFn(editStep)		
		}
	};
	return <StyledWrapper>
		<Typography variant="h4">{title}</Typography>
		{editButtonFn && <PlainButton onClick={onClickHandler}>{intl.formatMessage({id:"review.edit"})}</PlainButton>}
	</StyledWrapper>
}

export default SectionHeader;