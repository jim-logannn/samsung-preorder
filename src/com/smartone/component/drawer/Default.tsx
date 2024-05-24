import { Backdrop, Drawer, withStyles } from '@material-ui/core';
import React from 'react';

interface Props {
	open?: boolean;
}

const StyledDrawer = withStyles((theme) => ({
  root: {
  },
	paperAnchorBottom: {
		top: theme.spacing(5) + 'px',
		borderTopRightRadius: theme.spacing(4) + 'px',
		borderTopLeftRadius: theme.spacing(4) + 'px',
	}
}))(Drawer);

const DefaultDrawer: React.FC<Props> = ({children, open = false}) => {
	return <>
		<Backdrop open={open}/>
		<StyledDrawer open={open} anchor="bottom">
			{children}
		</StyledDrawer>
	</>
}

export default DefaultDrawer;