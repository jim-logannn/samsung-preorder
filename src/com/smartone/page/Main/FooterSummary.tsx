import { TextButton } from "@smt/component/button";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { formatDefaultCurrencyPrice, formatPrice } from "@smt/util/StringUtils";
import { SelectedPhoneData } from "../PhoneSelector/SelectPhone";
import { StyledStickyFooter } from "../Base/Style";
import { PlanReviewData } from "@smt/type/mobilePlan";
import { OrderStep } from "./MainController";
import { useIntl } from "react-intl";
import { voucherData } from '@smt/component/voucher/Voucher';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${(p) => p.theme.breakpoints.up("md")} {
	}
`;
const StyledItem = styled.div`
  display: flex;
  align-items: start;
  flex-flow: column;
	margin-right: ${p => p.theme.spacing(2)}px;
	${(p) => p.theme.breakpoints.up("md")} {
		margin-right: ${p => p.theme.spacing(4)}px;
	}
`
const StyledItemAlignCenter = styled.div`
	align-self: center;
`
const StyledLabel = styled.div`
	font-size: ${(p) => p.theme.typography.body1};
  & > span {
    margin-right: 2px;
    ${p => p.theme.typography.h4};
  }
`;
export const StyledRemark = styled.div`
	font-size: ${(p) => p.theme.typography.body1};
  max-width: 280px;
  font-size: 1.2rem;
  ${(p) => p.theme.breakpoints.up("md")} {
    font-size: 1.2rem;
  }
`;
const StyledError = styled.div`
	margin-bottom: ${p => p.theme.spacing(1)}px;
  color: #ff0000;
	font-size: ${(p) => p.theme.typography.body1};
	font-weight: bold;
  ${(p) => p.theme.breakpoints.up("md")} {
		font-size: ${(p) => p.theme.typography.body2};
	}
`;
const StyledValue = styled.div`
  font-weight: 400;
  color: ${(p) => p.theme.palette.primary.main};
	font-size: ${(p) => p.theme.typography.body1};
  ${(p) => p.theme.breakpoints.up("md")} {
		font-size: ${(p) => p.theme.typography.body2};
	}
`;
const StyledValueEnlarge = styled.span`
  color: ${(p) => p.theme.palette.primary.main};
  font-weight: 400;
	font-size: ${(p) => p.theme.typography.body1};
  ${(p) => p.theme.breakpoints.up("md")} {
		font-size: ${(p) => p.theme.typography.body2};
	}
`
const StyledFootNote = styled.div`
  font-size: ${(p) => p.theme.typography.body1};
  color: ${(p) => p.theme.palette.text.light};
`
const StyledTableWrapper = styled(StyledWrapper)<{onlyButton: boolean}>`
  color: ${(p) => p.theme.palette.text.primary};
	justify-content: ${p=>p.onlyButton ? 'flex-end' : 'space-between'};
  ${(p) => p.theme.breakpoints.up("md")} {
		justify-content: flex-end;
	}
` 
interface SelectedHandsetProps {
  selectedPhoneData?: SelectedPhoneData;
	noticePlanSelect?: boolean;
  children?: React.ReactNode;
  currentStep?: OrderStep;
  voucherData: voucherData;
}

const SelectedHandset = ({ selectedPhoneData, hideSelection, voucherData }: { selectedPhoneData?: SelectedPhoneData, hideSelection: boolean, voucherData: voucherData }) => {
  const intl = useIntl();
  const quantity:number = selectedPhoneData? selectedPhoneData.length:0;
  const number = intl.formatMessage({id: "footer.select-phone.quantity"}, {no: quantity});
  const message = intl.formatMessage({id: "footer.select-phone.selected"}, {number: "<span>"+number+"</span>"});
  const remark = intl.formatMessage({id: "footer.select-phone.remark"});
  const remarkVoucher = intl.formatMessage({id: "footer.select-phone.remark-voucher"});
  return (
    <StyledWrapper>
      <StyledItem>
				{!hideSelection && 
        	<StyledLabel dangerouslySetInnerHTML={{__html: message}}></StyledLabel>
				}
        {quantity > 0 &&
          <StyledRemark>{(voucherData != null && voucherData.length > 0)?remarkVoucher:remark}</StyledRemark>
        }
      </StyledItem>
    </StyledWrapper>
  )
}
const FooterSummary = ({ selectedPhoneData, currentStep, children, voucherData }: SelectedHandsetProps) => {
	
  const stickyFooterRef = useRef(null);
	useEffect(() => {
    const _ref = stickyFooterRef.current as HTMLDivElement | null;
    if (_ref !== null) {
			if (document) {
				document.body.style.paddingBottom = `${_ref.clientHeight}px`;
			}
    }
		return () => {
			document.body.style.paddingBottom = '0px';
		};
  }, [stickyFooterRef]);

  return (
    <StyledStickyFooter ref={stickyFooterRef}>
      <StyledTableWrapper onlyButton={currentStep===OrderStep.STEP_SELECT_IPHONE}>        
        {(currentStep==OrderStep.STEP_SELECT_IPHONE || currentStep==OrderStep.STEP_COLLECTION_METHOD) &&
          <SelectedHandset selectedPhoneData={selectedPhoneData} hideSelection={currentStep!==OrderStep.STEP_SELECT_IPHONE} voucherData={voucherData}/>
        }
        <StyledItemAlignCenter>
          {children}
        </StyledItemAlignCenter>
      </StyledTableWrapper>
    </StyledStickyFooter>
  );
}

export default FooterSummary;

