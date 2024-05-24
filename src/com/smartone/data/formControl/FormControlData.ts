/**
* com/smartone/data/formControl/FormControlData
**/
export type OptionDataType = string | number | readonly string[] | undefined;
export interface SelectOptionData<T extends OptionDataType> {
	title: React.ReactNode; 
	value: T;
}
export interface SelectOptionGroupData<T extends OptionDataType> {
	title: React.ReactNode;
	options: SelectOptionData<T>[];
}
export interface RadioOptionData<T extends OptionDataType> {
	title: React.ReactNode; 
	value: T;
	disabled?: boolean;
}
export function radioOptionDataCompare<T extends OptionDataType>(a: RadioOptionData<T>, b: RadioOptionData<T>) {
	if(a.value < b.value) {
		return -1;
	}
	if(a.value > b.value) {
		return 1;
	}
	return 0;
}
export function radioOptionDataCompareReverse<T extends OptionDataType>(a: RadioOptionData<T>, b: RadioOptionData<T>) {
	if(a.value > b.value) {
		return -1;
	}
	if(a.value < b.value) {
		return 1;
	}
	return 0;
}