import React from 'react';
import Page from '@smt/page/Base';
import LeadIn from './LeadIn';
import SelectPhone, { SelectPhoneProps } from './SelectPhone';
import FootNote from './FootNote';
import Voucher from '@smt/component/voucher/Voucher';
import { StyleVoucher } from '../Base/Style';

export interface PhoneSelectorProps extends SelectPhoneProps {
	onClickBackButton?:() => void;
}

const PhoneSelector = ({onClickBackButton, quota, voucherData, ...rest}:PhoneSelectorProps) => {
	return <Page>
		<Page.Header>
			<LeadIn voucherData={voucherData} />
		</Page.Header>
		<Page.Voucher>
			<StyleVoucher>
				<Voucher quota={quota} voucherData={voucherData} />
			</StyleVoucher>
		</Page.Voucher>
		<Page.Body>
			<SelectPhone quota={quota} voucherData={voucherData} {...rest}/>
		</Page.Body>
		<Page.Footer>
			<FootNote onClickBackButton={onClickBackButton}/>
		</Page.Footer>	
	</Page>
}

export default PhoneSelector;