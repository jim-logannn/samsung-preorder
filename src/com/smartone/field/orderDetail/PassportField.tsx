import Passport, { PassportProps } from '@smt/formControl/control/Passport';
import { useInputWatcher } from '@smt/hook/InputHook';
import { validateFourDigitPassport } from '@smt/validator/InputValidator';
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
function PassportField({ className, required, value="", onChange, onChangeValid, review }: Props) {
	const intl = useIntl();
	const onChangePassport = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): PassportProps["inputProps"] {
		if(onChangePassport) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangePassport
			};
		}
		return undefined;
	}, [value, onChangePassport]);

	const helperText = intl.formatMessage({id:"formControl.passport.require"});

	const [ error, valid, onBlur ] = useInputWatcher(validateFourDigitPassport, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <Passport review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default PassportField;