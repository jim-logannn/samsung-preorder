// These must be the first lines
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";

import { flatten } from "flat";

// intl
import messages from "com/smartone/locale";
import { IntlProvider } from "react-intl";
import ApplicationContext, { extendDefaultApplicationContext, ApplicationContextValue } from "com/smartone/context/ApplicationContext";
import TestAjaxHook from "com/smartone/test/TestAjaxHook";



interface RenderTestAjaxHookProps {
	lang?: string;
	container: Element;
	applicationContext?: ApplicationContextValue;
}
window.renderTestAjaxHookApp = function ({ lang="english", container, applicationContext }: RenderTestAjaxHookProps) {
	const locale = lang == "english" ? "en-US" : "zh-HK";
	
	ReactDOM.render(    
	  
		  <ApplicationContext.Provider
			value={extendDefaultApplicationContext(applicationContext)}
		  >
			<IntlProvider
			  locale={locale}
			  messages={flatten(messages[locale])}
			  textComponent={React.Fragment}
			>
				<TestAjaxHook/>			
			</IntlProvider>
		  </ApplicationContext.Provider>
	
	  , container
	);
  };
  declare global {
	interface Window {
		renderTestAjaxHookApp: (props: RenderTestAjaxHookProps) => void;
	}
  }