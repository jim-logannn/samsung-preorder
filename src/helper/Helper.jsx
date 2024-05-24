/**
 * helper/Helper
 **/
class Helper{

	static getNamePattern(){
		return "^[a-zA-Z ]+$";
	}
	static getAddressPattern(){
		return "^[a-zA-Z0-9,./;: ]+$";
	}

	// simple checking
	static isMobileNumber(sNumber) {
		//console.log("isMobileNumber " + sNumber);
		// starts with 5 6 7 9
		var pattern = new RegExp("^(4|5|6|7|8|9)([0-9]{7})$");
    	return (sNumber != null) && (typeof sNumber === 'string') && pattern.test(sNumber);
	}

	static isHKTelephoneNumber(sNumber) {
		// starts with 2-9
		var pattern = new RegExp("^[23456789][0-9]{7}$");
    	return (sNumber != null) && (typeof sNumber === 'string') && pattern.test(sNumber);
	}
	static isNotMobileNumber(sNumber) {
		return !Helper.isMobileNumber(sNumber);
	}
	static isLocaleEnglish(locale){
		return locale == "en-US";
	}
	static yyyymmddToDisplayDate(yyyymmdd){
		if(yyyymmdd && (yyyymmdd.length == 8)){
			const yyyy = yyyymmdd.substr(0, 4);
			const mm   = yyyymmdd.substr(4, 2);
			const dd   = yyyymmdd.substr(6, 2);
			return yyyy + "-" + mm + "-" + dd;
		}
		return "";
	}
	static isValidEmail(sEmail){
		var sEmailCheA	=	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return sEmailCheA.test(sEmail);
	}
	static isValidMobile(mobile){
		return Helper.isMobileNumber(mobile);
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
	static isValidHKTelephone(phone){
		return Helper.isHKTelephoneNumber(phone);
	}
	static isValidHkid(alphabet, digits, checkDigit){
		if (typeof(window.checkHkid) != "undefined"){
			return window.checkHkid(alphabet + digits + checkDigit);
		}
		//
		if( (alphabet==null) || (digits==null) || (checkDigit==null) ){
			return false;
		}
		const a_is_good = (alphabet.length == 1) || (alphabet.length == 2);
		const d_is_good = (digits.length == 6);
		const c_is_good = (checkDigit.length == 1);
		return a_is_good && d_is_good && c_is_good;
	}
	static isValidDate(intYear, intMonth, intDay){
		const monthIndex = intMonth - 1;
		const testDate = new Date(intYear, monthIndex, intDay);
		return (testDate.getFullYear()==intYear) && (testDate.getMonth()==monthIndex) && (testDate.getDate()==intDay);
	}
	static yyyymmddToDate(yyyymmdd){
		if(yyyymmdd && (yyyymmdd.length == 8)){
			const yyyy = yyyymmdd.substr(0, 4);
			const mm   = yyyymmdd.substr(4, 2);
			const dd   = yyyymmdd.substr(6, 2);
			const year = parseInt(yyyy);
			const monthIndex = parseInt(mm) - 1;
			const day  = parseInt(dd);
			return new Date(year, monthIndex, day);
		}
		return null;
	}
	static dateToYyyymmdd(date){
		if(date){
			const yyyy = date.getFullYear() + "";
			const month = date.getMonth() + 1;
			const mm   = (month<10)?"0"+month:""+month;
			const day  = date.getDate();
			const dd   = (day<10)?"0"+day:""+day;
			return yyyy + mm + dd;
		}
		return "";
	}
	static displayHkid(alphabet, digits, checkDigit){
		return alphabet + digits + "(" + checkDigit + ")";
	}
	static editCustname(name){
		return name.replace(","," ");
	}
}
export default Helper;