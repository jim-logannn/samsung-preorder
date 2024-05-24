import Email, { EmailProps } from '@smt/formControl/control/Email';
import { useInputWatcher } from '@smt/hook/InputHook';
import { validateEmail } from '@smt/validator/InputValidator';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

interface Props {
	className?: string;
	value?: string;
	onChange?: (value: string)=>void;
	required?: boolean;
	onChangeValid?: (value:boolean)=>void;
	review?: boolean;
}
function EmailField({ className, required, value="", onChange, onChangeValid, review }: Props) {
	const intl = useIntl();
	const onChangeEmail = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): EmailProps["inputProps"] {
		if(onChangeEmail) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangeEmail
			};
		}
		return undefined;
	}, [value, onChangeEmail]);

	const helperText = intl.formatMessage({id:"formControl.email.require"});

	const [ error, valid, onBlur ] = useInputWatcher(validateEmail, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <Email review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default EmailField;