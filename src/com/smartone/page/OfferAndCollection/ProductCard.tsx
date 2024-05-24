import { Box, Divider, Grid, GridDirection, Paper, useMediaQuery, useTheme, withStyles } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import CollectionMethod, { CollectionMethodProps } from './CollectionMethod'
import OfferSelector, { OfferSelectorProps } from './OfferSelector'
import ProductInfo, { ProductInfoProps } from './ProductInfo'


interface ProductCardProps {
	productInfo: ProductInfoProps
	collectionMethod: CollectionMethodProps
}

const StyledPaper = withStyles((theme) => ({
	root: {
		padding: `${theme.spacing(2)}px`,
		marginBottom: `${theme.spacing(3)}px`,
		borderRadius: '20px',
		boxShadow: '0 2px 8px 0 rgb(0 0 0 / 5%)',
		[theme.breakpoints.up('md')]: {
			padding: `${theme.spacing(6)}px`,
    }
	}
}))(Paper)

const StyledGrid = withStyles((theme) => ({
	root: {
	}
}))(Grid)


export default function ProductCard(props: ProductCardProps) {
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const _style = {
		direction: isDesktop ? 'row' : 'column',
		orientation: isDesktop ? 'vertical' : 'horizontal',
		flexItem: isDesktop,
		hr: {
			px: isDesktop ? 6 : 0,
			py: isDesktop ? 0 : 3
		}
	} as const;
	const productProps = {
		...props.productInfo
	}
	const collectionMethodProps = {
		...props.collectionMethod,
		pid: props.productInfo.id
	}
	return <StyledPaper>
		<Box display="flex" flexDirection={_style.direction} alignItems="stretch" justifyContent="flex-start" flexWrap="nowrap">
			<Box minWidth={isDesktop ? 400 : 'auto'}>
				<ProductInfo {...productProps} />
			</Box>
			<Box px={_style.hr.px} py={_style.hr.py}>
				<Divider orientation={_style.orientation} />
			</Box>
			<Box flexGrow={1}>
				<CollectionMethod {...collectionMethodProps} />
			</Box>
		</Box>
	</StyledPaper>
} 


{/* <Grid container direction={_style.direction} spacing={8} alignItems="center" justifyContent="flex-start" wrap="nowrap">
	<Grid item>
		<ProductInfo {...productProps} />
	</Grid>
	<Divider flexItem={_style.flexItem} orientation={_style.orientation} />
	<Grid item>
		<CollectionMethod {...collectionMethodProps} />
	</Grid>
</Grid> */}