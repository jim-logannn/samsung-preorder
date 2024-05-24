const checkProductAvailability = require('./json/checkProductAvailability.json');
const reserveProduct = require('./json/reserveProduct.json');

const main = {	
	'POST /jsp/priority/ajax/check_product_availability.jsp': (req, res) => {
		setTimeout(()=>{
			return res.json(checkProductAvailability);
		}, 1000)
	},
	'POST /jsp/priority/ajax/reserve_product.jsp': (req, res) => {
		setTimeout(()=>{
			return res.json(reserveProduct);
		}, 1000)
	},
	'GET /jsp/Internal/IPPO2023/API_checkUserEligibleForDelivery.jsp(.*)': (req, res) => {
		return res.json({"quotaLeft":100,"canDelivery":true,"quota":true,"errMsg":"","numOfDeviceSelected":10,"status":"ok"})
	},
	'POST /jsp/Internal/Fulfill2023/API_get_available_timeslot.jsp(.*)': (req, res) => {
		// return res.json({"err_msg":"invalid startDate","err_code":"ERR_SYSTEM","status":"fail"});
		return res.json({ "result": { "20230920": ["TS2", "TS3", "TS4"], "20230921": ["TS2", "TS3", "TS4"], "20230922": ["TS2", "TS3"], "20230923": ["TS3", "TS4"], "20230924": ["TS2", "TS3", "TS4"], }, "status": "ok" })
	}
};
module.exports = main;