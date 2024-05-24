import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyledFooter, StyledStickyFooter, StyledPage, StyledPageWrapper, StyleBody } from "./Style";

interface InternalComponentAttr {
  displayName: string;
  name: string;
}
type Children = React.ReactElement<any> & {
  type: InternalComponentAttr;
};

const getSubCompByDisplayName =
  (children: Array<Children> | Children) => (displayName: string) => {
    return React.Children.map(children, (child) =>
      child.type.displayName === displayName ? child : null
    );
  };

const Page = ({ children }: { children: Array<Children> | Children }) => {
  const subComp = useMemo(() => {
    const getSubComp = getSubCompByDisplayName(children);
    return {
      header: getSubComp("PageHeader"),
      voucher: getSubComp("PageVoucher"),
      body: getSubComp("PageBody"),
      footer: getSubComp("PageFooter"),
      stickyFooter: getSubComp("PageStickyFooter"),
    };
  }, [children]);

  const [pageRemainSpace, setPageRemainSpace] = useState(0);
  const stickyFooterRef = useRef(null);

  useEffect(() => {
    const _ref = stickyFooterRef.current as HTMLDivElement | null;
    if (_ref !== null) {
      setPageRemainSpace(_ref.clientHeight);
    }
  }, [stickyFooterRef]);

  return (
    <StyledPage mb={pageRemainSpace}>
      {subComp.header}
      {subComp.voucher}
      <StyleBody>{subComp.body}</StyleBody>
      <StyledFooter className="page__footer">{subComp.footer}</StyledFooter>
      {subComp.stickyFooter.length > 0 && <StyledStickyFooter
        ref={stickyFooterRef}
        className="page__footer--sticky"
      >
        <StyledPageWrapper>{subComp.stickyFooter}</StyledPageWrapper>
      </StyledStickyFooter>}
    </StyledPage>
  );
};

const Header: React.FC<any> = ({ children }) => children;
Header.displayName = "PageHeader";
Page.Header = Header;

const Voucher: React.FC<any> = ({ children }) => children;
Voucher.displayName = "PageVoucher";
Page.Voucher = Voucher;

const Body: React.FC<any> = ({ children }) => children;
Body.displayName = "PageBody";
Page.Body = Body;

const Footer: React.FC<any> = ({ children }) => children;
Footer.displayName = "PageFooter";
Page.Footer = Footer;

const StickyFooter: React.FC<any> = ({ children }) => children;
StickyFooter.displayName = "PageStickyFooter";
Page.StickyFooter = StickyFooter;

export default Page;
