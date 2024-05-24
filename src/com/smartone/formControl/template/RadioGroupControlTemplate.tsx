/**
* com/smartone/formControl/template/RadioGroupControlTemplate
**/
import * as FormControlData from '@smt/data/formControl/FormControlData';
import React from 'react';
import { useIntl } from 'react-intl';
import InputRadioGroupControl, { findOptionTitle, InputRadioGroupControlProps } from '@smt/formControl/input/InputRadioGroupControl';
// import ReviewControl from '../review/ReviewControl';
import { useMessageLabel } from './BaseTemplate';

export interface RadioGroupControlTemplateProps<T extends FormControlData.OptionDataType> extends InputRadioGroupControlProps<T> {
	review?: boolean;
	defaultLabelId?: string;
	defaultLabelOptionalId?: string;
}
function RadioGroupControlTemplate<T extends FormControlData.OptionDataType>({ review, defaultLabelId, defaultLabelOptionalId, ...inputRadioGroupControlProps}: RadioGroupControlTemplateProps<T>) {
	
	const intl = useIntl();
	const { label: labelParam, ...restInputRadioGroupControlProps } = inputRadioGroupControlProps;
	const label = defaultLabelId && defaultLabelOptionalId ? useMessageLabel(restInputRadioGroupControlProps.required, labelParam, defaultLabelId, defaultLabelOptionalId) : null;
	//const label = (typeof(labelParam) != 'undefined') ? labelParam : intl.formatMessage({ id: restInputRadioGroupControlProps.required ? defaultLabelId : defaultLabelOptionalId }) ;

	if(review) {
		const value  = restInputRadioGroupControlProps.radioGroupProps?.value;
		const title  = value ? findOptionTitle(restInputRadioGroupControlProps.options, value) : undefined ;
		const values = title ? [title] : [] ;
		// ControlReview does not need radioGroupProps
		// return <ReviewControl label={label} values={values} {...restInputRadioGroupControlProps}/>;
		return null
	}

	return <InputRadioGroupControl label={label} {...restInputRadioGroupControlProps}/>;
}
export default RadioGroupControlTemplate;