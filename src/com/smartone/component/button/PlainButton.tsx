import styled from "styled-components";

const StyledPlainButton = styled.button<{disabled?: boolean}>`
	padding: ${p => p.theme.spacing(1)}px;
	border: none;
	background: none;
	text-align: right;
	text-decoration: underline;
  font-size: ${(p) => p.theme.typography.body1};
	color: ${p => p.theme.palette.text.light};
	cursor: pointer;
`

export default StyledPlainButton;