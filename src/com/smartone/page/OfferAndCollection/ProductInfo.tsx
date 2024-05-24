import { Box, BoxProps, Grid, GridProps, Paper, Typography, TypographyProps, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import ApplicationContext from '@smt/context/ApplicationContext';
import { formatPrice, formatTB } from '@smt/util/StringUtils';
import React, { useContext, useMemo } from 'react'
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ReviewData } from '.';
import { Img } from '../FulfillmentMain';
import { IMAGE_PATH, iPhoneOrderData } from '../PhoneSelector/SelectPhone';

const StyledLabel = styled.div`
	text-align: left;
`;
const StyledValue = styled.div`
	margin-top: ${p => p.theme.spacing(1)}px;
  font-weight: 400;
  color: ${(p) => p.theme.palette.primary.main};
	text-align: left;
`;
const StyledRemark = styled.div`
  color: ${(p) => p.theme.palette.text.secondary};
	text-align: left;
`;
const StyledValueEnlarge = styled.span`
  font-weight: 400;
	font-size: 1.4em;
  color: ${(p) => p.theme.palette.primary.main};
`

export interface ProductInfoProps {
	id: string;
	image: string,
	imageSize?: Record<'m'|'d', number>,
	title: string,
	model: string,
	price: {
		origin: number,
		discounted: number | null
	},
	referenceNo?: string,
	gridProps?: GridProps,
	textAlign?: TypographyProps['align']
}

const StyledPaper = withStyles((theme) => ({
	root: {
		padding: theme.spacing(1) + 'px',
		whiteSpace: 'nowrap',
	}
}))(Paper)

export default function ProductInfo(p: ProductInfoProps) {
	const {
		image, 
		imageSize,
		title, 
		model, 
		price,
		referenceNo,
		gridProps = {
			direction: "row",
			alignItems: "center",
			justifyContent: "flex-start",
			wrap: "nowrap"
		},
		textAlign = "left"
	} = p;
  const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	const _imageSize = useMemo(() => {
		if (imageSize) {
			return isDesktop ? imageSize.d : imageSize.m
		}
		return isDesktop ? 206 : 120;
	}, [imageSize, isDesktop])
	// const _imageSize = isDesktop ? 206 : 120;
	return <Grid container {...gridProps}>
		<Grid item>			
			<Img path={image} title={title} width={_imageSize} height={_imageSize} />
		</Grid>
		<Grid item>
			<StyledLabel>
				<Typography variant="h5" align={textAlign} dangerouslySetInnerHTML={{__html: title}} />
			</StyledLabel>
			<StyledRemark>
				<Typography variant="body1" align={textAlign}>
					{model}
				</Typography>
			</StyledRemark>
			{price.discounted !== null 
				? <DiscountLabel origin={price.origin} discounted={price.discounted} textAlign={textAlign} />
				: <>
					<StyledValue>
						<Typography variant="h6" component="div" align={textAlign}>
							HK$&nbsp;
							<StyledValueEnlarge>
								{formatPrice(price.origin)}
							</StyledValueEnlarge>
						</Typography>
					</StyledValue>
					<StyledRemark>
						<Typography component="div" variant="body1" align={textAlign}>
							(<FormattedMessage id="recommended" />)
						</Typography>
					</StyledRemark>
				</>
			}
			{referenceNo !== undefined && 
				<StyledRemark>
					<Typography component="div" variant="body1" align={textAlign}>
						<FormattedMessage id="reference-number" /><br/> {referenceNo}
					</Typography>
				</StyledRemark>
			}
		</Grid>
	</Grid>
}

function DiscountLabel({origin, discounted, textAlign}: {origin: ProductInfoProps['price']['origin'], discounted: NonNullable<ProductInfoProps['price']['discounted']>, textAlign: ProductInfoProps['textAlign']}) {
	return <>
		<StyledValue>
			<Typography variant="h6" component="div" align={textAlign}>
				<Typography variant="h6" component="span" style={{color: 'red'}}>
					HK$&nbsp;
					<StyledValueEnlarge>
						{formatPrice(discounted)}&nbsp;
					</StyledValueEnlarge>
				</Typography>
				<Typography variant="body1" component="span" style={{textDecoration: "line-through", color: '#9c9c9c'}}>
					HK$&nbsp;{formatPrice(origin)}
				</Typography>
			</Typography>
		</StyledValue>
		<StyledRemark>
			<Typography component="div" variant="body1" align={textAlign}>
				(<FormattedMessage id="discount-price" />)
			</Typography>
		</StyledRemark>
	</>
}

export const createPreOrderHandset = (isEng: boolean, _handset: iPhoneOrderData, index: number, domain?: string) => {
	return {
		id: `${_handset.model_code}|${index}`,
		image: (domain ?? '') + IMAGE_PATH + _handset.img_prefix + '.png',
		title: isEng ? _handset.name_eng : _handset.name_chi,
		model: formatTB(_handset.capacity) + ' ' + (isEng ? _handset.color_eng : _handset.color_chi),
		price: {
			origin: _handset.price,
			discounted: null as null|number
		}
	}
}