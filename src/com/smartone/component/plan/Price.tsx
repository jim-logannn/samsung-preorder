import React from 'react';
import styled from 'styled-components';
import Remark from '@smt/component/plan/Remark';
import { Locale, LocaleEN } from '@smt/type/common';
import { Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';

export interface OfferPrice {
	curr_price: string;
	remark: string;
	ori_price: string;
	rebate_amt: string;
}

interface Props {
		offer_price: OfferPrice | string;
		className?: string;
		locale?: Locale;
    translateContent?: {
        average_monthly: string;
    };
}

const StyledPriceWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`;
const StyledOriginFee = styled.div`
    text-decoration: line-through;
    font-size: ${(props) => props.theme.typography.subTitle1.fontSize};
    color: ${(props) => props.theme.color.text.grayLight};
`;
const StyledCurrency = styled.span<{ locale: Locale }>`
    font-family: ${(props) => (props.locale === LocaleEN ? props.theme.typography.font.titlingGothicFBNarrowEN : props.theme.typography.font.titlingGothicFBNarrowTC)};
    font-size: 2rem;
    ${(p) => p.theme.breakpoints.up('md')} {
        font-size: 1.7rem;
    }
    font-weight: 500;
`;
const StyledFee = styled.span<{ locale: Locale }>`
		font-size: ${p=>p.theme.typography.subtitle2};
`;
const StyledAverageMonthly = styled.div`
    font-size: ${(props) => props.theme.typography.subTitle1.fontSize};
    color: ${(props) => props.theme.color.text.gray};
`;
const StyledRemarkWrapper = styled.div`
    align-self: flex-end;
`;
const DefaultTranslateContent = {
	average_monthly: "Average Monthly"
}
const Price: React.FC<Props> = (props) => {
	const intl = useIntl();
	const { className, offer_price, locale = LocaleEN, translateContent = DefaultTranslateContent } = props;
    return (
        <div className={className}>
            {typeof offer_price === 'object' && (<>
							<StyledOriginFee>HK$ {offer_price.ori_price}</StyledOriginFee>
							<StyledPriceWrapper>
									<StyledCurrency locale={locale}>HK$</StyledCurrency>{' '}
									<StyledFee locale={locale}>
											{offer_price.curr_price}
											<sup>*</sup>
									</StyledFee>
									<StyledRemarkWrapper>{offer_price.remark.length > 0 && <Remark content={offer_price.remark} onDisplayRemark={console.log} />}</StyledRemarkWrapper>
							</StyledPriceWrapper>
							<StyledAverageMonthly>{translateContent.average_monthly}</StyledAverageMonthly>
						</>)}
						{typeof offer_price === 'string' && (<>
							<StyledPriceWrapper>
								<Typography variant='h5'>HK$</Typography>
								<Typography variant='h3'>{offer_price}</Typography>
							</StyledPriceWrapper>
							<Typography variant='body1'>{intl.formatMessage({id:"plan.price.monthly"})}</Typography>
						</>)}
        </div>
    );
};
export default Price;
export type PriceProps = Props;
export type PriceLocale = typeof DefaultTranslateContent;