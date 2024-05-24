/**
* com/smartone/formControl/template/SelectControlTemplate
**/
import React from 'react';
import SelectControl, { findOptionTitle, SelectControlProps } from '../input/SelectControl';
import { OptionDataType } from '@smt/data/formControl/FormControlData';

import ReviewControl from '../review/ReviewControl';
import { useMessageLabel } from './BaseTemplate';

export interface SelectControlTemplateProps<T extends OptionDataType> extends SelectControlProps<T> {
	review?: boolean;
	defaultLabelId?: string;
	defaultLabelOptionalId?: string;
}
function SelectControlTemplate<T extends OptionDataType>({ review, defaultLabelId, defaultLabelOptionalId, ...selectControlProps }: SelectControlTemplateProps<T>) {

	const { label: labelParam, ...restSelectControlProps } = selectControlProps;
	const label = defaultLabelId &&	defaultLabelOptionalId ? useMessageLabel(restSelectControlProps.required, labelParam, defaultLabelId, defaultLabelOptionalId) : null;
	//const label = (typeof(labelParam) != 'undefined') ? labelParam : intl.formatMessage({ id: restSelectControlProps.required ? defaultLabelId : defaultLabelOptionalId }) ;

	// if(review) {
	// 	const value = restSelectControlProps.selectProps?.value;
	// 	const title  = value ? findOptionTitle(restSelectControlProps.optionGroups, restSelectControlProps.options, value) : undefined ;
	// 	const values = title ? [title] : [] ;
	// 	return <ReviewControl label={label} values={values} {...restSelectControlProps}/>;
	// }

	return <SelectControl label={label} {...restSelectControlProps}/>;
}
export default SelectControlTemplate;