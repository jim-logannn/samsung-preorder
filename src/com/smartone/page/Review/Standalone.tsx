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
import MainController, { MainControllerProps, OrderContext } from "@/com/smartone/page/Main/MainController";
import { MuiThemeProvider } from "@material-ui/core";
import { ModalProvider } from "@/context/ModalContext";
import { LoadingModalProvider } from '@/context/LoadingContext';
import { handsetGroupDataRecord } from "@smt/page/PhoneSelector/SelectPhone";
import { PlanMeta } from "@smt/type/mobilePlan";
import { Storelist } from "@smt/type/storelist";
import Review from ".";
import { createPreOrderHandset } from "../OfferAndCollection/ProductInfo";
import { GetStoreAPIResponse } from "@smt/type/handsetPreOrder2023/api";

interface RenderOtpProps {
  lang: string;
  container: Element;
  quota: number;
  handsetGroupData: handsetGroupDataRecord;
	storeData: GetStoreAPIResponse;
  customTheme?: DefaultTheme;
  applicationContext?: ApplicationContextValue;
}

window.renderReactApp = function ({
  lang=LocaleEN,
  container,
  quota,
  handsetGroupData,
	storeData,
  customTheme,
  applicationContext,
}: RenderOtpProps) {
  const locale = lang == "english" ? "en-US" : "zh-HK";
  const theme = extendDefaultTheme(customTheme);
	const MainControllerData: MainControllerProps = {
    quota,
		handsetGroupData,
		storeData
	}
	const orderValue = [ { "id": "CO14_PROMAX_DP256", "image": "CO14_PROMAX_DP256", "title": "iPhone 14 Pro Max", "model": "256GB Deep Purple", "price": { "origin": 10199, "discounted": null }, "method": "pickup", "pickupStore": { "district": "Central", "address": "Shop 1021, Podium Level 1, ifc mall, 1 Harbour View Street, Central, Hong Kong", "mapLink": "https://www.smartone.com/tc/privileges_and_support/contact_us/store_location.jsp?store=IFC", "label": "IFC" } }, { "id": "CO14_PROMAX_DP512", "image": "CO14_PROMAX_DP512", "title": "iPhone 14 Pro Max", "model": "512GB Deep Purple", "price": { "origin": 11899, "discounted": null }, "method": "delivery", "pickupStore": null }, { "id": "CO14_PROMAX_DP1024", "image": "CO14_PROMAX_DP1024", "title": "iPhone 14 Pro Max", "model": "1024GB Deep Purple", "price": { "origin": 13599, "discounted": null }, "method": "pickup", "pickupStore": { "district": "Hunghom", "address": "G/F, Shop 7A, Ki Fu Bldg , 36-60F Tak Man Street, Hunghom, Kowloon", "mapLink": "https://www.smartone.com/tc/privileges_and_support/contact_us/store_location.jsp?store=HHS", "label": "HHS" } } ]
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
								<OrderContext.Provider value={orderValue}>
									<Review/>
								</OrderContext.Provider>
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
    renderReactApp: (props: RenderOtpProps) => void;
  }
}
