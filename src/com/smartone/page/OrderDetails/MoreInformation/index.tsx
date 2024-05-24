import React, { useCallback, useState, useMemo, useEffect, useContext } from "react";
import styled from "styled-components";
import { Paper } from '@smt/component/card';
import { FormattedMessage, useIntl } from 'react-intl';
import EmailField from "@smt/field/orderDetail/EmailField";
import YobField from "@smt/field/orderDetail/YobField";
import HkidField from '@smt/field/orderDetail/HkidField';
import ApplicationContext, { DocType } from "@smt/context/ApplicationContext";
import PassportField from "@smt/field/orderDetail/PassportField";
import { stringify } from "querystring";

const StyledMoreInfoDesc = styled.div`
  ${p => p.theme.typography.body1};
  margin-bottom: ${p => p.theme.spacing(4)}px;
`
const StyledMoreInfoTable = styled.div`
  display: flex;
  flex-flow: column;
`
const StyledMoreInfoRow = styled.div`
  display: flex;
  flex-flow: wrap;  
  ${(p) => p.theme.breakpoints.up('md')} {				
		flex-flow: nowrap;
	}
`
const StyledMoreInfoEmailDesc = styled.div`
  ${p => p.theme.typography.body1};
`
const StyledMoreInfoCell = styled.div`
  margin: 0 0 ${p => p.theme.spacing(2)}px 0;
  width: 100%;
  max-width:100%;
  display: flex;
  ${(p) => p.theme.breakpoints.up('md')} {				
		margin: 0 20px 20px 0;
    width: 50%;
    max-width:300px;
	}
  & .MuiTypography-root.MuiTypography-body2{
    color: ${p => p.theme.palette.text.secondary};
    ${p => p.theme.typography.body1};
  }
`
const StyledMoreInfoEmailCell = styled.div`
  color: ${p => p.theme.palette.text.secondary};
  margin: 0 0 ${p => p.theme.spacing(2)}px 0;
  width: 100%;
  display: flex;
  ${(p) => p.theme.breakpoints.up('md')} {				
		margin: 30px 20px 20px 0;
    width: 50%;
	}
`
interface MoreInformationProps {
  onChangeMoreInformationData?: (v: MoreInformationData) => void;
  selectedMoreInfoData?: MoreInformationData;
}
export interface MoreInformationData {
  emailAddress?: string;
  yob?: string;
  hkid?: string;
  passport?: string;
  valid: boolean;
}
const MoreInformation = ({ selectedMoreInfoData, onChangeMoreInformationData }: MoreInformationProps) => {
  const [emailAddress, setEmailAddress] = useState<string | undefined>(selectedMoreInfoData?.emailAddress);
  const [yob, setYob] = useState<string | undefined>(selectedMoreInfoData?.yob);
  const [hkid, setHkid] = useState<string | undefined>(selectedMoreInfoData?.hkid);
  const [passport, setPassport] = useState<string | undefined>(selectedMoreInfoData?.passport);
  const [emailAddressValid, setEmailAddressValid] = useState<boolean>(false);
  const [yobValid, setYobValid] = useState<boolean>(false);
  const [hkidValid, setHkidValid] = useState<boolean>(false);
  const [passportValid, setPassportValid] = useState<boolean>(false);

  const intl = useIntl();
  const msgDesc = intl.formatMessage({ id: "review.more-information.desc" });
  const msgEmail = intl.formatMessage({ id: "review.more-information.email-desc" });
  const applicationContext = useContext(ApplicationContext);
  const docType:DocType|undefined = applicationContext?.retentionInfo?.docType;

  const isValid = emailAddressValid && yobValid && (docType==DocType.HKID && hkidValid || docType==DocType.PASSPORT && passportValid);

  //console.log("yob|"+yob+"|selectedMoreInfoData|"+JSON.stringify(selectedMoreInfoData)+"|moredata.yob|"+selectedMoreInfoData?.yob);

  const moreInformationData = useMemo(() => {
    const result: MoreInformationData = {
      emailAddress: emailAddress,
      yob: yob,
      hkid: hkid,
      passport: passport,
      valid: isValid
    };
    return result;
  }, [emailAddress, yob, hkid, passport, isValid])

  useEffect(() => {
		if (onChangeMoreInformationData) {
      onChangeMoreInformationData(moreInformationData);
      
		}
  }, [moreInformationData, onChangeMoreInformationData])	
 
  const onChangeEmailAddress = useCallback((value: string) => {
    setEmailAddress(value.toLocaleLowerCase());
  }, []);
  const onChangeYob = useCallback((value: string) => {
    setYob(value);
  }, []);
  const onChangeHkid = useCallback((value: string) => {
    setHkid(value);
  }, []);
  const onChangePassport = useCallback((value: string) => {
    setPassport(value);
  }, []);

  return (
    <Paper>
      <StyledMoreInfoDesc>{msgDesc}</StyledMoreInfoDesc>
      <StyledMoreInfoTable>
        <StyledMoreInfoRow>
          <StyledMoreInfoCell>
            <EmailField required={true} value={emailAddress} onChange={onChangeEmailAddress} onChangeValid={setEmailAddressValid} />
          </StyledMoreInfoCell>
          <StyledMoreInfoEmailCell>
            <StyledMoreInfoEmailDesc>{msgEmail}</StyledMoreInfoEmailDesc>
          </StyledMoreInfoEmailCell>
        </StyledMoreInfoRow>
        <StyledMoreInfoRow>
          <StyledMoreInfoCell>
            <YobField required={true} value={yob} onChange={onChangeYob} onChangeValid={setYobValid} />
          </StyledMoreInfoCell>
          <StyledMoreInfoCell>
            {true &&
              <HkidField required={true} value={hkid} onChange={onChangeHkid} onChangeValid={setHkidValid} />
            }
            {true &&
              <PassportField required={true} value={passport} onChange={onChangePassport} onChangeValid={setPassportValid} />
            }
            </StyledMoreInfoCell>
        </StyledMoreInfoRow>
      </StyledMoreInfoTable>

    </Paper>
  );
};

export default MoreInformation;

