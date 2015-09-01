var Horseman = require('node-horseman');
var solver = require('./solver');
var config = require('./../config/default');

module.exports = {
	_browser: null,
	create: function() {
		this._browser = new Horseman();
		return this;
	},
	getDates: function(place) {
		return this._browser
			.userAgent(config.userAgent)
			.open(config.requestURL)
			.type('form input[name="P_Asm_kodas"]', String(config.personID))
			// note that coordinates might change. click method doesn't work
			.mouseEvent('click', 575, 55)
			.waitForNextPage()
			.crop('#imgCaptcha', config.captchaFile)
			.type('input#PRASYMO_NR_P0', String(config.requestID))
			.type('input#code0', solver.solveCaptcha(config.captchaFile))
			// clicks on submit button
			.click('.CTL_PLACE_LBL .yellow-btn input[type="button"]')
			.waitForNextPage()
			//.screenshot(config.screenshotFile);
			.text('th.lent_yra[width="100"]');
	},
	destroy: function() {
		this._browser.close();
		return this;
	}
}