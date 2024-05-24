/**
 * com/smartone/button/CtaButton
 **/
import React from "react";
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';


import { Button, ButtonProps } from "@material-ui/core";
import StringUtils from '@smt/util/StringUtils';

const StyledButton = styled(Button)`
	&,
	&:focus {
		outline: none;
	}
`;
interface StyledDisabledWrapper extends React.HTMLAttributes<HTMLDivElement> {
	color?: React.ComponentProps<typeof Button>["color"] | "white";
	fullWidth?: boolean;
}
const StyledDisabledWrapper = styled(({color, fullWidth, ...props }: StyledDisabledWrapper)=><div {...props}/>)`
	display: inline-flex;
	cursor: not-allowed;

	${props=>(props.color=="white") ? `
		& .MuiButton-root.Mui-disabled {
			color: rgba(255,255,255,0.5);
			border-color: rgba(255,255,255,0.5);
		}
	` : ""}

	${props=>(props.fullWidth == true) ? "width:100%;" : ""}
`;
// temporary work-around (see https://github.com/yahoo/babel-plugin-react-intl/issues/119)
interface FormattedMessageFixedProps {
	[propName: string]: any;
}
function FormattedMessageFixed(props: FormattedMessageFixedProps) {
	return <FormattedMessage {...props} />;
}
//type Sizes = BreakpointStyles<BreakpointUp<SizeVariation> | BreakpointOnly<SizeVariation> | BreakpointDown<SizeVariation>>;
interface Props extends Omit<ButtonProps, "color"> {
	component?: React.ElementType;
	className?: string;
	messageId?: any;
	color?: React.ComponentProps<typeof Button>["color"] | "white";
}
function CtaButton({ className, color="primary", messageId, disabled, children, variant="contained", onClick, ...rest}: Props){
	const buttonContent = StringUtils.isBlank(messageId) ? children : <FormattedMessageFixed id={messageId}/> ;

	const buttonColor: React.ComponentProps<typeof Button>["color"] = (color == "white") ? "inherit" : color ;
	const style: React.CSSProperties = ((color == "white") && (disabled != true)) ? { 
		color: "#fff"
	} : {} ;
	const button = <StyledButton style={style} className={className} variant={variant} disableElevation={true} disabled={disabled} color={buttonColor} onClick={onClick} {...rest}>{buttonContent}</StyledButton>;
	if(disabled == true) {
		return <StyledDisabledWrapper fullWidth={rest.fullWidth} color={color}>{button}</StyledDisabledWrapper>;
	}
	return button;
}
export default CtaButton;