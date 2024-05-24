/**
* com/smartone/formControl/input/InputTextControl
**/
import React from 'react';
import InputControl from './InputControl';
import { InputControlSubClassProps } from './InputControlSubClass';

export interface InputTextControlProps<T> extends InputControlSubClassProps<T> {

}
function InputTextControl<T>(props: InputTextControlProps<T>) {
	const { inputProps, ...rest } = props;
	
	return <InputControl inputProps={{ type: "text", ...inputProps }}  {...rest}/>;
}
export default InputTextControl;