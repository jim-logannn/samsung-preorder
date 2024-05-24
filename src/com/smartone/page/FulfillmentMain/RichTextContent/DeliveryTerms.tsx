import MarkDownContent from '@/plugin/reactMarkdown';
import { Box, Typography } from '@material-ui/core';
import { LightBulb } from '@smt/component/icon';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// https://remarkjs.github.io/react-markdown/
// https://commonmark.org/help/
const TCWithIcon = `
你所購買的 iPhone 會在送貨前開盒及完成啟動程序
`
const TC = `
* 如你已選用 iPhone for Life 計劃或分期付款，將不能享送貨上門
* 送貨地區並不包括選項以外地區
* [送貨服務條款及細則](#{{outapp}}https://order.smartone.com/pdf/iPhone15-Delivery-TC_TC.pdf)
`
const ENWithIcon = `
Your iPhone will be unboxed and activated before shipping
`
const EN = `
* Delivery is not available if you have selected iPhone for Life or instalment plan
* Delivery districts do not include areas outside the available options
* Delivery Service [Terms and Conditions](#{{outapp}}https://order.smartone.com/pdf/iPhone15-Delivery-TC_EN.pdf)
`
const DeliveryTerms: React.FC<{isEng: boolean}> = (p) => {
	const {isEng} = p;
	const withIcon = useMemo(() => {
		return isEng ? ENWithIcon : TCWithIcon
	}, [])
	const content = useMemo(() => {
		return isEng ? EN : TC
	}, [])
	const FirstTerm = () => <>
		<Box display="flex" alignItems="center">
			<Box pr={1}>
				<LightBulb />
			</Box>
			<MarkDownContent markdown={withIcon} style={{color: 'red'}} />
		</Box>
	</>
	return  <>
		<FirstTerm />
		<MarkDownContent className={"linkControl"} markdown={content} />
	</>
} 
export default DeliveryTerms;