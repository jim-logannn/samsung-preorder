import React from 'react';
import styled from 'styled-components';
import ListItem from '@smt/component/plan/ListItem';
import GiftCircle from '@smt/component/icon/GiftCircle';
import { ListHeading } from '@smt/component/label';

interface Heading {
	heading: string;
}
type ListItem = {
	icon?: React.ReactElement<any, any> | string;
	description: string;
	price?: string;
	remark?: string;
}
interface Props extends Heading {
		className?: string;
		items: ListItem[];
		globalIcon?: React.ReactElement<any, any>;
}
const StyledListHeading = styled(ListHeading)`
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    span {
        display: inline-block;
        position: relative;
        z-index: 5;
        padding-right: 1.2rem;
        background: white;
        font-family: inherit;
    }
    &:after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: rgba(204, 204, 204, 1);
    }
`;
const List: React.FC<Props> = (props) => {
	const {className, heading, items, globalIcon = <GiftCircle /> } = props;
	return (
		<div className={className}>
			<StyledListHeading><span>{heading}</span></StyledListHeading>
			{items.map((item, index) => <ListItem key={index} {...item} icon={item.icon || globalIcon} />)}
		</div>
		)
}

export default List; 
export type ListProps = Props;