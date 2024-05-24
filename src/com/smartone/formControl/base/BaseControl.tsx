/**
* com/smartone/formControl/base/BaseControl
**/
import { FormControl, FormControlProps, FormHelperText, Theme, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import BaseControlWrapper, { BaseControlWrapperProps } from './BaseControlWrapper';

const StyledWrapper = styled.div<{ fullwidth: boolean|undefined; }>`
	display: inline-flex;
	flex-direction: column;
	${props => props.fullwidth ? "width:100%;" : "" }
`;
const StyledFormControl = styled(FormControl)`
	
`;
const StyledLabel = styled.div`
	margin-bottom: ${props=>(props.theme as Theme).spacing(1)}px;
`;
export interface BaseControlProps extends BaseControlWrapperProps, FormControlProps {
	helperText?: string;
}
function BaseControl({ label, labelDisableTypography, helperText, children, fullWidth, ...rest }: BaseControlProps) {

	return (
		<BaseControlWrapper label={label} labelDisableTypography={labelDisableTypography} fullWidth={fullWidth}>
			<StyledFormControl fullWidth={true} {...rest}>
				{ children }
				<FormHelperText>{helperText}</FormHelperText>
			</StyledFormControl>
		</BaseControlWrapper>
	);
}
export default BaseControl;