import React, { useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { Theme, Checkbox, FormControlLabel, makeStyles, withStyles, CheckboxProps, Box } from '@material-ui/core';
import { useIntl, FormattedMessage } from 'react-intl';
import ApplicationContext from '@smt/context/ApplicationContext';
import styled from 'styled-components';
import { OPT_TERMS, PaymentCaseContext } from '@smt/page/FulfillmentMain/PaymentCaseProvider';
import MarkDownContent from '@/plugin/reactMarkdown';
import DeliveryTerms from '@smt/page/FulfillmentMain/RichTextContent/DeliveryTerms';
import { Locale, LocaleEN } from '@smt/type/common';
import locale from '@smt/locale/';
import CommonTerms from '@smt/page/FulfillmentMain/RichTextContent/CommonTerms';

const StyledFormControlLabelWrapper = styled.div`
    ${p => p.theme.typography.body1};
    margin: ${p=>p.theme.spacing(3)}px ${p=>p.theme.spacing(2)}px;
    display: flex;
    flex-flow: column;
		${(p) => p.theme.breakpoints.up("md")} {
			margin: ${p=>p.theme.spacing(3)}px 0;
		}
`
const StyledTermList = styled.ul`
    margin:0;
    & ol{
		list-style: lower-roman;
	}
`

const StyledTermLink = styled.span`
    color: ${p => p.theme.palette.primary.main};	
`
const useStyle = makeStyles((theme: Theme) => {
	return {
		FormControlLabelWrapper: {
			'& .MuiFormControlLabel-label': {				
				fontSize: "1.4rem"
			}
		}
	}
})

const StyledBox = styled(Box)`
	.MuiSvgIcon-root {
		width: 36px;
		height: 36px;
	}
`

const StyledCheckBox = withStyles((theme) => ({
	root: {
		padding: 1,
		color: '#fff'
	}
}))(Checkbox)

const CustomCheckbox: React.FC<CheckboxProps> = (p) => {
	return <StyledBox bgcolor="#fff" borderRadius={6} mx={2} style={{color: '#fff', 
	border: '1px solid #DDD'}}>
		<StyledCheckBox {...p} />
	</StyledBox>
}

interface Props {
    onSelectedTermCheckbox?: (v:boolean) => void;
    selectedAllTermCheckbox?: boolean;
}

const TermCheckbox = ({selectedAllTermCheckbox=false, onSelectedTermCheckbox}:Props) => {
    const [ declareCheckbox, setDeclareCheckbox ]  = useState<boolean>(selectedAllTermCheckbox);
    const [ agreeCheckbox, setAgreeCheckbox ]  = useState<boolean>(selectedAllTermCheckbox);
    const [ acceptCheckbox, setAcceptCheckbox ]  = useState<boolean>(selectedAllTermCheckbox);
    const [ twoHundredCoupon, setTwoHundredCoupon ]  = useState<boolean>(selectedAllTermCheckbox);
    const [ prepaid, setPrepaid ]  = useState<boolean>(selectedAllTermCheckbox);

    const intl = useIntl();
		const locale = intl.locale as Locale;
		const isEng = locale === LocaleEN;
    const classes = useStyle();
    const applicationContext = useContext(ApplicationContext);
    const mobile:string|undefined = applicationContext?.retentionInfo?.mobile;
		const { extraTermList } = useContext(PaymentCaseContext);
		const { isDelivery } = useContext(PaymentCaseContext);

			const selectedTermCheckbox = useMemo(() => {
			const validTwoHundredCoupon = extraTermList?.['200coupon'] === undefined || extraTermList?.['200coupon'] === false ? true : twoHundredCoupon
			const validPrepaid = extraTermList?.prepaid === undefined || extraTermList?.prepaid === false ? true : prepaid
			
			// below comment for disable all terms checking
			// const valid:boolean = (declareCheckbox && agreeCheckbox && acceptCheckbox && validTwoHundredCoupon && validPrepaid);	
			const valid:boolean = declareCheckbox;	
			return valid;
		}, [declareCheckbox, agreeCheckbox, acceptCheckbox, extraTermList, twoHundredCoupon, prepaid])

    useEffect(() => {
		if (onSelectedTermCheckbox) {
			onSelectedTermCheckbox(!selectedTermCheckbox);
		}
	}, [selectedTermCheckbox, onSelectedTermCheckbox])	
    
    const handleCheckboxEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.preventDefault();
        event.stopPropagation();        
    }
    
    const onClickHandler = useCallback((link: string) => (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        window.open(link);
	}, []);

	const onChangeDeclareEvent = function(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
		setDeclareCheckbox(value);
	};

	const onChangeAgreementEvent = function(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
		setAgreeCheckbox(value);
    };
    
	const onChangeAcceptEvent = function(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
		setAcceptCheckbox(value);
	};

	const onChangeTwoHundredCouponEvent = function(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
		setTwoHundredCoupon(value);
	};

	const onChangePrepaid = function(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
		setPrepaid(value);
	};

	const declareControl = <CustomCheckbox checked={declareCheckbox} onChange={onChangeDeclareEvent}/>;
    const declareLabel   = intl.formatMessage({id: "footer.term.declare"}, {mobile: mobile});
    
    const agreeTermLink   = intl.formatMessage({id: "footer.term.agree-term-link"});
    const agreePrivacyLink   = intl.formatMessage({id: "footer.term.agree-privacy-link"});

    const agreeTerm = <span style={{color: '#f00'}}>{intl.formatMessage({id: "footer.term.agree-term"})}</span>;
	const agreePrivacy = <StyledTermLink onClick={onClickHandler(agreePrivacyLink)}>{intl.formatMessage({id: "footer.term.agree-privacy"})}</StyledTermLink>;
    const agreeControl = <CustomCheckbox checked={agreeCheckbox} onChange={onChangeAgreementEvent}/>;
    //const agreeLabel   = intl.formatMessage({id: "footer.term.agree"}, {term: agreeTerm}, {privacy: agreePrivacy});

    const values = {
        term  : agreeTerm,
        privacy : agreePrivacy
    };
    const agreeLabel   = <FormattedMessage id="footer.term.agree" values={values}/>;

    const acceptControl = <CustomCheckbox checked={acceptCheckbox} onChange={onChangeAcceptEvent}/>;
    const acceptLabel   = intl.formatMessage({id: "footer.term.accept"});

    const twoHundredCouponControl = <CustomCheckbox checked={twoHundredCoupon} onChange={onChangeTwoHundredCouponEvent}/>;
    const prepaidControl = <CustomCheckbox checked={prepaid} onChange={onChangePrepaid}/>;

    
    return (
        <StyledFormControlLabelWrapper className={classes.FormControlLabelWrapper}>
            <Box mb={1}><FormControlLabel control={declareControl} label={declareLabel} /></Box>
            {/* <Box mb={1}><FormControlLabel control={agreeControl} label={agreeLabel} /></Box> */}
            {/* <Box mb={1}><FormControlLabel control={acceptControl} label={acceptLabel} /></Box> */}
            {/* {extraTermList?.['200coupon'] && <Box mb={1}><FormControlLabel control={twoHundredCouponControl} label={intl.formatMessage({id: "footer.term.two-hundred-coupon"})} /></Box>} */}
            {/* {extraTermList?.prepaid && <Box mb={1}><FormControlLabel control={prepaidControl} label={intl.formatMessage({id: "footer.term.prepaid"})} /></Box>} */}
			{!isDelivery && <Box><CommonTerms isEng={isEng} /></Box>}
			{isDelivery && <Box><DeliveryTerms isEng={isEng} /></Box>}
        </StyledFormControlLabelWrapper>
    );
};

export default TermCheckbox;
