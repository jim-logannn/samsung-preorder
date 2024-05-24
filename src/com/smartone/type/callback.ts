import { SLangEN, SLangTC } from "./common";

export const CALLBACK_CHANGE_STEP = 'onChangeStep';
export const CALLBACK_CLICK_NEXT_STEP_BUTTON = 'onClickNextButton';
export const CALLBACK_CLICK_SELECT_SECTION_BUTTON = 'onClickSelectStoreButton';
export const CALLBACK_EXIT_FROM_PHONE_SELECTOR = 'exitFromPhonePage';
export const CALLBACK_EXIT_FROM_PLAN_SELECTOR = 'exitFromPlanPage';
export const CALLBACK_EXIT_FROM_PICKUP_SELECTOR = 'exitFromConfirmPage';
export const CALLBACK_CONFIRM_ORDER = 'onSubmit';

export type CallbackString = typeof CALLBACK_CHANGE_STEP | typeof CALLBACK_CLICK_NEXT_STEP_BUTTON | typeof CALLBACK_CLICK_SELECT_SECTION_BUTTON | typeof CALLBACK_EXIT_FROM_PHONE_SELECTOR | typeof CALLBACK_EXIT_FROM_PLAN_SELECTOR | typeof CALLBACK_EXIT_FROM_PICKUP_SELECTOR | typeof CALLBACK_CONFIRM_ORDER;

export type CallbackLocale = typeof SLangTC | typeof SLangEN;

export interface CallbackValue {
	event: CallbackString;
	value?: any;
	extraParam ?: any;
}