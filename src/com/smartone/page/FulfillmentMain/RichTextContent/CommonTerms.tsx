import MarkDownContent from '@/plugin/reactMarkdown';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// https://remarkjs.github.io/react-markdown/
// https://commonmark.org/help/
const TC = `
* [條款及細則](#{{outapp}}https://order.smartone.com/jsp/smartpass/tchinese/fulfill-terms-n-conditions.jsp)
`
const EN = `
* [Terms and Conditions](#{{outapp}}https://order.smartone.com/jsp/smartpass/english/fulfill-terms-n-conditions.jsp)
`

const CommonTerms: React.FC<{isEng: boolean}> = (p) => {
	const {isEng} = p;
	const content = useMemo(() => {
		return isEng ? EN : TC
	}, [])
	return content ? <MarkDownContent className={"linkControl"} markdown={content} /> : <></>
} 
export default CommonTerms;