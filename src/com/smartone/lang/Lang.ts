/**
 * com/smartone/lang/Lang
 **/

import { LocaleTC, SLangEN, SLangTC } from "@smt/type/common";

export type Language = typeof SLangTC | typeof SLangEN;

export const getLangFromLocale = function(locale: string): Language {
	return (locale == LocaleTC) ? SLangTC : SLangEN;
};