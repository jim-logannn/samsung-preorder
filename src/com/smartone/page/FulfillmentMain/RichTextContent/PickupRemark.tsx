import MarkDownContent from '@/plugin/reactMarkdown';
import React, { useMemo } from 'react';
import styled from 'styled-components';

// https://remarkjs.github.io/react-markdown/
// https://commonmark.org/help/
const TC = `
* 為更方便客戶於取機首日輕鬆領取iPhone，我們特別於九月廿二日延長7間指定門市之營業時間至晚上11時。
> 7間指定門市為：中環國際金融中心商場、銅鑼灣怡和街、觀塘APM、葵涌新都會廣場、沙田新城市廣場、屯門市廣埸及元朗形點二期
* 你需按照取機日期及時段，到已選擇的門市取機
* 如選擇網上付款但未能親身取機，可填妥並簽署 [「委託代領授權書」](#{{outapp}}https://www.smartone.com/hk/TC/third-party-auth-form) 授權他人代領。代領人需於取機時攜同本人的香港身份證/護照及委託代領授權書之正本 、用作訂購之信用卡正面副本、PayMe、支付寶(香港)或WeChat Pay HK交易紀錄的螢幕截圖，及出示訂單之取機二維碼。
* 如你未能於預約日期及時段取機，你需與 [WhatsApp專員](#{{whatsapp}}) 聯絡，我們會按產品供應為你重新輪候取機
`
const EN = `
* For a more convenient and hassle-free pickup experience on the first day, we have specially extended the operating hours of 7 designated stores until 11:00p.m. on 22 September.
> The 7 designated stores are: ifc, Central; Yee Wo Street, Causeway Bay; APM, Kwun Tong; Metroplaza, Kwai Chung; New Town Plaza, Shatin; Tuen Mun Town Plaza, Tuen Mun and YOHO Mall II, Yuen Long
* Please pick up your iPhone at the selected date, timeslot and store.
* If you choose to pay online but are unable to pick up the phone in person, you can fill in and sign the [“Authorisation letter”](#{{outapp}}https://www.smartone.com/hk/EN/third-party-auth-form) to authorise a representative to pick up the phone on your behalf. The authorised person is required to present his/her original HKID/Passport, the original authorisation letter and photocopy of the front side of the credit card or the screen captured image of PayMe / AlipayHK / WeChat Pay HK transaction details used for payment of the pre-order, and the QR code for phone pickup.
* If you are unable to pick up the phone at the scheduled date and timeslot, you will be requeued and you will have to contact our [WhatsApp Assistant](#{{whatsapp}}) for arrangement. Pickup date is subject to product supply
`
const PickupRemark: React.FC<{isEng: boolean}> = (p) => {
	const {isEng} = p;
	const content = useMemo(() => {
		return isEng ? EN : TC
	}, [])
	return content ? <MarkDownContent className={"linkControl"} markdown={content} /> : <></>
} 
export default PickupRemark;