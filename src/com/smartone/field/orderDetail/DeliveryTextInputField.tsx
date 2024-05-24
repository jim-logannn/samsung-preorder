import React, { useCallback, useEffect, useMemo } from 'react';
import TextControlTemplate, { TextControlTemplateProps } from '@smt/formControl/template/TextControlTemplate';
import { useIntl } from 'react-intl';
import { useFormWatcher, useInputWatcher } from '@smt/hook/InputHook';
import { validateAlphabetCharsWithLength, validateEnglishNumberCharWithLength, validateMobile, validateText } from '@smt/validator/InputValidator';
import { StringifyOptions } from 'querystring';

interface InputProps extends Omit<TextControlTemplateProps<string>, "defaultLabelId" | "defaultLabelOptionalId" | "defaultPlaceholderId"> {
	defaultLabelId?: string;
	defaultLabelOptionalId?: string;
	defaultPlaceholderId?: string;
	helperText?: string;
};

function Input({defaultLabelId,	defaultLabelOptionalId, defaultPlaceholderId, ...rest}: InputProps) {
	return <TextControlTemplate
		defaultLabelId={defaultLabelId} 
		defaultLabelOptionalId={defaultLabelOptionalId}
		defaultPlaceholderId={defaultPlaceholderId}
		{...rest}
	/>;
}

interface Props {
	className?: string;
	value?: string;
	onChange?: (value: string)=>void;
	required?: boolean;
	onChangeValid?: (value:boolean)=>void;
	review?: boolean;
	inputPropsOverrides?: InputProps
	field: string;
}

function DeliveryTextInputField({ className, required, value="", onChange, onChangeValid, review, inputPropsOverrides, field }: Props) {
	const intl = useIntl();
	// DIRTY 
	const validator = useMemo(() => {
		switch (field) {
			case 'contactNo':
				return validateMobile
			case 'recipient':
				return validateAlphabetCharsWithLength(100)
			case 'address1':
				return validateEnglishNumberCharWithLength(500)
			case 'address2':
				return validateEnglishNumberCharWithLength(500)
			default:
				return validateText
		}
	}, [field])
	const onChangeValue = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): InputProps["inputProps"] {
		if(onChangeValue) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangeValue,
				...inputPropsOverrides
			};
		}
		return undefined;
	}, [value, onChangeValue, inputPropsOverrides]);

	const helperText = inputPropsOverrides?.helperText;

	const [ error, valid, onBlur ] = useFormWatcher(field, validator, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <Input review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default DeliveryTextInputField;