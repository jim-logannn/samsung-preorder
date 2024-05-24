import { InputBase, useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import { SelectOptionData } from "@smt/data/formControl/FormControlData";
import { SelectControlProps } from "@smt/formControl/input/SelectControl";
import SelectControlTemplate from "@smt/formControl/template/SelectControlTemplate";
import { useFormWatcher } from "@smt/hook/InputHook";
import { GetCouponData } from "@smt/type/handsetPreOrder2023/api";
import { OfferValue } from "@smt/type/handsetPreOrder2023/fulfillment";
import { validateText } from "@smt/validator/InputValidator";
import React, { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { OrderFormProps, StyledInputHeading } from "../FulfillmentMain/OrderForm";
import { OPT_TERMS, PaymentCaseContext } from "../FulfillmentMain/PaymentCaseProvider";
import { StyledSelectorHeading } from "../OrderDetails/PickUpSelector";

export interface OfferSelectorProps {
	data: OrderFormProps['voucher'];
	value: OfferValue;
	onChangeValue?: (v:OfferValue) => void
}

export default function OfferSelector({data, value: offer, onChangeValue: onChangeOffer}: OfferSelectorProps) {
	if (data === undefined || data.length <= 0) {
		return null
	}
  const intl = useIntl();
	const {setExtraTerm} = useContext(PaymentCaseContext);
	const getSelectedOffer: OfferSelectInputProps<typeof offer>['onChangeValue'] = (value: typeof offer) => {
		if (onChangeOffer === undefined) {
			return
		}
		setExtraTerm(OPT_TERMS.TWO_HUNDRED_COUPON, value === 'IP15_HS_$200_Dis')
		onChangeOffer(value);
	}
  return (
    <>
      <StyledInputHeading>
        {intl.formatMessage({id:"handset-discount-offer"})}
      </StyledInputHeading>
			<OfferSelectInput onChangeValue={getSelectedOffer} value={offer} couponData={data} />
    </>
  );
}


type OfferOptions = SelectControlProps<OfferValue>['options'];

interface OfferSelectInputProps<T> {
	onChangeValue: (v: T) => void;
	value: T;
	couponData: Array<GetCouponData>;
}

const StyledInput = withStyles((theme) => ({
	root: {
		width: '100%',
		padding: '12px 8px',
		borderRadius: '30px',
		background: '#eee'
	},
	input: {
		paddingLeft: '8px',
		fontWeight: 'bold'
	}
}))(InputBase)

const OfferSelectInput: React.FC<OfferSelectInputProps<OfferValue>> = ({onChangeValue, value, couponData}) => {
	const intl = useIntl();
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const [error] = useFormWatcher('offer', validateText, true, value)
	const {getCouponOption} = useContext(PaymentCaseContext);
	const options = getCouponOption(getOfferOptions(couponData) ?? []);
	const selectProps: SelectControlProps<OfferValue>['selectProps'] = {
		onChange: (event: React.ChangeEvent<{ value: OfferValue }>) => {
			onChangeValue(event.target.value)
		},
		value: value ?? options?.[0]?.value,
		input: <StyledInput />,
		fullWidth: true
	}
	return <SelectControlTemplate selectProps={selectProps} options={options} defaultOption={intl.formatMessage({id:"please-select"})} fullWidth={true} disabled={options.length < 0} error={error} helperText={error ? intl.formatMessage({id:"please-select"}) : undefined} />
}

const createOfferOptions = (data: GetCouponData): SelectOptionData<OfferValue> => {
	const { masterCouponId } = data;
	return {
		title: <FormattedMessage id={`coupons.${masterCouponId}`} />,
		value: masterCouponId
	}
}

const getOfferOptions = (data: Array<GetCouponData>): OfferOptions => {
	return data.map(coupon => createOfferOptions(coupon));
};