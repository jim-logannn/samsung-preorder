import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl';
import Page from '@smt/page/Base';
import { StyledSelectorHeading } from '@smt/page/OrderDetails/PickUpSelector'
import styled from 'styled-components';
import { GetStoreAPIResponse } from '@smt/type/handsetPreOrder2023/api';
import { ReviewData, Styled2023PreOrderMain } from '../OfferAndCollection';
import { ProductInfoProps } from '../OfferAndCollection/ProductInfo';
import ReviewCard from './ReviewCard';
import { OrderContext } from '../Main/MainController';
import FootNote from '../PhoneSelector/FootNote';
import { Box, Divider, Paper, Typography, withStyles } from '@material-ui/core';
import { TextButton } from '@smt/component/button';
import Voucher, { voucherData } from '@smt/component/voucher/Voucher';

const StyledMain = styled.div`
	display: block;
	margin: ${p => p.theme.spacing(4)}px auto;
`
const StylePaper = withStyles((theme) => ({
	root: {
		borderRadius: '20px',
		boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.07)'
	}
}))(Paper)
export interface OfferAndCollectionProps {
	onClickBackButton: () => void;
	onClickConfirm: () => void;
	// handsets: ProductInfoProps[];
	// storeData: GetStoreAPIResponse;
	// data: ReviewData
} 

export default function Review(p: OfferAndCollectionProps) {
	const {onClickBackButton, onClickConfirm} = p;
	const handsets = useContext(OrderContext);
	const intl = useIntl();
	return <Page>
		<Page.Body>
			<Styled2023PreOrderMain>
				<StyledSelectorHeading>{intl.formatMessage({id:"pre-order.review.heading"})}</StyledSelectorHeading>
				<StylePaper elevation={6}>
					<Box p={4}>
						<Typography variant="body1" component="div" align="center">
							<FormattedMessage id="review.confirm"/>
						</Typography>
					</Box>
					{(handsets !== null && handsets.length > 0) && handsets.map((handset, index) => {
						return <>
							<ReviewCard {...handset} index={index} theLast={index+1 >= handsets.length} key={index} />
						</>
					})}
				</StylePaper>
			</Styled2023PreOrderMain>
		</Page.Body>
		<Page.Footer>
			<FootNote onClickBackButton={onClickBackButton} onClickConfirm={onClickConfirm}/>
		</Page.Footer>	
	</Page>
}


