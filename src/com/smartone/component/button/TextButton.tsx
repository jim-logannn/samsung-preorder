import styled from "styled-components";

const StyledTextButton = styled.button<{disabled?: boolean}>`
	width: 140px;
	padding: ${p => p.theme.spacing(1)}px;
	border-radius: 30px;
	border: none;
	background-color: ${(p) => p.disabled ? p.theme.palette.text.lighter : p.theme.palette.primary.main};
  font-size: ${(p) => p.theme.typography.body2};
	color: white;
	cursor: pointer;
`

export default StyledTextButton;