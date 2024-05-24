import React from "react";
import styled from "styled-components";

interface Props {
  className?: string;
  show?: boolean;
  content?: string | JSX.Element;
}

const StyledPlanHeader = styled.div<{ show: boolean }>`
  padding: ${(p) => p.theme.spacing(1)}px ${(p) => p.theme.spacing(3)}px;
  border-radius: 3rem;
  background: #ebebed;
  opacity: ${(p) => (p.show ? 1 : 0)};
  font-size: ${(props) => props.theme.typography.subTitle1.fontSize};
  font-weight: 500;
  color: #ff0000;
`;

const StatusBar: React.FC<Props> = ({
  className,
  show = true,
  content = "Text show up here",
}) => {
  return (
    <StyledPlanHeader className={className} show={show}>
      {content}
    </StyledPlanHeader>
  );
};

export default StatusBar;
