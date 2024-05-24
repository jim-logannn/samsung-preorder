import { StyledDivider } from "@smt/page/Base/Style";
import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { TextButton } from "@smt/component/button";
import { Box, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { FaChevronLeft } from "@smt/component/icon";
import { STEP } from "..";
import { Variant } from "@material-ui/core/styles/createTypography";
import { FulfillmentMainState } from "@smt/type/handsetPreOrder2023/fulfillment";
import { validateEmail } from "@smt/validator/InputValidator";
import { ProceedPaymentDetails } from "./ProceedPaymentDetails";

const StyledFootNote = styled.div`
	padding-left: ${p => p.theme.spacing(2)}px;
	padding-right: ${p => p.theme.spacing(2)}px;
	padding-bottom: ${p => p.theme.spacing(6)}px;
	&>:first-child{
		margin-top: 0;
	}
	&>:last-child{
		margin-bottom: 0;
	}
	${(p) => p.theme.breakpoints.up('md')} {
		padding-left: 0;	
		padding-right: 0;
	}
`
const StyledHeading = styled.h3`
	font-size: ${p=>p.theme.typography.body2};
`
const StyleTopContent = styled.h3`
	margin: ${p=>p.theme.spacing(7)}px 0;
	font-size: ${p=>p.theme.typography.body1};
	color: #9C9C9C;
	font-size: 1.2rem;
	position: relative;
	&:after {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100%;
		bottom: -20px;
		content: "";
		height: 1px;
		background: #C8C8C8;
	}
`
const StyleBottomContent = styled.h3`
	margin: ${p=>p.theme.spacing(7)}px 0;
	font-size: ${p=>p.theme.typography.body1};
	color: #9C9C9C;
	font-size: 1.2rem;
`
const StyleLink = styled.a`
	color: ${p=>p.theme.palette.primary.main};
`
const StylePrev = styled.a`	
  cursor: pointer;
  text-decoration: none;
  color: #9C9C9C;
  &:hover {
		text-decoration: underline;
	}
`
export const StyledConfirmBtn = styled(TextButton)`
	min-width: 120px;
	width: 100%;
	padding: ${p => p.theme.spacing(2)}px 0;
	${(p) => p.theme.breakpoints.up('md')} {
		width: 180px;
		font-weight: 300;
	}
`
interface Props { 
  onClickBackButton?:() => void;
	onClickConfirm?: () => void;
	disabledProceed: boolean;
	step: STEP;
	value?: FulfillmentMainState;
	disabledPayButton: boolean;
}
const FootNote = ({onClickBackButton, onClickConfirm, disabledProceed, step, value, disabledPayButton}:Props) => {
  const intl = useIntl();
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
  const year = new Date().getFullYear();
  const hideNextButton = step === STEP.ORDER;
	// const alignItems =  step === STEP.REVIEW ?  : "center"
  return(
    <StyledFootNote>
		{(onClickBackButton !== undefined || onClickConfirm !== undefined) &&
		<StyleTopContent>
			<Grid container direction={isDesktop?'row':'column-reverse'}  alignItems={isDesktop ? "flex-end" : "stretch"} justifyContent="space-between" wrap="nowrap">
				{ step !== STEP.ORDER && <>
					<Grid item>
						<Box display="flex" py={onClickConfirm === undefined ? 2 : 0} alignItems="center" justifyContent="flex-start">
							<FaChevronLeft />
							<Box pl={1}>
								{onClickBackButton !== undefined && <StylePrev onClick={onClickBackButton}>{intl.formatMessage({ id: "footer.note.back" })}</StylePrev>}
							</Box>
						</Box>
					</Grid>
					<Grid item>
						{(onClickConfirm !== undefined && !hideNextButton) && <StyledConfirmBtn disabled={disabledProceed} onClick={onClickConfirm}>{intl.formatMessage({ id: "footer.button.continue" })}</StyledConfirmBtn>}
						{step === STEP.REVIEW && <ProceedPaymentDetails value={value} disabledPayButton={disabledPayButton} />}
					</Grid>
				</>}
			</Grid>
		</StyleTopContent>
		}
      <StyleBottomContent>
				{intl.formatMessage({ id: "footer.note.all-right-reserved" }, {year: year})}
				<br />
				&nbsp;
				<br />
				{intl.formatMessage({ id: "footer.note.copyright" }, {year: year})}
      </StyleBottomContent>    
    </StyledFootNote>
  )
};
export default FootNote;