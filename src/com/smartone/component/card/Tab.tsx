import React from "react";
import fontSizeAdjustByChars from "@smt/util/charUtil";
import styled from "styled-components";

interface Props {
  className?: string;
  iconPath?: string;
  content?: string | JSX.Element;
}
const StyledPlanTag = styled.div<{ needSpacer: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${(p) => p.theme.spacing(1)}px ${(p) => p.theme.spacing(3)}px;
  margin-bottom: ${(p) => (p.needSpacer ? p.theme.spacing(2)+'px' : p.theme.spacing(1)+'px')};
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background: #ff0000;
  font-weight: 500;
  color: #fff;
  ${(p) => p.theme.breakpoints.up("md")} {
    padding: ${(p) => p.theme.spacing(1)}px ${(p) => p.theme.spacing(3)}px;
  }
  img {
    margin-right: ${(p) => p.theme.spacing(1)}px;
  }
`;
const StyledTagWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;
const StyledTagContent = styled.div<{  typoStyle?: ReturnType<typeof fontSizeAdjustByChars> }>`
  overflow: hidden;
  display: -webkit-box;
  width: 100%;
  line-height: ${(props) => props.typoStyle?.lineHeight || "inherit"};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  font-size: ${(p) => p.theme.typography.h6};
`;
const Tab = ({
  className,
  iconPath,
  content = "content here",
}: Props) => {
  return (
    <StyledPlanTag className={className} needSpacer>
      {typeof iconPath === "string" && <img src={iconPath} alt="" />}
      <StyledTagWrapper>
        {/*  max 75 characters */}
        {(typeof content === "string" && (
          <StyledTagContent typoStyle={fontSizeAdjustByChars(content)}>
            {content}
          </StyledTagContent>
        )) || <StyledTagContent>{content}</StyledTagContent>}
      </StyledTagWrapper>
    </StyledPlanTag>
  );
};

export default Tab;
export type TabProp = Props;
