/**
* com/smartone/formControl/LastName
**/
import React from 'react';
import TextControlTemplate, { TextControlTemplateProps } from '../template/TextControlTemplate';

export interface LastNameProps extends Omit<TextControlTemplateProps<string>, "defaultLabelId" | "defaultLabelOptionalId" | "defaultPlaceholderId"> {

}
function LastName(props: LastNameProps) {
	
	return <TextControlTemplate
			defaultLabelId="formControl.lastName.label"
			defaultLabelOptionalId="formControl.lastName.label.optional"
			defaultPlaceholderId="formControl.lastName.placeholder"
			{...props}
			/>;
	/*
	const intl = useIntl();
	const DEFAULT_LABEL       = intl.formatMessage({ id: "formControl.lastName.label" + (props.required ? "" : ".optional") });
	const DEFAULT_PLACEHOLDER = intl.formatMessage({ id: "formControl.lastName.placeholder" });

	const { inputProps, label, ...rest } = defaultProp<LastNameProps<string>, string>(props, "label", DEFAULT_LABEL);
	// inputProps is optional, exclude undefined for the type
	type InputPropsType = Exclude<LastNameProps<string>["inputProps"], undefined>;
	const { placeholder, ...restInputProps } = defaultProp<InputPropsType, string>(inputProps, "placeholder", DEFAULT_PLACEHOLDER);

	return <InputTextControl inputProps={{ placeholder, ...restInputProps }} label={label} {...rest}/>;
	*/
}
export default LastName;