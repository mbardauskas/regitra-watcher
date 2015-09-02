var debug = require('./lib/debug');
var RegitraBrowser = require('./lib/regitra-browser');
var deasync = require('deasync');
var mailer = require('./lib/mailer');
var config = require('./config/default');

//process.env['TESSDATA_PREFIX'] = 'c:/server/Tesseract-OCR';

function processAllCities() {
	config.cities.forEach(function(city) {
		var done = false;
		var regitra = RegitraBrowser.create();
		var possible_dates = regitra.getDates(city);

		var matches = possible_dates.match(config.datesRegex);
		if(matches) {
			mailer.sendMail(matches.join(', '));
		}

		regitra.destroy();

		debug.log('Waiting ' + (config.timeout / 1000) + ' seconds for another city');

		setTimeout(function() { done = true; }, config.timeout);

		deasync.loopWhile(function(){return !done;});
	});

	debug.log('Finished all cities', new Date().toISOString(), 'Waiting for ' + (config.interval / 1000) + ' seconds');
}

processAllCities();
setInterval(processAllCities, config.interval);