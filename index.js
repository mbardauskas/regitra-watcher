var RegitraBrowser = require('./lib/regitra-browser');
var mailer = require('./lib/mailer');
var config = require('./config/default');

//process.env['TESSDATA_PREFIX'] = 'c:/server/Tesseract-OCR';

var regitra = RegitraBrowser.create();
var possible_dates = regitra.getDates("KN");
console.log(possible_dates);

var matches = possible_dates.match(/2015\.10\.\d\d/gi);
mailer.sendMail(matches.join(', '));
