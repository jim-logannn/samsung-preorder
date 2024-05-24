import React from 'react';
import styled from 'styled-components';
import Remark from '@smt/component/plan/Remark';

const ICON_SIZE = 27;

interface Props {
	className?: string;
	icon: React.ReactElement<any, any> | string;
	description: string;
	price?: string;
	remark?: string;
}

const StyledListItemWrapper = styled.div`
		width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0;
    font-size: ${(p) => p.theme.typography.h6.fontSize};
`;
const StyledPlanDetailChild = styled.div`
    margin: 0 0.6rem;
    font-weight: 300;
    font-size: ${(props) => props.theme.typography.p.fontSize};
    ${(p) => p.theme.breakpoints.up('md')} {
        font-size: ${(props) => props.theme.typography.h6.fontSize};
    }
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
    span {
        margin-left: 0.3rem;
        color: #ff0000;
        font-family: inherit;
        font-weight: 300;
    }
`;
const ListItem: React.FC<Props> = (props) => {
	const {className, icon, description, price, remark} = props;
	return (
		<StyledListItemWrapper className={className}>
			<StyledPlanDetailChild>
					{typeof icon === 'string' && <img src={icon} alt="" width={ICON_SIZE} />}
					{typeof icon !== 'string' && React.cloneElement(icon)}
			</StyledPlanDetailChild>
			<StyledPlanDetailChild>
					{description}
					<span>{price}</span>
					{!!remark?.length && <Remark content={remark} onDisplayRemark={console.log} />}
			</StyledPlanDetailChild>
		</StyledListItemWrapper>
	)
}

export default ListItem;
export type ListItemProps = Props;