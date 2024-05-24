import React from 'react';
import Page from '@smt/page/Base';
import { SelectedPhoneData } from '../PhoneSelector/SelectPhone';
import SectionHeader from './SectionHeader';
import { useIntl } from 'react-intl';
import PickUpSelector, { PickUpInfoState } from './PickUpSelector';
import { PlanReviewData } from '@smt/type/mobilePlan';
import { MainControllerProps, OrderStep } from '@smt/page/Main/MainController';

export interface OrderDetailsProps {
	selectedPhoneData: SelectedPhoneData;
	selectedPlanData: PlanReviewData;
	selectedTermCheckbox?: boolean;
	editButtonFn: (v: OrderStep) => void;
	onRecaptchaExpired: ()=>void;
	setRecaptcha:(v:string|null) =>void;
	storeData: MainControllerProps['storeData'];
	onChangePickupInformationData: (v: PickUpInfoState | undefined) => void;
	disableSubmitButton: boolean;
	onClickSubmitButton: ()=>void;
	onSelectedTermCheckbox:(v:boolean) => void;
	onClickBackButton: ()=>void;
}

const OrderDetails = ({ selectedPhoneData, selectedPlanData, selectedTermCheckbox=false, onRecaptchaExpired, setRecaptcha, editButtonFn, storeData, onChangePickupInformationData, disableSubmitButton, onClickSubmitButton, onSelectedTermCheckbox, onClickBackButton }: OrderDetailsProps) => {
	const intl = useIntl();
	return <Page>
		<Page.Body>
			<SectionHeader title={intl.formatMessage({ id: "review.selected-model" })} editButtonFn={editButtonFn} editStep={OrderStep.STEP_SELECT_IPHONE}/>
			<SectionHeader title={intl.formatMessage({ id: "review.pick-up-review" })} />
			<PickUpSelector storeData={storeData} onChangePickupInformationData={onChangePickupInformationData} />
			<SectionHeader title={intl.formatMessage({ id: "review.more-information.title" })} />
		</Page.Body>
	</Page>
}

export default OrderDetails