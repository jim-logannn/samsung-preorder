/**
* com/smartone/formControl/template/Yob
**/
import React, { useCallback } from 'react';
import TextControlTemplate, { TextControlTemplateProps } from '../template/TextControlTemplate';
import { getDefinedObject } from '@smt/util/ObjectUtils';

export const DEFAULT_MAX_LENGTH = 4;
export interface YobProps extends Omit<TextControlTemplateProps<string>, "defaultLabelId" | "defaultLabelOptionalId" | "defaultPlaceholderId"> {
	length?: number;
};
function Yob({ length=DEFAULT_MAX_LENGTH, inputProps, ...restProps }: YobProps) {
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
			defaultLabelId="formControl.yob.label" 
			defaultLabelOptionalId="formControl.yob.label.optional" 
			defaultPlaceholderId="formControl.yob.placeholder"
			inputProps={inputPropsWithDefault}
			{...restProps}
			/>;

}
export default Yob;