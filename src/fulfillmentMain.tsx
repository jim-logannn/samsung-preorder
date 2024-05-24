// These must be the first lines
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";

// intl
import messages from "@smt/locale/index.js";
import { IntlProvider } from "react-intl";

import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from "styled-components";
import { extendDefaultTheme } from "@smt/theme/defaultTheme";
import { flatten } from "flat";
import ApplicationContext, {
  ApplicationContextValue,
  extendDefaultApplicationContext,
} from "@smt/context/ApplicationContext";
import { LocaleEN } from "@smt/type/common";
import { MuiThemeProvider } from "@material-ui/core";
import { ModalProvider } from "./context/ModalContext";
import { LoadingModalProvider } from './context/LoadingContext';
import { GetStoreAPIResponse } from "@smt/type/handsetPreOrder2023/api";
import FulfillmentMain from "@smt/page/FulfillmentMain";
import { OrderFormProps } from "@smt/page/FulfillmentMain/OrderForm";
import { FulfillmentRawHandsetData, FulfillmentRawOrderValue, FulfillmentSpecialItem, FulfillmentSpecialItemRawData, FulfillOrderDataRecord } from "@smt/type/handsetPreOrder2023/fulfillment";
import { FormWatcherProvider } from "@smt/hook/InputHook";
import { PaymentCaseProvider } from "@smt/page/FulfillmentMain/PaymentCaseProvider";

interface RenderOtpProps {
  lang: string;
  container: Element;
  quota: number;
  handsetGroupData: FulfillmentRawHandsetData
  voucherData: OrderFormProps['voucher'];
  offerData: OrderFormProps['offer'];
	storeData: GetStoreAPIResponse;
  caseInfoData: FulfillmentRawOrderValue[];
  fulfillOrderData: FulfillOrderDataRecord[];
  customTheme?: DefaultTheme;
  applicationContext?: ApplicationContextValue;
	specialItemData?: FulfillmentSpecialItem;
}
window.renderReactApp = function ({
  lang=LocaleEN,
  container,
  customTheme,
  applicationContext,
	handsetGroupData,
	storeData,
	voucherData,
  caseInfoData,
  fulfillOrderData,
	offerData,
	specialItemData
}: RenderOtpProps) {
  const locale = lang == "english" ? "en-US" : "zh-HK";
  const theme = extendDefaultTheme(customTheme, lang === "english");
  ReactDOM.render(    
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <ApplicationContext.Provider
          value={extendDefaultApplicationContext(applicationContext)}
        >
          <IntlProvider
            locale={locale}
            messages={flatten(messages[locale])}
            textComponent={React.Fragment}
          > 
            <LoadingModalProvider>
              <ModalProvider>
								<FormWatcherProvider>
									<PaymentCaseProvider>
										<FulfillmentMain handsets={handsetGroupData} stores={storeData} offer={offerData} voucher={voucherData} orderData={fulfillOrderData} caseInfo={caseInfoData} specialItem={specialItemData} />
									</PaymentCaseProvider>
								</FormWatcherProvider>
              </ModalProvider>
            </LoadingModalProvider>
          </IntlProvider>
        </ApplicationContext.Provider>
      </StyledThemeProvider>
    </MuiThemeProvider>
    , container
  );
};
declare global {
  interface Window {
    renderReactApp: typeof window.renderReactApp
  }
}
