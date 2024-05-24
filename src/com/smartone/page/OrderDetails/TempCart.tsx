import { useMediaQuery, useTheme } from "@material-ui/core";
import { TextButton } from "@smt/component/button";
import { Table, TableCell, TableRow } from "@smt/component/table";
import { formatPrice } from "@smt/util/StringUtils";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const StyledItem = styled.div`
	margin: 0 ${p => p.theme.spacing(1)}px;
  ${(p) => p.theme.breakpoints.up("md")} {
		margin: 0 ${p => p.theme.spacing(2)}px;
	}
`
const StyledItemAlignCenter = styled(StyledItem)`
	align-self: center;
`
const StyledTextAlign = styled.div<{textAlign?: string}>`
	text-align: ${p => p.textAlign || 'left'};
`
const StyledLabel = styled(StyledTextAlign)`
	margin-bottom: ${p => p.theme.spacing(1)}px;
	font-size: ${(p) => p.theme.typography.body1};
  ${(p) => p.theme.breakpoints.up("md")} {
		font-size: ${(p) => p.theme.typography.body2};
	}
`;
const StyledValue = styled(StyledTextAlign)`
	white-space: nowrap;
  font-size: ${(p) => p.theme.typography.body1};
  color: ${(p) => p.theme.palette.primary.main};
`;
const StyledValueEnlarge = styled.span`
  font-size: ${(p) => p.theme.typography.body2};
  color: ${(p) => p.theme.palette.primary.main};
`
const StyledFootNote = styled.div`
  color: ${(p) => p.theme.palette.text.light};
`

const SelectedHandset = ({price, style}: {price: number; style: React.CSSProperties}) => {
	const intl = useIntl();
	return (
		<StyledItem style={style}>
			<StyledLabel style={{fontWeight: 'bold'}}>{intl.formatMessage({id:"review.payment"})}</StyledLabel>
			<StyledLabel>{intl.formatMessage({id:"review.iphone-price"})}</StyledLabel>
			<StyledValue>HK$ <StyledValueEnlarge>{formatPrice(price)}</StyledValueEnlarge></StyledValue>
		</StyledItem>
	)
}
const SelectedPlan = ({appleCarePrice}: {appleCarePrice: number}) => (
	<StyledItem>
		<StyledLabel>AppleCare+</StyledLabel>
		<StyledValue>HK$ <StyledValueEnlarge>{formatPrice(appleCarePrice)}</StyledValueEnlarge></StyledValue>
	</StyledItem>
)
const Total =  ({price}: {price: number}) => {
	const intl = useIntl();
	return (
		<StyledItem>
			<StyledLabel textAlign="right">{intl.formatMessage({id:"review.total"})}</StyledLabel>
			<StyledValue textAlign="right">HK$ <StyledValueEnlarge>{formatPrice(price)}</StyledValueEnlarge></StyledValue>
		</StyledItem>
	)
}
		
const TempCart = ({handsetPrice, appleCarePrice}: {handsetPrice: number; appleCarePrice?: number}) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { 
		defaultMatches: window.matchMedia("(min-width:" + theme.breakpoints.values.md + "px)").matches 
	});

	return <>
		{
			<StyledWrapper>
				<SelectedHandset price={handsetPrice} style={{marginLeft: 'auto'}} />
				{
					appleCarePrice && <><StyledItemAlignCenter>
						<StyledLabel style={{marginBottom: 0, marginTop: '2.4rem'}}>+</StyledLabel>
					</StyledItemAlignCenter>
					<SelectedPlan appleCarePrice={appleCarePrice} /></>
				}
				<StyledItemAlignCenter>
					<StyledLabel style={{marginBottom: 0, marginTop: '2.4rem',}}>=</StyledLabel>
				</StyledItemAlignCenter>
				<Total price={handsetPrice + (appleCarePrice || 0)} />
			</StyledWrapper> 
		}
	</>
};

export default TempCart;
