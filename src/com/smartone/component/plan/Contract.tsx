import { Locale, LocaleEN } from '@smt/type/common';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

interface Props {
    contract_mth: string;
		className?: string;
		locale?: Locale;
		translateContent?: {
			months: string;
			contract: string;
		}
}
const StyledMonth = styled.span<{ locale: Props['locale'] }>`
    font-family: ${(props) => (props.locale === LocaleEN ? props.theme.typography.font.titlingGothicFBNarrowEN : props.theme.typography.font.titlingGothicFBNarrowTC)};
    font-size: ${(props) => props.theme.typography.h3.fontSize};
    font-weight: 500;
    & > span {
        font-size: 1.7rem;
    }
`;
const StyledContract = styled.span`
    font-size: ${(props) => props.theme.typography.subTitle1.fontSize};
    color: ${(props) => props.theme.color.text.gray};
`;

const DefaultTranslateContent = {
	months: 'Months',
	contract: 'Contract'
}
const Contract: React.FC<Props> = (props) => {
    const { contract_mth, locale = LocaleEN, translateContent = DefaultTranslateContent, className } = props;
	const intl = useIntl();
	return (
			<div className={className}>
					<div>
							<StyledMonth locale={locale}>
									{contract_mth}&nbsp;<span>{intl.formatMessage({id:"plan.months"})}</span>
							</StyledMonth>
					</div>
					<StyledContract>{intl.formatMessage({id:"plan.contract"})}</StyledContract>
			</div>
    );
};


export default Contract;
export type ContractProps = Props;
export type ContractLocale = typeof DefaultTranslateContent;