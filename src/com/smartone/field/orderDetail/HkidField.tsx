import Hkid, { HkidProps } from '@smt/formControl/control/Hkid';
import { useInputWatcher } from '@smt/hook/InputHook';
import { validateFourDigit } from '@smt/validator/InputValidator';
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
function HkidField({ className, required, value="", onChange, onChangeValid, review }: Props) {
	const intl = useIntl();
	const onChangeHkid = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): HkidProps["inputProps"] {
		if(onChangeHkid) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangeHkid
			};
		}
		return undefined;
	}, [value, onChangeHkid]);

	const helperText = intl.formatMessage({id:"formControl.hkid.require"});

	const [ error, valid, onBlur ] = useInputWatcher(validateFourDigit, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <Hkid review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default HkidField;