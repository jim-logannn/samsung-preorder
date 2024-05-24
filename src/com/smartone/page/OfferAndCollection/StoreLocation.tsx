import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs, { TabsTypeMap } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StoreCard, { createStoreCard } from './StoreCard';
import { StoreLabel } from '@smt/type/handsetPreOrder2023/api';
import { StructuredDialog as Dialog } from "@smt/dialog/SimpleDialog";
import { FormattedMessage } from 'react-intl';
import CtaButton from '@smt/button/CtaButton';
import StyledTextButton from '@smt/component/button/TextButton';
import { localizeStore } from './CollectionMethod';
import { StyledTab, StyledTabContainer, StyledTabTitle } from '../PhoneSelector/SelectPhone';
import { Divider, Paper } from '@material-ui/core';
import { StyledRemark } from '../Main/FooterSummary';
import TextButton from '@smt/component/button/TextButton';
import styled from 'styled-components';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component="div">{children}</Typography>
        </Box> 
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

interface TabProps<T> {
	data: {
		[index: string]: T[];
	},
	value: string|null;
	getSelectedStore: (s: string|null) => void;
}

export interface StoreLocationProps {
	tabProps: TabProps<StoreData>
}

const cache = {
	tabIndex: 0
}

const StyledTabPaper = withStyles((theme) => ({
	root: {
		margin: `0 -${theme.spacing(3)}px`
	}
}))(Paper)

const StyledAppBar= withStyles((theme) => ({
	root: {
		backgroundColor: 'white'
	}
}))(AppBar)

function StoreLocation({tabProps}: StoreLocationProps) {
	const {data, value, getSelectedStore} = tabProps;
  const classes = useStyles();
  const [districtTab, setDistrictTab] = React.useState(cache.tabIndex);
  const handleChange: (v: typeof districtTab) => React.MouseEventHandler<HTMLDivElement> = (newValue) => (event) =>  {
    setDistrictTab(newValue);
		cache.tabIndex = newValue;
  };
  return (
    <StyledTabPaper elevation={0}>
			<StyledAppBar color="transparent" position="sticky" elevation={0}>
				<StyledTabContainer>
					{Object.keys(data).map((dataKey, index) => 
						<StyledTab selected={index==districtTab} onClick={handleChange(index)} key={index}>
							<StyledTabTitle selected={index==districtTab}>
								{dataKey}
							</StyledTabTitle>
						</StyledTab>)}
				</StyledTabContainer>
			</StyledAppBar>
			{Object.values(data).map((dataValue, index) => (
				<TabPanel value={districtTab} key={index} index={index}>
					{dataValue.map((v, i) => <StoreCard data={createStoreCard(v)} checked={value} onChange={getSelectedStore} highlight={i%2 === 0} key={i} hideMap={v.shopId < 0} />)}
				</TabPanel>
			))}
    </StyledTabPaper>
  );
}

interface StoreLocationDialog extends StoreLocationProps {
	show?: boolean;
	onClose: () => void;
}

const StyledContinueBtn = styled(TextButton)`
	max-width: 100%;
	width: 120px;
  padding: ${p => p.theme.spacing(2)}px 0;
  box-sizing: content-box;
	${(p) => p.theme.breakpoints.up('md')} {	
		width: 180px;
	}
`
const StyledTitle = styled.div`
	white-space: pre-wrap;
	${(p) => p.theme.breakpoints.up('md')} {	
		white-space: normal;
	}
`

export default function StoreLocationDialog(props: StoreLocationDialog) {
	const { show = false, onClose, ...restTabProps } = props;
	return <Dialog open={show} onClose={onClose} hideCloseButton={false} maxWidth="md">
		<Dialog.Header>
			<StyledTitle>
				<FormattedMessage id="location-selector.heading" />
			</StyledTitle>
		</Dialog.Header>
		<Dialog.Body>
			<StoreLocation {...restTabProps} />
		</Dialog.Body>
		<Dialog.Action>
			<Box display="flex" flexDirection="column" alignItems="flex-end" width="100%" p={0}>
				<Box>
					<StyledContinueBtn onClick={onClose}>
						<FormattedMessage id="location.continue" />
					</StyledContinueBtn>
				</Box>
			</Box>
		</Dialog.Action>
	</Dialog>
}

export type StoreData = ReturnType<typeof localizeStore>