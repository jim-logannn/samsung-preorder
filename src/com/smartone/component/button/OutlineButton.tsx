import { Theme } from '@material-ui/core';
import styled from 'styled-components';

const createHoverStyle = (activeHoverStyle: boolean) => {
	if (activeHoverStyle) {
		return {}
	} else {
		return {
			'&:hover': {
				'text-decoration': 'underline'
			}
		}
	}
}
const StyledOutlineButton = styled.button<{theme: Theme; disabled?: boolean; selected?: boolean;}>(({ theme, disabled, selected }) => ({
	position: 'relative',
	padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
	border: `1px solid ${theme.palette.divider}`,
	background: `${disabled ? theme.palette.divider : 'none'}`,
	color: `${selected ? theme.palette.primary.main : (disabled ? '##9E9E9E' : theme.palette.text.primary) }`,
	cursor: `${selected || disabled ? 'default' : 'pointer'}`,
	...createHoverStyle(selected === true || disabled === true),
	'&::before': {
		content: '""',
		display: `${selected ? 'block' : 'none'}`,
		position: 'absolute',
		top: '-1px',
		left: '-1px',
		bottom: '-1px',
		right: '-1px',
		zIndex: '1',
		border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
	},
	'&>*': {
		position: 'relative',
		zIndex: '2'
	}
}))

export default StyledOutlineButton;