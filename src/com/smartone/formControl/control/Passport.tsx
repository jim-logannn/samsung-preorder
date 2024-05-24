/**
* com/smartone/formControl/template/Passport
**/
import React, { useCallback } from 'react';
import TextControlTemplate, { TextControlTemplateProps } from '../template/TextControlTemplate';
import { getDefinedObject } from '@smt/util/ObjectUtils';

export const DEFAULT_MAX_LENGTH = 4;

export interface PassportProps extends Omit<TextControlTemplateProps<string>, "defaultLabelId" | "defaultLabelOptionalId" | "defaultPlaceholderId"> {
	length?: number;
};
function Passport({ length=DEFAULT_MAX_LENGTH, inputProps, ...restProps }: PassportProps) {
	const { inputProps: innerInputPropsOptional, onChange, ...restInputProps } = getDefinedObject(inputProps);

	const innerInputProps = getDefinedObject(innerInputPropsOptional);
	const { placeholder, maxLength, ...restInnerInputProps } = innerInputProps;
	
	const customInputPropsOnChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void = useCallback((event) => {
		if(onChange) {
			onChange(event);
		}		
	}, [ onChange ]);

	const innerInputPropsWithDefault = {	
		maxLength: length,
		...restInnerInputProps
	};

	const inputPropsWithDefault = {
		inputProps: innerInputPropsWithDefault,
		onChange: customInputPropsOnChange,
		...restInputProps
	};

	return <TextControlTemplate
			defaultLabelId="formControl.passport.label" 
			defaultLabelOptionalId="formControl.passport.label.optional" 
			defaultPlaceholderId="formControl.passport.placeholder"
			inputProps={inputPropsWithDefault}
			{...restProps}
			/>;
}
export default Passport;