/**
* com/smartone/formControl/template/MultipleTextControlTemplate
**/
import React from 'react';
import styled from 'styled-components';
import { Theme } from '@material-ui/core';
import bp from 'com/smartone/theme/BreakpointUtils';

import { useIntl } from 'react-intl';
import { isNotBlank } from 'util/StringUtils';
import { useMessageLabel } from './BaseTemplate';
import ReviewControl from '../review/ReviewControl';
import { defaultProp, getDefinedObject } from 'util/ObjectUtils';
import InputMultipleTextControl, { InputMultipleTextControlProps } from '../input/InputMultipleTextControl';
import { InputTextControlProps } from '../input/InputTextControl';
import ArrayUtils from 'util/ArrayUtils';


const StyledWrapper = styled.div`
	
`;
const StyledInputWrapper = styled.div`
	& + & {
		margin-top: ${props=>(props.theme as Theme).spacing(1)}px;
	}
`;
export interface MultipleTextControlTemplateProps<T> extends InputMultipleTextControlProps<T> {
	review?: boolean;
	defaultLabelId?: string;
	defaultLabelOptionalId?: string;
	defaultPlaceholderIdArray?: string[];
}
function MultipleTextControlTemplate<T>({ review, defaultLabelId, defaultLabelOptionalId, defaultPlaceholderIdArray, ...inputMutipleTextControlProps}: MultipleTextControlTemplateProps<T>) {

	const intl = useIntl();

	const { label: labelParam, ...restInputMutipleTextControlProps } = inputMutipleTextControlProps;
	const label = useMessageLabel(restInputMutipleTextControlProps.required, labelParam, defaultLabelId, defaultLabelOptionalId);


	if(review) {
		let values: T[] = [];
		if(restInputMutipleTextControlProps.controlPropsArray) {
			const inputTextControlPropsArray = restInputMutipleTextControlProps.controlPropsArray;
			for (let i = 0; i < inputTextControlPropsArray.length; i++) {
				const inputTextControlProps = inputTextControlPropsArray[i];
				const value = inputTextControlProps.inputProps?.value;
				if(value !== undefined) {
					values.push(value);
				}
			}
		}
		return <ReviewControl label={label} values={values} {...restInputMutipleTextControlProps} />;
	}

	// set default placeholder
	let { controlPropsArray, ...rest } = restInputMutipleTextControlProps;
	let controlPropsArrayWithPlaceholder: InputTextControlProps<T>[] | undefined = undefined;
	
	const numControl = restInputMutipleTextControlProps.numControl;
	
	if(numControl > 0) {
		controlPropsArrayWithPlaceholder = new Array(numControl);
		for (let i = 0; i < numControl; i++) {
			const controlProps = ArrayUtils.getElement(controlPropsArray, i);
			let { inputProps, ...restControlProps } = getDefinedObject(controlProps);
			inputProps = getDefinedObject(inputProps);
			let { placeholder, ...restInputProps } = inputProps;
			if(placeholder === undefined) {
				
				const defaultPlaceholderId = ArrayUtils.getElement(defaultPlaceholderIdArray, i);
				
				if(defaultPlaceholderId !== undefined) {
					placeholder = intl.formatMessage({ id: defaultPlaceholderId });
				}
				inputProps = { placeholder, ...restInputProps };
			}			
			controlPropsArrayWithPlaceholder[i] = { inputProps, ...restControlProps };
		}
	}	
	
	return <InputMultipleTextControl label={label} controlPropsArray={controlPropsArrayWithPlaceholder} {...rest}/>;
}
export default MultipleTextControlTemplate;