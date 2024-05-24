/**
* com/smartone/formControl/EmailControlTemplate
**/
import React from 'react';
import { useIntl } from 'react-intl';

import InputEmailControl, { InputEmailControlProps } from '../input/InputEmailControl';
//import ReviewControl from '../review/ReviewControl';
import { useMessageLabel } from './BaseTemplate';
import { getDefinedObject } from '../../util/ObjectUtils';

export interface EmailControlTemplateProps<T> extends InputEmailControlProps<T> {
	review?: boolean;
	defaultLabelId: string;
	defaultLabelOptionalId: string;
	defaultPlaceholderId: string;
}
function EmailControlTemplate<T>({ review, defaultLabelId, defaultLabelOptionalId, defaultPlaceholderId, ...inputEmailControlProps }: EmailControlTemplateProps<T>) {

	const intl = useIntl();
	const { inputProps, label: LabelParam, ...restInputEmailControlProps } = inputEmailControlProps;
	const label = useMessageLabel(restInputEmailControlProps.required, LabelParam, defaultLabelId, defaultLabelOptionalId);
	//const label = (typeof(LabelParam) != 'undefined') ? LabelParam : intl.formatMessage({ id: restInputEmailControlProps.required ? defaultLabelId : defaultLabelOptionalId }) ;

	/*
	if(review) {
		const value  = inputProps?.value;
		const values = value ? [value] : [] ;
		// ControlReview does not need inputProps
		return <ReviewControl label={label} values={values} {...restInputEmailControlProps}/>;
	}
	*/

	const { placeholder: placeholderParam, ...restInputProps } = getDefinedObject(inputProps);
	const placeholder = (typeof(placeholderParam) != 'undefined') ? placeholderParam : intl.formatMessage({ id: defaultPlaceholderId }) ;

	return <InputEmailControl inputProps={{ placeholder: placeholder, ...restInputProps }} label={label} {...restInputEmailControlProps}/>;
	
}
export default EmailControlTemplate;