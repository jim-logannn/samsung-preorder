/**
* com/smartone/formControl/input/InputControl
**/
import { FormControl, InputBaseProps, OutlinedInput, Theme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import BaseControl, { BaseControlProps } from '../base/BaseControl';
import { getDefinedObject } from '../../util/ObjectUtils';

/*
default:
spellCheck=false
*/
const StyledFormControl = styled(FormControl)`
	
`;
const StyledLabel = styled.div`
	margin-bottom: ${props=>(props.theme as Theme).spacing(1)}px;
`;
interface InputProps<T> extends InputBaseProps {
	value?: T;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export interface InputControlProps<T> extends BaseControlProps {
	inputProps?: InputProps<T>;
}
function InputControl<T>({ inputProps, ...restProps }: InputControlProps<T>) {
	
	//type InputPropsType = Exclude<InputControlProps<T>["inputProps"], undefined>;
	// inputPropsWithSpellCheck - means the spellCheck prop exists, doesn't mean with spellCheck=true
	//const inputPropsWithSpellCheck = defaultProp<InputProps<T>, boolean>(inputProps, "spellCheck", false);

	const { inputProps: innerInputPropsOptional, ...restInputProps } = getDefinedObject(inputProps);
	const innerInputProps = getDefinedObject(innerInputPropsOptional);
	const { spellCheck, ...restInnerInputProps } = innerInputProps;
	const spellCheckWithDefault = (spellCheck == undefined) ? false : spellCheck ;
	const innerInputPropsWithSpellCheck = {
		spellCheck: spellCheckWithDefault,
		...restInnerInputProps
	};
	const inputPropsWithSpellCheck = {
		inputProps: innerInputPropsWithSpellCheck,
		...restInputProps
	};

	return <BaseControl {...restProps}><OutlinedInput style={{borderRadius: '10px'}} {...inputPropsWithSpellCheck}/></BaseControl>;
	
}
export default InputControl; 