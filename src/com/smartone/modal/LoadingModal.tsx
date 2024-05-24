/**
* com/smartone/modal/LoadingModal
**/
import React from 'react';
import { CircularProgress, useTheme } from '@material-ui/core';
import ModalWrapper, { ModalWrapperConsumerProps } from './ModalWrapper';



function LoadingModal(props : ModalWrapperConsumerProps) {
	const theme = useTheme();
	const style = {
		color: theme.palette.loadingModal.main,
		outline: 'none',
	};
	return (
		<ModalWrapper {...props}>
			<div style={style}>
				<CircularProgress color="inherit"/>
			</div>
		</ModalWrapper>
	);
}
export default LoadingModal;