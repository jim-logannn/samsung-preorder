import { Typography } from '@material-ui/core';
import { Locale, LocaleEN, LocaleTC } from '@smt/type/common';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

interface Props {
    data: string | '-';
		className?: string;
		locale?: Locale;
		translateContent?: {
			unlimited_data: string;
			after: string;
			data_unit: string;
			fup_applies: string;
		}
}

const StyledWrapper = styled.div`
	display: inline-flex;
	align-items: flex-end;
	justify-content: space-between;
`

const DefaultTranslateContent = {
	unlimited_data: "Truly Unlimited 5G Data^",
	after: "After",
	data_unit: "GB",
	fup_applies: "FUP Applies"
}

const Data: React.FC<Props> = (props) => {
	const intl = useIntl();
	const { data, locale = LocaleEN, translateContent = DefaultTranslateContent, className } = props;
    return (<>
			<StyledWrapper>
				<Typography variant='h1'>{data}</Typography>
				<Typography variant='h5'>GB</Typography>
			</StyledWrapper>
			<Typography variant='body1'>{intl.formatMessage({id:"plan.local-data"})}</Typography>
		</>);
};

export default Data;
export type DataProps = Props;
export type DataLocale = typeof DefaultTranslateContent;