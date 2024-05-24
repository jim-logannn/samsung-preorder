import React, { useContext, useMemo, useState, useCallback, Children, useEffect, useRef, useLayoutEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { getLangFromLocale } from '@smt/lang/Lang';
import ApplicationContext from '@smt/context/ApplicationContext';
import { formatPrice, formatTB } from '@smt/util/StringUtils';
import { Locale, LocaleEN } from '@smt/type/common';
import Popover from '@material-ui/core/Popover';
import { useMediaQuery, useTheme } from '@material-ui/core';
export const IMAGE_PATH = "iPhone15/common/";

const StyledSelectPhoneContainer = styled.div`
`

interface iPhoneOrder {
	title_img: string;
	order: string [][];
}
interface iPhoneBuyNowOrder {
	iphone_model: string;
	order: string [];
}
export interface iPhoneOrderData {
	capacity: number;
	color_chi: string;
	color_eng: string;
	img_prefix: string;
	model_code: string;
	name_chi: string;
	name_eng: string;
	product_code: string;
	price: number;
	screen_size: number;
	hsid: number;
	prepay_amount: number;
	iphone_model: string;
	//ret_price: Record<string, number>;
}
interface SelectPhoneDesktopProps{
	quota: number;
	handsetGroupData:handsetGroupDataRecord;
	currentTab:number;
	selectModel:iPhoneOrderData[];
	onClickPhoneTab:(e:number)=>void;
	onClickSelectPhone: (data:iPhoneOrderData, action:SelectAction, event: React.MouseEvent<HTMLElement>)=>void;
}
interface SelectPhoneOptionProps {
	quota: number;
	handsetData: handsetGroupDataRecord["handset_data"];
	buyNowModels?: iPhoneBuyNowOrder[];
	models?: string[];
	selectModel:iPhoneOrderData[];
	onClickOption: (data:iPhoneOrderData, action:SelectAction, event: React.MouseEvent<HTMLElement>)=>void;
}
export interface handsetGroupDataRecord {
	handset_data: Record<string, iPhoneOrderData>;
	handset_order: iPhoneOrder[];
	buy_now_order: iPhoneBuyNowOrder[];
}
export interface SelectPhoneProps {	
	quota: number;
	handsetGroupData: handsetGroupDataRecord;
	onSelectedPhoneOption?: (v: SelectedPhoneData) => void;
	selected?: SelectedPhoneData;
}
export type SelectedPhoneData = iPhoneOrderData [];

enum SelectAction {
	ADD = "add",
	REMOVE = "remove"
}
//
const StyledPhoneGroupContainer = styled.div`
	display: flex;
	justify-content: flex-start;
    align-items: flex-start;
    flex-flow: wrap;
	width: 100%;
	padding: ${p => p.theme.spacing(3)}px ${p => p.theme.spacing(2)}px;	
	margin-bottom: ${p => p.theme.spacing(4)}px;
	box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
	background: #fff;
	transform-origin: top;
	box-sizing: border-box;
	border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
	${(p) => p.theme.breakpoints.up('md')} {	
		width: 100%;
		margin-bottom: ${p => p.theme.spacing(4)}px;
	}
`
const StyledPhoneOptionTabContainer = styled.div`
	overflow: hidden;
	display: flex;	
	padding-top: ${p => p.theme.spacing(1)}px;
	flex-flow: row nowrap;
	align-items: end;
`;
const StyledPhoneOptionTabQuantity = styled.div`
	margin-left: ${p => p.theme.spacing(1)}px ;
	width: ${p => p.theme.spacing(3)}px ;
	height: ${p => p.theme.spacing(3)}px ;
	background: ${p => p.theme.palette.primary.main};	
	color: #fff;
	${p => p.theme.typography.body1};
	border-radius: 50%;
	display: flex;
	justify-content: center;
    align-items: center;
    line-height: 1;
	${(p) => p.theme.breakpoints.down('md')} {
		margin-left: 2px ;
		width: ${p => p.theme.spacing(2)}px ;
		height: ${p => p.theme.spacing(2)}px ;	
		font-size: 1rem;
	}
`;
const StyledPhoneOptionTabTitle = styled.div<{selected:boolean;}>`	
	${p => p.theme.typography.h6};
	position:relative;
	text-align:center;
	font-size:1.4rem;
	&:after {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		width: 80%;
		bottom: -10px;
		content: "";
		height: 2px;
		background: ${(p) => p.theme.palette.primary.main};
	}
	${props => props.selected ? "" : "&:after {display:none}"}
	${(p) => p.theme.breakpoints.up('md')} {	
		font-size: 2.4rem;
	}
`;
const StyledPhoneOptionTab = styled.div<{selected:boolean;}>`	
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(1)}px;
	flex: 1 1 auto;
	cursor: pointer;	
	position: relative;
	box-sizing: content-box;	    
	&:first-child:before {
		display:none;
	}
	&:last-child:after {
		display:none;
	}
	&:first-child {
		border-top-left-radius: 15px;
	}
	&:last-child {
		border-top-right-radius: 15px;
	}	
	&:before, &:after {
		position: absolute;
		bottom: 0;
		width: 20px;
		height: 20px;
		content: " ";
		z-index: 1;
	}
	&:before {
		left: -20px;
		border-bottom-right-radius: 18px;	
		z-index: 1;
		box-shadow: 6px 6px 0 #FFF;
	}
	&:after {
		right: -20px;
		border-bottom-left-radius: 18px;	
		box-shadow: -6px 6px 0 #FFF;
	}
	${props => props.selected ? "z-index:1;box-shadow: 0px -3px 4px 0px #00000010;background: #fff;border-top-left-radius: 15px;border-top-right-radius: 15px;padding: 20px 8px;" : "background: #E2E2E2;color: #9E9E9E;padding: 14px 8px 16px;&:before{display:none;};&:after{right: -2px;box-shadow: none;height: 55%;width: 1px;background: #ccc;top: 25%;border: 0;} text-decoration: none;"}
`;
const StyledPhoneImageContainer   = styled.div`
	text-align: center;
`;
const StyledPhoneCapacityContainer   = styled.div`
`;
const StyledPhoneContainer  = styled.div`
	display: flex;
    flex-flow: wrap;
	justify-content: center;
	margin: ${p => p.theme.spacing(3)}px;
	flex-basis: calc((100% / 3 ) - (24px * 2));
	${(p) => p.theme.breakpoints.down('md')} {	 
		flex-flow: row;
		flex-basis: 100%;
		align-items: center;
		margin: 0 0 ${p => p.theme.spacing(3)}px 0;
		padding-bottom: ${p => p.theme.spacing(3)}px;
		border-bottom: 1px solid #ccc;
		&:last-child {
			margin: 0;
			padding-bottom: 0;
			border-bottom: none;
		}
	}
`;
const StyledPhoneImage = styled.img`
	margin: 0 ${p => p.theme.spacing(1)}px 0 0;
	width: 100%;
    max-width: 200px;
    min-width: 130px;
	${(p) => p.theme.breakpoints.up('md')} {		
		margin: ${p => p.theme.spacing(1)}px 0;
		width: 100%;
		max-width: auto;
    	min-width: auto;
	}
`
const StyledPhoneColor = styled.div`
	${p => p.theme.typography.body2};
	margin: ${p => p.theme.spacing(1)}px 0 0;	
	${(p) => p.theme.breakpoints.up('md')} {		
		margin: ${p => p.theme.spacing(1)}px 0;	
	}
`
const StyledPhoneSelectionContainer  = styled.div`
	display: flex;
	width: 100%;
	margin: ${p => p.theme.spacing(2)}px 0 0;
    justify-content: center;
	${(p) => p.theme.breakpoints.down('md')} {	
		&:first-child {
			margin: 0;
		}
	}
`;
const StyledPhoneCapacity = styled.div`
	display: flex;
    align-items: center;
	flex: 1 1 auto;
    justify-content: center;
	flex-flow: column;
	margin: 0 ${p => p.theme.spacing(1)}px 0 0;
	background: #f6f6f6;
    padding: ${p => p.theme.spacing(1)}px ${p => p.theme.spacing(2)}px;
	border-radius: ${p => p.theme.spacing(1)}px;
	${p => p.theme.typography.body1};
	${(p) => p.theme.breakpoints.down('md')} {	
		padding: ${p => p.theme.spacing(1)}px;
	}
`
const StyledPhonePrice = styled.div`
	${p => p.theme.typography.body1};
	color: #9C9C9C;
	font-size: 1.2rem;
	${(p) => p.theme.breakpoints.up('md')} {	
		font-size: 1.2rem;
	}
`
const StyledPhoneSelection  = styled.div`
	display:flex;
	border-radius: ${p => p.theme.spacing(1)}px;
	border: 1px solid #d3d3d3;
	padding: ${p => p.theme.spacing(1)}px;
	align-items: center;
	justify-content: center;
	${(p) => p.theme.breakpoints.up('md')} {	
		width:135px;
	}
`;
const StyledPhoneSelectionBuyNow  = styled.div`
	display:flex;
	border-radius: ${p => p.theme.spacing(1)}px;
	border: 1px solid #d3d3d3;
	padding: ${p => p.theme.spacing(1)}px;
	align-items: center;	
	text-align:center;
	justify-content: center;
	${(p) => p.theme.breakpoints.up('md')} {	
		width:135px;
	}
`;
const StyledPhoneSelectionBuyNowText  = styled.div`
	${p => p.theme.typography.body1};
`;
const StyledPhoneSelectionRemove = styled.div<{selected?:boolean;}>`
	background:  ${(p) => p.selected?p.theme.palette.primary.main:"#9C9C9C"};
	border-radius: 100%;
	color: #fff;
	width: ${p => p.theme.spacing(3)}px;
	height: ${p => p.theme.spacing(3)}px;
	cursor: pointer;
	position: relative;
	&:before{
		content: " ";
		width: 14px;
		height: 2px;
		position: absolute;
		top: 50%;
		left: 5px;
		background: #fff;
	}
`;

const StyledPhoneSelectionQuantity = styled.div`
	width: ${p => p.theme.spacing(4)}px;
	${p => p.theme.typography.h5};
	display: flex;
    justify-content: center;
	line-height: 1;
	${(p) => p.theme.breakpoints.up('md')} {	
		width: ${p => p.theme.spacing(5)}px;
	}
`;
const StyledPhoneSelectionAdd = styled.div<{disable?:boolean;}>`
	background:  ${(p) => p.disable?"#9C9C9C":p.theme.palette.primary.main};
	border-radius: 100%;
	color: #fff;
	width: ${p => p.theme.spacing(3)}px;
	height: ${p => p.theme.spacing(3)}px;
	cursor: pointer;
	position: relative;
	transform-origin: right;
	&:before{
		content: " ";
		width: 14px;
		height: 2px;
		position: absolute;
		top: calc(50% - 1px);
		left: 5px;
		background: #fff;
	}
	&:after{
		content: " ";
		width: 2px;
		height: 14px;
		position: absolute;
		top: 5px;
		left: calc(50% - 1px);
		background: #fff;
	}
`;
const StyledPhoneCapacityRemark = styled.div`
	${p => p.theme.typography.body1};
	color: #9C9C9C;
	font-size: 1.2rem;
	margin-top: ${p => p.theme.spacing(2)}px;
	text-align: center;
	${(p) => p.theme.breakpoints.up('md')} {	
		font-size: 1.2rem;
	}
`;
const StyledDialogContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width:250px;
	padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(5)}px ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(2)}px;
	position:relative;
`
const StyledDialogClose = styled.div`
	position: absolute;
	right: 13px;
	top: 14px;
	cursor: pointer;
	width: 16px;
	height: 16px;
	transform: rotate(45deg);
	&:before{
		content: " ";
		width: 15px;
		height: 2px;
		position: absolute;
		top: calc(50% - 1px);
		left: 1px;
		background: #333;
	}
	&:after{
		content: " ";
		width: 2px;
		height: 15px;
		position: absolute;
		top: 1px;
		left: calc(50% - 1px);
		background: #333;
	}
`;
const StyledDialogImage = styled.img`
	margin: 0 ${p => p.theme.spacing(2)}px 0 0;
	width: 18px;
    height: 17px;
`
const StyledDialogMessage = styled.div`
	${p => p.theme.typography.body1};	
	color: ${p => p.theme.palette.primary.main};	
`
const StyledPopover = styled(Popover)`
	& .MuiPaper-rounded{
		border-radius: 15px;
	}
`;

const SelectPhoneOptionTab = ({handsetOrder, selectedTab, selectModel, onClickTab}: {handsetOrder:iPhoneOrder[], selectedTab:number, selectModel: iPhoneOrderData[], onClickTab: (e:number)=>void}) => {

	return( 
		<StyledPhoneOptionTabContainer>
		{
			handsetOrder.map((element: iPhoneOrder, index:number) => {
				let phoneQuantity:number = 0;
				element.order.map((models, modelIndex) => { 
					models.map(model => {	
							phoneQuantity += selectModel.filter(phone => phone.model_code === model).length;
					})
				});
				
				return (
					<StyledPhoneOptionTab key={index} selected={index==selectedTab} onClick={()=>onClickTab(index)}>
						<StyledPhoneOptionTabTitle selected={index==selectedTab}>{element.title_img} </StyledPhoneOptionTabTitle>
						{phoneQuantity > 0 && <StyledPhoneOptionTabQuantity>{phoneQuantity}</StyledPhoneOptionTabQuantity>}
					</StyledPhoneOptionTab>
				)
			})
		}
		</StyledPhoneOptionTabContainer>
	)
}

export {
	StyledPhoneOptionTabContainer as StyledTabContainer,
	StyledPhoneOptionTabQuantity as StyledTabQuantity,
	StyledPhoneOptionTabTitle as StyledTabTitle,
	StyledPhoneOptionTab as StyledTab
}


const SelectPhoneDesktop = ({quota, handsetGroupData, currentTab, selectModel, onClickPhoneTab, onClickSelectPhone}:SelectPhoneDesktopProps) =>{
	return (
		<>
		{
			handsetGroupData.handset_order &&
			<SelectPhoneOptionTab handsetOrder={handsetGroupData.handset_order} selectedTab={currentTab} selectModel={selectModel} onClickTab={(index)=>onClickPhoneTab(index)}/>
		}
		{
			handsetGroupData.handset_order && handsetGroupData.handset_order.map((element: iPhoneOrder, order:number) => {
				return (
					order == currentTab && <StyledPhoneGroupContainer key={order}>		
						{	
							order == currentTab &&
							element.order && element.order.map((models, index) => {								
								return (									
									<StyledPhoneContainer key={index}>
										<SelectPhoneOption quota={quota} selectModel={selectModel} models={models} handsetData={handsetGroupData.handset_data} buyNowModels={handsetGroupData.buy_now_order} onClickOption={onClickSelectPhone}/>		
									</StyledPhoneContainer>
								)
							})
						}
					</StyledPhoneGroupContainer>
				)
			})
		}
		</>
	)
}
const SelectPhoneOption = ({quota, selectModel, models, buyNowModels, handsetData, onClickOption}: SelectPhoneOptionProps) => {
	const intl = useIntl();
	const lang = getLangFromLocale(intl.locale);
	const firstModel:iPhoneOrderData|undefined = models?handsetData[models[0]]:undefined;
								
	const applicationContext = useContext(ApplicationContext);
    const domain = applicationContext?.url?.domain;
	const handleSelectPhone = (data:iPhoneOrderData, action: SelectAction, event: React.MouseEvent<HTMLElement>) =>{	
		if (data){
			onClickOption(data, action, event);
		}
	}
	
	return( 
	<>
		{	(handsetData && models && firstModel) &&
			<>	
				<StyledPhoneImageContainer>
					<StyledPhoneImage src={domain+IMAGE_PATH+firstModel.img_prefix+".png?v=20231006"} />
					<StyledPhoneColor dangerouslySetInnerHTML={{__html: (lang=="english")?firstModel.color_eng:firstModel.color_chi}}></StyledPhoneColor>
				</StyledPhoneImageContainer>
				<StyledPhoneCapacityContainer>
				{
					models.map((model, index) => {	
						const iPhoneOrderData = handsetData[model];	
						const phoneQuantity:number = selectModel.filter(phone => phone.model_code === model).length;
						const isSelected:boolean = phoneQuantity > 0;	
						const isReachQuota:boolean = selectModel.length == quota;	
						const filteredBuyNowModels = buyNowModels?.filter(bModel => bModel.iphone_model===iPhoneOrderData.iphone_model);
						const isBuyNowModel:boolean = (filteredBuyNowModels && filteredBuyNowModels[0]) ? filteredBuyNowModels[0].order.includes(model) : false;
						
						return (
							<StyledPhoneSelectionContainer key={index}>
								<StyledPhoneCapacity>
									<div>{formatTB(iPhoneOrderData.capacity)}</div>
									<StyledPhonePrice>${formatPrice(iPhoneOrderData.price)}*</StyledPhonePrice>
								</StyledPhoneCapacity>
								{
									isBuyNowModel ?
									<StyledPhoneSelectionBuyNow>
										<StyledPhoneSelectionBuyNowText dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "phone-select.buy-now"}) }} />
									</StyledPhoneSelectionBuyNow>
									:
									<StyledPhoneSelection>
										<StyledPhoneSelectionRemove selected={isSelected} onClick={(e)=>handleSelectPhone(iPhoneOrderData, SelectAction.REMOVE, e)}></StyledPhoneSelectionRemove>
										<StyledPhoneSelectionQuantity>{phoneQuantity}</StyledPhoneSelectionQuantity>
										<StyledPhoneSelectionAdd disable={isReachQuota} onClick={(e)=>handleSelectPhone(iPhoneOrderData, SelectAction.ADD, e)}></StyledPhoneSelectionAdd>
									</StyledPhoneSelection>
								}
							</StyledPhoneSelectionContainer>
						)
					})
				}
					<StyledPhoneCapacityRemark>{intl.formatMessage({id: "phone-select.recommend-price"})}</StyledPhoneCapacityRemark>
				</StyledPhoneCapacityContainer>
			</>	
		}
	</>
	)
}

const SelectPhone = ({quota, handsetGroupData, onSelectedPhoneOption, selected}: SelectPhoneProps) => {	
	const [ selectModel, setSelectModel ] = useState<iPhoneOrderData[]>(selected ?? []);
	const [ currentTab, setCurrentTab ] = useState<number>(0);
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const intl = useIntl();
	const applicationContext = useContext(ApplicationContext);
    const domain = applicationContext?.url?.domain;
	const opened = Boolean(anchorEl);
	const id = opened ? 'simple-popover' : undefined;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);

	const handleClose = () => {
	setAnchorEl(null);
	};
	
	const onClickPhoneTab = useCallback((index:number) => {
		setCurrentTab(index);
	}, []);

	const onClickSelectPhone = useCallback((data?:iPhoneOrderData, action?: SelectAction, event?: React.MouseEvent<HTMLElement>) => {
		if (data && action){
			if (action==SelectAction.ADD && selectModel.length < quota){
				setSelectModel([...selectModel, data]);
			} else if (action==SelectAction.ADD && selectModel.length == quota){
				if (event){
					setAnchorEl(event.currentTarget);
				}
			} else if (action==SelectAction.REMOVE){
				if (selectModel.indexOf(data)>-1){
					selectModel.splice(selectModel.indexOf(data), 1);
					setSelectModel([...selectModel]);
				}
			}
			//console.log("onClickSelectPhone data|"+data.model_code);
		}
	}, [selectModel]);
	
	const selectedPhoneData = useMemo(() => {
		const result: SelectedPhoneData = selectModel;
		//console.log("selectedPhoneData result|"+selectModel.length);
		return result;
	}, [selectModel])

	useEffect(() => {
		if (onSelectedPhoneOption) {
			onSelectedPhoneOption(selectedPhoneData);
		}
	}, [selectedPhoneData, onSelectedPhoneOption])		
	
	return (
		<StyledSelectPhoneContainer>
			<StyledPopover id={id}  open={opened} anchorEl={anchorEl} onClose={handleClose}  anchorOrigin={{vertical: isDesktop?'center':45,horizontal: isDesktop?40:'center'}} transformOrigin={{vertical: isDesktop?'center':'top',horizontal: isDesktop?'left':'center'}}>
				<StyledDialogContainer>
					<StyledDialogClose onClick={handleClose}></StyledDialogClose>
					<StyledDialogMessage>{intl.formatMessage({id: "phone-select.reach-limit"})}</StyledDialogMessage>
				</StyledDialogContainer>
			</StyledPopover>
			<SelectPhoneDesktop quota={quota} handsetGroupData={handsetGroupData} currentTab={currentTab} selectModel={selectModel} onClickPhoneTab={onClickPhoneTab} onClickSelectPhone={onClickSelectPhone} />
		</StyledSelectPhoneContainer>
		)
	}

export default SelectPhone;

