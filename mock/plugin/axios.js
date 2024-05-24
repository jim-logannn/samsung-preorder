const https = require('https');
const axios = require('axios');
const chalk = require('chalk');

axios.interceptors.request.use(request => {
  console.log(chalk.green('Starting Request'), JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
  console.log(chalk.green('Starting response'), response)
	return response;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
  console.log(chalk.red('Starting error'), error)
	return Promise.reject(error);
});

const runAPI = async ({url, method, headers, data, params}) => {
	console.log(chalk.green('runAPI:\n' + JSON.stringify({url, method, data, params}, null, 2)));
	const httpsAgent = new https.Agent({ rejectUnauthorized: false });
	return await axios({
		url: url,
		method: method,
		headers: headers,
		data: data,
		params: params,
		httpsAgent: httpsAgent
	})
}

module.exports = runAPI;