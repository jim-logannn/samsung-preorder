import React, { forwardRef, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl';
import Page from '@smt/page/Base';
import styled from 'styled-components';
import { OrderContext, OrderContextValue, OrderStep } from '../Main/MainController';
import { Box, Divider, Grid, Paper, PropTypes, Typography, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import { Styled2023PreOrderMain } from '../OfferAndCollection';
import { PreorderSubmitResult } from '@smt/hook/phone/preorderSubmitHook';
import { AjaxResult } from '@smt/hook/xhr/AjaxHook';
import FootNote from '../PhoneSelector/FootNote';
import ApplicationContext, { PreorderRecord } from '@smt/context/ApplicationContext';
import { IMAGE_PATH, handsetGroupDataRecord } from '../PhoneSelector/SelectPhone';
import { getLangFromLocale } from '@smt/lang/Lang';
import { CALLBACK_CHANGE_STEP } from '@smt/type/callback';
import { createCallbackValue } from '@smt/util/Callback';
import { formatTB } from '@smt/util/StringUtils';

const StyledMain = styled.div`
	display: block;
	margin: ${p => p.theme.spacing(4)}px auto;
`

export interface ThankYouProps {
	handsetGroupData: handsetGroupDataRecord;
	submitResult?: AjaxResult<PreorderSubmitResult>;
	preorderRecord?: PreorderRecord[];
	isWhitelistUser?: boolean;
} 

const StyledPaper = withStyles((theme) => ({
	root: {
		padding: theme.spacing(4)+'px',
		borderRadius: '20px'
	}
}))(Paper);



export default function ThankYou(p: ThankYouProps) {
	const {handsetGroupData,submitResult,preorderRecord,isWhitelistUser} = p;
	const handsets = useContext(OrderContext);
	const applicationContext = useContext(ApplicationContext);
    const domain = applicationContext?.url?.domain;
	const intl = useIntl();
	const lang = getLangFromLocale(intl.locale);
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const _style = {
		direction: isDesktop ? "row" : "column",
		orientation: isDesktop ? "vertical" : "horizontal"
	} as const

	const convertIdToHandsetRecord = (targetId : string) =>{
		let returnObject = {} as OrderContextValue;
		for (const [key, value] of Object.entries(handsetGroupData.handset_data)) {
			if(value.product_code === targetId){
				returnObject.id = value.model_code
				returnObject.image = domain+IMAGE_PATH+value.img_prefix+".png";
				returnObject.model = formatTB(value.capacity) + " " + (lang=="english" ? value.color_eng : value.color_chi);
				returnObject.title = (lang=="english" ? value.name_eng : value.name_chi);
				return returnObject;
			}
		}
		return returnObject;
	}

	const renderPreorderRecordRow = (modelNums ?: string[], caseNumber ?: string[]) => {
		if(modelNums === undefined || caseNumber === undefined ){
			return <></>
		}

		return <>
			<Grid item xs={12}>
				<Grid container direction={_style.direction} alignItems="stretch" justifyContent="space-evenly">
					{(modelNums !== null && modelNums.length > 0) && modelNums.map((handset, index) => {
						const col = modelNums.length === 1 ? 12 : modelNums.length === 2 ? 4 : 3;
						const preorderHandset = convertIdToHandsetRecord(handset);

						return <>
							<Grid item md={col} key={index}>
								<Order {...preorderHandset} refNumber={caseNumber[index] ?? ''} index={index} isDesktop={isDesktop} theLast={index >= modelNums.length - 1} />
							</Grid>
							{index < modelNums.length - 1 && <Divider orientation={_style.orientation} flexItem={isDesktop} />}
						</>
					})}
				</Grid>
			</Grid>
		</>
	}

	useEffect(()=>{
		// if(preorderRecord != undefined || submitResult != undefined){
		// 	if (applicationContext?.eventCallback) {
		// 		let record = preorderRecord !== undefined ? preorderRecord : submitResult;
		// 		applicationContext.eventCallback(createCallbackValue(CALLBACK_CHANGE_STEP, OrderStep.STEP_SUCCESS));
		// 	}
		// }
	},[])

	

	return <Page>
		<Page.Body>
			<Styled2023PreOrderMain>
				<StyledPaper>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography variant="subtitle2" component="div" align="center">
								{intl.formatMessage({id:"pre-order.thank-you.heading"})}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" component="div" align="center">
								{intl.formatMessage({id:"pre-order.thank-you.sub-title"})}
							</Typography>
						</Grid>
						<Grid item>
						<Typography variant="body1" component="div" align="center" style={{fontSize: '1.6rem'}} dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "pre-order.thank-you.lead-in"})}}>

						</Typography>
						</Grid>
						{
							(preorderRecord !== undefined) &&
							<>
								{
									preorderRecord.length > 0 &&
									//loop all record with row
									preorderRecord.map((record,recIndex)=>{
										const modelNums = record.model.split(",");
										const caseNumber = record.orderCaseNumber.split(",");
										return <>
											{renderPreorderRecordRow(modelNums,caseNumber)}
											{recIndex < preorderRecord.length - 1 && <Grid item xs={12}> <Divider /> </Grid>}
										</>
									})
								}
							</>
						}

						{
							(submitResult !== undefined) &&
							<>
								{renderPreorderRecordRow( submitResult?.result?.orderDetail?.model.split(",") ,submitResult?.result?.orderDetail?.orderCaseNumber.split(","))}
							</>
							// <Grid item xs={12}>
							// 	<Grid container direction={_style.direction} alignItems="stretch" justifyContent="space-evenly">
							// 		{(handsets !== null && handsets.length > 0) && handsets.map((handset, index) => {
							// 			const col = handsets.length === 1 ? 12 : handsets.length === 2 ? 4 : 3;
							// 			return <>
							// 				<Grid item md={col} key={index}>
							// 					<Order {...handset} refNumber={submitResult?.result?.orderRefNum ?? ''} index={index} isDesktop={isDesktop} theLast={index >= handsets.length - 1} />
							// 				</Grid>
							// 				{index < handsets.length - 1 && <Divider orientation={_style.orientation} flexItem={isDesktop} />}
							// 			</>
							// 		})}
							// 	</Grid>
							// </Grid>
						}
						<Grid item xs={12}>
							<Divider />
						</Grid>
						<Grid item>
							<Box pt={3}>
								<Typography	variant="body1" component="div" style={{fontSize: '1.6rem'}} dangerouslySetInnerHTML={{ __html: intl.formatMessage({id:"pre-order.thank-you.footer"}) }}>
								</Typography>
							</Box>
						</Grid>
						<Grid item>
							<Typography variant="body1" component="div" style={{fontSize: '1.6rem'}}>
								{
									(isWhitelistUser === true) ? 
									intl.formatMessage({id:"pre-order.thank-you.footer2-whitelist"}) : 
									intl.formatMessage({id:"pre-order.thank-you.footer2"})
								}
							</Typography>
						</Grid>
						{/* <Grid item>
							<Box pb={2}>
								<Typography variant="body1" component="div" style={{fontSize: '1.6rem'}}>
									{intl.formatMessage({id:"pre-order.thank-you.remark"})}
								</Typography>
							</Box>
						</Grid> */}
					</Grid>
				</StyledPaper>
			</Styled2023PreOrderMain>
		</Page.Body>
		<Page.Footer>
			<FootNote />
		</Page.Footer>	
	</Page>
}

interface OrderProps extends Omit<OrderContextValue, 'method'|'pickupStore'> {
	index: number;
	refNumber?: string;
	isDesktop?: boolean;
	theLast?: boolean;
}

const StyledOrderLabel = styled.div`
	display: inline-block;
	padding: ${p => p.theme.spacing(1)}px;
	border-radius: 5px;
	background: #FFE9E9;
`

export const Order: React.FC<OrderProps> = (p) => {
	const {image, index, isDesktop=false, theLast=false, ...rest} = p;
	const _style = {
		imgSize: isDesktop ? 206 : 120,
		direction: isDesktop ? "column" : "row",
		alignContent: isDesktop ? "center" : "flex-start",
		align: isDesktop ? "center" : "left"
	} as const;
	return <Box mt={isDesktop ? 0 : 2} mb={!isDesktop && theLast ? 0 : 2}>
		<Grid container direction="column" alignContent={_style.alignContent} spacing={isDesktop ? 2 : 1}>
			{/* <Grid item>
				<OrderLabel index={index} align={_style.align} />
			</Grid> */}
			<Grid item>
				<Box display="flex" flexDirection={_style.direction}>
					<Box my={isDesktop ? 2 : 1}>
						<img src={image} width={_style.imgSize} height={_style.imgSize} />
					</Box>
					<Box my={isDesktop ? 2 : 1}>
						<HandsetInfo {...rest} isDesktop={isDesktop} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	</Box>
}	

const HandsetInfo: React.FC<Pick<OrderProps, 'model'|'title'|'refNumber'|'isDesktop'>> = (p) => {
	const {model, title, refNumber='Loading', isDesktop} = p;
	const intl = useIntl();
	const _style = {
		alignContent: isDesktop ? "center" : "flex-start",
		justifyContent: isDesktop ? "center" : "flex-start",
		align: isDesktop ? "center" : "left",
	} as const
	return <Grid container direction="column" alignItems="stretch" justifyContent={_style.justifyContent} spacing={isDesktop ? 2 : 1}>
		<Grid item>
			<Typography variant="h5" component="div" align={_style.align}>
				{title}
			</Typography>
			<Typography variant="body1" component="div" align={_style.align} color="textSecondary">
				{model}
			</Typography>
		</Grid>
		<Grid item>
			<Typography variant="body1" component="div" align={_style.align} color="textSecondary">
				{intl.formatMessage({id:"reference-number"})}
				<br/>
				{refNumber}
			</Typography>
		</Grid>
	</Grid>
}

export const OrderLabel = forwardRef<any, {index: number; align?: PropTypes.Alignment}>(({index, align='left'}, ref) => {
	const intl = useIntl();
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	return 	<Typography variant={isDesktop ? 'body1' : 'caption'} component="div" align={align} color="primary" style={{fontWeight: 400}}>
		<StyledOrderLabel>
			{intl.formatMessage({id:"order"})+' '+(index+1)}
		</StyledOrderLabel>	
	</Typography>
})