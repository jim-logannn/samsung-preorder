/**
* com/smartone/formControl/template/FirstName
**/
import React from 'react';
import TextControlTemplate, { TextControlTemplateProps } from '../template/TextControlTemplate';

export interface FirstNameProps extends Omit<TextControlTemplateProps<string>, "defaultLabelId" | "defaultLabelOptionalId" | "defaultPlaceholderId"> {

};
function FirstName(props: FirstNameProps) {

	return <TextControlTemplate
			defaultLabelId="formControl.firstName.label" 
			defaultLabelOptionalId="formControl.firstName.label.optional" 
			defaultPlaceholderId="formControl.firstName.placeholder"
			{...props}
			/>;
	/*
	const intl = useIntl();
	const DEFAULT_LABEL       = intl.formatMessage({ id: "formControl.firstName.label" + (props.required ? "" : ".optional") });
	const DEFAULT_PLACEHOLDER = intl.formatMessage({ id: "formControl.firstName.placeholder" });

	const { inputProps, label, ...rest } = defaultProp<FirstNameProps<string>, string>(props, "label", DEFAULT_LABEL);
	// inputProps is optional, exclude undefined for the type
	type InputPropsType = Exclude<FirstNameProps<string>["inputProps"], undefined>;
	const { placeholder, ...restInputProps } = defaultProp<InputPropsType, string>(inputProps, "placeholder", DEFAULT_PLACEHOLDER);

	return <InputTextControl inputProps={{ placeholder, ...restInputProps }} label={label} {...rest}/>;
	*/
}
export default FirstName;