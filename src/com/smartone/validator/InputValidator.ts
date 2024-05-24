/**
 * com/smartone/validator/InputValidator
 **/


import { SelectOptionGroupData } from "../data/formControl/FormControlData";
import StringUtils, { isNotBlank } from "@smt/util/StringUtils";
//import Helper from "@/helper/Helper";

function  isValidEmail(sEmail: any): boolean{
	var sEmailCheA	=	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return sEmailCheA.test(sEmail);
}
function  isMobileNumber(sNumber: any): boolean{
	//console.log("isMobileNumber " + sNumber);
	// starts with 5 6 7 9
	var pattern = new RegExp("^(4|5|6|7|8|9)([0-9]{7})$");
	return (sNumber != null) && (typeof sNumber === 'string') && pattern.test(sNumber);
}
function  isValidMobile(mobile: any): boolean{
	return isMobileNumber(mobile);
	/*
	//console.log("isValidMobile="+mobile)
	if(mobile == null){
		return false;
	}
	const pattern = "^[0-9]{8}$";
	const reg = new RegExp(pattern);
	return reg.test(mobile);*/
	//return ( mobile && (mobile.length==8) );
}
export type InputValidator<T> = (required?: boolean, value?: T)=>boolean;
export type InputValidatorWithLength<T> = (length?:number) => (required?: boolean, value?: T)=>boolean;

export const validateSelect: InputValidator<string> = function(required, value) {
	if(!required) {
		return true;
	}
	return StringUtils.isNotBlank(value);
}
export const validateSelectWithOptionGroups: (required?: boolean, value?: string, optionGroups?: SelectOptionGroupData<string>[]) => boolean = function(required, value, optionGroups) {
	if(!required) {
		return true;
	}
	if(value == undefined) {
		return false;
	}
	if(optionGroups == undefined) {
		return false;
	}
	if(StringUtils.isBlank(value)) {
		return false;
	}
	for(let i=0 ; i < optionGroups.length ; i++) {
		const group = optionGroups[i];
		const options = group.options;
		if(options) {
			for(let j=0 ; j < options.length ; j++) {
				const option = options[j];
				if(value == option.value) {
					return true;
				}
			}
		}
	}
	return false;
}
export const validateText: InputValidator<string> = function(required, value) {
	if(!required) {
		return true;
	}
	return StringUtils.isNotBlank(value);
}
export const validateFourDigit: InputValidator<string> = function(required, value) {
	if(!required) {
		return true;
	}
	return StringUtils.isDigitOnly(value) && value?.length == 4;
}
export const validateFourDigitPassport: InputValidator<string> = function(required, value) {
	if(!required) {
		return true;
	}
	return StringUtils.isPassportFourCharacters(value) && value?.length == 4;
}
export const validateEmail: InputValidator<string> = function(required, value) {
	if(!required) {
		if(StringUtils.isBlank(value)) {
			return true;
		}
	}
	return isValidEmail(value);
}
export const validateMobile: InputValidator<string> = function(required, value) {
	if(!required) {
		if(StringUtils.isBlank(value)) {
			return true;
		}
	}
	return isValidMobile(value);
}
export const validateHkid: InputValidator<string> = function(required, value) {
	return validateText(required, value);
}
// some = at least 1
export const validateAddressSome: InputValidator<{ line1?: string; line2?: string; }> = function(required, value) {
	if(!required) {
		return true;
	}
	return value ? (StringUtils.isNotBlank(value.line1) || StringUtils.isNotBlank(value.line2)) : false ;
};
export const validateAlphabetCharsWithLength: InputValidatorWithLength<string> = (length=255) => (required, value) => {
	if(!required) {
		return true;
	}
	var pattern = new RegExp("^[a-zA-Z ]+$");
	return (value !== null) && (value !== undefined) && (value.length <= length) && pattern.test(value);
}
export const validateEnglishNumberCharWithLength: InputValidatorWithLength<string> = (length=255) => (required, value) => {
	if(!required) {
		return true;
	}
	var pattern = new RegExp("^[a-zA-Z0-9,./;: ]+$");
	return (value !== null) && (value !== undefined) && (value.length <= length) && pattern.test(value);
}