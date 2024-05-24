import { Box, Button, Grid, Hidden, Paper, Typography, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import { CheckButton } from '@smt/component/button';
import { BsFillCheckCircleFill, Pin } from '@smt/component/icon';
import { StoreLabel } from '@smt/type/handsetPreOrder2023/api';
import { isBlank } from '@smt/util/StringUtils';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { StoreData } from './StoreLocation';

type StoreCardData = ReturnType<typeof createStoreCard>

interface StoreCardProps {
	data: StoreCardData;
	checked?: string | null;
	onChange?: (v: StoreCardData['label']) => void;
	highlight?: boolean;
	hideMap?: boolean;
}

const StyledWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(1)}px;
	margin: ${p => p.theme.spacing(2)}px 0;
`
interface CheckboxProps {
	checked?: boolean;
	size?: number;
	onClick: () => void;
}
const StyledCheckButton = styled(CheckButton)`
	cursor: pointer;
	min-width: 40px;
`;
const StyledBox = withStyles<"root", {}, {highlight: 'true' | 'false'}>((theme) => ({
	root: (p) => ({
		background: p.highlight === 'true' ? 'none' : '#eee'
	})
}))(Box)
const SelectOptionCheckbox = ({onClick, size, checked}:CheckboxProps) => {
	return (
		<StyledCheckButton onClick={onClick} checked={checked} size={24}>
			{checked && <BsFillCheckCircleFill color="#f00" size={18} />}
		</StyledCheckButton>
	)
}
export default function StoreCard({data, checked = null, onChange, highlight=false, hideMap=false}: StoreCardProps) {
	const {district, address, mapLink, label} = data;
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
	const highlightStr = highlight ? 'true' : 'false' as const;
	const _style = {
		wrap: isDesktop ? 'nowrap' : 'nowrap',
		spacing: isDesktop ? 2 : 0
	} as const;
	const onClickHandler = () => {
		if (onChange !== undefined) {
			onChange(label);
		}
	}
	// https://v4.mui.com/api/grid/
	return <StyledBox highlight={highlightStr} p={isDesktop ? 4 : 2}>
			<Grid container direction="row" alignItems="center" wrap={_style.wrap} justifyContent="flex-start" spacing={_style.spacing}>
				<Grid item xs={1} sm="auto">
					<SelectOptionCheckbox onClick={onClickHandler} checked={checked === label} size={20} />
				</Grid>
				<Grid item xs={10} sm={9}>
					<Box pb={isDesktop ? 1 : 0}>
						<Typography variant="h6">
							{district}
						</Typography>
					</Box>
					<Typography variant="body1">
						{address}
					</Typography>
					{!hideMap ? <BtnViewMap mapLink={mapLink} show={isDesktop === false} isDesktop={isDesktop} /> : <Box>&nbsp;</Box>}
				</Grid>
				<Grid item sm="auto">
					{!hideMap ? <BtnViewMap mapLink={mapLink} show={isDesktop} isDesktop={isDesktop} /> : <Box>&nbsp;</Box>}
				</Grid>
			</Grid>
	</StyledBox>
}

const BtnViewMap = ({mapLink, show=true, isDesktop}: {mapLink: string, show: boolean, isDesktop: boolean}) => {
	return show ? <Button variant="text" startIcon={<Pin width={isDesktop ? undefined : 13} height={isDesktop ? undefined : 17} />} href={mapLink} target="_blank" disableRipple disableElevation disableFocusRipple style={{textDecoration: "none", fontWeight: "normal", textTransform: "capitalize"}}>
	<Typography variant="caption">
		<FormattedMessage id="view-map" />
	</Typography>
</Button> : null
}

export function createStoreCard(p: StoreData) {
	const {dis, add, label} = p;
	return {
		district: dis,
		address: add,
		mapLink: `https://www.smartone.com/tc/privileges_and_support/contact_us/store_location.jsp?store=${label}`,
		label: label
	}
}

function transformImage(store_code?: string): string {
	if(isBlank(store_code)) {
		return "/storefront/common/blank_store.jpg";
	}
	return "/privileges_and_support/contact_us/store_location/common/" + store_code + "_thumb.jpg";
}