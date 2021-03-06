var deasync = require('deasync');
var tesseract = require('node-tesseract');
var debug = require('./debug');

module.exports = {
	solveCaptcha: function(captchaFile) {
		var options = {
			l: 'eng',
			psm: 6
		};

		var done = false;
		var solved = '';

		tesseract.process(captchaFile, options, function (err, solvedText) {
			if (err) debug.log(err);
			else {
				solved = solvedText;
				done = true;
			}
		});

		// cannot incorporate promises with horseman. using deasync instead
		deasync.loopWhile(function(){return !done;});

		return solved;
	}
};
