/**
* com/smartone/modal/ModalWrapper
**/
import React from 'react';
import { Modal, ModalProps, useTheme } from '@material-ui/core';

interface ModalWrapperProps extends ModalProps {

}
export interface ModalWrapperConsumerProps extends Omit<ModalWrapperProps, "children">{

}
function ModalWrapper({ children, ...rest }: ModalWrapperProps) {
	const theme = useTheme();
	const style = {
		display:'flex', 
		alignItems:'center', 
		justifyContent:'center'
	};
	return (
		<Modal {...rest} style={style}>
			{children}
		</Modal>
	);
}
export default ModalWrapper;