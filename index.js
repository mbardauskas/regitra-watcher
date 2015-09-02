var debug = require('./lib/debug');
var RegitraBrowser = require('./lib/regitra-browser');
var mailer = require('./lib/mailer');
var config = require('./config/default');

//process.env['TESSDATA_PREFIX'] = 'c:/server/Tesseract-OCR';

function processAllCities() {
	config.cities.forEach(function(city) {
		var regitra = RegitraBrowser.create();
		var possible_dates = regitra.getDates(city);

		var matches = possible_dates.match(config.datesRegex);
		if(matches) {
			mailer.sendMail(matches.join(', '));
		}

		regitra.destroy();
	});

	console.log('Finished all cities', new Date().toISOString(), 'Waiting for ' + (config.timeout / 1000) + ' seconds');
}

processAllCities();
setInterval(processAllCities, config.timeout);