import React from 'react';
import styled from 'styled-components';

const ICON_SIZE = 27;

interface Props {
	icon: React.ReactElement<any, any> | string;
}

const StyledContainer = styled.div`
		width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0;
    font-size: ${(p) => p.theme.typography.body2};
`;
const StyledPlanDetailChild = styled.div`
    margin: 0 0.6rem;
    font-size: ${(p) => p.theme.typography.body2};
    &:first-child {
        margin-left: 0;
    }
    &:nth-child(2) {
        flex-grow: 1;
        line-height: 26px;
    }
    &:last-child {
        margin-right: 0;
    }
`;

const WithIcon: React.FC<Props> = ({icon, children}) => {
	return <>
		<StyledContainer>
			<StyledPlanDetailChild>
				{typeof icon === 'string' && <img src={icon} alt="" width={ICON_SIZE} />}
				{typeof icon !== 'string' && React.cloneElement(icon)}
			</StyledPlanDetailChild>
			<StyledPlanDetailChild>
				{children}
			</StyledPlanDetailChild>
		</StyledContainer>
	</>
}

export default WithIcon;