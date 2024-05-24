import Yob, { YobProps } from '@smt/formControl/control/Yob';
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
function YobField({ className, required, value="", onChange, onChangeValid, review }: Props) {
	const intl = useIntl();
	const onChangeYob = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): YobProps["inputProps"] {
		if(onChangeYob) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangeYob
			};
		}
		return undefined;
	}, [value, onChangeYob]);

	const helperText = intl.formatMessage({id:"formControl.yob.require"});

	const [ error, valid, onBlur ] = useInputWatcher(validateFourDigit, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <Yob review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default YobField;