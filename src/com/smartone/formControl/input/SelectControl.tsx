/**
* com/smartone/formControl/input/SelectControl
**/
import { ListSubheader, MenuItem, Select, SelectProps } from '@material-ui/core';
import { OptionDataType, SelectOptionData, SelectOptionGroupData } from '@smt/data/formControl/FormControlData';
import React from 'react';
import styled from 'styled-components';
import BaseControl, { BaseControlProps } from '../base/BaseControl';
import StringUtils from '@smt/util/StringUtils';
import { defaultProp } from '@smt/util/ObjectUtils';


const StyledWrapper = styled.div`
	
`;
const StyledSelect = styled(({is_empty, ...props}: {is_empty:boolean;} & SelectProps ) => <Select {...props}/>)`
	${props=>props.is_empty ? "color: rgba(51,51,51,0.42);" : "" }
	border-radius: 3rem;
`;
interface SelectControlSelectProps<T extends OptionDataType> extends SelectProps {
	value?: T;
}
//type Constraints = string | number | readonly string[] | undefined;
export interface SelectControlProps<T extends OptionDataType> extends BaseControlProps {
	defaultOption?: React.ReactNode;
	selectProps?: SelectControlSelectProps<T>;
	optionGroups?: SelectOptionGroupData<T>[];
	options?: SelectOptionData<T>[];
}
// return true if value is within range
function isValueWithinRange<T extends OptionDataType>(value?: T, optionGroups?: SelectOptionGroupData<T>[], options?: SelectOptionData<T>[]) {
	//
	function checkOptions<T extends OptionDataType>(value: T, array: SelectOptionData<T>[]): boolean {
		if(array) {
			for(let i=0 ; i<array.length ; i++) {
				const option = array[i];
				if(value == option.value) {
					return true;
				}
			}
		}
		return false;
	}
	//
	if(value != undefined) {
		if(optionGroups != undefined) {
			for(let i=0 ; i<optionGroups.length ; i++) {
				const group = optionGroups[i];
				if(checkOptions(value, group.options)) {
					return true;
				}
			}
		} else if(options != undefined) {
			if(checkOptions(value, options)) {
				return true;
			}
		}
	}
	return false;
}
function SelectControl<T extends OptionDataType>({ selectProps, options, optionGroups, variant, defaultOption, ...rest }: SelectControlProps<T>) {

	const variantWithDefault = (typeof(variant) != 'undefined') ? variant : "outlined" ;

	const selectPropsWithDisplayEmpty = defaultProp<SelectControlSelectProps<T>, boolean>(selectProps, "displayEmpty", true);

	// to avoid this error:
	// Material-UI: You have provided an out-of-range value `diamond hill|KLN` for the select component.
	// set value to "" if the value is out of range
	const { value, ...restSelectProps } = selectPropsWithDisplayEmpty;
	//console.log("value = "+value);
	const inRange = isValueWithinRange(value, optionGroups, options);
	/*
	if(inRange) {
		console.log("value in range");
	} else {
		console.log("value not in range");
	}
	*/
	const selectPropsWithValue = {
		value: inRange ? value : "",
		...restSelectProps
	};
	
	//variant={variantWithDefault}
	return (
		<BaseControl {...rest}>
			<StyledSelect variant="filled" {...selectPropsWithValue} is_empty={StringUtils.isBlank(selectProps?.value as string)}>
				{ defaultOption ? <MenuItem value="">{defaultOption}</MenuItem> : null }
				{
					optionGroups ?
					optionGroups.map((group, groupIndex)=>{
						const list = [];
						list.push(<ListSubheader disableSticky={true}>{group.title}</ListSubheader>);
						const nestedOptions = group.options;
						return list.concat(nestedOptions.map((option, index)=><MenuItem key={option.value as string} value={option.value}>{option.title}</MenuItem>));
					})
					: 
					(
						options ? 
						options.map((option, index)=><MenuItem key={option.value as string} value={option.value}>{option.title}</MenuItem>)
						: null
					)
				}
			</StyledSelect>
		</BaseControl>
	);
}
export default SelectControl;
export function findOption<T extends OptionDataType>(optionGroups: SelectOptionGroupData<T>[] | undefined, options: SelectOptionData<T>[] | undefined, value: T): SelectOptionData<T> | undefined {
	if(optionGroups) {
		for (let i = 0; i < optionGroups.length; i++) {
			const group = optionGroups[i];
			const option = findOption(undefined, group.options, value);
			if(option) {
				return option;
			}
		}
	} else {
		return options ? options.find(element => element.value == value) : undefined ;
	}
	return undefined;
}
export function findOptionTitle<T extends OptionDataType>(optionGroups: SelectOptionGroupData<T>[] | undefined, options: SelectOptionData<T>[] | undefined, value: T): React.ReactNode {
	const option = findOption(optionGroups, options, value);
	return option ? option.title : undefined ;
}