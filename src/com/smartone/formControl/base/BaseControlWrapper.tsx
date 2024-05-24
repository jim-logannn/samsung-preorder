/**
* com/smartone/formControl/base/BaseControlWrapper
**/
import React from 'react';
import styled from 'styled-components';
import { Theme, Typography } from '@material-ui/core';
import { isBlank } from '@smt/util/StringUtils';

interface StyledWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	fullWidth?: boolean;
}
const StyledWrapper = styled(({fullWidth, ...props}: StyledWrapperProps)=><div {...props}/>)`
	display: inline-flex;
	flex-direction: column;
	${props => props.fullWidth ? "width:100%;" : "" }
`;
const StyledLabel = styled.div`
	margin-bottom: ${props=>(props.theme as Theme).spacing(1)}px;
`;
export interface BaseControlWrapperProps {
	className?: string;
	label?: React.ReactNode;
	labelDisableTypography?: boolean;
	fullWidth?: boolean;
	children?: React.ReactNode;
}
function Label({label, labelDisableTypography}: { label?: React.ReactNode; labelDisableTypography?: boolean; }) {
	if(label) {
		if((typeof(label) == "string") && isBlank(label)) {
			return null;
		}
		return <StyledLabel>{ labelDisableTypography ? label : <Typography variant="body2">{label}</Typography> }</StyledLabel>;
	}
	return null;
}
function BaseControlWrapper({ className, label, labelDisableTypography, fullWidth, children }: BaseControlWrapperProps) {
	return (
		<StyledWrapper className={className} fullWidth={fullWidth}>
			<Label label={label} labelDisableTypography={labelDisableTypography}/>
			{ children }
		</StyledWrapper>
	);
}
export default BaseControlWrapper;