import { useMediaQuery, useTheme } from '@material-ui/core';
import { MainControllerProps } from '@smt/page/Main/MainController';
import { StoreMeta } from '@smt/type/storelist';
import React, { useMemo } from 'react';
import { SelectorProps } from '.';
import LocationSelectorDesktop from './LocationSelectorDesktop';
import LocationSelectorMobile from './LocationSelectorMobile';
export interface LocationSelectorBase {
	selected: string;
	onClickHandler: (v: string) => (e: React.MouseEvent) => void;
	isDesktop: boolean;
	list: Array<StoreMeta>
}

interface LocationSelectorProps extends SelectorProps {
	storeData: MainControllerProps['storeData']
}

const LocationSelector: React.FC<LocationSelectorProps> = ({selected, onSelectHandler, storeData}) => {

	const theme     = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { 
		defaultMatches: window.matchMedia("(min-width:" + theme.breakpoints.values.md + "px)").matches 
	});
	const onClickHandler = (v: string) => (e: React.MouseEvent) => {
		return onSelectHandler(v)
	};

	return <>
		{isDesktop
			? <LocationSelectorDesktop list={storeData.shop_list} selected={selected||''} onClickHandler={onClickHandler} isDesktop={isDesktop} />
			: <LocationSelectorMobile list={storeData.shop_list} selected={selected||''} onClickHandler={onClickHandler} isDesktop={isDesktop} />
		}
	</>
}

export default LocationSelector