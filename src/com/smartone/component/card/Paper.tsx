import React from 'react';
import styled from 'styled-components';

const StylePaper = styled.div`
	overflow: hidden;
	position: relative;
	padding: ${p => p.theme.spacing(3)}px ${p => p.theme.spacing(2)}px;
	margin: 0 ${p=>p.theme.spacing(1)}px;
	background: white;
	box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
  ${(p) => p.theme.breakpoints.up("md")} {
		margin: 0;
		padding: ${p => p.theme.spacing(5)}px;
	}
`

export default StylePaper;