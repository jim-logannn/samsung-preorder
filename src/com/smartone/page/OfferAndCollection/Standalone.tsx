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
import MainController, { MainControllerProps } from "@/com/smartone/page/Main/MainController";
import { MuiThemeProvider } from "@material-ui/core";
import { ModalProvider } from "@/context/ModalContext";
import { LoadingModalProvider } from '@/context/LoadingContext';
import { handsetGroupDataRecord } from "@smt/page/PhoneSelector/SelectPhone";
import { PlanMeta } from "@smt/type/mobilePlan";
import { Storelist } from "@smt/type/storelist";
import OfferAndCollection from ".";
import { createPreOrderHandset } from "./ProductInfo";
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
	const preOrderHandset = Object.values(handsetGroupData.handset_data).map((data, index) => createPreOrderHandset(true, data, index, applicationContext?.url?.domain));
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
								<OfferAndCollection handsets={preOrderHandset} 	storeData={storeData} getReviewData={console.log} />
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
