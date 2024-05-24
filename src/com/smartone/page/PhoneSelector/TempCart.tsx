import { TextButton } from "@smt/component/button";
import React from "react";
import styled from "styled-components";
import { SelectedPhoneData } from "./SelectPhone";
import { formatPrice } from "../../util/StringUtils";
import { OrderStep } from "../Main/MainController";

const StyledWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
`;
const StyledItem = styled.div`
	margin: 0 ${p => p.theme.spacing(2)}px;
`
const StyledItemAlignCenter = styled(StyledItem)`
	align-self: center;
`
const StyledLabel = styled.div`
	margin-bottom: ${p => p.theme.spacing(1)}px;
  font-size: ${(p) => p.theme.typography.body2};
`;
const StyledError = styled.div`
	margin-bottom: ${p => p.theme.spacing(1)}px;
  font-size: ${(p) => p.theme.typography.body2};
  color: #ff0000;
`;
const StyledValue = styled.div`
  font-size: ${(p) => p.theme.typography.body1};
  color: ${(p) => p.theme.palette.primary.main};
`;
const StyledValueEnlarge = styled.span`
  font-size: ${(p) => p.theme.typography.body2};
  color: ${(p) => p.theme.palette.primary.main};
`
const StyledFootNote = styled.div`
  font-size: ${(p) => p.theme.typography.body1};
  color: ${(p) => p.theme.palette.text.light};
`
interface SelectedHandsetProps {
	selectedPhoneData?: SelectedPhoneData;
	currentStep: OrderStep;
	setCurrentStep: (value: OrderStep) => void;
}
const SelectedHandset = ({selectedPhoneData}:{selectedPhoneData?:SelectedPhoneData}) => {
  const selectedPhone = selectedPhoneData?.model;
  const selectedAcp = selectedPhoneData?.acp;
  const price = formatPrice( (selectedPhone?.price || 0) + (selectedAcp?.price || 0) );
  const error = "Please select a phone";
  return (
    <StyledItem>
      <StyledLabel>iPhone price</StyledLabel>
      <StyledValue>HK$ <StyledValueEnlarge>{price}</StyledValueEnlarge></StyledValue>   
      {selectedAcp && <StyledFootNote>AppleCare+ included</StyledFootNote>}
    </StyledItem>
  )
}


const TempCart = ({selectedPhoneData, currentStep, setCurrentStep}:SelectedHandsetProps) => {
  const disable = selectedPhoneData?.model?false:true;
  return (
    <StyledWrapper>
      <SelectedHandset selectedPhoneData={selectedPhoneData}/>
      <StyledItemAlignCenter>
        <TextButton disabled={disable}>Next</TextButton>
      </StyledItemAlignCenter>
    </StyledWrapper>
  );
}

export default TempCart;

