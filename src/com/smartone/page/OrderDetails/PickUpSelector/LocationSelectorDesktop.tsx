import { useMediaQuery } from '@material-ui/core';
import { OutlineButton } from '@smt/component/button';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { StyledButton, StyledItem, StyledWrapper } from './grid.style';
import LocationInfo from './LocationInfo';
import { LocationSelectorBase } from './LocationSelector';

interface LocationSelectorDesktopProps extends LocationSelectorBase {
	isDesktop: true;
}

const StyledLocationWrapper = styled(StyledWrapper)`
  grid-template-columns: 1fr 1fr; 
`
const LocationSelectorDesktop: React.FC<LocationSelectorDesktopProps> = ({isDesktop, selected, onClickHandler, list}) => {

	const row: {item: number, max: number} = useMemo(() => {
		const rowItems = 2;
		return {
			item: rowItems,
			max: Math.ceil(list.length / rowItems)
		}
	}, [list]);

	const getItemPosition: (i: number) => {x: number, y: number} = useCallback((index: number) => {
		return { 
			x: (index % row.item) + 1,
			y: Math.floor(index / row.item) + 1
		}
	}, [list, row]);

	return <StyledLocationWrapper>
		{list.map((location, index) => <StyledItem key={index} rowEnd={getItemPosition(index).x === row.item} colEnd={getItemPosition(index).y === row.max}><StyledButton selected={selected === location.id} onClick={onClickHandler(location.id)}>
			<LocationInfo {...location} isDesktop={isDesktop} />
		</StyledButton></StyledItem>)}
	</StyledLocationWrapper> 
}

export default LocationSelectorDesktop;