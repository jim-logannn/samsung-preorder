/*
this is to handle responsive and lang
props is same as ReCAPTCHA, omitted 'hl', 'size' and 'sitekey'
*/
import React, { useMemo, useState, useLayoutEffect, useEffect, useContext } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'; // Google reCAPTCHA v2.
import { useIntl } from 'react-intl';
import { getLangFromLocale } from '../lang/Lang';
import { useTheme, useMediaQuery } from '@material-ui/core';
import ApplicationContext from '../context/ApplicationContext';
import { isBlank } from "@smt/util/StringUtils";

export type RecaptchaSize = "normal" | "compact";
interface IReCAPTCHA extends React.ClassAttributes<ReCAPTCHA>, ReCAPTCHAProps {	
}
interface Props extends Omit<IReCAPTCHA, 'hl' | 'size' | 'sitekey'>  {	
	onRerender?: ()=>void;
	recaptchaSize?: RecaptchaSize
}
const AutoV2Recaptcha = React.forwardRef(({ recaptchaSize, onRerender, ...props }: Props, ref: React.MutableRefObject<ReCAPTCHA|null>) => {
	const applicationContext = useContext(ApplicationContext);

	const intl = useIntl();
	const lang = getLangFromLocale(intl.locale);

	const theme     = useTheme();
	// useMediaQuery, if not provide default value, its default value is false.
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { 
		defaultMatches: window.matchMedia("(min-width:" + theme.breakpoints.values.md + "px)").matches 
	});
	
	const size = recaptchaSize ? recaptchaSize : (isDesktop ? "normal" : "compact"); 
	const hl = ("tchinese" ==lang) ? "zh-HK" : "en" ;
	const [ lastSize, setLastSize ] = useState<RecaptchaSize>(size);

	const sitekey = applicationContext?.google?.recaptcha?.v2?.siteKey;

	if(isBlank(sitekey)) {
		console.warn("AutoV2Recaptcha: siteKey is blank");
	}

	useEffect(() => {
		if(size) {
			// when size is changed, ReCAPTCHA should be re-rendered
			if(size != lastSize) {
				setLastSize(size);
				if(props.onChange) {
					props.onChange(null);
				}
				if(onRerender) {
					onRerender();
				}
			}
		}
	}, [ size, lastSize, props.onChange, onRerender ]);

	return (
		<React.Fragment>
			{(sitekey) && (size == "compact") && <ReCAPTCHA ref={ref} sitekey={sitekey} size="compact" {...props} hl={hl}/>}
			{(sitekey) && (size == "normal")  && <ReCAPTCHA ref={ref} sitekey={sitekey} size="normal" {...props} hl={hl}/>}
		</React.Fragment>
	)
});
export default React.memo(AutoV2Recaptcha);