import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AppleEmailField from "@smt/field/phone/AppleEmailField";
import LastNameField from "@smt/field/phone/LastNameField";
import FirstNameField from "@smt/field/phone/FirstNameField";
import CheckButton from "../button/CheckButton";
import DetailAccordion from "../accordion/DetailAccordion";
import { formatDefaultCurrencyPrice } from "@smt/util/StringUtils";
import { FormattedMessage, useIntl } from "react-intl";
import { CheckboxProps, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { BsFillCheckCircleFill } from "../icon";
import { AppleCarePlusInfo } from "@smt/type/handsetPreOrder2023/fulfillment";
import { Img } from "@smt/page/FulfillmentMain";
import { OrderFormProps } from "@smt/page/FulfillmentMain/OrderForm";

const StyledDisabledOverlay = styled.div`
  background: #ccc;
  opacity: 60%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
const StyledOfferContainer = styled.div<{selected?: boolean;disable?: boolean;}>`
  display: flex;
  ${(p) => p.theme.typography.body1};
  vertical-align: top;
  margin: 0 0 ${(p) => p.theme.spacing(5)}px;
  align-items: center;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing(3)}px;
  border-radius: ${(p) => p.theme.spacing(2)}px;
  box-sizing: border-box;
  &:last-child {
    margin: 0;
  }
  position: relative;
  overflow: hidden;
  border: ${(p) => p.selected ? "2px solid" + p.theme.palette.primary.main : "1px solid" + p.theme.palette.divider};
  ${(p) => (p.disable ? "cursor: not-allowed;" : "cursor: pointer;")};
  ${(p) => p.theme.breakpoints.down('md')} {
    padding: ${(p) => p.theme.spacing(3)}px ${(p) => p.theme.spacing(2)}px;
  }
`;
const StyledOfferLeft = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
`;
const StyledOfferLeftTop = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const StyledOfferLeftBottom = styled.div``;
const StyledOfferImage = styled(p => <Img {...p} />)`
`;
const StyledOfferDetail = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 ${(p) => p.theme.spacing(2)}px;
  flex: 1 1 auto;
`;
const StyledOfferDetailTitle = styled.div`
  ${(p) => p.theme.typography.body2};
`;
const StyledOfferDetailPrice = styled.div`
  ${(p) => p.theme.typography.body1};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 4px;
  ${(p) => p.theme.breakpoints.up("md")} {
    align-items: center;
    flex-direction: row;
  }
`;
const StyledOfferDetailPriceFree = styled.div<{ disable?: boolean }>`
  color: ${(p) => p.theme.palette.primary.main};
  border-radius: 4px;
  padding: 4px 10px;
  margin-right: ${(p) => p.theme.spacing(1)}px;
  ${(p) =>
    p.disable ? "background: #9E9E9E;color:#CCCCCC;" : "background: #FFE9E9;"};
  ${(p) => p.theme.breakpoints.down('md')} {
    margin: 5px 0;
  }
`;
const StyledOfferDetailRemark = styled.small`
  ${(p) => p.theme.typography.body1};
  color: ${(p) => p.theme.palette.text.secondary};
  ${(p) => p.theme.breakpoints.down('md')} {
    margin-top: ${(p) => p.theme.spacing(1)}px;
  }
`;
const StyledCheckButton = styled(CheckButton)`
  cursor: pointer;
  min-width: 40px;
`;
const StyledOfferNostock = styled.div`
  ${(p) => p.theme.typography.body1};
  color: ${(p) => p.theme.palette.primary.main};
  z-index: 1;
  margin-top: ${(p) => p.theme.spacing(2)}px;
  text-align: left;
  ${(p) => p.theme.breakpoints.up("md")} {
    text-align: center;
    margin-top: 0;
  }
`;
const StyledOfferDetailGroup = styled.ul`
  padding-inline-start: ${(p) => p.theme.spacing(2)}px;
  margin: 0;
  text-align: left;
  word-break: break-word;
`;
const StyledOfferDetailList = styled.li``;
const StyledDetailAccordion = styled(DetailAccordion)`
  text-align: center;
`;
const AppleIdWrapper = styled.div`
  display: flex;
	justify-content: space-between;
  cursor: initial;
  margin-top: ${(p) => p.theme.spacing(4)}px;
  flex-flow: column;
  ${(p) => p.theme.breakpoints.up("md")} {
    flex-flow: wrap;
  }
  & .MuiTypography-root.MuiTypography-body2 {
    color: ${(p) => p.theme.palette.text.secondary};
    ${(p) => p.theme.typography.body1};
  }
`;
const AppleIdField = styled.div`
  padding-bottom: ${(p) => p.theme.spacing(2)}px;
  width: 100%;
  ${(p) => p.theme.breakpoints.up("md")} {
    width: 33%;
  }
	&:nth-child(2) {
		${(p) => p.theme.breakpoints.up("md")} {
			width: calc(33% - ${(p) => p.theme.spacing(4)}px);
		}
	}
`;
const SelectOptionCheckbox = ({ onClick, size, checked }: CheckboxProps) => {
  return (
    <StyledCheckButton onClick={() => {}} checked={checked} size={40}>
      {checked && <BsFillCheckCircleFill color="#f00" size={28} />}
    </StyledCheckButton>
  );
};

interface SelectPhoneOfferProps extends Omit<AppleCarePlusProps, 'onChangeValue'| 'onChangeValid'> {

}
const SelectPhoneOffer = ({
  data,
	value,
  disable = false,
  children,
  onClickOption,
}: SelectPhoneOfferProps) => {
  const intl = useIntl();
	const theme = useTheme();
	const isDesktop = useMediaQuery(`${theme.breakpoints.up('md')}`);
  const msgfree = intl.formatMessage({ id: "phone-select.free" });
  const msgMoreDetail = intl.formatMessage({ id: "phone-select.more-details" });
  const detailsText = data?.details;
  const sTitle = data.desc ? data.desc : data.title;

  const handleAccordionEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    //event.preventDefault();
    event.stopPropagation();
  };
  const handleSelectOffer = (disable: boolean) => {
    if (!disable) {
      if (onClickOption) {
        onClickOption();
      }
    }
  };
	const iconSize = isDesktop ? 80 : 70;
  return (
    data && (
      <StyledOfferContainer
        onClick={() => handleSelectOffer(disable)}
        selected={value?.selected ?? false}
        disable={disable}
      >
        {disable && <StyledDisabledOverlay />}
        <StyledOfferLeft>
          <StyledOfferLeftTop>
            <StyledOfferImage path={data.img} width={iconSize} height={iconSize} />
            <StyledOfferDetail>
              <StyledOfferDetailTitle>{sTitle}</StyledOfferDetailTitle>
              <StyledOfferDetailPrice>
                {data.price === 0 ? (
                  <StyledOfferDetailPriceFree disable={disable}>
                    {msgfree}
                  </StyledOfferDetailPriceFree>
                ) : (
									<Typography variant="body1" component="div" style={{color: 'red'}}>
										{formatDefaultCurrencyPrice(data.price)}
									</Typography>
                )}
                <StyledOfferDetailRemark>
                  {data.remark}
                </StyledOfferDetailRemark>
              </StyledOfferDetailPrice>
            </StyledOfferDetail>
            {disable ? (
              <StyledOfferNostock>
                {<FormattedMessage id="phone-select.no-stock-magsafe" />}
              </StyledOfferNostock>
            ) : (
              <SelectOptionCheckbox
                checked={value?.selected ?? false}
                onClick={() => handleSelectOffer(disable)}
              />
            )}
          </StyledOfferLeftTop>
          {children}
          <StyledOfferLeftBottom onClick={handleAccordionEvent}>
            {detailsText && (
              <StyledDetailAccordion title={msgMoreDetail}>
                <StyledOfferDetailGroup>
                  {Array.isArray(detailsText)
                    ? detailsText.map((text, index) => {
                        return (
                          <StyledOfferDetailList
                            key={index}
                            dangerouslySetInnerHTML={{__html : text }}
                          ></StyledOfferDetailList>
                        );
                      })
                    : null}
                </StyledOfferDetailGroup>
              </StyledDetailAccordion>
            )}
          </StyledOfferLeftBottom>
        </StyledOfferLeft>
      </StyledOfferContainer>
    )
  );
};

interface AppleIdContainerProps {
  appleEmailAddress?: string;
  appleLastName?: string;
  appleFirstName?: string;
  onChangeAppleEmailAddress?: (value: string) => void;
  onChangeAppleLastName?: (value: string) => void;
  onChangeAppleFirstName?: (value: string) => void;
  setAppleEmailAddressValid?: (value: boolean) => void;
  setAppleFirstNameValid?: (value: boolean) => void;
  setAppleLastNameValid?: (value: boolean) => void;
}

const AppleIdContainer = ({
  appleEmailAddress,
  appleFirstName,
  appleLastName,
  onChangeAppleEmailAddress,
  onChangeAppleFirstName,
  onChangeAppleLastName,
  setAppleEmailAddressValid,
  setAppleFirstNameValid,
  setAppleLastNameValid,
}: AppleIdContainerProps) => {
  const handleClickEvent = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };
  //const msgLink = intl.formatMessage({id: "phone-select.other-option.link"});
  return (
    <AppleIdWrapper onClick={handleClickEvent}>
      <AppleIdField>
        <AppleEmailField
          required={true}
          value={appleEmailAddress}
          onChange={onChangeAppleEmailAddress}
          onChangeValid={setAppleEmailAddressValid}
        />
      </AppleIdField>
      <AppleIdField>
        <LastNameField
          required={true}
          value={appleLastName}
          onChange={onChangeAppleLastName}
          onChangeValid={setAppleLastNameValid}
        />
      </AppleIdField>
      <AppleIdField>
        <FirstNameField
          required={true}
          value={appleFirstName}
          onChange={onChangeAppleFirstName}
          onChangeValid={setAppleFirstNameValid}
        />
      </AppleIdField>
    </AppleIdWrapper>
  );
};


interface AppleCarePlusProps {
  data: OrderFormProps['offer']['offer_data']['applecare'][keyof OrderFormProps['offer']['offer_data']['applecare']];
	value?: AppleCarePlusInfo;
	onChangeValue: (v: AppleCarePlusInfo) => void;
	onChangeValid: (v: boolean) => void;
  disable?: boolean;
  children?: React.ReactNode;
  onClickOption?: () => void;
}
export default function AppleCarePlus({data, value, onChangeValue, onChangeValid}: AppleCarePlusProps) {
	const [valid, setValid] = useState({
		email: false,
		firstName: false,
		lastName: false
	})
	const onChange = (key: keyof AppleCarePlusInfo) => (v: boolean|string) => {
		if (onChangeValue === undefined) {
			return 
		}
		onChangeValue({
			...value,
			[key]: v
		})
	}
	const onChangeFieldValid = (label: keyof typeof valid) => {
		return (value: boolean) => {
			setValid(prev => ({
				...prev,
				[label]: value
			}))
		}
	}
	const onChangeEmail = useCallback(onChangeFieldValid('email'),[])
	const onChangeFirstName = useCallback(onChangeFieldValid('firstName'),[])
	const onChangeLastName = useCallback(onChangeFieldValid('lastName'),[])
	useEffect(() => {
		const invalid = (value?.selected ?? false) && Object.values(valid).includes(false);
		onChangeValid(!invalid)
	}, [onChangeValid, valid, value?.selected])
	
  return (
    <>
      <SelectPhoneOffer
        data={data}
				value={value}
        disable={false}
        onClickOption={() => onChange('selected')(!value?.selected)}
      >
        {value?.selected && (
          <AppleIdContainer
            appleEmailAddress={value?.email}
            appleFirstName={value?.firstName}
            appleLastName={value?.lastName}
            onChangeAppleEmailAddress={onChange('email')}
            onChangeAppleLastName={onChange('lastName')}
            onChangeAppleFirstName={onChange('firstName')}
            setAppleEmailAddressValid={onChangeEmail}
            setAppleFirstNameValid={onChangeFirstName}
            setAppleLastNameValid={onChangeLastName}
          />
        )}
      </SelectPhoneOffer>
    </>
  );
}
