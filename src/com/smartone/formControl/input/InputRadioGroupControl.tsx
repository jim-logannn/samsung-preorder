/**
* com/smartone/formControl/input/InputRadioGroupControl
**/
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps, RadioProps, withStyles } from '@material-ui/core';
import { OptionDataType, RadioOptionData } from '@smt/data/formControl/FormControlData';
import React from 'react';
import { defaultProp } from '@smt/util/ObjectUtils';
import BaseControl, { BaseControlProps } from '../base/BaseControl';

/*
default:
row=true
*/
const StyledRadio = withStyles((theme) => ({
	root: {
		padding: 0,
		margin: `${theme.spacing(0, 1)}`
	}
}))(Radio)

const StyledFormControlLabel = withStyles((theme) => ({
	root: {
		marginBottom: `${theme.spacing(1)}px`
	}
}))(FormControlLabel)

export interface InputRadioGroupControlRadioGroupProps<T extends OptionDataType> extends RadioGroupProps {
	value: T | null;
}
export interface InputRadioGroupControlProps<T extends OptionDataType> extends BaseControlProps {
	radioGroupProps?: InputRadioGroupControlRadioGroupProps<T>;
	options?: RadioOptionData<T>[];
	radioProps?: RadioProps
}
function InputRadioGroupControl<T extends OptionDataType>({ options, radioGroupProps, radioProps, ...rest }: InputRadioGroupControlProps<T>) {
	
	const radioGroupPropsWithRow = defaultProp<RadioGroupProps, boolean>(radioGroupProps, "row", true);
	return (
		<BaseControl {...rest}>
			<RadioGroup {...radioGroupPropsWithRow}>
				{ options?.map((item, index) => <StyledFormControlLabel key={item.value as string} value={item.value} disabled={item.disabled ?? false} control={<StyledRadio {...radioProps} />} label={item.title}/>) }
			</RadioGroup>
		</BaseControl>
	);
}
export default InputRadioGroupControl;
export function findOption<T extends OptionDataType>(options: RadioOptionData<T>[] | undefined, value: T): RadioOptionData<T> | undefined {
	return options ? options.find(element => element.value == value) : undefined ;
}
export function findOptionTitle<T extends OptionDataType>(options: RadioOptionData<T>[] | undefined, value: T): React.ReactNode {
	const option = findOption(options, value);
	return option ? option.title : undefined ;
}