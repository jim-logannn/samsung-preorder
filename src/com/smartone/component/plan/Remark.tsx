import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

export interface RemarkProps {
		className?: string;
    content: string;
		iconSize?: `${number}px`;
		onDisplayRemark?: (v: string | JSX.Element) => void;
}

export const StyledRemarkButton = styled.button`
    position: relative;
    display: inline-block;
    margin-left: 0.6rem;
    vertical-align: middle;
    background: none;
    border: none;
`;
const IconRemark: React.FC<{color: `#${string}`, size: RemarkProps['iconSize']}> = (props) => {
    const { color, size } = props;
    return (
        <svg width={size} height={size} viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <circle id="Ellipse_81" fill={color} cx="13" cy="13" r="13"></circle>
            <path
                d="M16.796,9.89181818 C16.8265145,9.40235787 16.8320368,8.91165944 16.8125455,8.42163636 C16.6435455,6.83445455 15.5290909,5.97290909 13.0957273,5.97290909 C10.7309091,5.97290909 9.53136364,6.851 9.295,8.28690909 C9.20938566,8.84010113 9.16985589,9.39944726 9.17681818,9.95918182 L11.5759091,9.95918182 C11.5759091,9.80672727 11.6101818,9.04681818 11.6267273,8.89554545 C11.6940909,8.35545455 12.1171818,8.01745455 12.8605455,8.01745455 C13.7386364,8.01745455 14.0600909,8.35545455 14.1274545,8.96290909 C14.1445608,9.25535612 14.1445608,9.54855297 14.1274545,9.841 C14.0423636,11.4636364 11.3052727,11.9529091 11.4577273,15.7713636 L13.637,15.7713636 C13.5519091,12.7470909 16.627,12.3251818 16.796,9.89181818 Z M13.8568182,19.539 L13.8568182,16.5655455 L11.2887273,16.5655455 L11.2887273,19.539 L13.8568182,19.539 Z"
                id="Path_181"
                fill="#FFFFFF"
                fillRule="nonzero"
            ></path>
        </svg>
    );
};

const Remark: React.FC<RemarkProps> = (props) => {
    const { className, content, iconSize = '18px', onDisplayRemark } = props;
    const [color, setColor] = useState<`#${string}`>('#cccccc');
		const onClickHandler = useCallback(() => {
			if (typeof onDisplayRemark === 'function') {
				onDisplayRemark(content);
			}
		}, [content]);
    return (
        <StyledRemarkButton
						className={className}
            onClickCapture={onClickHandler}
            onMouseEnter={() => setColor('#666666')}
            onMouseLeave={() => setColor('#cccccc')}
        >
            <IconRemark color={color} size={iconSize} />
        </StyledRemarkButton>
    );
};

export default Remark;