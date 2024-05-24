/*
use this as Recaptcha wrapper
easy to change to v3 Recaptcha
*/
import React, { useRef, useCallback, useMemo, useState, useLayoutEffect, useEffect, useContext } from 'react';
import AutoV2Recaptcha, { RecaptchaSize } from './AutoV2Recaptcha';

interface Props {
	onChange: (v: string|null)=>void;
	onRerender?: ()=>void;
	recaptchaSize?: RecaptchaSize;
}
function SimpleRecaptcha({ onChange, onRerender, recaptchaSize }: Props) {

	return <AutoV2Recaptcha recaptchaSize={recaptchaSize} onChange={onChange} onRerender={onRerender} />
}
export default SimpleRecaptcha;