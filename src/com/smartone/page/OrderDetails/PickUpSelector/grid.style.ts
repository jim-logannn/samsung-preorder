import { OutlineButton } from "@smt/component/button"
import styled from "styled-components"

export const StyledWrapper = styled.div`
	position: relative;
	display: grid; 
  gap: 0 0;
	border: 1px solid ${p=>p.theme.palette.divider};
	border-radius: 4px;
`
export const StyledItem = styled.div<{rowEnd: boolean, colEnd: boolean, disabled?: boolean}>(({theme, rowEnd = false, colEnd = false, disabled = false}) => ({
	position: 'relative',
	borderRight: `${rowEnd ? 'none' : '1px solid ' + theme.palette.divider}`,
	borderBottom: `${colEnd ? 'none' : '1px solid ' + theme.palette.divider}`,
	background: `${disabled ? theme.palette.divider : 'white'}`,
}))
export const StyledButton = styled(OutlineButton)`
	position: static;
	width: 100%;
	border: none;
	border-radius: 4px;
	&:before {
		border-radius: 4px;
	}
`