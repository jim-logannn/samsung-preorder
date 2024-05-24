import { GridProps, useMediaQuery, useTheme } from '@material-ui/core';
import ProductInfo, { ProductInfoProps } from '@smt/page/FulfillmentMain/OrderForm/ProductInfo';
import React from 'react';

export const Handset = (p: Omit<ProductInfoProps, 'gridProps'>) => {

	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);

	const gridContainerProps: GridProps = {
		direction: isDesktop ? "column" : "row",
		alignItems: isDesktop ? "center" : "center",
		justifyContent: isDesktop ? "center" : "flex-start",
		wrap: "nowrap",
		spacing: isDesktop ? 2 : 1
	} as const;

	return <ProductInfo {...p} gridProps={gridContainerProps} textAlign={isDesktop ? "center" : "left"} />;
};
