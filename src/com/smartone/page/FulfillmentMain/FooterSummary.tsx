import { TextButton } from "@smt/component/button";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { formatDefaultCurrencyPrice, formatPrice } from "@smt/util/StringUtils";
import { SelectedPhoneData } from "../PhoneSelector/SelectPhone";
import { StyledStickyFooter } from "../Base/Style";
import { useIntl } from "react-intl";
import { OrderStep } from "../Main/MainController";
import { getAppleCarePlusOffer, getSelectedHandset, STEP } from ".";
import { FulfillmentRawOfferData } from "@smt/type/handsetPreOrder2023/fulfillment";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${(p) => p.theme.breakpoints.up("md")} {
	}
`;
const StyledItem = styled.div`
	margin: 0 ${p => p.theme.spacing(1)}px;
	${(p) => p.theme.breakpoints.up("md")} {
		margin: 0 ${p => p.theme.spacing(2)}px;
	}
`
const StyledItemAlignCenter = styled.div`
	align-self: center;
`
const StyledLabel = styled.div`
	font-size: ${(p) => p.theme.typography.body1};
  ${(p) => p.theme.breakpoints.up("md")} {
		font-size: ${(p) => p.theme.typography.body2};
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
	max-width: 1200px;
	margin: 0 auto;
	justify-content: ${p=>p.onlyButton ? 'flex-end' : 'space-between'};
  ${(p) => p.theme.breakpoints.up("md")} {
		justify-content: flex-end;
	}
` 
interface SelectedHandsetProps extends Omit<FooterSummaryProps, 'children'> {}

const SelectedHandset = ({ handsetPrice, appleCarePlusPrice, currentStep }: SelectedHandsetProps) => {
  const intl = useIntl();
  const msgError = intl.formatMessage({id: "footer.summary.error.select-plan"});
  const msgiphonePrice = intl.formatMessage({id: "footer.summary.iphone-price"});
  const msgApplecare = intl.formatMessage({id: "footer.summary.applecare"});
  return (
    <StyledWrapper>
      <StyledItem>
        <StyledLabel>{msgiphonePrice}</StyledLabel>
        {handsetPrice ?
          <StyledValue><StyledValueEnlarge>{formatDefaultCurrencyPrice(handsetPrice)}</StyledValueEnlarge></StyledValue> :
          <StyledError>{msgError}</StyledError>
        }
      </StyledItem>
      {appleCarePlusPrice &&
        <>
          <StyledItemAlignCenter>
            <StyledLabel style={{ marginBottom: 0 }}>+</StyledLabel>
          </StyledItemAlignCenter>
          <StyledItem>
            <StyledLabel>{msgApplecare}</StyledLabel>
              <StyledValue><StyledValueEnlarge>{formatDefaultCurrencyPrice(appleCarePlusPrice)}</StyledValueEnlarge></StyledValue>
          </StyledItem>
        </>
      }
    </StyledWrapper>
  )
}
interface FooterSummaryProps {
	handsetPrice?: number;
	appleCarePlusPrice?: number;
	currentStep: STEP;
}

const FooterSummary: React.FC<FooterSummaryProps> = (p) => {
	const {children, ...rest} = p;
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
      <StyledTableWrapper onlyButton={false}>        
				<SelectedHandset {...rest} />
        <StyledItemAlignCenter>
          {children}
        </StyledItemAlignCenter>
      </StyledTableWrapper>
    </StyledStickyFooter>
  );
}

export default FooterSummary;

