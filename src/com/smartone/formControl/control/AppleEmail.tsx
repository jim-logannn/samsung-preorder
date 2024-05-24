/**
* com/smartone/formControl/Email
**/
import React from 'react';
import EmailControlTemplate, { EmailControlTemplateProps } from '../template/EmailControlTemplate';


export interface EmailProps extends Omit<EmailControlTemplateProps<string>, "defaultLabelId" | "defaultLabelOptionalId" | "defaultPlaceholderId"> {

};
function AppleEmail(props: EmailProps) {
	
	return <EmailControlTemplate
			defaultLabelId="formControl.apple-email.label"
			defaultLabelOptionalId="formControl.apple-email.label.optional"
			defaultPlaceholderId="formControl.apple-email.placeholder"
			{...props}
			/>;
	/*
	const intl = useIntl();
	const DEFAULT_LABEL       = intl.formatMessage({ id: "formControl.email.label" + (props.required ? "" : ".optional") });
	const DEFAULT_PLACEHOLDER = intl.formatMessage({ id: "formControl.email.placeholder" });
	//const DEFAULT_HELPERTEXT  = "Please input email";

	const { inputProps, ...rest } = defaultProp<EmailProps<string>, string>(props, "label", DEFAULT_LABEL);
	//const { inputProps, ...rest } = defaultProp<EmailProps, string>(propsWithLabel, "helperText", DEFAULT_HELPERTEXT);

	// inputProps is optional, exclude undefined for the type
	type InputPropsType = Exclude<EmailProps<string>["inputProps"], undefined>;
	const { placeholder, ...restInputProps } = defaultProp<InputPropsType, string>(inputProps, "placeholder", DEFAULT_PLACEHOLDER);

	return <InputEmailControl inputProps={{ placeholder, ...restInputProps }} {...rest}/>;
	*/
}
export default AppleEmail;