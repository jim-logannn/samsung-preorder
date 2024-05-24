/**
* com/smartone/dialog/DialogCloseButton
**/
import React from 'react';
import styled from 'styled-components';
import { Theme } from '@material-ui/core';
import bp from '@/com/smartone/theme/BreakpointUtils';
import { Close } from '@styled-icons/material';

const StyledCloseButton = styled.div`
	display: inline-flex;
	cursor: pointer;
`;
const StyledClose = styled(Close)`
	font-size: 24px;
	${props => bp.up('md', (props.theme as Theme).breakpoints, `
		font-size: 30px;
	`)}
`;
interface Props {
	className?: string;
	onClose?: (event: {}, reason: "closeButtonClick") => void;
}
function DialogCloseButton({ className, onClose }: Props) {
	const handleOnClose = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if(onClose) {
			onClose(event, "closeButtonClick");
		}
	}
	return <StyledCloseButton className={className} onClick={handleOnClose}><StyledClose width="24" height="24" /></StyledCloseButton>;
}
export default DialogCloseButton;