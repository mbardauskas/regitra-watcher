var fs = require('fs');
var merge = require('merge');
var overridesFilepath = __dirname + '/overrides.js';

var config = {
	personID: 38704235897,
	requestID: 458425,
	requestURL: 'https://www.eregitra.lt/viesa/interv/INT_Header_Inf.php',
	userAgent: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
	captchaFile: __dirname + '/../.temp/captcha.jpg',
	screenshotFile: __dirname + '/../.temp/page.png',
	mailTransporter: {
		service: 'Gmail',
		auth: {
			user: '',
			pass: ''
		}
	},
	mailDetails: {
		from: 'mail@example.com',
		to: 'mail@example.com'
	},
	datesRegex: /2015\.09\.\d\d/gi,
	cities: ['AL', 'KN', 'KL', 'MR', 'PN', 'SL', 'TR', 'TL', 'UT', 'VL', 'MZ', 'RK']
};

if(fs.existsSync(overridesFilepath)) {
	var overrides = require(overridesFilepath);
	config = merge(config, overrides);
}

module.exports = config;
