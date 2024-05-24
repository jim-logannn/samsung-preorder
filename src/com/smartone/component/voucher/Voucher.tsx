import React, { useContext } from "react";
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';
import { Locale, LocaleEN } from '@smt/type/common';
import ApplicationContext from "@smt/context/ApplicationContext";

export type VoucherData = voucherList[];

export interface voucherList {
	masterCouponId: string;
}

export interface VoucherProps {
	quota: number;
    voucherData: VoucherData;
}

const StyledVoucherContainer = styled.div`
    text-align: center;
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-flow: row;
	padding: ${p => p.theme.spacing(3)}px ${p => p.theme.spacing(2)}px;	
    margin: ${p => p.theme.spacing(2)}px 0;	
	box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
	background: #fff;
	transform-origin: top;
	box-sizing: border-box;
	border-radius: 15px;
	${(p) => p.theme.breakpoints.up('md')} {	
		width: 100%;
		padding: ${p => p.theme.spacing(4)}px;        
	}
`
const StyledVoucherQuota = styled.div`
    flex-basis: 45%;
    padding: 0 ${p => p.theme.spacing(2)}px 0 0;	
    ${(p) => p.theme.breakpoints.up('md')} {	
        flex-basis: 50%;
    }
`;
const StyledVouchers = styled.div`
    border-left: 1px solid #ccc;
    flex-basis: 55%;
    padding: 0 0 0 ${p => p.theme.spacing(2)}px;	
    ${(p) => p.theme.breakpoints.up('md')} {	
        flex-basis: 50%;
    }
`
const StyledVoucherTitle = styled.div`
    ${p => p.theme.typography.h6};
    font-size: 1.2rem;
    margin-bottom: ${p => p.theme.spacing(2)}px;	
    ${(p) => p.theme.breakpoints.up('md')} {
        font-size: 1.6rem;
    }
`;
const StyledVoucherQuantity = styled.div`
    color:#ff0000;
    ${(p) => p.theme.typography.body1};
    font-size: 1.6rem;
    ${(p) => p.theme.breakpoints.up('md')} {
        font-size: 2.0rem;
    }
    & > span {
        ${p => p.theme.typography.h6};
        font-size: 2.0rem;
        ${(p) => p.theme.breakpoints.up('md')} {
            font-size: 2.4rem;
        }
    }
`;
const StyledVoucherList = styled.div<{ locale: Locale }>`
    ${p => p.theme.typography.body1};
    margin-top: ${p => p.theme.spacing(1)}px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: ${(props) => (props.locale === LocaleEN ? 300 : 400)};
`;
const StyledVoucherRemark = styled.div`
    ${p => p.theme.typography.body1};
    margin-top: ${p => p.theme.spacing(1)}px;
    font-size: 1.2rem;
    ${(p) => p.theme.breakpoints.up('md')} {	
        font-size: 1.2rem;
    }
`;
const StyledVoucherListImage = styled.img`
	width: 22px;
    margin-right: 5px;
`
const StyledVoucherListName = styled.div`
    text-align:left;
`;
const StyledVoucherListContainer = styled.div`
    /*
    display: flex;
    justify-content: center;
    */
`;
const StyledVoucherListRemark = styled.div`
    text-align:center;
    padding-top: ${p => p.theme.spacing(2)}px;
    ${(p) => p.theme.breakpoints.up('md')} {	
        padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(2)}px 0;
    }
    
`;

const Voucher = ({ quota, voucherData}: VoucherProps) => {
    const intl = useIntl();
	const maxQuota = intl.formatMessage({id: "voucher.max-quota"});
    const handsetOffer = intl.formatMessage({id: "voucher.handset-offer"});
    const offerRemark = intl.formatMessage({id: "voucher.offer-remark"});
    const voucherRemark = intl.formatMessage({id: "voucher.remark"});
    const number = intl.formatMessage({id: "voucher.quantity"}, {no: quota});
    const message = intl.formatMessage({id: "voucher.max-quantity"}, {number: "<span>"+number+"</span>"});
    const applicationContext = useContext(ApplicationContext);
    const domain = applicationContext?.url?.domain;
    const IMAGE_PATH = "IMG_V3/common/icon_voucher.png";

    return (
      <StyledVoucherContainer>
          <StyledVoucherQuota>
            <StyledVoucherTitle>{maxQuota}</StyledVoucherTitle>
            <StyledVoucherQuantity dangerouslySetInnerHTML={{__html: message}}></StyledVoucherQuantity>
          </StyledVoucherQuota>
          { voucherData!=null && voucherData.length > 0 &&
            <StyledVouchers>
                <StyledVoucherTitle>{handsetOffer}</StyledVoucherTitle>  
                <StyledVoucherListContainer>
                {
                    voucherData.map( (voucher:voucherList, index:number) => {	
                        const couponName = intl.formatMessage({id: `coupons.${voucher.masterCouponId}`});
                        return (
                            <StyledVoucherList key={index} locale={intl.locale}>
                            { couponName &&
                                <><StyledVoucherListImage src={domain+IMAGE_PATH} /> <StyledVoucherListName>{couponName}</StyledVoucherListName></>
                            }
                            </StyledVoucherList>
                        )
                    })
                }
                    <StyledVoucherList locale={intl.locale}>
                        <StyledVoucherListRemark>{voucherRemark}</StyledVoucherListRemark>
                    </StyledVoucherList>
                </StyledVoucherListContainer>
                {/* <StyledVoucherRemark>{offerRemark}</StyledVoucherRemark>   */}
            </StyledVouchers>
          }
      </StyledVoucherContainer>
    );
  }
  
  export default Voucher;