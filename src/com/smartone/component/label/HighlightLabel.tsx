import styled from "styled-components";

const StyledHighlightLabel = styled.div<{color?: string; bgColor?: string}>`
	display: inline-block;
	padding: ${p => p.theme.spacing(0.5)}px ${p => p.theme.spacing(1)}px;
	margin-bottom: ${p => p.theme.spacing(1)}px;
	border-radius: 4px;
	background: ${p => p.bgColor || '#FFE9E9'};
	font-size: ${p => p.theme.typography.body2};
	font-weight: 500;
	color: ${p => p.color || '#FF0000'};
`

export default StyledHighlightLabel;