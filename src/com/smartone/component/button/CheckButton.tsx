import React from 'react';
import styled from "styled-components";

const DEFAULT_SIZE = 28;

interface Props {
	checked?: boolean;
	size?: number;
	onClick: (e: React.MouseEvent) => void;
}

const StyledCheckButton = styled.button<{checked: boolean, size: number}>`
	position: relative;
	width: ${({size}) => size}px;
	height: ${({size}) => size}px;
	padding: 0;
	border-radius: ${({size}) => size*0.5}px;
	border: 1px solid ${({theme}) => theme.palette.divider};
	background: none;
	cursor: pointer;
	min-width: ${({size}) => size}px;
`

const Inner = styled.div`
	position: absolute;
	display: flex;
	top: 50%;
	left: 50%;
	justify-content: center;
	align-items: center;
	transform: translate(-50%, -50%);
`

const CheckButton: React.FC<Props> = ({ children, checked = false, size = DEFAULT_SIZE, onClick}) => (
	<StyledCheckButton onClick={onClick} checked={checked} size={size}>
		<Inner>
			{children}
		</Inner>
	</StyledCheckButton>
)

export default CheckButton;