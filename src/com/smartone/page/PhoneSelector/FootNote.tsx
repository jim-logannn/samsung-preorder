import { StyledDivider } from "@smt/page/Base/Style";
import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { TextButton } from "@smt/component/button";
import { Box, Grid } from "@material-ui/core";
import { FaChevronLeft } from "@smt/component/icon";

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
const StyledConformBtn = styled(TextButton)`
	width: 120px;
	padding: ${p => p.theme.spacing(2)}px 0;
	${(p) => p.theme.breakpoints.up('md')} {
		width: 180px;
		font-weight: 300;
	}
`
interface Props { 
  onClickBackButton?:() => void;
	onClickConfirm?: () => void;
	disabledProceed?: boolean;
}
const FootNote = ({onClickBackButton, onClickConfirm, disabledProceed = false}:Props) => {
  const intl = useIntl();
  const year = new Date().getFullYear();
  
  return(
    <StyledFootNote>
		{(onClickBackButton !== undefined || onClickConfirm !== undefined) &&
		<StyleTopContent>
			<Grid container alignItems="center" justifyContent="space-between">
				<Grid item>
					<Box display="flex" alignItems="center" justifyContent="flex-start">
						<FaChevronLeft />
						<Box pl={1}>
							{onClickBackButton !== undefined && <StylePrev onClick={onClickBackButton}>{intl.formatMessage({ id: "footer.note.back" })}</StylePrev>}
						</Box>
					</Box>
				</Grid>
				<Grid item>
					{onClickConfirm !== undefined && <StyledConformBtn disabled={disabledProceed} onClick={onClickConfirm}>{intl.formatMessage({ id: "footer.button.confirm" })}</StyledConformBtn>}
				</Grid>
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
