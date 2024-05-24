import appicationContext from '@com/smartone/context/ApplicationContext';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

const StyledDiv = styled.div`
	font-size: 20px;
	color: ${props => props.theme.color};
	${props => props.theme.breakpoints.down('md')} {
		color: #00f;
	};
`

const SampleComponent = ({text = 'React Works'}: {text?: string}) => {
	const {locale} = useIntl();
	const appContext = useContext(appicationContext)
	return <StyledDiv>
		{text}
		<br/>
		intl: {locale}
		<br />
		default context: {appContext?.domain}
		<br />
		custom context: {JSON.stringify(appContext)}
	</StyledDiv>
}

export default SampleComponent