import { StyledDivider } from "@smt/page/Base/Style";
import React, { useState, useCallback, useMemo, useEffect, useContext } from "react";
import styled from "styled-components";
import { TextButton } from "@smt/component/button";
import { useIntl } from "react-intl";
import SimpleRecaptcha from "@smt/recaptcha/SimpleRecaptcha";
import { isBlank, isNotBlank } from "@smt/util/StringUtils";
import bp from '@/com/smartone/theme/BreakpointUtils';
import ApplicationContext from '@smt/context/ApplicationContext';

const StyledFooterOrderDetails = styled.div`
	padding-bottom: ${p => p.theme.spacing(6)}px;
	margin: 0 ${p=>p.theme.spacing(1)}px;
	${(p) => p.theme.breakpoints.up("md")} {
		margin: 0;
	}
`
const StyledHeading = styled.h3`
	 ${p=>p.theme.typography.body2};
`
const StyleContent = styled.h3`
  ${p=>p.theme.typography.body1};
  color: #666666;
`
const StyleLink = styled.a`  
	color: ${p=>p.theme.palette.primary.main};
`
const StylePrev = styled.a`	
  cursor: pointer;
  ${p=>p.theme.typography.body1};
  text-decoration: none;
  color: ${p=>p.theme.palette.text.light};
  &:hover {
		text-decoration: underline;
	}
`
const StyleContentTable = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: ${p => p.theme.spacing(3)}px;
  ${props => bp.down('xs' , props.theme.breakpoints, "flex-flow: wrap;")}
`
const StyleContentRowNext = styled.div`
  ${props => bp.down('xs' , props.theme.breakpoints, "order: 2;flex: 1 1 auto;")}
`
const StyleContentRowCaptcha = styled.div`
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  margin-right: ${p => p.theme.spacing(3)}px;
  ${props => bp.down('xs' , props.theme.breakpoints, "flex-basis: 100%;align-items: flex-start;justify-content: space-around;margin: 0 0 20px;")}
`
const StyleContentRowButton = styled.div`
  ${props => bp.down('xs' , props.theme.breakpoints, "order: 2;")}
`
const StyleTextButton = styled(TextButton)`
  padding: ${p => p.theme.spacing(1)}px;
  box-sizing: content-box;
`

interface Props{
  onRecaptchaExpired: ()=>void;
  setRecaptcha:(v:string|null) =>void;
  disableSubmitButton: boolean;
  onClickSubmitButton: ()=>void;
  onClickBackButton: ()=>void;
}

const FooterOrderDetails = ({onRecaptchaExpired, setRecaptcha, disableSubmitButton, onClickSubmitButton, onClickBackButton}:Props) => {
  const intl = useIntl();
  const year = new Date().getFullYear();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// hooks
  //const [ recaptcha, setRecaptcha ] = useState<string|null>(null);
  //const [ disableButton, setDisableButton ] = useState<boolean>(true);

	const onChangeRecaptcha = useCallback((v:string|null) => {
		console.log("onChangeRecaptcha "+v);
		setRecaptcha(v);
		if(isBlank(v)) {
			if(onRecaptchaExpired) {
				onRecaptchaExpired();
			}
		}
  }, [ setRecaptcha, onRecaptchaExpired ]);
  
  /*
  useEffect(() => {
    setDisableButton(disableSubmitButton || isBlank(recaptcha));
  }, [recaptcha, disableSubmitButton]);
  */

 const applicationContext = useContext(ApplicationContext);
 const enableCaptcha:boolean = typeof applicationContext?.google?.recaptcha?.v2?.enable === 'undefined' ? true : applicationContext?.google?.recaptcha?.v2?.enable;

  return(
    <StyledFooterOrderDetails>
        <StyledDivider />
        <StyleContentTable>
          <StyleContentRowNext>
            <StylePrev onClick={onClickBackButton}>{intl.formatMessage({ id: "footer.note.back" })}</StylePrev>
          </StyleContentRowNext>
          <StyleContentRowCaptcha>
          {enableCaptcha &&
            <SimpleRecaptcha recaptchaSize={"normal"} onChange={onChangeRecaptcha}/>
          }
          </StyleContentRowCaptcha>
          <StyleContentRowButton>
          <StyleTextButton disabled={disableSubmitButton} onClick={onClickSubmitButton}>{intl.formatMessage({ id: "footer.button.confirm" })}</StyleTextButton>
          </StyleContentRowButton>
        </StyleContentTable>
      <StyleContent>
        {intl.formatMessage({ id: "footer.note.all-right-reserved" }, {year: year})}
      </StyleContent>
      <StyleContent>
        {intl.formatMessage({ id: "footer.note.copyright" }, {year: year})}
      </StyleContent>    
    </StyledFooterOrderDetails>
  )
};

export default FooterOrderDetails;
