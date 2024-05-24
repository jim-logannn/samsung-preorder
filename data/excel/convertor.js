const convertExcelToJson = require("convert-excel-to-json");
const fs = require("fs");
const getColumnToKey = (from, to) => {
	const keys = {};
	const start = from + 96; // 97 = A
	const end = start + to
	for (let i = start; i < end; i++) {
		const alphabet = String.fromCharCode(i).toUpperCase()
		keys[alphabet] = `{{${alphabet}1}}`;
	}
	return keys
}
const excelToJson = async (excelFilePath, outputFilePath, sheets, callback) => {
  // Read the Excel file
  const workbook = convertExcelToJson({
    sourceFile: excelFilePath,
		header:{
	    rows: 1
		},
		columnToKey: getColumnToKey(1, 24), // A to X
		sheets: sheets, // Specify the sheet name to convert
  });

  // Convert the workbook to JSON
  let json = JSON.stringify(workbook);

  // Massage the data if a callback function is provided
  if (callback) {
    const massagedData = callback(json);
    json = JSON.stringify(massagedData);	
  }

  // Write the JSON string to a file
  fs.writeFile(outputFilePath, json, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("JSON file written successfully.");
    }
  });
};

// Usage example
const excelFilePath = "./data/excel/src/iPhone15.xlsx";
const outputFilePath = "./data/excel/json/iPhone15.json";
const massageData = (json) => {
	const _output = {};
  // Massage the data here
  const massagedData = JSON.parse(json);
  massagedData['iphone15'].forEach((row) => {
		const {model_code, 
			IP15_HS_9_Per_Dis,
			IP15_HS_12_Per_Dis,
			IP15_HS_5_Per_Dis_03,
			IP15_HS_5_Per_Dis_02,
			IP15_HS_5_Per_Dis_01,
			IP15_HS_7_Per_Dis_03,
			IP15_HS_7_Per_Dis_02,
			IP15_HS_7_Per_Dis_01, 
			IP15_HS_$200_Dis,
			$500_HSPR23,
			...rest} = row;
		_output[model_code] = {
			model_code,
			...rest,
			voucher: {
				IP15_HS_9_Per_Dis,
				IP15_HS_12_Per_Dis,
				IP15_HS_5_Per_Dis_03,
				IP15_HS_5_Per_Dis_02,
				IP15_HS_5_Per_Dis_01,
				IP15_HS_7_Per_Dis_03,
				IP15_HS_7_Per_Dis_02,
				IP15_HS_7_Per_Dis_01, 
				IP15_HS_$200_Dis,
				$500_HSPR23,
			}
		}
  });
  return _output;
};

excelToJson(excelFilePath, outputFilePath, ['iphone15'], massageData);