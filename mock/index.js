const main = require('./main');

const proxy = {
	'POST /jsp/priority/ajax/select_plan.jsp': (req, res) => {
		return res.json({
			newContractDate: "13-09-2022", 
			status: "ok"
		})
	},
	'POST /jsp/priority/ajax/get_plan.jsp': (req, res) => {
		return res.json({
			list: ['5GABO', '5GABP', '5GABQ', '5GABR', '5GABS', '5GABT', '5GABU'], 
			status: "ok"
		})
	},	
	'GET /jsp/Internal/IPPPO2022/API_getAvailableDates.jsp': (req, res) => {
		return res.json({
			"data": {
				"availableDates":["2022-09-09","2022-09-10","2022-09-11"]
			}
		})
	},
	'GET /jsp/Internal/IPPPO2022/API_getAvailableTimeslots.jsp': (req, res) => {
		return res.json({
			
			"data":{"availableTimeslots":[
				{
				  "code": "BS01",
				  "available": false,
				  "time": "08-00"
				},
				{
				  "code": "BS02",
				  "available": false,
				  "time": "08-15"
				},
				{
				  "code": "BS03",
				  "available": false,
				  "time": "08-30"
				},
				{
				  "code": "BS04",
				  "available": true,
				  "time": "08-45"
				},
				{
				  "code": "BS05",
				  "available": true,
				  "time": "09-00"
				},
				{
				  "code": "BS06",
				  "available": true,
				  "time": "09-15"
				},
				{
				  "code": "BS07",
				  "available": true,
				  "time": "09-30"
				},
				{
				  "code": "BS08",
				  "available": false,
				  "time": "09-45"
				},
				{
				  "code": "BS09",
				  "available": true,
				  "time": "10-00"
				},
				{
				  "code": "BS10",
				  "available": true,
				  "time": "10-15"
				},
				{
				  "code": "BS11",
				  "available": true,
				  "time": "10-30"
				},
				{
				  "code": "BS12",
				  "available": true,
				  "time": "10-45"
				},
				{
				  "code": "BS13",
				  "available": true,
				  "time": "11-00"
				},
				{
				  "code": "BS14",
				  "available": true,
				  "time": "11-15"
				},
				{
				  "code": "BS15",
				  "available": true,
				  "time": "11-30"
				},
				{
				  "code": "BS16",
				  "available": false,
				  "time": "11-45"
				},
				{
				  "code": "BS17",
				  "available": true,
				  "time": "12-00"
				},
				{
				  "code": "BS18",
				  "available": true,
				  "time": "12-15"
				},
				{
				  "code": "BS19",
				  "available": true,
				  "time": "12-30"
				},
				{
				  "code": "BS20",
				  "available": true,
				  "time": "12-45"
				},
				{
				  "code": "BS21",
				  "available": true,
				  "time": "13-00"
				},
				{
				  "code": "BS22",
				  "available": true,
				  "time": "13-15"
				},
				{
				  "code": "BS23",
				  "available": true,
				  "time": "13-30"
				},
				{
				  "code": "BS24",
				  "available": true,
				  "time": "13-45"
				},
				{
				  "code": "BS25",
				  "available": true,
				  "time": "14-00"
				},
				{
				  "code": "BS26",
				  "available": true,
				  "time": "14-15"
				},
				{
				  "code": "BS27",
				  "available": true,
				  "time": "14-30"
				},
				{
				  "code": "BS28",
				  "available": true,
				  "time": "14-45"
				},
				{
				  "code": "BS29",
				  "available": true,
				  "time": "15-00"
				},
				{
				  "code": "BS30",
				  "available": true,
				  "time": "15-15"
				},
				{
				  "code": "BS31",
				  "available": true,
				  "time": "15-30"
				},
				{
				  "code": "BS32",
				  "available": true,
				  "time": "15-45"
				},
				{
				  "code": "BS33",
				  "available": true,
				  "time": "16-00"
				},
				{
				  "code": "BS34",
				  "available": true,
				  "time": "16-15"
				},
				{
				  "code": "BS35",
				  "available": true,
				  "time": "16-30"
				},
				{
				  "code": "BS36",
				  "available": true,
				  "time": "16-45"
				},
				{
				  "code": "BS37",
				  "available": true,
				  "time": "17-00"
				},
				{
				  "code": "BS38",
				  "available": true,
				  "time": "17-15"
				},
				{
				  "code": "BS39",
				  "available": true,
				  "time": "17-30"
				},
				{
				  "code": "BS40",
				  "available": true,
				  "time": "17-45"
				},
				{
				  "code": "BS41",
				  "available": true,
				  "time": "18-00"
				},
				{
				  "code": "BS42",
				  "available": true,
				  "time": "18-15"
				},
				{
				  "code": "BS43",
				  "available": true,
				  "time": "18-30"
				},
				{
				  "code": "BS44",
				  "available": true,
				  "time": "18-45"
				}
			  ]}})
	},
	'POST /jsp/Internal/Fulfill2023/API_get_user_login_info.jsp': (req, res) => {
		setTimeout(() => {
			return res.json(
				{"order":{"6833600":{"ProductTypes":"AH","IsRemainFree":"N","Email":"miguel_ng@smartone.com","BookedDate":"","PickupEmailDate":"20230906165144","CaseID":"6833600","BookedTimeSlots":"","PickupLocations":"WHS","DepositReceipt":"","OtpNumbers":"","ExternalSource":"NA","BookEmailDate":"","ExtendReceipt":"","RemainFeeReceipt":"","PlanType":"","PairID":"6833600","DeliveryDistrict":"Causeway Bay","TimeslotHoldExpiryDate":"","TimeslotHoldType":"","Status":"Y","ProductCodes":"MQ2K3ZA/A","EndPickupDate":"20230911","PlanCode":"","StartPickupDate":"20230906","OnlineOrderNumber":"IPP8061937100","VRSList":"","PaidAmount":"0","CustName":"xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxx (Ms)","ConfirmEmailDate":"20230906151603","Allow_extend":"Y","CampaignID":"REDEEM","OriginalStore":"","ScreenReplace":"","AnyColorInd":"N"},"6618570":{"ProductTypes":"AH","IsRemainFree":"N","Email":"andrew-md_lee@smartone.com","BookedDate":"","PickupEmailDate":"","CaseID":"6618570","BookedTimeSlots":"","PickupLocations":"ABD","DepositReceipt":"GH00119133","OtpNumbers":"","ExternalSource":"main","BookEmailDate":"","ExtendReceipt":"","RemainFeeReceipt":"","PlanType":"","PairID":"6618570","DeliveryDistrict":"","TimeslotHoldExpiryDate":"","TimeslotHoldType":"","Status":"P","ProductCodes":"MPWT3ZA/A","EndPickupDate":"","PlanCode":"","StartPickupDate":"","OnlineOrderNumber":"","VRSList":"","PaidAmount":"500","CustName":"andrew","ConfirmEmailDate":"20220905182102","Allow_extend":"Y","CampaignID":"","OriginalStore":"","ScreenReplace":"","AnyColorInd":"N"},"6833599":{"ProductTypes":"AH","IsRemainFree":"N","Email":"miguel_ng@smartone.com","BookedDate":"","PickupEmailDate":"20230906165142","CaseID":"6833599","BookedTimeSlots":"","PickupLocations":"TCP","DepositReceipt":"","OtpNumbers":"","ExternalSource":"NA","BookEmailDate":"","ExtendReceipt":"","RemainFeeReceipt":"","PlanType":"","PairID":"6833599","DeliveryDistrict":"","TimeslotHoldExpiryDate":"","TimeslotHoldType":"","Status":"Y","ProductCodes":"MQ833ZA/A","EndPickupDate":"20230911","PlanCode":"","StartPickupDate":"20230906","OnlineOrderNumber":"IPP8061935200","VRSList":"","PaidAmount":"0","CustName":"xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxx (Ms)","ConfirmEmailDate":"20230906145802","Allow_extend":"Y","CampaignID":"REDEEM","OriginalStore":"","ScreenReplace":"","AnyColorInd":"N"},"6833585":{"ProductTypes":"AH","IsRemainFree":"N","Email":"miguel_ng@smartone.com","BookedDate":"","PickupEmailDate":"","CaseID":"6833585","BookedTimeSlots":"","PickupLocations":"ABD","DepositReceipt":"","OtpNumbers":"","ExternalSource":"NA","BookEmailDate":"","ExtendReceipt":"","RemainFeeReceipt":"","PlanType":"","PairID":"6833585","DeliveryDistrict":"","TimeslotHoldExpiryDate":"","TimeslotHoldType":"","Status":"P","ProductCodes":"MQ833ZA/A","EndPickupDate":"","PlanCode":"","StartPickupDate":"","OnlineOrderNumber":"IPP8061935800","VRSList":"","PaidAmount":"0","CustName":"xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxx (Ms)","ConfirmEmailDate":"20230905102402","Allow_extend":"Y","CampaignID":"REDEEM","OriginalStore":"","ScreenReplace":"","AnyColorInd":"N"},"6833630":{"ProductTypes":"AH","IsRemainFree":"N","Email":"miguel_ng@smartone.com","BookedDate":"","PickupEmailDate":"","CaseID":"6833630","BookedTimeSlots":"","PickupLocations":"TPS","DepositReceipt":"","OtpNumbers":"","ExternalSource":"NA","BookEmailDate":"","ExtendReceipt":"","RemainFeeReceipt":"","PlanType":"","PairID":"6833630","DeliveryDistrict":"","TimeslotHoldExpiryDate":"","TimeslotHoldType":"","Status":"P","ProductCodes":"MQ863ZA/A","EndPickupDate":"","PlanCode":"","StartPickupDate":"","OnlineOrderNumber":"IBR8061939900","VRSList":"","PaidAmount":"0","CustName":"xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxx (Ms)","ConfirmEmailDate":"20230907112002","Allow_extend":"Y","CampaignID":"REDEEM_MAGSAFE_AC","OriginalStore":"","ScreenReplace":"","AnyColorInd":"N"}},"status":"ok"}
			)
		}, 3000);
		
	},
	'POST /jsp/Internal/Fulfill2023/API_select_model_action.jsp': (req, res) => {
		return res.json(
			{"status":"ok"}
		)
	},
	'POST /jsp/Internal/IPPO2023/preorder_submit_action_2023.jsp': (req, res) => {
		return res.json(
			{"orderRefNum":"IBR8061456400","err_msg":"","err_code":"","orderDetail":{"date":"2023-09-13 18:19:44.0","orderNumber":"IBR8061456400","orderCaseNumber":"IBR8061456400-6844687","model":"MU2P3ZA/A","store":"ABD"},"status":"ok"}
		)
	},
	'POST /jsp/Internal/Fulfill2023/API_delivery_info_action.jsp': (req, res) => {
		return res.json(
			{"status":"ok"}
		)
	},
	'POST /jsp/Internal/Fulfill2023/API_time_slot_action.jsp': (req, res) => {
		return res.json(
			{"status":"ok"}
		)
	},
	'GET /jsp/Internal/Fulfill2023/API_get_available_delivery_date.jsp': (req, res) => {
		return res.json(
			{"result":["20230915","20230918","20230919","20230920","20230921","20230922","20230925"],"status":"ok"}
		)
	}
};
module.exports = Object.assign(proxy, main);
