import React, { useCallback, useMemo, useState, ReactNode, useEffect, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, Input, InputBase, Typography, useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import CtaButton from "@smt/button/CtaButton";
import RadioGroupControlTemplate, { RadioGroupControlTemplateProps } from "@smt/formControl/template/RadioGroupControlTemplate";
import { GetDeliveryData, GetStoreAPIResponse, GetStoreSingleData, StoreLabel } from "@smt/type/handsetPreOrder2023/api";
import { Locale, LocaleEN } from "@smt/type/common";
import { StyledSelectorHeading } from "../OrderDetails/PickUpSelector";
import { StoreData, StoreLocationProps } from "./StoreLocation";
import { createStoreCard } from "./StoreCard";
import StoreLocationDialog from "./StoreLocation";
import StyledTextButton from "@smt/component/button/TextButton";
import styled from "styled-components";
import { BsFillCheckCircleFill, CheckCircle, Pin } from "@smt/component/icon";
import { CheckButton } from "@smt/component/button";
import { ReviewData } from ".";
import SelectControlTemplate from "@smt/formControl/template/SelectControlTemplate";
import { SelectControlProps } from "@smt/formControl/input/SelectControl";
import { districtDividedByArea, districtList } from "@/constant/districts";
import { createCallbackValue } from "@smt/util/Callback";
import { CALLBACK_CLICK_SELECT_SECTION_BUTTON } from "@smt/type/callback";
import ApplicationContext from "@smt/context/ApplicationContext";

const StyledTextReverseButton = styled(StyledTextButton)`
	width: auto;
	padding: ${p => p.theme.spacing(.75)}px ${p => p.theme.spacing(1.5)}px;
	margin-top: ${p => p.theme.spacing(1)}px;
	border: 1px solid ${(p) => p.theme.palette.text.lighter};
	background: white;
	color: ${(p) => p.theme.palette.text.primary};
	${(p) => p.theme.breakpoints.up('md')} {	
		width: 140px;
		margin-top: 0;
		margin-left: ${p => p.theme.spacing(6)}px;
	}
`

export enum COLLECTION_METHOD_VALUE {
	PICKUP = 'pickup',
	DELIVERY = 'delivery'
}

const RadioGroupControlTemplateWith = RadioGroupControlTemplate<COLLECTION_METHOD_VALUE>;


interface CollectionMethodSelectorProps extends Omit<RadioGroupControlTemplateProps<COLLECTION_METHOD_VALUE>, "defaultLabelId" | "defaultLabelOptionalId"> {
	availableDelivery: CollectionMethodProps['availableDelivery'];
}
function CollectionMethodSelector(props: CollectionMethodSelectorProps) {
	const intl = useIntl();
	const { availableDelivery, ...rest } = props;

	const isDisable = (availableDelivery.quota === false && availableDelivery.canDelivery === true) && availableDelivery.deliveryPeriod === true;
	const isNotavailableDelivery = (availableDelivery.canDelivery === false || availableDelivery.deliveryPeriod === false);

	const options: Array<{value: COLLECTION_METHOD_VALUE, title: ReactNode, disabled: boolean}> = [{
		value: COLLECTION_METHOD_VALUE.PICKUP,
		title: intl.formatMessage({id: "formControl.option.pickup"}),
		disabled: false
	},{
		value: COLLECTION_METHOD_VALUE.DELIVERY,
		title: intl.formatMessage({id: "formControl.option.delivery"}) + (isDisable ? ' (' + intl.formatMessage({id:"no-quota-for-delivery"}) + ')' : ''),
		disabled: isDisable
	}];

	if (isNotavailableDelivery) {
		// remove delivery radio button
		options.pop()
	}
	return <RadioGroupControlTemplateWith
			options={options}
			{...rest}
			/>;
}

const StyledCheckButton = styled(CheckButton)`
	cursor: pointer;
	min-width: 28px;
	${(p) => p.theme.breakpoints.up('md')} {	
	}
`;

function CheckIcon({checked}: {checked: boolean}) {
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	return <StyledCheckButton checked={checked} onClick={()=>{}} size={38}>
		{checked && <BsFillCheckCircleFill color="#f00" size={32} />}
	</StyledCheckButton>
}

export interface CollectionMethodProps {
	storeData?: GetStoreAPIResponse;
	onChangeMethod?: (pid: string, v: ReviewData[keyof ReviewData]) => void;
	pid?: string;
	availableDelivery: Pick<GetDeliveryData, 'canDelivery'|'quota'|'deliveryPeriod'>;
	data: ReviewData|null
}
const StyledUnorderedList = styled.ul`
	padding-left: 22px;
	margin-bottom: 0;
`
const StyledListItem = styled.li`
	padding-bottom: ${p => p.theme.spacing(1)}px;

	&:last-child {
		padding-bottom: 0;
	}
`
const StyledListItemBold = styled(StyledListItem)`
	font-weight:500;
	font-size:${p => p.theme.typography.body2.fontSize};
`
const StyledListItemHighlight = styled(StyledListItem)`
	color: #ff0000;
	list-style: none;
	margin:  ${p => p.theme.spacing(4)}px 0 ${p => p.theme.spacing(1)}px -${p => p.theme.spacing(1)}px;
`
const StyledListItemHighlightImage = styled.img`
	width: 23px;
	margin-right:5px;
	vertical-align: sub;
`;
const StyledMethodHeading = styled(StyledSelectorHeading)`
	font-size: 1.8rem;
	margin-bottom: 0;
`
export default function CollectionMethod(p: CollectionMethodProps) {
	const { storeData, onChangeMethod, pid='unknown', availableDelivery, data } = p;
	const applicationContext = useContext(ApplicationContext);
    const domain = applicationContext?.url?.domain;
	const deliveryNotAvailable = availableDelivery.canDelivery === false || availableDelivery.quota === false || availableDelivery.deliveryPeriod === false;
	const initialCollectionMethod = deliveryNotAvailable ? COLLECTION_METHOD_VALUE.PICKUP : data?.[pid]?.[0] ?? COLLECTION_METHOD_VALUE.PICKUP;
	const initialPickupStore = data?.[pid]?.[1] ?? null;
	const initialDeliveryDistrict = data?.[pid]?.[2] ?? null;
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const [collectionMethod, setCollectionMethod] = useState<COLLECTION_METHOD_VALUE | null>(initialCollectionMethod);
	const [pickupStore, setPickupStore] = useState<string|null>(initialPickupStore);
	const [deliveryDistrict, setDeliveryDistrict] = useState<string|null>(initialDeliveryDistrict)
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const changeCollectionMethodHandler = useCallback((event, value) => {
		setCollectionMethod(value)
	}, [])
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);

	// https://v4.mui.com/api/radio-group/
	const radioGroupProps: CollectionMethodSelectorProps["radioGroupProps"] = {
		onChange: changeCollectionMethodHandler,
		value: collectionMethod,
		row: false
	}

	// https://v4.mui.com/api/radio/
	const radioProps: CollectionMethodSelectorProps["radioProps"] = {
		icon: <CheckIcon checked={false} />,
		checkedIcon: <CheckIcon checked={true} />
	};
	const storeLocationTabPropsData = useMemo(() => getStoreLocationTabProps(locale, storeData), [locale, storeData]);
	const showStoreLocationDialog = openDialog && 
		collectionMethod === COLLECTION_METHOD_VALUE.PICKUP && 
		storeLocationTabPropsData !== undefined;
	const storeLocationProps: StoreLocationProps = {
		tabProps: {
			data: storeLocationTabPropsData,
			value: pickupStore,
			getSelectedStore: setPickupStore
		}
	}
	const dialog = {
		open: () => setOpenDialog(true),
		close: () => setOpenDialog(false)
	}

	const onClickChangeStore = () =>{
		dialog.open();
		onClickSelectStoreCallback(0);
	}

	const onClickConfirmStore = () =>{
		dialog.close();
		onClickSelectStoreCallback(1);
	}

	const onClickSelectStoreCallback = (buttonNum : number) => {
        if (applicationContext?.eventCallback) {
            applicationContext.eventCallback(createCallbackValue(CALLBACK_CLICK_SELECT_SECTION_BUTTON, buttonNum))
        }
    }

	const SelectedStoreData =  useCallback(() => {
		if ((storeData === undefined || pickupStore === null)) {
			return null
		}
		const _data = createStoreCard(localizeStore(locale === LocaleEN, storeData[pickupStore]));
		return <Box flexGrow={1}>
			<Typography variant="body2" component="div" style={{fontSize: '1.6rem', fontWeight: 400}}>{_data.district}</Typography>
			<Box pt={1} display="flex" alignItems="center" justifyContent="flex-start">
				<Box pr={1}>
					<Pin width={12} height={16} />
				</Box>
				<Box>
					<Typography variant="body1">{_data.address}</Typography>
				</Box>
			</Box>
		</Box>
	}, [pickupStore])
	useEffect(() => {
		if (onChangeMethod === undefined) {
			return 
		}
		if (collectionMethod !== null) {
			const _deliveryDistrict = deliveryDistrict?.split('|')[0] ?? null;
			onChangeMethod(pid, [collectionMethod, pickupStore, _deliveryDistrict])
		}
	}, [onChangeMethod, collectionMethod, pickupStore, pid, deliveryDistrict])
	

	return <>
		<div>
			{/* <Box pb={1}>
				<StyledMethodHeading>{intl.formatMessage({id:"collectionMethod"})}</StyledMethodHeading>
			</Box> */}
			<CollectionMethodSelector radioGroupProps={radioGroupProps} radioProps={radioProps} availableDelivery={availableDelivery} />
		</div>
		<div>
			{collectionMethod === COLLECTION_METHOD_VALUE.PICKUP && <>
				<StyledMethodHeading mt={4} mb={1}>
					<Typography variant="h6" component="div">{intl.formatMessage({id:"pickup_at"})}</Typography>
				</StyledMethodHeading>
				<Box display="flex" flexDirection="row" alignItems="center" justifyContent={isDesktop ? "space-between" : "flex-start"} flexWrap={isDesktop ? "nowrap" : "wrap"} >
					<SelectedStoreData />
					<Box align-self="flex-start">
						{pickupStore === null ? 
							<StyledTextButton onClick={onClickChangeStore}>
								<FormattedMessage id="select_store"/>
							</StyledTextButton>
							: <StyledTextReverseButton onClick={onClickChangeStore}>
								<Typography variant="body1" component="div">
									<FormattedMessage id="change_store"/>
								</Typography>
							</StyledTextReverseButton>
						}
						</Box>
				</Box>
			</>}
			{collectionMethod === COLLECTION_METHOD_VALUE.DELIVERY && <>
				<Box mt={2} mb={1}>
					{/* <Box mb={.5}>
						<Typography variant="body1" component="div">
							<FormattedMessage id="district"/>
						</Typography>
					</Box> */}
					<Box width="100%" maxWidth={375}>
						<DeliveryDistrictInput onChangeValue={setDeliveryDistrict} value={deliveryDistrict ?? ''} data={districtList} fullWidth={true} />
					</Box>
				</Box>
				<Typography variant='body1' component="div">
					<StyledUnorderedList>
						<StyledListItemHighlight ><StyledListItemHighlightImage src={domain+"/IMG_V3/common/icon_remark_light.png"} />{intl.formatMessage({id:"delivery-terms.term1"})}</StyledListItemHighlight>
						<StyledListItem >{intl.formatMessage({id:"delivery-terms.term2"})}</StyledListItem>
						<StyledListItem>{intl.formatMessage({id:"delivery-terms.term3"})}</StyledListItem>
						<StyledListItem >{intl.formatMessage({id:"delivery-terms.term4"})}</StyledListItem>
						<StyledListItem dangerouslySetInnerHTML={{__html: intl.formatMessage({id:"delivery-terms.term5"})}}></StyledListItem>
					</StyledUnorderedList>
				</Typography>
			</>}
		</div>
		<div>
			<StoreLocationDialog show={showStoreLocationDialog} onClose={onClickConfirmStore} {...storeLocationProps} />
		</div>
	</>
}

export const localizeStore = (isEng: boolean, v: GetStoreSingleData<string>) => {
	return {
		dis: isEng ? v.disEng : v.disChi,
		add: isEng ? v.addEng : v.addChi,
		reg: isEng ? v.regEng : v.regChi,
		time: isEng ? v.timeEng : v.timeChi,
		shopId: v.shopID,
		label: v.label
	}
}

const getStoreLocationTabProps = (locale: Locale, data?: GetStoreAPIResponse): StoreLocationProps['tabProps']['data'] => {
	if (data === undefined) {
		return {}
	}
	const isEng = locale === LocaleEN;
	const districtMap = isEng ? ['Hong Kong', 'Kowloon', 'New Territories'] : ['香港', '九龍', '新界'];
	const reg = isEng ? 'regEng' : 'regChi';
	const {shopList, ...stores} = data;
	const output: StoreLocationProps['tabProps']['data'] = {};
	const districtMap0 = districtMap[0],
				districtMap1 = districtMap[1],
				districtMap2 = districtMap[2]
	output[districtMap0] = [];
	output[districtMap1] = [];
	output[districtMap2] = [];
	Object.values(stores).forEach((storeData) => {
		if (storeData[reg] === districtMap0) {
			output[districtMap0].push(localizeStore(isEng, storeData));
		}
		if (storeData[reg] === districtMap1) { 
			output[districtMap1].push(localizeStore(isEng, storeData));
		}
		if (storeData[reg] === districtMap2) {
			output[districtMap2].push(localizeStore(isEng, storeData)); 
		}
	})
	return output
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
interface DeliveryDistrictInputProps<T> {
	onChangeValue: (v: T) => void;
	value: T;
	data: typeof districtList;
	fullWidth?: boolean;
}

export const DeliveryDistrictInput: React.FC<DeliveryDistrictInputProps<string>> = ({onChangeValue, value, data, fullWidth}) => {
	if (data === undefined) {
		return null
	}
	const intl = useIntl();
	const locale = intl.locale as Locale;
	const isEng = locale === LocaleEN;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const selectProps: SelectControlProps<string>['selectProps'] = {
		onChange: (event: React.ChangeEvent<{value: string}>) => {
			onChangeValue(event.target.value)
		},
		value,
		input: <StyledInput />
	}
	const options = getOfferOptions(isEng, data);
	return <>
		<SelectControlTemplate selectProps={selectProps} optionGroups={options} defaultOption={intl.formatMessage({id:"please-select"})} fullWidth={fullWidth} />
	</>
}

const createDistrictOptions = (isEng: boolean, data: {value: string, label_en: string, label_tc: string} ) => {
	const { value, label_en, label_tc } = data;
	return {
		title: isEng ? label_en : label_tc,
		value: value.split('|')[0]
	}
}

const getOfferOptions = (isEng: boolean, data: typeof districtList) => {
	const areas = ['Hong Kong', 'Kowloon', 'New Territories', 'Outlying Islands'];
	const areasTC = ['香港', '九龍', '新界', '離島'];
	return areas.map((area, index) => {
		const options = data
			.filter(district => district.value.split('|')[1] === area)
			.map(district => createDistrictOptions(isEng, district))
		return {
			title: isEng?area:areasTC[index],
			options,
		}
	});
};