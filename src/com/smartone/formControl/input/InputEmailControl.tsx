/**
* com/smartone/formControl/input/InputEmailControl
**/
import React from 'react';
import InputControl from './InputControl';
import { InputControlSubClassProps } from './InputControlSubClass';

export interface InputEmailControlProps<T> extends InputControlSubClassProps<T> {
	
}
function InputEmailControl<T>(props: InputEmailControlProps<T>) {
	const { inputProps, ...rest } = props;
	return <InputControl inputProps={{ type: "email", ...inputProps }}  {...rest}/>;
}
export default InputEmailControl;