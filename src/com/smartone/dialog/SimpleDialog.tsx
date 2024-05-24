/**
* com/smartone/dialog/SimpleDialog
**/
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Dialog, DialogTitle, DialogContent, DialogActions, Theme, Typography, DialogProps, DialogActionsProps, withStyles } from '@material-ui/core';
import bp from '@/com/smartone/theme/BreakpointUtils';
import DialogCloseButton from './DialogCloseButton';

const StyledDialog = styled(Dialog)`
	& .MuiDialog-paper {
		width: 100%;
		padding: ${p=>p.theme.spacing(5)}px 0 ${p=>p.theme.spacing(2)}px;
		border-radius: 3rem;
		/* ${props => bp.up('md', (props.theme as Theme).breakpoints, `
			width: 560px;
		`)} */
	}
`;
const StyledDialogTitle = styled(DialogTitle)`
	padding: ${props => (props.theme as Theme).spacing(3)}px;
	padding-bottom: 0;
	text-align: center;
`;
const StyledDialogContent = withStyles((theme) => ({
	root: {
		padding: '0 ' + theme.spacing(3) + 'px'
	}
}))(DialogContent)
interface StyledDialogActionsProps extends DialogActionsProps {
	empty: boolean;
}
const StyledDialogActions = styled(({ empty, ...props}: StyledDialogActionsProps ) => <DialogActions {...props}/>)`
	justify-content: center;
	padding: ${props => (props.theme as Theme).spacing(3)}px;
	${props=>props.empty ? "padding-top:0;" : ""}

	${props => bp.up('md', (props.theme as Theme).breakpoints, `
		padding: ${(props.theme as Theme).spacing(5)}px;
		${props.empty ? "padding-top:0;" : ""}
	`)}
`;
const StructuredDialogAction = styled(StyledDialogActions)`
	border-top: 1px solid #c8c8c8;
` 
const StyledTitle = styled.div`
	text-align: center;
`;
const StyledContent = styled.div<{ center_content: boolean; }>`
	${props => props.center_content ? "text-align: center;" : ""}

	${StyledTitle} + & {
		margin-top: ${props => (props.theme as Theme).spacing(3)}px;
	}
`;
const StyledDialogCloseButton = styled(DialogCloseButton)<{visibility:boolean;}>`
	position: absolute;
	top: 2rem;
	right: 2rem;
	${props => props.visibility ? "" : "visibility: hidden;"}
`;
function Title({ title }: { title: string | undefined; }) {
	return (typeof(title) != 'undefined') ? <StyledTitle><Typography variant="h4" style={{fontSize: '2rem'}}>{title}</Typography></StyledTitle> : null ;
}
function Content({ children, centerContent, disableTypography }: { children: React.ReactNode; centerContent: boolean; disableTypography: boolean; }) {
	if(typeof(children) == 'undefined') {
		return null;
	}
	if(children == null) {
		return null;
	}
	const content = disableTypography ? children : <Typography variant="body2" component="div">{children}</Typography> ;
	return <StyledContent center_content={centerContent}>{content}</StyledContent>;
}
export interface SimpleDialogProps extends DialogProps {
	
	onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick')=>void;
	childrenDisableTypography?: boolean;
	actions?: React.ReactNode;
	hideCloseButton?: boolean;
	centerContent?: boolean;
}
function SimpleDialog({ className, onClose, title, children, childrenDisableTypography=false, centerContent=false, actions, hideCloseButton=false, ...rest }: SimpleDialogProps) {
	
	return (
		<StyledDialog className={className} onClose={onClose} {...rest}>
			<StyledDialogCloseButton onClose={onClose} visibility={!hideCloseButton}/>
			<StyledDialogContent>
				<Title title={title}/>
				<Content centerContent={centerContent} disableTypography={childrenDisableTypography}>{children}</Content>
			</StyledDialogContent>
			<StyledDialogActions empty={actions == undefined}>
				{ actions }
			</StyledDialogActions>
		</StyledDialog>
	);
}
export default SimpleDialog;

interface StructuredDialogProps extends Omit<SimpleDialogProps, 'actions'|'title'> {
	children: Array<Children> | Children
}

export const StructuredDialog = ({ className, onClose,  children, childrenDisableTypography=false, centerContent=false, hideCloseButton=false, ...rest }: StructuredDialogProps) => {
  const subComp = useMemo(() => {
    const getSubComp = getSubCompByDisplayName(children);
    return {
      header: getSubComp("DialogHeader"),
      body: getSubComp("DialogBody"),
      action: getSubComp("DialogAction"),
    };
  }, [children]);

	return <StyledDialog className={className} onClose={onClose} {...rest}>
		<StyledDialogTitle>
			{subComp.header}
			<StyledDialogCloseButton onClose={onClose} visibility={!hideCloseButton}/>
		</StyledDialogTitle>
		<StyledDialogContent>
			<Content centerContent={centerContent} disableTypography={childrenDisableTypography}>{subComp.body}</Content>
		</StyledDialogContent>
		<StructuredDialogAction empty={subComp.action == undefined}>
			{ subComp.action }
		</StructuredDialogAction>
	</StyledDialog>
}

const Header: React.FC<any> = ({ children }) => children;
Header.displayName = "DialogHeader";
StructuredDialog.Header = Header;

const Body: React.FC<any> = ({ children }) => children;
Body.displayName = "DialogBody";
StructuredDialog.Body = Body;

const Action: React.FC<any> = ({ children }) => children;
Action.displayName = "DialogAction";
StructuredDialog.Action = Action;

interface InternalComponentAttr {
  displayName: string;
  name: string;
}
type Children = React.ReactElement<any> & {
	type: InternalComponentAttr;
};

const getSubCompByDisplayName = (children: Array<Children> | Children) => (displayName: string) => {
	return React.Children.map(children, (child) =>
		child.type.displayName === displayName ? child : null
	);
};