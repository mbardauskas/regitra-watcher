var Horseman = require('node-horseman');
var solver = require('./solver');
var debug = require('./debug');
var config = require('./../config/default');

module.exports = {
	_browser: null,
	create: function() {
		this._browser = new Horseman();
		return this;
	},
	getDates: function(place) {
		this._browser
			.userAgent(config.userAgent)
			.open(config.requestURL)
			.type('form input[name="P_Asm_kodas"]', String(config.personID))
			// note that coordinates might change. click method doesn't work
			.mouseEvent('click', 575, 55)
			.waitForNextPage()
			.crop('#imgCaptcha', config.captchaFile)
			.type('input#PRASYMO_NR_P0', String(config.requestID));

		var captchaResult = solver.solveCaptcha(config.captchaFile);
		debug.log('Captcha result: ' + captchaResult);

		this._browser
			.type('input#code0', captchaResult)
			.value('#BRANCHID_N0', place)
			// clicks on submit button
			.click('.CTL_PLACE_LBL .yellow-btn input[type="button"]')
			.waitForNextPage();

		debug.log('City: ', this._browser.value('input[name="Padalinys"]'));

		return this._browser.text('th.lent_yra[width="100"]');
	},
	destroy: function() {
		this._browser.close();
		return this;
	}
}