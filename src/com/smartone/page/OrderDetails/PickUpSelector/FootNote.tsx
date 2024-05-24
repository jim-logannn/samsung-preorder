import { ModalContext } from "@/context/ModalContext";
import { StyledDivider } from "@smt/page/Base/Style";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useIntl, FormattedMessage } from 'react-intl';
import { getLangFromLocale } from "@smt/lang/Lang";
import ApplicationContext from '@smt/context/ApplicationContext';
import { createCallbackValue } from "@smt/util/Callback";
import { CALLBACK_EXIT_FROM_PICKUP_SELECTOR } from "@smt/type/callback";

const StyledFootNote = styled.div``
const StyledHeading = styled.h3`
	font-size: ${p=>p.theme.typography.body2};
`
const StyleContent = styled.h3`
	font-size: ${p=>p.theme.typography.body1};
`
const StyleExitButton = styled.button`
	display: inline-block;
	padding: 0;
	border: none;
	background: none;
	text-decoration: underline;
	color: ${p=>p.theme.palette.primary.main};
	cursor: pointer;
`
const StylePrev = styled.a`
	cursor: pointer;
	text-decoration: none;
	color: ${p=>p.theme.palette.text.light};
`
const StyledRemindLink = styled.span`
	color: ${p => p.theme.palette.primary.main};	
	cursor: pointer;
`
interface Props { 
	onClickBackButton?:() => void;
  }
  const FootNote = ({onClickBackButton}:Props) => {

	const { showConfirm } = useContext(ModalContext); 
	const intl = useIntl();
	const msgPreorderViaRedpass = intl.formatMessage({id: "footer.reminder.preorder-redpass"});
	const msgAlertMessage = intl.formatMessage({id: "footer.reminder.alert-message"});

	const applicationContext = useContext(ApplicationContext);
	const preorderUrl = applicationContext?.url?.preorder;
	
	const goToPreorder = () => {
		if (applicationContext?.eventCallback) {
			applicationContext.eventCallback(createCallbackValue(CALLBACK_EXIT_FROM_PICKUP_SELECTOR))
		}
		if (preorderUrl){
			document.location.href = preorderUrl
		}		
	}

	const exitAlert = () => showConfirm({
		onYes: () => goToPreorder(),
		title: msgPreorderViaRedpass,
		message: msgAlertMessage
	})

	const clickHere = <StyledRemindLink onClick={exitAlert}>{intl.formatMessage({id: "footer.reminder.click-here"})}</StyledRemindLink>;
   	const values = {
        link  : clickHere
    };
    const remindMessage   = <FormattedMessage id="footer.reminder.time-remind-message" values={values}/>;

	return <StyledFootNote>
		<StyleContent><div>{intl.formatMessage({ id: "footer.reminder.timeslot-not-fit" })}</div>{remindMessage}</StyleContent>
		{onClickBackButton && <StyleContent>
			<StylePrev onClick={onClickBackButton}>{intl.formatMessage({ id: "footer.note.back" })}</StylePrev>
		</StyleContent>}
	</StyledFootNote>
};

export default FootNote;
