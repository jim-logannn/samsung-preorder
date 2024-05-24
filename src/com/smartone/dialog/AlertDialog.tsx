/**
* com/smartone/dialog/AlertDialog
**/
import React from 'react';
import styled from 'styled-components';
import CtaButton from '@/com/smartone/button/CtaButton';
import SimpleDialog, { SimpleDialogProps } from './SimpleDialog';
import bp from '@/com/smartone/theme/BreakpointUtils';
import { useIntl } from 'react-intl';
import { TextButton } from '@smt/component/button';

/*
AlertDialog - hideCloseButton=true disableBackdropClick=true and disableEscapeKeyDown=true
*/
const StyledSimpleDialog = styled(SimpleDialog)``;
const StyledActions = styled.div`
	display: flex;
	width: 100%;
	margin-top: ${p=>p.theme.spacing(2)}px;
	align-items: center;
	justify-content: center;
`
interface AlertDialogProps extends Omit<SimpleDialogProps, "actions" | "disableBackdropClick" | "disableEscapeKeyDown"> {
	onClose: (event: {}, reason: 'okButtonClick' | 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick')=>void;
}
function AlertDialog({ onClose, ...rest}: AlertDialogProps) {
	const intl = useIntl();
	const onClick = function(event: {}) {
		onClose(event, "okButtonClick");
	}

	const actions = (
		<StyledActions>
			<TextButton onClick={onClick}>{intl.formatMessage({id:"modal.dialog.alert.button.ok"})}</TextButton>
		</StyledActions>
	)
	return <StyledSimpleDialog actions={actions} centerContent={true} hideCloseButton={true} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={onClose} {...rest} />;
}
export default AlertDialog;