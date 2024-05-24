export const SLangTC = 'tchinese';
export const SLangEN = 'english';

export const LocaleTC = 'zh-HK';
export const LocaleEN = 'en-US';

export type SLang = typeof SLangTC | typeof SLangEN;
export type Locale = typeof LocaleTC| typeof LocaleEN;

interface Feature {
	icon_path: string;
	content: string;
}

interface FeatureList {
	title: string;
	list: Feature[];
}

export interface PlanCard {
	name: string; 
	subTitle: string;
	price: string;
	contrat_peroid: string;
	local_data: string;
	features: FeatureList[];
}