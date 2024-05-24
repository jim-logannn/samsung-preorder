import styled from "styled-components";

const StyledSwiperNavigation = styled.button<{ show?: boolean }>`
    position: absolute;
    top: 30%;
    z-index: 20;
    width: 8rem;
    height: 8rem;
    background: #ffffff;
    border-radius: 4rem;
    border: none;
    box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.2);
    display: ${(p) => (p.show ? 'block' : 'none')};
    ${(p) => p.theme.breakpoints.up('md')} {
        top: 45%;
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
    }
`;

const StyledSwiperNavigationNext = styled(StyledSwiperNavigation)`
    right: 0.5rem;
    transform: translateX(55%) translateY(50%);
    ${(p) => p.theme.breakpoints.up('md')} {
        right: 0;
        transform: translateY(-50%) translateX(50%);
    }
    svg {
        transform: translateX(-200%) scale(2);
        ${(p) => p.theme.breakpoints.up('md')} {
            transform: translateY(3px);
        }
    }
`;
const StyledSwiperNavigationPrev = styled(StyledSwiperNavigation)`
    left: 0.5rem;
    transform: translateX(-55%) translateY(50%);
    ${(p) => p.theme.breakpoints.up('md')} {
        left: 0;
        transform: translateY(-50%) translateX(-50%);
    }
    svg {
        transform: translateX(200%) scale(2);
        ${(p) => p.theme.breakpoints.up('md')} {
            transform: translateY(3px);
        }
    }
`;

export {
	StyledSwiperNavigation,
	StyledSwiperNavigationNext,
	StyledSwiperNavigationPrev
};