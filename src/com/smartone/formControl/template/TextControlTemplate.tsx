/**
* com/smartone/formControl/TextControlTemplate
**/
import React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import { getDefinedObject } from '@smt/util/ObjectUtils';
import InputTextControl, { InputTextControlProps } from '@smt/formControl/input/InputTextControl';
//import ReviewControl from '../review/ReviewControl';
import { useMessageLabel } from './BaseTemplate';
import { isNotBlank } from '@smt/util/StringUtils';

function getMessageById(intl:IntlShape, id: string|undefined) {
	if(id && isNotBlank(id)) {
		return intl.formatMessage({id});
	}
	return "";
}
export interface TextControlTemplateProps<T> extends InputTextControlProps<T> {
	review?: boolean;
	defaultLabelId?: string;
	defaultLabelOptionalId?: string;
	defaultPlaceholderId?: string;
}
function TextControlTemplate<T>({ review, defaultLabelId, defaultLabelOptionalId, defaultPlaceholderId, ...inputTextControlProps}: TextControlTemplateProps<T>) {

	const intl = useIntl();
	const { inputProps, label: labelParam, ...restInputTextControlProps } = inputTextControlProps;
	const label = useMessageLabel(restInputTextControlProps.required, labelParam, defaultLabelId, defaultLabelOptionalId);

	/*
	if(review) {
		const value  = inputProps?.value;
		const values = value ? [value] : [] ;
		// ControlReview does not need inputProps
		return <ReviewControl label={label} values={values} {...restInputTextControlProps}/>;
	}
	*/
	const { placeholder: placeholderParam, ...restInputProps } = getDefinedObject(inputProps);
	const placeholder = (typeof(placeholderParam) != 'undefined') ? placeholderParam : getMessageById(intl, defaultPlaceholderId) ;

	return <InputTextControl inputProps={{ placeholder: placeholder, ...restInputProps }} label={label} {...restInputTextControlProps}/>;
}
export default TextControlTemplate;