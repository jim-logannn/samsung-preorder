import MarkDownContent from '@/plugin/reactMarkdown';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// https://remarkjs.github.io/react-markdown/
// https://commonmark.org/help/
const greenCodeTC = `
* 選擇於門市付款將不能享網上付款優惠 – 送2日亞太區漫遊數據多日通。
* 如你未能於預約時段到門市付款及取機，我們會按產品供應重新安排取機。
* 為了讓你能儘早取得iPhone，我們建議你於網上進行付款，

  15分鐘店內完成取機 ，為你節省更多時間。
`
const greenCodeEN = `
* The online payment exclusive offer - FREE 2-day APAC Multi-Day Roaming Data Pack is not available for payments made in stores. 
* If you are unable to pick up the phone and pay in store at the scheduled date and timeslot, you will be requeued automatically. Pickup date is subject to product supply.
* To get the iPhone sooner and save time, we recommend paying online to pick up the phone in store within 15 minutes.
`
const orangeCodeTC = `
* 如你未能於預約時段到門市付款及取機，我們會按產品供應重新安排取機。
* 為了讓你能儘早取得iPhone，我們建議你於網上進行付款，

  15分鐘店內完成取機 ，為你節省更多時間 。
`
const orangeCodeEN = `
* If you are unable to pick up the phone and pay at store at the scheduled date and timeslot, you will be requeued automatically. Pickup date is subject to product supply.
* To get the iPhone sooner and save time, we recommend paying online to pick up the phone in store within 15 minutes.
`
const ReminderContent: React.FC<{code: 'G'|'O', isEng: boolean}> = (p) => {
	const {code, isEng} = p;
	const content = useMemo(() => {
		if(code === 'G') {
			return isEng ? greenCodeEN : greenCodeTC
		}
		if(code === 'O') {
			return isEng ? orangeCodeEN : orangeCodeTC
		}
	}, [])
	return content ? <MarkDownContent markdown={content} /> : <></>
} 
export default ReminderContent;