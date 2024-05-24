/**
* com/smartone/shop/checkout/common/field/LastNameField
**/
import LastName, { LastNameProps } from '@smt/formControl/control/LastName';
import { useInputWatcher } from '@smt/hook/InputHook';
import { validateAlphabetCharsWithLength, validateText } from '@smt/validator/InputValidator';
import React, { useCallback, useMemo, useEffect } from 'react';
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
function LastNameField({ className, required, value="", onChange, onChangeValid, review }: Props) {
	const intl = useIntl();
	const onChangeLastName = useCallback(function(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if(onChange) {
			onChange(event.target.value);
		}
	}, [onChange]);
	// set default value to avoid switching from uncontrolled comp to controlled comp warning
	const inputProps = useMemo(function(): LastNameProps["inputProps"] {
		if(onChangeLastName) {
			return {
				value: (typeof(value) != 'undefined') ? value : "",
				onChange: onChangeLastName
			};
		}
		return undefined;
	}, [value, onChangeLastName]);

	const helperText = intl.formatMessage({id:"formControl.lastName.require"});
	
	const [ error, valid, onBlur ] = useInputWatcher(validator, required, value);

	useEffect(function() {
		if(onChangeValid) {
			onChangeValid(valid);
		}
	}, [onChangeValid, valid]);

	return <LastName review={review} fullWidth error={error} required={required} inputProps={inputProps} onBlur={onBlur} helperText={error ? helperText : undefined}/>;
}
export default LastNameField;