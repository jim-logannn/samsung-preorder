import { StylePageHeader } from '@smt/page/Base/Style';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { VoucherData } from '@smt/component/voucher/Voucher';

const StyleHeading = styled.h4`
	text-align: center;
	${p => p.theme.typography.h5};
	margin-bottom: ${p => p.theme.spacing(4)}px;
`
const StyledDesc = styled.div`
	${p => p.theme.typography.body1};
`
const StyledTermTitle = styled.div`
	${p => p.theme.typography.body1};
	margin-top: ${p => p.theme.spacing(3)}px;
`
const StyledTerm = styled.ul`
	${p => p.theme.typography.body1};
	padding-inline-start: ${p => p.theme.spacing(2)}px;
	margin: 0;
	text-align: left;
`;
const StyledTermList = styled.li`
	b{
		font-weight:bold;
	}
`;

interface LeadinProp {
	voucherData : VoucherData
}

const LeadIn = ({voucherData}: LeadinProp) => {
	const intl = useIntl();
	return (
		<StylePageHeader>
			<StyledTerm>
			{ voucherData!=null && voucherData.length > 0 &&
				<StyledTermList dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "phone-select.term.text1"})}}></StyledTermList>
			}
			{ !(voucherData!=null && voucherData.length > 0) &&
				<StyledTermList dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "phone-select.term.text1NoVoucher"})}}></StyledTermList>
			}
			</StyledTerm>
		</StylePageHeader>
	)
}
export default LeadIn;