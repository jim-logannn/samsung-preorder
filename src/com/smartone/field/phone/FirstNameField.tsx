/**
* com/smartone/shop/checkout/common/field/FirstNameField
**/
import FirstName, { FirstNameProps } from '@smt/formControl/control/FirstName';
import { useInputWatcher } from '@smt/hook/InputHook';
import { validateAlphabetCharsWithLength, validateText } from '@smt/validator/InputValidator';
import React, { useMemo, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

interface Props {
	className?: string;
	value?: string;
	onChange?: (value: string)=>void;
	required?: boolean;
	onChangeValid?: (value:boolean)=>void;
	review?: boolean;
}
const validator = validateAlphabetCharsWithLength(200);
function FirstNameField({ className, required, value="", onChange, onChangeValid, review }: Props) {
	const intl = useIntl();
	const onChangeFirstName = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): FirstNameProps["inputProps"] {
		if(onChangeFirstName) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangeFirstName
			};
		}
		return undefined;
	}, [value, onChangeFirstName]);

	const helperText = intl.formatMessage({id:"formControl.firstName.require"});

	const [ error, valid, onBlur ] = useInputWatcher(validator, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <FirstName review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default FirstNameField;