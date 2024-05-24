/**
* com/smartone/dialog/ConfirmDialog
**/
import React from 'react';
import styled from 'styled-components';
import CtaButton from '@/com/smartone/button/CtaButton';
import SimpleDialog, { SimpleDialogProps } from './SimpleDialog';
import bp from '@/com/smartone/theme/BreakpointUtils';
import { OutlineButton, TextButton } from '@smt/component/button';
import { useIntl } from 'react-intl';
/*
ConfirmDialog - disableBackdropClick=true and disableEscapeKeyDown=true
*/

const StyledSimpleDialog = styled(SimpleDialog)``;
const StyledActions = styled.div`
	display: flex;
	width: 100%;
	margin-top: ${p=>p.theme.spacing(2)}px;
	align-items: center;
	justify-content: center;
`
const StyledConfirmButtonBase = styled(TextButton)`
	margin: 0 ${p=>p.theme.spacing(1)}px;
`
const StyledCancelButton = styled(StyledConfirmButtonBase)`
	background: white;
	border: 1px solid ${p=>p.theme.palette.primary.main};
	color: ${p=>p.theme.palette.primary.main};
`

export interface ConfirmDialogProps extends Omit<SimpleDialogProps, "actions" | "disableBackdropClick" | "disableEscapeKeyDown"> {
	onYes?  : ()=>void;
	onNo?   : ()=>void;
}
function ConfirmDialog({ onYes, onNo, ...rest }: ConfirmDialogProps) {
	const intl = useIntl();
	const actions = (
		<StyledActions>
			<StyledCancelButton onClick={onNo}>
				{intl.formatMessage({id:"pay-at-store"})}
			</StyledCancelButton>
			<StyledConfirmButtonBase onClick={onYes}>
				{intl.formatMessage({id:"pay-online"})}
			</StyledConfirmButtonBase>
		</StyledActions>
	);
	return <StyledSimpleDialog actions={actions} centerContent={true} disableBackdropClick={true} disableEscapeKeyDown={true} {...rest} />;
}
export default ConfirmDialog;