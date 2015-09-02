var nodemailer = require('nodemailer');
var merge = require('merge');
var debug = require('./debug');
var config = require('./../config/default');

module.exports = {
	sendMail: function(messageText) {
		var mailTransporter = nodemailer.createTransport(config.mailTransporter);
		var mailOptions = merge(config.mailDetails, {
			subject: 'Regitra available', // Subject line
			text: messageText
		});

		// send mail with defined transport object
		mailTransporter.sendMail(mailOptions, function(error, info){
			if(error){
				debug.log(error);
			}
			debug.log('Message sent: ' + info.response);
		});
	}
};