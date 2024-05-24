import { Box, Card, CardContent, Divider, Grid, Paper, styled, Typography, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import { Pin, Van } from '@smt/component/icon';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { OrderContextValue } from '../Main/MainController';
import { COLLECTION_METHOD_VALUE, localizeStore } from '../OfferAndCollection/CollectionMethod';
import { OrderLabel } from '../ThankYou';
import ApplicationContext from '@smt/context/ApplicationContext';

const StyledPaper = withStyles((theme) => ({
	root: {
		borderRadius: '12px'
	}
}))(Paper)

export default function ReviewCard(p: ReviewCardProps) {
	const { title, model, image, method, pickupStore, index, theLast } = p;
	const applicationContext = useContext(ApplicationContext);
    const domain = applicationContext?.url?.domain;

	return <Box p={4} pb={theLast ? 4 : 0} pt={0}>
			{/* <Box pb={2}>
				<OrderLabel index={index}/>
			</Box> */}
			<Grid container spacing={4} alignItems="center">
				<Grid item>
					<img src={domain + image} alt="" width={80} height={80} />
				</Grid>
				<Grid item>
					<Typography variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body1" component="div" color="textSecondary">
						{model}
					</Typography>
				</Grid>
			</Grid>
			<Box mt={2}>
				<StyledPaper variant="outlined" elevation={0}>
					<CollectionMethod method={method} pickupStore={pickupStore} />
				</StyledPaper>
			</Box>
			{theLast === false && <Box my={4}>
				<Divider />
			</Box>}
	</Box>; 
}

interface ReviewCardProps extends OrderContextValue {
	index: number;
	theLast: boolean;
}

interface CollectionMethodProps extends Pick<ReviewCardProps, 'method'|'pickupStore'>{
}

export function CollectionMethod(p: CollectionMethodProps) {
	const {method, pickupStore} = p;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const isDelivery = method === COLLECTION_METHOD_VALUE.DELIVERY
	const label = isDelivery
		? <FormattedMessage id="formControl.option.delivery" />
		: <FormattedMessage id="formControl.option.pickup" />
	const description = isDelivery
		? <Typography component="span"><FormattedMessage id="review.collect-method.delivery.remark"/></Typography>
		: <>
			<Typography component="span">{pickupStore?.district ?? ''}</Typography> - <Typography component="span">{pickupStore?.address ?? ''}</Typography>
		</>
	const icon = isDelivery ? <Van /> : <Pin />;
	return <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" py={isDesktop ? 3 : 2} pr={isDesktop ? 0 : 2}>
			<Box px={isDesktop ? 3 : 2}>
				<Typography variant="body1" component="div" align="center">
					{icon}
				</Typography>
			</Box>
			<Box>
				<Typography variant="h5">{label}</Typography>
				<Typography variant="body1" component="div" color="textSecondary">
					{description}
				</Typography>
			</Box>
	</Box>
}