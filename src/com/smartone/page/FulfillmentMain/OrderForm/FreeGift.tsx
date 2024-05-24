import { Box, Typography } from '@material-ui/core';
import { StyledSelectorHeading } from '@smt/page/OrderDetails/PickUpSelector';
import React from 'react';
import { useIntl } from 'react-intl';
import { OrderFormProps, StyledInputHeading } from '.';
import { Img } from '..';

interface FreGiftProps {
	data: OrderFormProps['offer']['offer_data']['gift']
} 

export const FreeGift = (p: FreGiftProps) => {
	const { data } = p;
	const intl = useIntl();
	return <>
		<StyledInputHeading style={{marginBottom: '10px'}}>{intl.formatMessage({ id: "free-gift" })}</StyledInputHeading>
		{Object.values(data).map((gift, index) => {
			const {img, title} = gift;
			return <Box display="flex" mb={1} alignItems="center" key={index}>
				<Box>
					<Img path={img} width={70} height={70} title={title} />
				</Box>
				<Box pl={2}>
					<Typography variant="body1" component="div">
						{title}
					</Typography>
				</Box>
			</Box>
		})}
	</>
};
