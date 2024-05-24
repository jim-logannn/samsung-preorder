import { InputBase, withStyles } from '@material-ui/core';
import { SelectControlProps } from '@smt/formControl/input/SelectControl';
import SelectControlTemplate from '@smt/formControl/template/SelectControlTemplate';
import { FormWatcherContext, useFormWatcher } from '@smt/hook/InputHook';
import { dayjs } from '@smt/util/DayUtils';
import { isBlank } from '@smt/util/StringUtils';
import { validateText } from '@smt/validator/InputValidator';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const StyledInput = withStyles((theme) => ({
	root: {
		width: '100%',
		padding: '12px 8px',
		borderRadius: '30px',
		background: '#eee'
	},
	input: {
		paddingLeft: '8px',
		fontWeight: 'bold'
	}
}))(InputBase);
interface SelectInputProps<T> {
	onChangeValue?: (v: T) => void;
	value?: T;
	options: Array<{title: string | ReturnType<typeof FormattedMessage>, value: T}>
	field: string,
	defaultLabel?: string;
}
export const SelectInput: React.FC<SelectInputProps<string>> = ({ onChangeValue, value, options, field, defaultLabel }) => {
	const intl = useIntl();
	const {error, valid, onBlur} = useFormWatcher(field, validateText, true, value);
	const selectProps: SelectControlProps<string>['selectProps'] = {
		onChange: (event: React.ChangeEvent<{ value: string; }>) => {
			if (onChangeValue === undefined) {
				return;
			}
			onChangeValue(event.target.value);
		},
		value: value ?? (options?.[0].value ?? ''),
		input: <StyledInput />,
		fullWidth: true
	};

	return <>
		<SelectControlTemplate selectProps={selectProps} options={options} defaultOption={defaultLabel ?? intl.formatMessage({id:"please-select"})} fullWidth disabled={options.length <= 0} />
	</>;
};
interface DateSelectInputProps extends Omit<SelectInputProps<string>, 'options'> {
	data: Array<string>
}
export const DateSelectInput: React.FC<DateSelectInputProps> = ({ data, ...rest}) => {
	const intl = useIntl();
	const options = data?.map(d => ({ title: dayjs(d, 'YYYYMMDD').format('YYYY-MM-DD (ddd)'), value: d })) ?? [];
	return <SelectInput {...rest} options={options} defaultLabel={intl.formatMessage({id:"default-pickup-date"})} />
} 
interface TimeSelectInputProps extends Omit<SelectInputProps<string>, 'options'> {
	data: Array<string>
}
export const TimeSelectInput: React.FC<TimeSelectInputProps> = ({ data, ...rest}) => {
	const intl = useIntl();
	const options = data?.map(d => ({ title: <FormattedMessage id={d} />, value: d })) ?? [];
	return <SelectInput {...rest} options={options} defaultLabel={intl.formatMessage({id:"default-pickup-time"})} />
} 
