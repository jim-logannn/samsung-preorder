# iPhone Pre-order inbase 2022
## Interface / Response Result
- ### Plan List - *Step4, Ajax*
	```
	{
		"status": "ok",
		"data": {
			"retentionInfo": {
				"commerceDate": "2022-10-15"
			},
			"plans": [{
				"id": "fd73f8c1-dc99-4965-a916-8dd1aa9fcfbd",
				"title": "Plan Title",
				"highlightText": "Best 5G Network",
				"subtitle": "5G Plan",
				"mobileData": "110",
				"contractPeriod": "18",
				"monthlyFee": {
					"curr_price": "398"
				},
				"pointGroup": [
					{
						"title": "Exclusive Privileges",
						"detail": [
							{
								"description": "2GB Greater Bay Area Data (Mainland China and Macau) and Mainland China Mobile Number"
							},
							{
								"description": "“Talk Freely Pack”\nUnlimited Video Call Data for Zoom/Teams"
							}
						]
					},
					{
						"title": "Service included",
						"detail": [
							{
								"description": "500 Intra SMS, voicemail, call forwarding, caller number display, call waiting and conference call."
							},
							{
								"description": "HK$18 administration fee"
							}
						]
					}
				],
				"prepayment": {
					"body": [
						[
							{
								"text": "Prepayment for 5G Plan(110GB) and extra local data 30GB/month within the contract period"
							},
							{
								"text": "HK$ 2388",
								"remark": "(HK$ 398  x  6 months)"
							}
						]
					]
				},
				"monthlyFeeBreakdown": {
					"head": [
						[
							{},
							{
								"text": "1st - 6th Month"
							},
							{
								"text": "7th - 18th Month"
							}
						]
					],
					"body": [
						[
							{
								"text": "5G Plan(110GB) and extra local data 30GB/month within the contract period"
							},
							{
								"text": "HK$ 398"
							},
							{
								"text": "HK$ 398"
							}
						],
						[
							{
								"text": "Administration Fee"
							},
							{
								"text": "HK$ 18"
							},
							{
								"text": "HK$ 18"
							}
						],
						[
							{
								"text": "Rebate from Prepayment"
							},
							{
								"text": "- HK$ 398"
							},
							{
								"text": "-"
							}
						]
					],
					"foot": [
						[
							{
								"text": "Monthly Fee Total"
							},
							{
								"text": "HK$ 18"
							},
							{
								"text": "HK$ 416"
							}
						]
					]
				}
			}]
		}
	}
	```
- ### Store List - *Step3, onload(internal)*
	```
	{
	storeList": [{
				"id": "dc30e60d-7197-4e9f-8493-6a1dc1acf03f",
				"name": "Aberdeen",
				"address": "Shop G26-27, G/F, Port Centre, 38 Chengtu Road, Aberdeen, Hong Kong",
				"mapLink": "https://maps.google.com/"
			}]
		}
	}	"status": "ok",
		"data": {
			"
	```
- ### Date List - *Step5, Ajax*
	```
	{
		"status": "ok",
		"data": {
			"dataList": {
				"2022-09-30": {
					available: true
				}, 
				"2022-09-31": {
					available: true
				}
			}
		}
	}
	```
- ### Timeslot List - *Step5, Ajax*
	```
	{
		"status": "ok",
		"data": {
			"timeslot": {
				"10-00": { available: true },
				"10-15": { available: true },
				"10-30": { available: true },
				"10-45": { available: true },
				"11-00": { available: true },
				"11-15": { available: true },
				"11-30": { available: true },
				"11-45": { available: true },
				"12-00": { available: true },
				"12-15": { available: true },
				"12-30": { available: true },
				"12-45": { available: true },
				"13-00": { available: true },
				"13-15": { available: true },
				"13-30": { available: true },
				"13-45": { available: true },
				"14-00": { available: true },
				"14-15": { available: true },
				"14-30": { available: true },
				"14-45": { available: true },
				"15-00": { available: true },
				"15-15": { available: true },
				"15-30": { available: true },
				"15-45": { available: true },
				"16-00": { available: true },
				"16-15": { available: true },
				"16-30": { available: true },
				"16-45": { available: true },
				"17-00": { available: true },
				"17-15": { available: true },
				"17-30": { available: true },
				"17-45": { available: true },
				"18-00": { available: true },
				"18-15": { available: true },
				"18-30": { available: true },
				"18-45": { available: true },
				"19-00": { available: true },
				"19-15": { available: true },
				"19-30": { available: true },
				"19-45": { available: true },
				"20-00": { available: true },
				"20-15": { available: true },
				"20-30": { available: true },
				"20-45": { available: true },
				"21-00": { available: true },
				"21-15": { available: true },
				"21-30": { available: true },
				"21-45": { available: true },
				"22-00": { available: true },
				"22-15": { available: true },
				"22-30": { available: true },
				"22-45": { available: true }
			}
		}
	}
	```