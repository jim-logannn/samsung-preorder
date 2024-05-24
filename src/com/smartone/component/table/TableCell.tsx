import styled from 'styled-components';

const StyledDefaultTableCell = styled.td`
	padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(2)}px;
	vertical-align: top;
	text-align: left;
	font-size: ${p => p.theme.typography.body2};
`

export default StyledDefaultTableCell