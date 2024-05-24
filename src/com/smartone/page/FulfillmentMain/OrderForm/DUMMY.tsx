import { API_STATUS } from '@smt/type/handsetPreOrder2023/api';

export const DUMMY = {
	handset: 'CO14_PRO_SB1024',
	collectionMethod: ['pickup', 'ADB'],
	pickup: {
		dates: ['9/15/2023', '9/16/2023'],
		times: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
	},
	discount: {
		status: API_STATUS.SUCCESS,
		error_msg: '',
		error_code: '',
		voucher_available_list: [{
			endDate: 'dummy dummy',
			startDate: 'dummy dummy',
			masterCouponId: 'dummy dummy 1'
		}, {
			endDate: 'dummy dummy',
			startDate: 'dummy dummy',
			masterCouponId: 'dummy dummy 2'
		}, {
			endDate: 'dummy dummy',
			startDate: 'dummy dummy',
			masterCouponId: 'dummy dummy 3'
		}]
	},
	offer: {
		"id": "iphone_pro",
		"img": "/IMG_V3/common/priority/applecare.png",
		"title": "AppleCare+",
		"desc": "Get AppleCare+ coverage. Protect your new iPhone.",
		"price": 1899,
		"offer_price": 1899,
		"product_code": "SFYV2ZX/A",
		"details": [
			"Every iPhone comes with one year of hardware repair coverage through its limited warranty and up to 90 days of complimentary support.  AppleCare+ for iPhone extends your coverage to two years from your AppleCare+ purchase date and adds up to two incidents of accidental damage protection every 12 months. Each incident is subject to a service fee of HK$228 for or back glass damage, or HK$788 for any other damage. For more info, please visit: <a href=\"http://www.apple.com/en/support/products/iphone/\" href=\"_blank\">http://www.apple.com/en/support/products/iphone/</a> ",
			"AppleCare+ must be purchased instantly when pre-ordering iPhone, or bought within 60 days of your iPhone collection at an Apple Retail shop, and it requires inspection of your iPhone and proof of purchase."
		]
	}
} as const;
